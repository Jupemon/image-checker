import React, { Component } from 'react';
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/imagelinkform/imagelinkform';
import './App.css';
import Rank from './components/rank/rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/facerecognition/facerecognition';
import SignIn from './components/signin/signin';
import Register from './components/register/register';
import { BrowserRouter, Route} from 'react-router-dom'
import CoolButton from './components/coolbutton/coolbutton';


const app = new Clarifai.App({
  apiKey: "08c6e0ed70e54110992c327c5e34eae1"
});

const particlesOptions = {
  particles: {
    line_linked: {
      shadow: {
        enable: true,
        color: "#3CA9D1",
        blur: 5
      }
    }
  }
}
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl :'',
      box: {},
      route: "signin",
      isSignedIn: false,
      user : {
        id: "",
        name: "",
        email: "",
        entries: "",
        joined: ""
      }
    }
  }

  loadUser = (data) => {
    this.setState({user : {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  onRouteChange = (route) => {
    if (route==="signout") {
      this.setState({isSignedIn: false})
    }
    else if (route=== "home") {
      this.setState({isSignedIn:true})
    }
    this.setState({route: route});
  }

  calculateFaceLocation = (data) => { // data is an object containingn the cols
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.querySelector("#inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(clarifaiFace, "CLARIFAIFACE", image, "IMAGE", width, height, "WIDTH & HEIGHT")
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box, "DISPLAY FACE BOX")
    this.setState({box:box});
  }

  onSubmit = (event) => {
    this.setState({imageUrl: this.state.input})
    console.log(this.state.input);
    app.models.predict("a403429f2ddf4b49b307e318f00e528b", this.state.input)
    .then(response => {
      if (response) {
        fetch("https://afternoon-cove-52339.herokuapp.com/image", {
          method: "put",
          headers: {"Content-Type" : "application/json"},
          body: JSON.stringify({
            id: this.state.user.id
          })
        }).then(response => response.json())
        .then(count => this.setState(Object.assign(this.state.user, {entries: count})))
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => err.json().then(error => console.log(error)));
  }


  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  render() {
    return (
      <BrowserRouter>
    <div className="App">
    <Particles className="particles"
                params={particlesOptions}
              />
     <Route path={"/signin"} component={SignIn} />
     <Route path={"/register"} component={Register} />
    <CoolButton />

          <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
          {this.state.route === "home" 
          ? <div> 
          <Logo />
          <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
          <Rank name={this.state.user.name} entries={this.state.user.entries}/>
          <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
          </div>
          : (
            this.state.route === "signin"
            ? <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/> 
            : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
          )}
          
      </div>
</BrowserRouter>
    );
  }
}

export default App;

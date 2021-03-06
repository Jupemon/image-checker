import React from 'react';
import './signin.css'


class SignIn extends React.Component {
constructor () {
    super()
    this.state = {
        isLoading : false,
        signInEmail: "test@gmail.com",
        signInPassword : "test",
        signInError : false
    }
}

onEmailChange = event => {
    const signInEmail = event.target.value;
    this.setState({signInEmail});
}
onPasswordChange = event => {
    const signInPassword = event.target.value;
    this.setState({signInPassword});
}
errorText = "Error signing in"
loginError = () => {
    console.log(typeof this.errorText, this.errorText, "ERROR TEXT")
    if (this.state.signInError) {
        this.setState({signInError : !this.state.signInError})
    }
    if (this.refs.email === this.errorText) {
        this.refs.email = "";
    }
}
onSubmitSignIn = () => {
    this.setState({isLoading : true});
    fetch("https://image-checker-server.herokuapp.com/signin", {
         method:"post",
         headers: {"Content-Type": "application/json"},
         body: JSON.stringify({
             email: this.state.signInEmail,
             password: this.state.signInPassword
            })
    }).then(Response => Response.json())
      .then(user => {
        if (user.id) {
            this.props.loadUser(user);
            this.props.onRouteChange("home");
        }
        else {
            this.refs.password.value = "";
            this.refs.email.value = this.errorText;
            this.setState({signInError : true});
        }
        this.setState({isLoading : false})
    })
    
}
/*onSubmitSignIn = () => {
    fetch("http://localhost:3000/register", {
         method:"post",
         headers: {"Content-Type": "application/json"},
         body: JSON.stringify({
             email: this.state.signInEmail,
             password: this.state.signInPassword,
             name: this.state.Username
            })
    }).then(Response=> Response.json()).then(user => {
      const responseUser = {    
        
        }
        console.log("user loaded")
        this.props.loadUser(user); */
    render() {
    return ( <div>
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input className={`pa2 input-reset ba bg-transparent hover-bg-${this.state.signInError ? "red" : "black"} hover-white w-100`} type="email" name="email-address"  id="email-address" defaultValue="test@gmail.com" ref="email" onClick={() => this.loginError()} onChange={(e) => this.onEmailChange(e)}/>
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" defaultValue="test" type="password" name="password"  id="password" ref="password" onChange={(e) => this.onPasswordChange(e)}/>
                </div>
            </fieldset>
            <div className="">
            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value={this.state.isLoading ? "Loading..." : "Sign in"} disabled={this.state.isLoading} onClick={() => this.onSubmitSignIn()} />
            </div>
            <div className="lh-copy mt3">
            <a href="#0" className="f6 link dim black db" onClick={() => this.props.onRouteChange("register")}>Register</a>
            </div>
        </div>
    </article>
    </div>
     );
    }
}
 
export default SignIn;
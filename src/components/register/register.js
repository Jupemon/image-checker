import React from 'react';
import './register.css';
class Register extends React.Component {

  constructor () {
    super()
    this.state = {
        signInEmail: "",
        signInPassword : "",
        Username: ""
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
onUsernameChange = event => {
  const Username = event.target.value;
  this.setState({Username});
}

onSubmitSignIn = () => {
    fetch("https://afternoon-cove-52339.herokuapp.com/register", {
         method:"post",
         headers: {"Content-Type": "application/json"},
         body: JSON.stringify({
             email: this.state.signInEmail,
             password: this.state.signInPassword,
             name: this.state.Username
            })
    }).then(Response=> Response.json()).then(user => {
        console.log("user loaded")
        this.props.loadUser(user);
    })
    /*id: "125",
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Da */

    this.props.onRouteChange("home")
}
  render () {
    return ( <div>
        <article className="pa4 black-80">
  <form action="sign-up_submit" method="get" acceptCharset="utf-8">
    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
    <legend className="f1 fw6 ph0 mh0">Register</legend>
    <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="Username">Username</label>
        <input className="b pa2 input-reset ba bg-transparent" type="text" name="username"  id="username" onChange={(e) => {this.onUsernameChange(e)}}/>
      </div>
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="email-address">Email address</label>
        <input className="pa2 input-reset ba bg-transparent w-100 measure" type="email" name="email-address"  id="email-address" onChange={(e) => {this.onEmailChange(e)}}/>
      </div>
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="password">Password</label>
        <input className="b pa2 input-reset ba bg-transparent" type="password" name="password"  id="password" onChange={(e) => {this.onPasswordChange(e)}}/>
      </div>
    </fieldset>
    <div className="mt3"><input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" type="button" value="Sign up" onClick={() => this.onSubmitSignIn()}/></div>
  </form>
</article>

    </div> );
}
}
export default Register;
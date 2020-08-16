import React from 'react';

class Auth extends React.Component {
    constructor(props) {
        super(props);
	this.state = ({ token: '', menuStatus: 0}); 
    }

    render() {
        return (
	    <div>
		<button onClick={()=>this.setState({menuStatus: 0})}>
		    Login
		</button>

		<button onClick={()=>this.setState({menuStatus: 1})}>
		    Register
		</button>

		{ this.state.menuStatus == 0 ? <Login /> : < Register/> }
            </div>
	)
    }
}

class Login extends React.Component {
    constructor(props) {
        super(props);
	this.handleChange = this.handleChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
	this.state = ({name: "", password: ""});
    }

    handleChange(event) {
        this.setState({ [event.target.name] : event.target.value });
    }

    handleSubmit(event) {
	event.preventDefault();
	const credentials = { name: this.state.name, 
		                  password: this.state.password };
        fetch('http://hanoelleb-forme.herokuapp.com/api/auth/login',
            { 
                method: 'POST',
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: new URLSearchParams(credentials),
                json: true
            })
	     .then( response => response.json())
	     .then( data => console.log(data));
    }

    render() {
        return (
	    <form onSubmit={this.handleSubmit}>
		<input type='text' name='name' onChange={this.handleChange} 
		    placeholder='name' />
		<input type='password' name='password' 
		    onChange={this.handleChange} placeholder='password' />
		<input type='submit' value='Login' />
            </form>
	)
    }
}

class Register extends React.Component {
    render() {
       return (
         <form>
             <input type='text' placeholder='name' />
             <input type='email' placeholder='email' />
             <input type='password' placeholder='password' />
             <input type='submit' value='Create Account' />
         </form>
       )
    }
}

export default Auth;

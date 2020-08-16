import React from 'react';

class Auth extends React.Component {
    constructor(props) {
        super(props);
	this.state = ({ token: '', menuStatus: 0}); 
    }

    render() {
        return (
	    <div>
		Auth
            </div>
	)
    }
}

export default Auth;

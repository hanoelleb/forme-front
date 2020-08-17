import React from 'react';
import './App.css';

import Auth from './Auth';
import Log from './Log';

class App extends React.Component {
  constructor(props) {
      super(props);
      this.tokenHandler = this.tokenHandler.bind(this);
      this.logout = this.logout.bind(this);
      this.state = ({ token: '', id: '' });
  }

  tokenHandler(token, id) {
      this.setState({ token: token, id: id});
  }

  logout() {
      this.setState({ token: '', id: ''});
  }
	
  render() { 
   return (
    <div className="App">
      <header className="App-header">
	  { this.state.token === '' ? < Auth handler={this.tokenHandler} /> 
            : <div>
                  <button onClick={this.logout}>Logout</button>
	          < Log token={this.state.token} id={this.state.id} /> 
              </div>
	  }
      </header>
    </div>
  );}
}


export default App;

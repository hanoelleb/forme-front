import React from 'react';

class Log extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = ({open_form: false})
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        return (
	    <div>
                <h2>Log</h2>
		{ !this.state.open_form ?
		<button onClick={()=>this.setState({open_form: true})}>
                    +Workout
		</button>
                :
                <form onSubmit={this.handleSubmit}>
                    <button onClick={()=>this.setState({open_form: false})}>
                        Cancel
                    </button>
                    <input type='number' name='length' 
                        placeholder='Length in minutes' />
		    <textarea name = 'description' 
                        placeholder='Description (cardio, strength, yoga etc...'></textarea>
                    <input type='submit' value='Add' />
		</form>
		}
            </div>
	)
    }
}

export default Log;

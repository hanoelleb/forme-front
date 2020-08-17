import React from 'react';

class Log extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = ({open_form: false, 
                          length: 0, 
                          description: '',
	                  workouts: []
                     });
    }

    componentDidMount() {
        const reqUrl = 'http://hanoelleb-forme.herokuapp.com/api/exercises/'
                    + this.props.id + '/?token=' + this.props.token;

	console.log(reqUrl);
	fetch(reqUrl,
             {
               method: 'GET',
               json: true
             })
             .then( response => response.json() )
             .then( data => {
                 const workouts = this.state.workouts;
		 const logs = data.logs;
                 logs.forEach( (val) => workouts.push(val) );
		 this.setState({workouts: workouts});
             });
    }

    handleChange(event) {
        this.setState({[event.target.name] : event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
	const workout = { length: this.state.length, 
                            description: this.state.description };
	const reqUrl = 'http://hanoelleb-forme.herokuapp.com/api/exercises/'
                    + this.props.id + '/create' + '/?token=' 
		    + this.props.token;

	fetch(reqUrl,
             {
               method: 'POST',
               mode: 'cors',
               headers: {'Content-Type': 'application/x-www-form-urlencoded',
	                  'token': this.props.token },
               token: this.props.token,
               body: new URLSearchParams(workout),
               json: true
             })
             .then( response => console.log(response))
    }

    renderLog(workout) {
	return (
            <div>{workout.length} {workout.description}</div>
	)
    }

    render() {
        return (
	    <div>
                <h2>Log</h2>
		{ this.state.workouts.map(workout => this.renderLog(workout))}
		{ !this.state.open_form ?
		<button onClick={()=>this.setState({open_form: true})}>
                    +Workout
		</button>
                :
                <form onSubmit={this.handleSubmit}>
                    <button onClick={()=>this.setState({open_form: false, length: 0, description: ''})}>
                        Cancel
                    </button>
                    <input type='number' name='length' 
			onChange={this.handleChange} 
                        placeholder='Length in minutes' />
		    <textarea name = 'description' 
			onChange={this.handleChange} 
                        placeholder='Description (cardio, strength, yoga etc...'></textarea>
                    <input type='submit' value='Add' />
		</form>
		}
            </div>
	)
    }
}

export default Log;

import React from 'react';

class Log extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = ({open_form: false, 
                          length: 0, 
                          description: '',
	                  workouts: [],
		          counter: 0
                     });
    }

    componentDidMount() {
        const reqUrl = 'http://hanoelleb-forme.herokuapp.com/api/exercises/'
                    + this.props.id + '/?token=' + this.props.token;

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
                    + this.props.id + '/create' + '?token=' 
		    + this.props.token;
        console.log(reqUrl);
	console.log(workout);

	fetch(reqUrl,
             {
               method: 'POST',
               headers: {'Content-Type': 'application/x-www-form-urlencoded'},
               body: new URLSearchParams(workout),
               json: true
             })
             .then( response => { 
		  const reqUrl2 = 'http://hanoelleb-forme.herokuapp.com/api'
			     + '/exercises/' + this.props.id 
			     + '/?token=' + this.props.token;

                  return fetch(reqUrl2,
                  {
                    method: 'GET',
                    json: true
                  })
                    .then( response => response.json() )
                    .then( data => {
                    const workouts = [];
                    const logs = data.logs;
                    logs.forEach( (val) => workouts.push(val) );
                    this.setState({workouts: workouts});
                  });
	     });
    }

    renderLog(workout) {
	return (
            <tr>
		<td>{workout.date}</td>
		<td>{workout.length}</td>
		<td>{workout.description}</td>
            </tr>
	)
    }

    render() {
        return (
	    <div>
                <h2>Log</h2>
		<table>
		<thead>
		    <tr>
		        <th>Date</th>
		        <th>Length</th>
		        <th>Description</th>
		    </tr>
		</thead>
		<tbody>
		{ this.state.workouts.map(workout => this.renderLog(workout))}
		</tbody>
		</table>

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

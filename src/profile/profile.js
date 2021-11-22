import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './profile.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
  }

  updateUsername(event) {
    this.setState({ username: event.target.value });
  }

  updatePassword(event) {
    this.setState({ password: event.target.value });
  }

  // handleSubmit(event) {
  //   event.preventDefault();
  //   fetch(`/api/greeting?name=${encodeURIComponent(this.state.name)}`)
  //     .then(response => response.json())
  //     .then(state => this.setState(state)).catch(err => console.log(err));
  // }

  render() {
    return (
      <div className="Demo">
        <header className="Demo-header" style={{'color': '#ffffff'}}>
          <h2 style={{'fontSize': '23px'}}>You are not logged in! Create an account?</h2>
          <p classNam='text-muted'> Already have an account? Log in here.</p>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="name" style={{'marginBottom': '7px'}}>User name: </label>
            <input
              id="name"
              type="text"
              placeholder='Enter a user name'
              onChange={this.updateUsername}
              style={{'color': 'black'}}
            />
            <br/>
            <label htmlFor="name" style={{'marginBottom': '7px'}}>Password: </label>
            <input
              id="name"
              type="text"
              placeholder='Enter a password'
              onChange={this.updatePassword}
              style={{'color': 'black'}}
            />
            <br/>
            <Button
              varient='primary'
              type='submit'
              className='button'>
                Submit
              </Button>
          </form>
        </header>
      </div>
    );
  }
}

export default Profile;

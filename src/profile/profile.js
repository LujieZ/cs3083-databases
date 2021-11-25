import axios from 'axios';
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

  handleSubmit = () => {
    const curState = this.state;
    if (curState.username === '' || curState.password === '') {
      console.log('ERROR! Please check your log in information!!');
      return;
    }
    axios.get(`/customer/${curState.username}`).then((res1) => {
      if (res1.data.length === 0) {
        axios.get(`/staff/${curState.username}`).then((res2) => {
          if (res2.data.length === 0) {
            console.log('ERROR! Please check your log in information!!');
          } else {
            console.log(res2.data);
            if (curState.password === res2.data[0].password) {
              localStorage.setItem('user', res2.data[0]);
              localStorage.setItem('userType', 'staff');
              window.location.reload(false);
            }
          }
        })
      } else {
        console.log(res1.data);
        if (curState.password === res1.data[0].password) {
          localStorage.setItem('user', res1.data[0]);
          localStorage.setItem('userType', 'customer');
          window.location.reload(false);
        }
      }
    })
  }

  render() {
    const loggedInUser = localStorage.getItem('userType');
    if (loggedInUser) {
      console.log(loggedInUser);
      return (
        <>
        <p style={{'color': 'white'}}>You are logged in as {loggedInUser}</p>
        <Button
              varient='primary'
              onClick={() => {
                localStorage.clear();
                window.location.reload(false);
              }}
              className='button'>
                Log Out
              </Button>
        </>
      )
    }
    return (
      <div className="Demo">
        <header className="Demo-header" style={{'color': '#ffffff'}}>
          <h2 style={{'fontSize': '23px'}}>You are not logged in! Log in to your account?</h2>
          <p classNam='text-muted'> Or create an account here.</p>
          <form>
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
              onClick={this.handleSubmit}
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

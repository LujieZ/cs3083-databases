import axios from 'axios';
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './profile.css';

const md5 = require('md5');

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
      alert('ERROR! Please check your log in information!!');
      return;
    }
    axios.get(`/customer/${curState.username}`).then((res1) => {
      if (res1.data.length === 0) {
        axios.get(`/staff/${curState.username}`).then((res2) => {
          if (res2.data.length === 0) {
            alert('ERROR! Please check your log in information!!');
            return;
          } else {
            console.log(res2.data[0].password);
            if (md5(curState.password) !== res2.data[0].password) {
              alert('ERROR! Please check your password!!');
              return;
            }
            localStorage.setItem('user', JSON.stringify(res2.data[0]));
            localStorage.setItem('userType', 'staff');
            window.location.reload(false);
          }
        })
      } else {
        console.log(res1.data);
        if (md5(curState.password) !== res1.data[0].password) {
          alert('ERROR! Please check your password!!');
          return;
        }
          localStorage.setItem('user', JSON.stringify(res1.data[0]));
          localStorage.setItem('userType', 'customer');
          window.location.reload(false);
      }
    })
  }

  render() {
    const loggedInUser = localStorage.getItem('userType');
    if (loggedInUser) {
      console.log(loggedInUser);
      if (loggedInUser === 'customer') {
        return (
          <div style={{'color': '#ffffff'}}>
          <p>You are logged in as {loggedInUser}</p>
          <Link to='/view-flights'>
          <Button className='button'>View My Flights</Button>
          </Link>
          <br/>
          <Link to='/flight-rates'>
          <Button className='button'>Rate Previous Flights</Button>
          </Link>
          <br/>
          <Link to='/track-spending'>
          <Button className='button'>Track My Spending</Button>
          </Link>
          <br/>
          <Button
                varient='primary'
                onClick={() => {
                  localStorage.clear();
                  window.location.reload(false);
                }}
                className='button'>
                  Log Out
                </Button>
          </div>
        )
      }
      return (
        <div style={{'color': '#ffffff'}}>
        <p>You are logged in as {loggedInUser}</p>
        <Link to='/view-flights'>
        <Button className='button'>View Flights Information</Button>
        </Link>
        <br/>
        <Link to='/flight-rates'>
        <Button className='button'>View Rating Information</Button>
        </Link>
        <br/>
        <Link to='/airline'>
        <Button className='button'>View Airline Information</Button>
        </Link>
        <br/>
        <Link to='/management'>
        <Button className='button'>Manage Flights/Airplanes/Airport</Button>
        </Link>
        <br/>
        <Button
                varient='primary'
                onClick={() => {
                  localStorage.clear();
                  window.location.reload(false);
                }}
                className='button'>
                  Log Out
                </Button>
        </div>
      )
    }
    return (
      <div className="Demo">
        <header className="Demo-header" style={{'color': '#ffffff'}}>
          <h2 style={{'fontSize': '23px'}}>You are not logged in! Log in to your account?</h2>
          <p style={{'fontSize': '17px'}}> Or <Link to='/registration' style={{color: "#de9e48"}}>create an account</Link>.</p>
          <form>
            <label for="name" style={{'marginBottom': '7px', 'fontSize': '19px', 'display': 'block'}}>User name: </label>
            <input
              id="name"
              type="text"
              size="25"
              placeholder='Enter a user name'
              onChange={this.updateUsername}
              style={{'color': 'black', 'fontSize': '18px'}}
            />
            <br/>
            <label for="password" style={{'marginBottom': '7px', 'fontSize': '19px', 'display': 'block'}}>Password: </label>
            <input
              id="password"
              type="password"
              size="25"
              placeholder='Enter a password'
              onChange={this.updatePassword}
              style={{'color': 'black', 'fontSize': '18px'}}
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

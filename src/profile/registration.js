import axios from 'axios';
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './profile.css';

const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
const qs = require('querystring');
const md5 = require('md5');

class Registration extends Component {
    constructor(props) {
      super(props);
      this.state = {
        username: '',
        firstname: '',
        lastname: '',
        fullname: '',
        password: '',
        birthday: '',
        airline: '',
        phone: '',
        building: '',
        street: '',
        city: '',
        state: '',
        passportNumber: '',
        passportCountry: '',
        passportExpiration: '',
        ifStaff: false,
      };
      this.updateIsStaff = this.updateIsStaff.bind(this);
      this.updateUsername = this.updateUsername.bind(this);
      this.updateFirstname = this.updateFirstname.bind(this);
      this.updateFullname = this.updateFullname.bind(this);
      this.updateLastname = this.updateLastname.bind(this);
      this.updatePassword = this.updatePassword.bind(this);
      this.updateBirthday = this.updateBirthday.bind(this);
      this.updatePhone = this.updatePhone.bind(this);
      this.updateAirline = this.updateAirline.bind(this);
      this.updateBuilding = this.updateBuilding.bind(this);
      this.updateStreet = this.updateStreet.bind(this);
      this.updateCity = this.updateCity.bind(this);
      this.updateState = this.updateState.bind(this);
      this.updatePassportNum = this.updatePassportNum.bind(this);
      this.updatePassportCountry = this.updatePassportCountry.bind(this);
      this.updatePassportExpir = this.updatePassportExpir.bind(this);
    }
  
    updateIsStaff(event) {
      this.setState({
          ifStaff: event.target.checked
      });
    }

    updateUsername(event) {
      this.setState({ username: event.target.value });
    }

    updateFirstname(event) {
      this.setState({ firstname: event.target.value });
    }

    updateLastname(event) {
      this.setState({ lastname: event.target.value });
    }

    updateFullname(event) {
      this.setState({ fullname: event.target.value });
    }

    updatePassword(event) {
      this.setState({ password: event.target.value });
    }
  
    updateBirthday(event) {
      this.setState({ birthday: event.target.value });
    }

    updatePhone(event) {
      this.setState({ phone: event.target.value });
    }
  
    updateAirline(event) {
        this.setState({ airline: event.target.value});
    }

    updateStreet(event) {
        this.setState({ street: event.target.value });
    }

    updateBuilding(event) {
        this.setState({ building: event.target.value });
    }

    updateCity(event) {
        this.setState({ city: event.target.value });
    }

    updateState(event) {
        this.setState({ state: event.target.value });
    }

    updatePassportNum(event) {
        this.setState({ passportNumber: event.target.value });
    }

    updatePassportCountry(event) {
        this.setState({ passportCountry: event.target.value });
    }

    updatePassportExpir(event) {
        this.setState({ passportExpiration: event.target.value });
    }

    handleSubmit = () => {
      const curState = this.state;
      if (!curState.ifStaff) {
        this.handleCustomerSubmit();
        return;
      }
      if (curState.username === '' || curState.password === '' || curState.firstname === '' || curState.lastname === ''
      || curState.birthday === '' || curState.phone === '' || curState.airline === '') {
        console.log('ERROR! Please check your log in information!!');
        return;
      }
      const obj = {
          username: curState.username,
          password: md5(curState.password),
          airline_name: curState.airline,
          first_name: curState.firstname,
          last_name: curState.lastname,
          date_of_birth: curState.birthday,
          phone_num: curState.phone,
      }
      axios.post('/staff', qs.stringify(obj), config).then(() => {
      })
    }

    handleCustomerSubmit = () => {
        const curState = this.state;
        if (curState.username === '' || curState.password === '' || curState.fullname === '' || curState.birthday === ''
        || curState.phone === '' || curState.password === '' || curState.buildind === '' || curState.street === '' || curState.city === ''
        || curState.state ==='' || curState.passportNumber === '' || curState.updatePassportExpir === '' || curState.updatePassportCountry === '') {
            console.log('ERROR! Please check your log in information!!');
            return;
        }
        const obj = {
            name: curState.fullname,
            customer_email: curState.username,
            password: md5(curState.password),
            building_number: curState.building,
            street: curState.street,
            city: curState.city,
            state: curState.state,
            phone_num: curState.phone,
            passport_num: curState.passportNumber,
            passport_country: curState.passportCountry,
            passport_expiry: curState.passportExpiration,
            date_of_birth: curState.birthday,
        };
        console.log(obj);
        axios.post('/customer', qs.stringify(obj), config).then(() => {

        })
    }

    renderCustomerRegistration = () => {
        return (
            <>
            <form>
            <label for="name" style={{'marginBottom': '7px'}}>Email: </label>
            <input
              id="name"
              type="text"
              size="25"
              placeholder='Enter an email'
              onChange={this.updateUsername}
              style={{'color': 'black', 'fontSize': '18px'}}
            />
            <br/><br/>
            <label for="fullname" style={{'marginBottom': '7px'}}>Name: </label>
            <input
              id="fullname"
              type="text"
              size="25"
              placeholder='Enter your full name'
              onChange={this.updateFullname}
              style={{'color': 'black', 'fontSize': '18px'}}
            />
            <br/><br/>
            <label for="phone" style={{'marginBottom': '7px'}}>Phone Number: </label>
            <input
              id="phone"
              type="text"
              size="25"
              placeholder='Enter your phone number'
              onChange={this.updatePhone}
              style={{'color': 'black', 'fontSize': '18px'}}
            />
            <br/><br/>
            <label for="password" style={{'marginBottom': '7px'}}>Password: </label>
            <input
              id="password"
              type="password"
              size="25"
              placeholder='Enter a password'
              onChange={this.updatePassword}
              style={{'color': 'black', 'fontSize': '18px'}}
            />
            <br/><br/>
            <label for="birthday" style={{'marginBottom': '7px'}}>Date of Birth: </label>
            <input
              id="birthday"
              type="text"
              size="25"
              placeholder='Enter date of birth'
              onChange={this.updateBirthday}
              style={{'color': 'black', 'fontSize': '18px'}}
            />
            <br/><br/>
            <label for="building" style={{'marginBottom': '7px'}}>Building: </label>
            <input
              id="building"
              type="text"
              size="25"
              placeholder='Enter the building of your address'
              onChange={this.updateBuilding}
              style={{'color': 'black', 'fontSize': '18px'}}
            />
            <br/><br/>
            <label for="street" style={{'marginBottom': '7px'}}>Street: </label>
            <input
              id="street"
              type="text"
              size="25"
              placeholder='Enter the street of your address'
              onChange={this.updateStreet}
              style={{'color': 'black', 'fontSize': '18px'}}
            />
            <br/><br/>
            <label for="city" style={{'marginBottom': '7px'}}>City: </label>
            <input
              id="city"
              type="text"
              size="25"
              placeholder='Enter the city of your address'
              onChange={this.updateCity}
              style={{'color': 'black', 'fontSize': '18px'}}
            />
            <br/><br/>
            <label for="state" style={{'marginBottom': '7px'}}>State: </label>
            <input
              id="state"
              type="text"
              size="25"
              placeholder='Enter the state of your address'
              onChange={this.updateState}
              style={{'color': 'black', 'fontSize': '18px'}}
            />
            <br/><br/>
            <label for="passport-number" style={{'marginBottom': '7px'}}>Passport Number: </label>
            <input
              id="passport-number"
              type="text"
              size="25"
              placeholder='Enter your passport number'
              onChange={this.updatePassportNum}
              style={{'color': 'black', 'fontSize': '18px'}}
            />
            <br/><br/>
            <label for="passport-country" style={{'marginBottom': '7px'}}>Passport Country: </label>
            <input
              id="passport-country"
              type="text"
              size="25"
              placeholder='Enter your passport country'
              onChange={this.updatePassportCountry}
              style={{'color': 'black', 'fontSize': '18px'}}
            />
            <br/><br/>
            <label for="passport-expiration" style={{'marginBottom': '7px'}}>Passport Expiration Date: </label>
            <input
              id="passport-expiration"
              type="text"
              size="25"
              placeholder='Enter your passport expiration date'
              onChange={this.updatePassportExpir}
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
            </>
        )
    }

    renderStaffRegistration = () => {
        return (
            <>
            <form>
            <label for="name" style={{'marginBottom': '7px'}}>User name: </label>
            <input
              id="name"
              type="text"
              size="25"
              placeholder='Enter a user name'
              onChange={this.updateUsername}
              style={{'color': 'black', 'fontSize': '18px'}}
            />
            <br/><br/>
            <label for="fname" style={{'marginBottom': '7px'}}>First Name: </label>
            <input
              id="fname"
              type="text"
              size="25"
              placeholder='Enter your first name'
              onChange={this.updateFirstname}
              style={{'color': 'black', 'fontSize': '18px'}}
            />
            <br/><br/>
            <label for="lname" style={{'marginBottom': '7px'}}>Last Name: </label>
            <input
              id="lname"
              type="text"
              size="25"
              placeholder='Enter your last name'
              onChange={this.updateLastname}
              style={{'color': 'black', 'fontSize': '18px'}}
            />
            <br/><br/>
            <label for="password" style={{'marginBottom': '7px'}}>Password: </label>
            <input
              id="password"
              type="password"
              size="25"
              placeholder='Enter a password'
              onChange={this.updatePassword}
              style={{'color': 'black', 'fontSize': '18px'}}
            />
            <br/><br/>
            <label for="birthday" style={{'marginBottom': '7px'}}>Date of Birth: </label>
            <input
              id="birthday"
              type="text"
              size="25"
              placeholder='Enter date of birth'
              onChange={this.updateBirthday}
              style={{'color': 'black', 'fontSize': '18px'}}
            />
            <br/><br/>
            <label for="phone" style={{'marginBottom': '7px'}}>Phone Number: </label>
            <input
              id="phone"
              type="text"
              size="25"
              placeholder='Enter your phone number'
              onChange={this.updatePhone}
              style={{'color': 'black', 'fontSize': '18px'}}
            />
            <br/><br/>
            <label for="airline" style={{'marginBottom': '7px'}}>Airline: </label>
            <input
              id="airline"
              type="text"
              size="25"
              placeholder='Enter your airline'
              onChange={this.updateAirline}
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
            </>
        )
    }
  
    render() {
      const curState = this.state;
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
            <h2 style={{'fontSize': '23px'}}>Registration</h2>
            <p>Airline staff?{' '}
            <input type="checkbox" key="if-staff" defaultChecked={false} onChange={this.updateIsStaff} /></p>
            {curState.ifStaff && this.renderStaffRegistration()}
            {!curState.ifStaff && this.renderCustomerRegistration()}
        </header>
        </div>
      );
    }
  }
  
  export default Registration;
  
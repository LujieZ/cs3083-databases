import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './flight.css';

const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};
const qs = require('querystring');

export default class ViewFlights extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staff_flights: [],
      customer_flights: [],
      departure_date1: '',
      departure_date2: '',
      departure_location: '',
      arrival_location: '',
    };
  }

  componentDidMount() {
    if (localStorage.getItem('userType') === 'staff') {
      const staff = localStorage.getItem('user');
      const staffObj = JSON.parse(staff);
      axios.get(`/flights-staff/${staffObj.airline_name}/-1/-1/-1/-1`).then((res) => {
        console.log(res.data);
        this.setState({
          staff_flights: res.data,
        });
      })
    }
    if (localStorage.getItem('userType') === 'customer') {
      const customer = localStorage.getItem('user');
      const customerObj = JSON.parse(customer);
      axios.get(`/flights-customer/${customerObj.customer_email}/-1/-1/-1/-1`).then((res) => {
        console.log(res.data);
        this.setState({
          customer_flights: res.data,
        });
      })
    }
  }

  updateDepatureDate1 = (e) => {
    this.setState({
      departure_date1: e.target.value,
    });
  }

  updateDepatureDate2 = (e) => {
    this.setState({
      departure_date2: e.target.value,
    });
  }

  updateDepatureLocation = (e) => {
    this.setState({
      departure_location: e.target.value,
    });
  }

  updateArrivalLocation = (e) => {
    this.setState({
      arrival_location: e.target.value,
    });
  }

  updateStaffFlights = (airline_name) => {
    const curState = this.state;
    const date_1 = curState.departure_date1 === '' ? '-1' : curState.departure_date1;
    const date_2 = curState.departure_date2 === '' ? '-1' : curState.departure_date2;
    const depart_loc = curState.departure_location === '' ? '-1' : curState.departure_location;
    const arrival_loc = curState.arrival_location === '' ? '-1' : curState.arrival_location;
    axios.get(`/flights-staff/${airline_name}/${date_1}/${date_2}/${depart_loc}/${arrival_loc}`).then((res) => {
      console.log(res.data);
      this.setState({
        staff_flights: res.data,
      });
    })
  }

  updateCustomerFlights = (customer_email) => {
    const curState = this.state;
    const date_1 = curState.departure_date1 === '' ? '-1' : curState.departure_date1;
    const date_2 = curState.departure_date2 === '' ? '-1' : curState.departure_date2;
    const depart_loc = curState.departure_location === '' ? '-1' : curState.departure_location;
    const arrival_loc = curState.arrival_location === '' ? '-1' : curState.arrival_location;
    axios.get(`/flights-customer/${customer_email}/${date_1}/${date_2}/${depart_loc}/${arrival_loc}`).then((res) => {
      console.log(res.data);
      this.setState({
        customer_flights: res.data,
      });
    })
  }
  
  render() {
    const curState = this.state;
    if (localStorage.getItem('userType') === 'staff') {
      const staff = localStorage.getItem('user');
      const staffObj = JSON.parse(staff);
      const staffFlightTrs = curState.staff_flights.map((flight) => {
        return (
          <tr>
          <td>{flight.flight_num}</td>
          <td>{flight.departure_date} {flight.departure_time} From {flight.depart_city}</td>
          <td>{flight.arrival_date} {flight.arrival_time} At {flight.arrival_city}</td>
          <td>{flight.status}</td>
          <td>
            <Link to='/'>
              <Button>View Passagers</Button>
            </Link>
          </td>
        </tr>
        )
      })
      return (<div style={{'color': '#ffffff'}}>
        <h3 style={{'fontSize': '25px', 'marginBottom': '50px'}}>Flights From {staffObj.airline_name}</h3>
        <table id="flights" style={{'color': '#372c2e', 'marginBottom': '15px', 'margin-left':'auto', 'margin-right':'auto'}}>
                <tr>
                    <th>Flight Number</th>
                    <th>Departure</th>
                    <th>Arrival</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
                    {staffFlightTrs}
          </table>
          <br/>
          <form>
            <label for="depature-date" style={{'marginBottom': '7px'}}>Depature Date: From {' '}</label>
            <input
              id="depature-date"
              type="text"
              size="25"
              placeholder='Date in YYYY-mm-DD'
              onChange={this.updateDepatureDate1}
              style={{'color': 'black', 'fontSize': '18px'}}
            />
            {' '} to {' '}
            <input
              id="depature-date"
              type="text"
              size="25"
              placeholder='Date in YYYY-mm-DD'
              onChange={this.updateDepatureDate2}
              style={{'color': 'black', 'fontSize': '18px'}}
            />
            <br/><br/>
            <label for="departure-location" style={{'marginBottom': '7px'}}>Departure Location: </label>
            <input
              id="departure-location"
              type="text"
              size="25"
              placeholder='Depature City or Airport'
              onChange={this.updateDepatureLocation}
              style={{'color': 'black', 'fontSize': '18px'}}
            />
            <br/><br/>
            <label for="arrival-location" style={{'marginBottom': '7px'}}>Arrival Location: </label>
            <input
              id="arrival-location"
              type="text"
              size="25"
              placeholder='Arrival City or Airport'
              onChange={this.updateArrivalLocation}
              style={{'color': 'black', 'fontSize': '18px'}}
            />
            <br/>
            <Button
              onClick={() => this.updateStaffFlights(staffObj.airline_name)}
              className='button'>
                Find Airline Flights
            </Button>
          </form>
      </div>
      );
    }
    if (localStorage.getItem('userType') === 'customer') {
      const customer = localStorage.getItem('user');
      const customerObj = JSON.parse(customer);
      const customerFlightTrs = curState.customer_flights.map((flight) => {
        return (
          <tr>
          <td>{flight.flight_num}</td>
          <td>{flight.ticket_id}</td>
          <td>{flight.departure_date} {flight.departure_time} From {flight.depart_city}</td>
          <td>{flight.arrival_date} {flight.arrival_time} At {flight.arrival_city}</td>
          <td>{flight.status}</td>
        </tr>
        )
      })
      return (<div style={{'color': '#ffffff'}}>
        <h3 style={{'fontSize': '25px', 'marginBottom': '50px'}}>My Flights</h3>
        <table id="flights" style={{'color': '#372c2e', 'marginBottom': '15px', 'margin-left':'auto', 'margin-right':'auto'}}>
                <tr>
                    <th>Flight Number</th>
                    <th>Ticket ID</th>
                    <th>Departure</th>
                    <th>Arrival</th>
                    <th>Status</th>
                </tr>
                    {customerFlightTrs}
          </table>
          <br/>
          <form>
            <label for="depature-date" style={{'marginBottom': '7px'}}>Depature Date: From {' '}</label>
            <input
              id="depature-date"
              type="text"
              size="25"
              placeholder='Date in YYYY-mm-DD'
              onChange={this.updateDepatureDate1}
              style={{'color': 'black', 'fontSize': '18px'}}
            />
            {' '} to {' '}
            <input
              id="depature-date"
              type="text"
              size="25"
              placeholder='Date in YYYY-mm-DD'
              onChange={this.updateDepatureDate2}
              style={{'color': 'black', 'fontSize': '18px'}}
            />
            <br/><br/>
            <label for="departure-location" style={{'marginBottom': '7px'}}>Departure Location: </label>
            <input
              id="departure-location"
              type="text"
              size="25"
              placeholder='Depature City or Airport'
              onChange={this.updateDepatureLocation}
              style={{'color': 'black', 'fontSize': '18px'}}
            />
            <br/><br/>
            <label for="arrival-location" style={{'marginBottom': '7px'}}>Arrival Location: </label>
            <input
              id="arrival-location"
              type="text"
              size="25"
              placeholder='Arrival City or Airport'
              onChange={this.updateArrivalLocation}
              style={{'color': 'black', 'fontSize': '18px'}}
            />
            <br/>
            <Button
              onClick={() => this.updateCustomerFlights(customerObj.customer_email)}
              className='button'>
                Find My Flights
            </Button>
          </form>
      </div>
      );
    }
      return (
        <h3 style={{'fontSize': '20px', 'marginBottom': '50px'}}>Sorry, you don't have permission to view this page.</h3>
      )
    }
}
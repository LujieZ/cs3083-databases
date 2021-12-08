import React, { Component, useState } from 'react';
import axios from 'axios';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './flight.css';

const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};
const qs = require('querystring');

export default class Rates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prev_flights: [],
      airline_rates: [],
      airline_avg_rating: [],
      flightNum: '',
      airplaneID: '',
      depDate: '',
      depTime: '',
      airlineName: '',
      rate: '',
      comment: '',
    };
  }

  componentDidMount() {
    if (localStorage.getItem('userType') === 'staff') {
      console.log("working")
      const staff = localStorage.getItem('user');
      const staffObj = JSON.parse(staff);
      axios.get(`/airline-rates/${staffObj.airline_name}`).then((res) => {
        console.log(res.data);
        this.setState({
          airline_rates: res.data,
        });
      })
      axios.get(`/airline-avg-rating/${staffObj.airline_name}`).then((res) => {
        console.log(res.data);
        this.setState({
          airline_avg_rating: res.data,
        });
      })
    }
    if (localStorage.getItem('userType') === 'customer') {
      const customer = localStorage.getItem('user');
      const customerObj = JSON.parse(customer);
      axios.get(`/prev-flights/${customerObj.customer_email}`).then((res) => {
        console.log(res.data);
        this.setState({
          prev_flights: res.data,
        });
      })
    }
  }

  updateRate = (e) => {
    this.setState({
        rate: e.target.value,
    });
  }

  updateComment = (e) => {
    this.setState({
        comment: e.target.value,
    });
  }

  updateFlightNum = (e) => {
    this.setState({
      flightNum: e.target.value,
    });
  }

  updateDepartureDate = (e) => {
    this.setState({
      depDate: e.target.value,
    });
  }

  updateDepartureTime = (e) => {
    this.setState({
      depTime: e.target.value,
    });
  }

  updateAirlineName = (e) => {
    this.setState({
      airlineName: e.target.value,
    });
  }

  updateAirplaneID = (e) => {
    this.setState({
      airplaneID: e.target.value,
    });
  }

  addRate() {
    const customer = localStorage.getItem('user');
    const customerObj = JSON.parse(customer);
    const curState = this.state;
    if (curState.flightNum === '' || curState.airplaneID === '' || curState.depDate === '' || 
        curState.depTime === '' || curState.rate === '' || curState.comment === ''
        || curState.airline_name === '') {
      alert('ERROR! Please check your inputs!!');
      return;
    }
    axios.post(`/customer-rates/${customerObj.customer_email}/${curState.flightNum}/${curState.airplaneID}/${curState.depDate}/${curState.depTime}/${curState.airlineName}/${curState.rate}/${curState.comment}`, config).then(() => {
      this.componentDidMount();
    });
  }


  render() {
    const curState = this.state;
    const staff = localStorage.getItem('user');
    const staffObj = JSON.parse(staff);
    if (localStorage.getItem('userType') === 'staff') {
      const airlineRatesTrs = curState.airline_rates.map((rate) => {
        return (
          <tr>
            <td>{rate.flight_num}</td>
            <td>{rate.rating}</td>
            <td>{rate.comment}</td>
          </tr>
        )
      });
      const airlineAvgRatingTrs = curState.airline_avg_rating.map((rate) => {
        return (
          <tr>
            <td>{rate.flight_num}</td>
            <td>{rate.departure_date}</td>
            <td>{rate.departure_time}</td>
            <td>{rate.avg_rating}</td>
          </tr>
        )
      });

      return(
        
        <div style={{'color': '#ffffff', 'marginBottom': '70px'}}>
        <h3 style={{'fontSize': '25px', 'marginBottom': '30px'}}> Ratings for {staffObj.airline_name}</h3>
        <p style={{'fontSize': '20px', 'marginBottom': '15px'}}>Average Rating of Flights</p>
        <table id="flights" style={{'color': '#372c2e', 'marginBottom': '20px', 'margin-left':'auto', 'margin-right':'auto'}}>
                  <tr>
                      <th>Flight Number</th>
                      <th>Departure Date</th>
                      <th>Departure Time</th>
                      <th>Average Rating</th>
                  </tr>
                  <tbody>
                      {airlineAvgRatingTrs}
                    </tbody>
                  </table>
        <p style={{'fontSize': '20px', 'marginBottom': '15px'}}>Detailed Ratings</p>
        <table id="flights" style={{'color': '#372c2e', 'marginBottom': '20px', 'margin-left':'auto', 'margin-right':'auto'}}>
        <tr>
            <th>Flight Number</th>
            <th>Rating</th>
            <th>Comment</th>
        </tr>
        <tbody>
            {airlineRatesTrs}
          </tbody>
        </table>
        </div>
      );
    }
    if (localStorage.getItem('userType') === 'customer') {
      const prevFlightTrs = curState.prev_flights.map((flight) => {
        return (
          <tr>
            <td>{flight.airline_name}</td>
            <td>{flight.flight_num}</td>
            <td>{flight.airplane_id}</td>
            <td>{flight.departure_date}</td>
            <td>{flight.departure_time}</td>
          </tr>
        )
      });
      return(
        <div style={{'color': '#ffffff', 'marginBottom': '70px'}}>
        <h3 style={{'fontSize': '25px', 'marginBottom': '30px'}}>Review Your Previous Flights</h3>
        <table id="flights" style={{'color': '#372c2e', 'marginBottom': '20px', 'margin-left':'auto', 'margin-right':'auto'}}>
                  <tr>
                      <th>Airline Name</th>
                      <th>Flight Number</th>
                      <th>Airplane ID</th>
                      <th>Departure Date</th>
                      <th>Departure Time</th>
                  </tr>
                  <tbody>
                      {prevFlightTrs}
                    </tbody>
                  </table>
        <p style={{'fontSize': '20px', 'marginBottom': '15px'}}>Rate a Flight</p>
        <form>
            <label for="flight-id" style={{'marginBottom': '7px'}}>Flight Number: </label>
            <input
              id="flight-id"
              type="text"
              size="25"
              onChange={this.updateFlightNum}
              style={{'color': 'black', 'fontSize': '18px'}}
            />
            <br/><br/>
            <label for="plane-id" style={{'marginBottom': '7px'}}>Airplane ID: </label>
            <input
              id="plane-id"
              type="text"
              size="25"
              onChange={this.updateAirplaneID}
              style={{'color': 'black', 'fontSize': '18px'}}
            />
            <br/><br/>
            <label for="dep-date" style={{'marginBottom': '7px'}}>Departure Date: </label>
            <input
              id="dep-date"
              type="text"
              size="25"
              placeholder='YYYY-MM-DD'
              onChange={this.updateDepartureDate}
              style={{'color': 'black', 'fontSize': '18px'}}
            />
            <br/><br/>
            <label for="dep-time" style={{'marginBottom': '7px'}}>Departure Time: </label>
            <input
              id="dep-time"
              type="text"
              size="25"
              placeholder='HH:MM'
              onChange={this.updateDepartureTime}
              style={{'color': 'black', 'fontSize': '18px'}}
            />
            <br/><br/>
            <label for="airline-name" style={{'marginBottom': '7px'}}>Airline Name: </label>
            <input
              id="airline-name"
              type="text"
              size="25"
              onChange={this.updateAirlineName}
              style={{'color': 'black', 'fontSize': '18px'}}
            />
            <br/><br/>
            <label for="rating" style={{'marginBottom': '7px'}}>Rating: </label>
            <input
              id="rating"
              type="text"
              size="25"
              placeholder='1-10'
              onChange={this.updateRate}
              style={{'color': 'black', 'fontSize': '18px'}}
            />
            <br/><br/>
            <label for="comment" style={{'marginBottom': '7px'}}>Comment: </label>
            <input
              id="comment"
              type="text"
              size="25"
              onChange={this.updateComment}
              style={{'color': 'black', 'fontSize': '18px'}}
            />
            <br/>
            <Button
              varient='primary'
              onClick={() => this.addRate()}
              className='button'>
                Submit Rating
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
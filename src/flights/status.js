import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import './flight.css';

const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};
const qs = require('querystring');

export default class Status extends Component {
    constructor(props) {
        super(props);
        this.state = {
          flights: [],
          airline: '',
          flightNumber: '',
          departureDate: '',
          arrivalDate: '',
        };
      }
    
    updateAirline = (e) => {
        this.setState({
            airline: e.target.value,
        });
    }

    updateFlightNum = (e) => {
        this.setState({
            flightNumber: e.target.value,
        });
    }

    updateDepartureDate = (e) => {
        this.setState({
            departureDate: e.target.value,
        });
    }

    updateArrivalDate = (e) => {
        this.setState({
            arrivalDate: e.target.value,
        });
    }

    handleSearch = () => {
      const curState = this.state;
      if (curState.airline === '' || curState.flightNumber === '' || curState.departureDate === '' || curState.arrivalDate === '') {
        alert("ERROR! Please check your input again!!");
        return;
      }

      axios.get(`/flight-status/${curState.airline}/${curState.flightNumber}/${curState.departureDate}/${curState.arrivalDate}`).then((res) => {
        console.log(res.data);
        if (res.data.length === 0) {
          alert("ERROR! Cannot find any flight!");
          return;
        }
        this.setState({
          flights: res.data,
        });
      }).catch((err) => {
        alert("There was a problem. Please try again.");
      });
    }

    render() {
      const curState = this.state;
      if (curState.flights.length === 0) {
        return(
          <div style={{'color': '#ffffff'}}>
          <h2 style={{'fontSize': '35px', 'marginBottom': '50px'}}>Flight Status</h2>
          <form>
          <label for="left" style={{'marginBottom': '7px', 'marginRight': '15px', 'fontSize': '20px'}}>Airline Name:</label>
          <input
            id="left"
            type="text"
            size="25"
            placeholder='Airline Name'
            onChange={this.updateAirline}
            style={{'color': 'black', 'fontSize': '20px', 'marginRight': '25px'}}
          />
          <br/><br/><br/>
          <label for="left" style={{'marginBottom': '7px', 'marginRight': '15px', 'fontSize': '20px'}}>Flight Number:</label>
          <input
            id="left"
            type="text"
            size="25"
            placeholder='Flight Number'
            onChange={this.updateFlightNum}
            style={{'color': 'black', 'fontSize': '20px', 'marginRight': '25px'}}
          />
          <br/><br/><br/>
          <label for="left" style={{'marginBottom': '7px', 'marginRight': '15px', 'fontSize': '20px'}}>Departure Date:</label>
          <input
            id="left"
            type="text"
            size="25"
            placeholder='Date of Departure'
            onChange={this.updateDepartureDate}
            style={{'color': 'black', 'fontSize': '20px', 'marginRight': '25px'}}
          />
          <br/><br/><br/>
          <label for="left" style={{'marginBottom': '7px', 'marginRight': '15px', 'fontSize': '20px'}}>Arriving Date:</label>
          <input
            id="left"
            type="text"
            size="25"
            placeholder='Date of Arrival'
            onChange={this.updateArrivalDate}
            style={{'color': 'black', 'fontSize': '20px', 'marginRight': '25px'}}
          />
          <br/><br/>
          </form>
          <Button
            varient='primary'
            onClick={() => this.handleSearch()}
            className='button'>
              Search
            </Button>
          </div>
      )
    }
    const trs = curState.flights.map((flight) => {
      return (
        <tr>
          <td>{flight.flight_num}</td>
          <td>{flight.airline_name}</td>
          <td>{flight.departure_date}</td>
          <td>{flight.arrival_date}</td>
          <td style={{'color': '#de9e48'}}><b>{flight.status}</b></td>
        </tr>
      )
    })
    return (
      <div style={{'color': '#372c2e'}}>
        <h2 style={{'color': '#ffffff', 'fontSize': '35px', 'marginBottom': '50px'}}>Flights Status</h2>
        <table id="flights" style={{'margin-left':'auto', 'margin-right':'auto'}}>
          <tr>
            <th>Flight Number</th>
            <th>Airline Name</th>
            <th>Departure Date</th>
            <th>Arrival Date</th>
            <th>Status</th>
          </tr>
            {trs}
        </table>
    </div>
  );
  }
}

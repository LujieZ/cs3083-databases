import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

export default class Status extends Component {
    constructor(props) {
        super(props);
        this.state = {
          flights: [],
          airline: '',
          flightNumber: '',
          departureDate: '',
          ArrivalDate: '',
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
            ArrivalDate: e.target.value,
        });
    }

    render() {
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
              onClick={this.handleSearch}
              className='button'>
                Search
              </Button>
            </div>
        )
    }
}

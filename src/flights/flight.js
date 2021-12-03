import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};
const qs = require('querystring');

export default class Flight extends Component {
    constructor(props) {
      super(props);
      this.state = {
        flights: [],
        leftLocation: '',
        leftDate: '',
        arrivingLocation: '',
        arrivingDate: '',
        leftLocationOneWay: '',
        leftDateOneWay: '',
        ifLeftAirport: false,
        ifArrivingAirport: false,
      };
    }

    componentDidMount() {
        axios.get('/flights').then((res) => {
            console.log(res.data);
            this.setState({
                flights: res.data,
            });
        });
    }

    updateLeftLocation = (e) => {
        this.setState({
            leftLocation: e.target.value,
        });
    }
  
    updateLeftDate = (e) => {
      this.setState({
          leftDate: e.target.value,
      });
    }
  
    updateLeftLocationOneWay = (e) => {
      this.setState({
          leftLocationOneWay: e.target.value,
      });
    }
  
    updateLeftDateOneWay = (e) => {
      this.setState({
          leftDateOneWay: e.target.value,
      });
    }

    updateArrivingLocation = (e) => {
        this.setState({
            arrivingLocation: e.target.value,
        });
    }
  
    updateArrivingDate = (e) => {
      this.setState({
          arrivingDate: e.target.value,
      });
  }

    updateIfLeftAirport = (e) => {
        this.setState({
            ifLeftAirport: e.target.checked,
        });
    }

    updateIfArrivingAirport = (e) => {
        this.setState({
            ifArrivingAirport: e.target.checked,
        });
    }

    handleRoundTripsSearch = () => {
      const curState = this.state;
      if (curState.leftLocation === '' || curState.leftDate === '' || curState.arrivingDate === '' || curState.arrivingLocation === '') {
        alert("ERROR! Check your input again before search!");
      }
      const obj = {
        departure_date: curState.leftDate,
        departure_location: curState.leftLocation,
        arrival_date: curState.arrivingDate,
        arrival_location: curState.arrival_location,
    }
    if (curState.ifLeftAirport && curState.ifArrivingAirport) {
      
    }
    if (curState.ifLeftAirport && !curState.ifArrivingAirport) {

    }
    if (!curState.ifLeftAirport && curState.ifArrivingAirport) {
      
    }
    }
    
    handleOneWaySearch = () => {
      const curState = this.state;
      if (curState.leftLocation === '' || curState.leftDate === '' || curState.arrivingDate === '' || curState.arrivingLocation === '') {
        alert("ERROR! Check your input again before search!");
      }
      const obj = {
        departure_date: curState.leftDate,
        departure_location: curState.leftLocation,
        arrival_date: curState.arrivingDate,
        arrival_location: curState.arrival_location,
    }
    }

    render() {
        const curState = this.state;
        console.log(curState.flights);
        return(
          <div style={{'color': '#ffffff'}}>
          <h2 style={{'fontSize': '35px', 'marginBottom': '50px'}}>Flights</h2>
          <h3 style={{'fontSize': '25px', 'marginBottom': '30px'}}>Round Trips</h3>
          <form>
          <div style={{'marginBottom': '20px'}}>
            <label for="left" style={{'marginBottom': '7px', 'marginRight': '15px', 'fontSize': '20px'}}><b>Leaving From:</b></label>
            <input
              id="left"
              type="text"
              size="25"
              placeholder='Leaving From'
              onChange={this.updateLeftLocation}
              style={{'color': 'black', 'fontSize': '20px', 'marginRight': '25px'}}
            />
            Search by airport?{' '}
            <input type="checkbox" key="if-left-airport" defaultChecked={false} onChange={this.updateIfLeftAirport} />
            <br/><br/>
            <label for="left" style={{'marginBottom': '7px', 'marginRight': '15px', 'fontSize': '20px'}}><b>Leaving Date:</b></label>
            <input
              id="left"
              type="text"
              size="25"
              placeholder='Date in YYYY-mm-DD'
              onChange={this.updateLeftDate}
              style={{'color': 'black', 'fontSize': '20px', 'marginRight': '25px'}}
            />
            </div>
            <label for="left" style={{'marginBottom': '7px', 'marginRight': '15px', 'fontSize': '20px'}}><b>Going To:</b></label>
            <input
              id="left"
              type="text"
              size="25"
              placeholder='Going To'
              onChange={this.updateArrivingLocation}
              style={{'color': 'black', 'fontSize': '20px', 'marginRight': '25px'}}
            />
            Search by airport?{' '}
            <input type="checkbox" key="if-arriving-airport" defaultChecked={false} onChange={this.updateIfArrivingAirport} />
            <br/><br/>
            <label for="left" style={{'marginBottom': '7px', 'marginRight': '15px', 'fontSize': '20px'}}><b>Arriving Date:</b></label>
            <input
              id="left"
              type="text"
              size="25"
              placeholder='Date in YYYY-mm-DD'
              onChange={this.updateArrivingDate}
              style={{'color': 'black', 'fontSize': '20px', 'marginRight': '25px'}}
            />
            
            </form>
            <Button
              varient='primary'
              onClick={this.handleRoundTripsSearch}
              className='button'>
                Search for Round Trips
            </Button>
            <br/><br/><br/>
            <h3 style={{'fontSize': '25px', 'marginBottom': '30px'}}>One Way</h3>
            <form>
            <div style={{'marginBottom': '10px'}}>
            <label for="left" style={{'marginRight': '15px', 'fontSize': '20px'}}><b>Leaving From:</b></label>
            <input
              id="left"
              type="text"
              size="25"
              placeholder='Leaving From'
              onChange={this.updateLeftLocationOneWay}
              style={{'color': 'black', 'fontSize': '20px', 'marginRight': '25px'}}
            />
            Search by airport?{' '}
            <input type="checkbox" key="if-left-airport" defaultChecked={false} onChange={this.updateIfLeftAirport} />
            <br/><br/>
            <label for="left" style={{'marginBottom': '7px', 'marginRight': '15px', 'fontSize': '20px'}}><b>Leaving Date:</b></label>
            <input
              id="left"
              type="text"
              size="25"
              placeholder='Leaving Date'
              onChange={this.updateLeftDateOneWay}
              style={{'color': 'black', 'fontSize': '20px', 'marginRight': '25px'}}
            />
            </div>
            <Button
              varient='primary'
              onClick={this.handleOneWaySearch}
              className='button'>
                Search for One Way
              </Button>
            </form>
          </div>
        )
    }

}
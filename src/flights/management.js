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

export default class Management extends Component {
    constructor(props) {
        super(props);
        this.state = {
          airplanes: [],
          airports: [],
          newAirplaneId: '',
          newAirplaneNumSeats: '',
          newAirportId: '',
          newAirportName: '',
          newAirportCity: '',
        }
    }

    componentDidMount() {
        if (localStorage.getItem('userType') !== 'staff') {
            return;
        }
        const staff = localStorage.getItem('user');
        const staffObj = JSON.parse(staff);
        axios.get(`/airplanes/${staffObj.airline_name}`).then((res) => {
            console.log(res.data);
            this.setState({
                airplanes: res.data,
            });
        });
        axios.get('/airports').then((res) => {
            console.log(res.data);
            this.setState({
                airports: res.data,
            });
        });
    }

    updateNewAirplaneId = (e) => {
        this.setState({
            newAirplaneId: e.target.value,
        });
    }

    updateNewAirplaneNumSeats = (e) => {
        this.setState({
            newAirplaneNumSeats: e.target.value,
        });
    }

    updateNewAirportId = (e) => {
        this.setState({
            newAirportId: e.target.value,
        });
    }

    updateNewAirportName = (e) => {
        this.setState({
            newAirportName: e.target.value,
        });
    }

    updateNewAirportCity = (e) => {
        this.setState({
            newAirportCity: e.target.value,
        });
    }

    addAirplane = (airline_name) => {
        const curState = this.state;
        if (curState.newAirplaneId === '' || curState.newAirplaneNumSeats === '') {
            console.log('ERROR! Please check your input!!');
        }
        axios.post(`/airplane/${curState.newAirplaneId}/${airline_name}/${curState.newAirplaneNumSeats}`).then(() => {
            window.location.reload(false);
        });
    }

    addAirport = () => {
        const curState = this.state;
        if (curState.newAirportId === '' || curState.newAirportCity === '' || curState.newAirportName === '') {
            console.log('ERROR! Please check your input!!');
        }
        axios.post(`/airports/${curState.newAirportId}/${curState.newAirportCity}/${curState.newAirportName}`).then(() => {
            window.location.reload(false);
        });
    }

    render() {
        if (localStorage.getItem('userType') !== 'staff') {
            return <h3 style={{'color': '#ffffff'}}>Sorry. You have no permission to view the page.</h3>
        }
        const curState = this.state;
        const staff = localStorage.getItem('user');
        const staffObj = JSON.parse(staff);
        const airplaneTrs = curState.airplanes.map((airplane) => {
            return (
              <tr>
                <td>{airplane.airplane_id}</td>
                <td>{airplane.airline_name}</td>
                <td>{airplane.num_seats}</td>
              </tr>
            )
          });
        const airportTrs = curState.airports.map((airport) => {
            return (
              <tr>
                <td>{airport.airport_id}</td>
                <td>{airport.name}</td>
                <td>{airport.city}</td>
              </tr>
            )
        });
        return (
            <div style={{'color': '#ffffff', 'marginBottom': '70px'}}>
            <h3 style={{'fontSize': '25px', 'marginBottom': '50px'}}>Flights Management</h3>
            <h3 style={{'fontSize': '25px', 'marginBottom': '15px'}}>Airplanes Management</h3>
            <table id="flights" style={{'color': '#372c2e', 'marginBottom': '15px', 'margin-left':'auto', 'margin-right':'auto'}}>
                <tr>
                    <th>Airplane ID</th>
                    <th>Airline Name</th>
                    <th>Departure Date</th>
                </tr>
                    {airplaneTrs}
                </table>
                <form>
                <label for="plane-id" style={{'marginBottom': '7px'}}>Airplane ID: </label>
            <input
              id="plane-id"
              type="text"
              size="25"
              placeholder='New Airplane ID'
              onChange={this.updateNewAirplaneId}
              style={{'color': 'black', 'fontSize': '18px'}}
            />
            <br/><br/>
            <label for="num-seats" style={{'marginBottom': '7px'}}>Number of Seats: </label>
            <input
              id="num-seats"
              type="text"
              size="25"
              placeholder='Number of Seats'
              onChange={this.updateNewAirplaneNumSeats}
              style={{'color': 'black', 'fontSize': '18px'}}
            />
            <br/>
            <Button
              varient='primary'
              onClick={() => this.addAirplane(staffObj.airline_name)}
              className='button'>
                Add an Airplane
              </Button>
            </form>
            <h3 style={{'fontSize': '25px', 'marginBottom': '15px'}}>Airports Management</h3>
            <table id="flights" style={{'color': '#372c2e', 'marginBottom': '15px', 'margin-left':'auto', 'margin-right':'auto'}}>
                <tr>
                    <th>Airport ID</th>
                    <th>Airport Name</th>
                    <th>Airport City</th>
                </tr>
                    {airportTrs}
                </table>
                <form>
            <label for="airport-id" style={{'marginBottom': '7px'}}>Airport ID: </label>
            <input
              id="airport-id"
              type="text"
              size="25"
              placeholder='New Airport ID'
              onChange={this.updateNewAirportId}
              style={{'color': 'black', 'fontSize': '18px'}}
            />
            <br/><br/>
            <label for="airport-name" style={{'marginBottom': '7px'}}>Airport Name: </label>
            <input
              id="airport-name"
              type="text"
              size="25"
              placeholder='New Airport Name'
              onChange={this.updateNewAirportName}
              style={{'color': 'black', 'fontSize': '18px'}}
            />
            <br/><br/>
            <label for="airport-city" style={{'marginBottom': '7px'}}>Airport City: </label>
            <input
              id="airport-city"
              type="text"
              size="25"
              placeholder='New Airport City'
              onChange={this.updateNewAirportCity}
              style={{'color': 'black', 'fontSize': '18px'}}
            />
            <br/>
            <Button
              varient='primary'
              onClick={() => this.addAirport()}
              className='button'>
                Add an Airport
              </Button>
            </form>
            </div>
        )
    }
}
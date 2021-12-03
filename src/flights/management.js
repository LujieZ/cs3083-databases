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
          flights: [],
          airplanes: [],
          airports: [],
          newFlightNumber: '',
          newFlightAirplane: '',
          newFlightDepartureDate: '',
          newFlightDepartureTime: '',
          newFlightDepartureAirport: '',
          newFlightArrivalDate: '',
          newFlightArrivalTime: '',
          newFlightArrivalAirport: '',
          newFlightBasePrice: '',
          updateFlightNum: '',
          updateFlightDepatureDate: '',
          updateFlightDepatureTime: '',
          updateStatus: '',
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
        axios.get(`/flights-30/${staffObj.airline_name}`).then((res) => {
          console.log(res.data);
          this.setState({
              flights: res.data,
          });
        });
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
    updateNewFlightNumber = (e) => {
        this.setState({
            newFlightNumber: e.target.value,
        });
    }

    updateNewFlightAirplane = (e) => {
        this.setState({
            newFlightAirplane: e.target.value,
        })
    }

    updateNewFlightDepartureAirport = (e) => {
        this.setState({
            newFlightDepartureAirport: e.target.value,
        });
    }

    updateNewFlightDepartureDate = (e) => {
        this.setState({
            newFlightDepartureDate: e.target.value,
        });
    }

    updateNewFlightDepartureTime = (e) => {
        this.setState({
            newFlightDepartureTime: e.target.value,
        });
    }

    updateNewFlightArrivalAirport = (e) => {
        this.setState({
            newFlightArrivalAirport: e.target.value,
        });
    }

    updateNewFlightArrivalDate = (e) => {
        this.setState({
            newFlightArrivalDate: e.target.value,
        });
    }

    updateNewFlightArrivalTime = (e) => {
        this.setState({
            newFlightArrivalTime: e.target.value,
        });
    }

    updateNewBasePrice = (e) => {
        this.setState({
            newFlightBasePrice: e.target.value,
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

    changeFlightNum = (e) => {
      this.setState({
        updateFlightNum: e.target.value,
      });
    }
  
    changeFlightStatus = (e) => {
      this.setState({
        updateStatus: e.target.value,
      });
    } 

    changeFlightDepatureDate = (e) => {
      this.setState({
        updateFlightDepatureDate: e.target.value,
      });
    }
  
    changeFlightDepatureTime = (e) => {
      this.setState({
        updateFlightDepatureTime: e.target.value,
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

    addNewFlight = (staff_airline_name) => {
        const curState = this.state;
        if (curState.newFlightAirplane === '' || curState.newFlightBasePrice === '' || curState.newFlightDepartureAirport === '' || curState.newFlightDepartureDate === ''
        || curState.newFlightArrivalAirport === '' || curState.newFlightArrivalDate === '' || curState.newFlightArrivalTime === '' || curState.newFlightNumber === ''
        || curState.newFlightDepartureTime === '') {
            console.log('ERROR! Please check your inputs!!');
            return;
        }
        const flight = {
            flight_number: curState.newFlightNumber,
            airline_name: staff_airline_name,
            airplane_id: curState.newFlightAirplane,
            departure_date: curState.newFlightDepartureDate,
            departure_time: curState.newFlightDepartureTime,
            departure_airport: curState.newFlightDepartureAirport,
            arrival_date: curState.newFlightArrivalDate,
            arrival_time: curState.newFlightArrivalTime,
            arrival_airport: curState.newFlightArrivalAirport,
            base_price: curState.newFlightBasePrice,
        }
        axios.post('/flight', qs.stringify(flight), config).then(() => {
          this.componentDidMount();
        });
    }

    updateFlightStatus = () => {
      const curState = this.state;
      if (curState.updateFlightNum === '' || curState.updateFlightDepatureDate === '' || curState.updateFlightDepatureTime === '' || curState.updateStatus === '') {
        console.log('ERROR! Please check your inputs!!');
        return;
      }
      axios.put(`/flight-status/${curState.updateFlightNum}/${curState.updateFlightDepatureDate}/${curState.updateFlightDepatureTime}/${curState.updateStatus}`).then(() => {
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
        const flightTrs = curState.flights.map((flight) => {
          return (
            <tr>
            <td>{flight.flight_num}</td>
            <td>{flight.airline_name}</td>
            <td>{flight.airplane_id}</td>
            <td>{flight.departure_date} {flight.departure_time}</td>
            <td>{flight.arrival_date} {flight.arrival_time}</td>
            <td>{flight.base_price}</td>
            <td>{flight.status}</td>
          </tr>
          )
        })
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
            <p style={{'fontSize': '20px', 'marginBottom': '15px'}}>Add a Flight</p>
            <table id="flights" style={{'color': '#372c2e', 'marginBottom': '15px', 'margin-left':'auto', 'margin-right':'auto'}}>
                <tr>
                    <th>Flight Number</th>
                    <th>Airline Name</th>
                    <th>Airplane ID</th>
                    <th>Departure</th>
                    <th>Arrival</th>
                    <th>Base Price</th>
                    <th>Status</th>
                </tr>
                    {flightTrs}
            </table>
            <form>
            <label for="flight-id" style={{'marginBottom': '7px'}}>Flight Number: </label>
            <input
              id="flight-id"
              type="text"
              size="25"
              placeholder='New Flight Number'
              onChange={this.updateNewFlightNumber}
              style={{'color': 'black', 'fontSize': '18px'}}
            />
            <br/><br/>
            <label for="plane-id" style={{'marginBottom': '7px'}}>Airplane ID: </label>
            <input
              id="plane-id"
              type="text"
              size="25"
              placeholder='Airplane ID'
              onChange={this.updateNewFlightAirplane}
              style={{'color': 'black', 'fontSize': '18px'}}
            />
            <br/><br/>
            <label for="departure-date" style={{'marginBottom': '7px'}}>Departure Date: </label>
            <input
              id="departure-date"
              type="text"
              size="25"
              placeholder='Depature Date'
              onChange={this.updateNewFlightDepartureDate}
              style={{'color': 'black', 'fontSize': '18px'}}
            />
            <br/><br/>
            <label for="plane-id" style={{'marginBottom': '7px'}}>Departure Time: </label>
            <input
              id="plane-id"
              type="text"
              size="25"
              placeholder='Departure Time'
              onChange={this.updateNewFlightDepartureTime}
              style={{'color': 'black', 'fontSize': '18px'}}
            />
            <br/><br/>
            <label for="plane-id" style={{'marginBottom': '7px'}}>Departure Airport: </label>
            <input
              id="plane-id"
              type="text"
              size="25"
              placeholder='Departure Airport'
              onChange={this.updateNewFlightDepartureAirport}
              style={{'color': 'black', 'fontSize': '18px'}}
            />
            <br/><br/>
            <label for="num-seats" style={{'marginBottom': '7px'}}>Arrival Date: </label>
            <input
              id="num-seats"
              type="text"
              size="25"
              placeholder='Arrival Date'
              onChange={this.updateNewFlightArrivalDate}
              style={{'color': 'black', 'fontSize': '18px'}}
            />
            <br/><br/>
            <label for="plane-id" style={{'marginBottom': '7px'}}>Arrival Time: </label>
            <input
              id="plane-id"
              type="text"
              size="25"
              placeholder='Arrival Time'
              onChange={this.updateNewFlightArrivalTime}
              style={{'color': 'black', 'fontSize': '18px'}}
            />
            <br/><br/>
            <label for="plane-id" style={{'marginBottom': '7px'}}>Arrival Airport: </label>
            <input
              id="plane-id"
              type="text"
              size="25"
              placeholder='Arrival Airport'
              onChange={this.updateNewFlightArrivalAirport}
              style={{'color': 'black', 'fontSize': '18px'}}
            />
            <br/><br/>
            <label for="plane-id" style={{'marginBottom': '7px'}}>Base Price: </label>
            <input
              id="plane-id"
              type="text"
              size="25"
              placeholder='Base Price'
              onChange={this.updateNewBasePrice}
              style={{'color': 'black', 'fontSize': '18px'}}
            />
            <br/>
            <Button
              varient='primary'
              onClick={() => this.addNewFlight(staffObj.airline_name)}
              className='button'>
                Add a Flight
              </Button>
            </form>
            <p style={{'fontSize': '20px', 'marginBottom': '15px'}}>Update Flight Status</p>
            <form>
            <label for="flight-id" style={{'marginBottom': '7px'}}>Flight Number: </label>
            <input
              id="flight-id"
              type="text"
              size="25"
              placeholder='Flight Number'
              onChange={this.changeFlightNum}
              style={{'color': 'black', 'fontSize': '18px'}}
            />
            <br/><br/>
            <label for="departure-date" style={{'marginBottom': '7px'}}>Depature Date: </label>
            <input
              id="departure-date"
              type="text"
              size="25"
              placeholder='Depature Date'
              onChange={this.changeFlightDepatureDate}
              style={{'color': 'black', 'fontSize': '18px'}}
            />
            <br/><br/>
            <label for="depature-time" style={{'marginBottom': '7px'}}>Departure Time: </label>
            <input
              id="departure-time"
              type="text"
              size="25"
              placeholder='Departure Time'
              onChange={this.changeFlightDepatureTime}
              style={{'color': 'black', 'fontSize': '18px'}}
            />
            <br/><br/>
            <label for="status" style={{'marginBottom': '7px'}}>New Status: </label>
            <input
              id="status"
              type="text"
              size="25"
              placeholder='New Status'
              onChange={this.changeFlightStatus}
              style={{'color': 'black', 'fontSize': '18px'}}
            />
            <br/>
            <Button
              varient='primary'
              onClick={() => this.updateFlightStatus()}
              className='button'>
                Add a Flight
              </Button>
            </form>
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
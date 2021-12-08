import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import './flight.css';

export default class Flight extends Component {
    constructor(props) {
      super(props);
      this.state = {
        flights: [],
        leaving_flights: [],
        returning_flights: [],
        leftLocation: '',
        leftDate: '',
        arrivingLocation: '',
        arrivingDate: '',
        leftLocationOneWay: '',
        leftDateOneWay: '',
        arrivingLocationOneWay: '',
      };
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
  
    updateArrivingLocationOneWay = (e) => {
      this.setState({
        arrivingLocationOneWay: e.target.value,
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

    handleRoundTripsSearch = () => {
      const curState = this.state;
      if (curState.leftLocation === '' || curState.leftDate === '' || curState.arrivingDate === '' || curState.arrivingLocation === '') {
        alert("ERROR! Check your input again before search!");
      }
      axios.get(`/flights-searched/${curState.leftLocation}/${curState.leftDate}/${curState.arrivingLocation}`).then((res) => {
        console.log(res.data);
        if (res.data.length === 0) {
          alert("Cannot find any leaving flight!!");
        }
        this.setState({
          leaving_flights: res.data,
        });
        axios.get(`/flights-searched/${curState.arrivingLocation}/${curState.arrivingDate}/${curState.leftLocation}`).then((res) => {
          console.log(res.data);
          if (res.data.length === 0) {
            alert("Cannot find any returning flight!!");
          }
          this.setState({
            returning_flights: res.data,
          });
        })
      })
    }
    
    handleOneWaySearch = () => {
      const curState = this.state;
      if (curState.leftLocationOneWay === '' || curState.leftDateOneWay === '') {
        alert("ERROR! Check your input again before search!");
      }
      axios.get(`/flights-searched/${curState.leftLocationOneWay}/${curState.leftDateOneWay}/${curState.arrivingLocationOneWay}`).then((res) => {
        console.log(res.data);
        if (res.data.length === 0) {
          alert("Cannot find any flight!!");
        }
        this.setState({
          flights: res.data,
        });
      })
    }
  
    handlePurchase = (flight) => {
      localStorage.setItem('flight', JSON.stringify(flight));
      const newflight = localStorage.getItem('flight');
      const flightObj = JSON.parse(newflight);
      console.log(flightObj);
      window.location = '/purchase';
    }

    render() {
        const curState = this.state;
        if (curState.flights.length === 0 && curState.leaving_flights.length === 0 && curState.returning_flights.length === 0) {
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
              <br/><br/>
              <label for="left" style={{'marginBottom': '7px', 'marginRight': '15px', 'fontSize': '20px'}}><b>Returning Date:</b></label>
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
              <br/><br/>
              <label for="left" style={{'marginBottom': '7px', 'marginRight': '15px', 'fontSize': '20px'}}><b>Leaving Date:</b></label>
              <input
                id="left"
                type="text"
                size="25"
                placeholder='Date in YYYY-mm-DD'
                onChange={this.updateLeftDateOneWay}
                style={{'color': 'black', 'fontSize': '20px', 'marginRight': '25px'}}
              />
              <br/><br/>
              <label for="arriving" style={{'marginBottom': '7px', 'marginRight': '15px', 'fontSize': '20px'}}><b>Going To:</b></label>
              <input
                id="arriving"
                type="text"
                size="25"
                placeholder='Going To'
                onChange={this.updateArrivingLocationOneWay}
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
      if (curState.leaving_flights.length > 0 || curState.returning_flights.length > 0) {
        const leavingFlightTrs = curState.leaving_flights.map((flight) => {
          return (
            <tr>
            <td>{flight.flight_num}</td>
            <td>{flight.airline_name}</td>
            <td>{flight.departure_date} {flight.departure_time} From {flight.depart_city}</td>
            <td>{flight.arrival_date} {flight.arrival_time} At {flight.arrival_city}</td>
            <td>{flight.base_price}</td>
            <td>{flight.status}</td>
            <td>
              <Button onClick={() => this.handlePurchase(flight)}>
                Purchase
              </Button>
            </td>
          </tr>
          )
        })
        const returningFlightTrs = curState.returning_flights.map((flight) => {
          return (
            <tr>
            <td>{flight.flight_num}</td>
            <td>{flight.airline_name}</td>
            <td>{flight.departure_date} {flight.departure_time} From {flight.depart_city}</td>
            <td>{flight.arrival_date} {flight.arrival_time} At {flight.arrival_city}</td>
            <td>{flight.base_price}</td>
            <td>{flight.status}</td>
            <td>
              <Button onClick={() => this.handlePurchase(flight)}>
                  Purchase
              </Button>
            </td>
          </tr>
          )
        })
      return (
        <div style={{'color': '#ffffff'}}>
          <h2 style={{'fontSize': '35px', 'marginBottom': '50px'}}>Flights</h2>
          <h3 style={{'fontSize': '25px', 'marginBottom': '50px'}}>Leaving flights</h3>
          <table id="flights" style={{'color': '#372c2e', 'marginBottom': '15px', 'margin-left':'auto', 'margin-right':'auto'}}>
                <tr>
                    <th>Flight Number</th>
                    <th>Airline Name</th>
                    <th>Departure</th>
                    <th>Arrival</th>
                    <th>Base Price</th>
                    <th>Status</th>
                    <th>Passengers</th>
                </tr>
                    {leavingFlightTrs}
            </table>
            <h3 style={{'fontSize': '25px', 'marginBottom': '50px'}}>Returning flights</h3>
          <table id="flights" style={{'color': '#372c2e', 'marginBottom': '15px', 'margin-left':'auto', 'margin-right':'auto'}}>
                <tr>
                    <th>Flight Number</th>
                    <th>Airline Name</th>
                    <th>Departure</th>
                    <th>Arrival</th>
                    <th>Base Price</th>
                    <th>Status</th>
                    <th>Passengers</th>
                </tr>
                    {returningFlightTrs}
            </table>
        </div>
      )
      }
      const flightTrs = curState.flights.map((flight) => {
          return (
            <tr>
            <td>{flight.flight_num}</td>
            <td>{flight.airline_name}</td>
            <td>{flight.departure_date} {flight.departure_time} From {flight.depart_city}</td>
            <td>{flight.arrival_date} {flight.arrival_time} At {flight.arrival_city}</td>
            <td>{flight.base_price}</td>
            <td>{flight.status}</td>
            <td>
              <Link onClick={() => this.handlePurchase(flight)}>
                <Button>Purchase</Button>
              </Link>
            </td>
          </tr>
          )
        })
      return (
        <div style={{'color': '#ffffff'}}>
          <h2 style={{'fontSize': '35px', 'marginBottom': '50px'}}>Flights</h2>
          <table id="flights" style={{'color': '#372c2e', 'marginBottom': '15px', 'margin-left':'auto', 'margin-right':'auto'}}>
                <tr>
                    <th>Flight Number</th>
                    <th>Airline Name</th>
                    <th>Departure</th>
                    <th>Arrival</th>
                    <th>Base Price</th>
                    <th>Status</th>
                    <th>Passengers</th>
                </tr>
                    {flightTrs}
            </table>
        </div>
      )
    }

}
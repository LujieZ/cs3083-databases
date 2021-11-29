import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

export default class Flight extends Component {
    constructor(props) {
      super(props);
      this.state = {
        flights: [],
        leftLocation: '',
        arrivingLocation: '',
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

    updateArrivingLocation = (e) => {
        this.setState({
            arrivingLocation: e.target.value,
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

    render() {
        const curState = this.state;
        console.log(curState.flights);
        return(
          <div style={{'color': '#ffffff'}}>
          <h2 style={{'fontSize': '35px', 'marginBottom': '50px'}}>Flights</h2>
          <form>
          <div style={{'marginBottom': '40px'}}>
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
            <br/>
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
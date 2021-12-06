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

export default class Airline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frequent_customers: [],
      customer_email: '',
      customer_flights: [],
      lastmonth_revenue: '',
      lastyear_revenue: '',
    };
  }

  componentDidMount() {
      const staff = localStorage.getItem('user');
      const staffObj = JSON.parse(staff);
      axios.get('/customer-most-frequent').then((res) => {
          console.log(res.data);
          let objects = res.data.map((obj) => {
            return obj.customer_email;
          })
          this.setState({
              frequent_customers: objects,
          });
      });
      axios.get(`/revenue-month/${staffObj.airline_name}`).then((res) => {
          console.log(res.data);
          this.setState({
              lastmonth_revenue: res.data[0].Revenue,
          });
      });
      axios.get(`/revenue-year/${staffObj.airline_name}`).then((res) => {
        console.log(res.data);
        this.setState({
            lastyear_revenue: res.data[0].Revenue,
        });
      });
  }

  updateCustomerEmail = (e) => {
    this.setState({
        customer_email: e.target.value,
    });
  }

  updateCustomerFlights = (airline_name) => {
      const curState = this.state;
      axios.get(`/flights/${airline_name}/${curState.customer_email}`).then((res) => {
          console.log(res.data);
          this.setState({
              customer_flights: res.data,
          });
      })
  }

  render() {
    const curState = this.state;
    if (localStorage.getItem('userType') !== 'staff') {
        return(
          <div style={{'color': '#ffffff'}}>
            <h3 style={{'fontSize': '20px', 'marginBottom': '50px'}}>Sorry, you don't have permission to view this page.</h3>
        </div>
        )
    }
    const staff = localStorage.getItem('user');
    const staffObj = JSON.parse(staff);
    const listItems = curState.frequent_customers.map((customer) => {
      return <li><b>{customer}</b></li>
    });
    const flightItem = curState.customer_flights.map((flight) => {
        return <p><b>Flight Number: </b>{flight.flight_num}; {' '}
                  <b>Departure Time: </b>{flight.departure_date} {flight.departure_time}; {' '}
                  <b>Customer Email: </b>{flight.customer_email}; {' '}
                </p>
    });
    const lastMonthRev = curState.lastmonth_revenue === null ? 0 : curState.lastmonth_revenue;
    const lastYearRev = curState.lastyear_revenue === null ? 0 : curState.lastyear_revenue;
    return (
        <div style={{'color': '#ffffff'}}>
            <h3 style={{'fontSize': '25px', 'marginBottom': '5px'}}>Customer Information for {staffObj.airline_name}</h3>
            <p style={{'fontSize': '20px', 'marginBottom': '15px'}}>Most Frequent Customers: </p>
              {listItems}
            <p style={{'fontSize': '20px', 'marginBottom': '15px'}}>Frequent Customers: </p>
            <p style={{'fontSize': '20px', 'marginBottom': '15px'}}>Search Flights for Customer: </p>
              {flightItem}
            <form>
            <label for="customer-email" style={{'marginBottom': '7px'}}>Customer Email: </label>
            <input
              id="customer-email"
              type="text"
              size="25"
              placeholder='Email of the Customer'
              onChange={this.updateCustomerEmail}
              style={{'color': 'black', 'fontSize': '18px'}}
            />
            <br/>
            <Button
              onClick={() => this.updateCustomerFlights(staffObj.airline_name)}
              className='button'>
                Find Flights for Customer
            </Button>
            </form>
            <h3 style={{'fontSize': '25px', 'marginBottom': '5px'}}>Revenue Information for {staffObj.airline_name}</h3>
            <p style={{'fontSize': '20px', 'marginBottom': '15px'}}>Last Month Revenue: <b>${lastMonthRev}</b></p>
            <p style={{'fontSize': '20px', 'marginBottom': '15px'}}>Last Year Revenue: <b>${lastYearRev}</b></p>
        </div>
    );
  }
}
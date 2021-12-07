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
      startDate: '|',
      endDate: '|',
      topDstMonths: [],
      topDstYear: [],
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
      axios.get(`/year-tix/${staffObj.airline_name}`).then((res) => {
        console.log(res.data);
        this.setState({
            lastYearTix: res.data[0].tix,
        });
      });
      axios.get(`/month-tix/${staffObj.airline_name}`).then((res) => {
        console.log(res.data);
        this.setState({
            lastMonthTix: res.data[0].tix,
        });
      });
      axios.get(`/destination-3month/${staffObj.airline_name}`).then((res) => {
        console.log(res.data);
        this.setState({
            topDstMonths: res.data,
        });
        console.log(this.state.topDstMonths)
      });
      axios.get(`/destination-year/${staffObj.airline_name}`).then((res) => {
        console.log(res.data);
        this.setState({
            topDstYear: res.data,
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

  updateStartRange = (e) => {
    this.setState({
      startDate: e.target.value,
    });
  }

  updateEndRange = (e) => {
    this.setState({
      endDate: e.target.value,
    });
  }

  adjustDateRange(){
    const curState = this.state;
    const staff = localStorage.getItem('user');
    const staffObj = JSON.parse(staff);
    axios.get(`/range-tix/${curState.startDate}/${curState.endDate}/${staffObj.airline_name}`).then((res) => {
        console.log(res.data);
        this.setState({
            rangeTix: res.data[0].tix,
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
    const dstMonths = curState.topDstMonths.map((dst) => {
      return (
        <tr>
          <td>{dst.destination}</td>
          <td>{dst.total_tickets_booked}</td>
        </tr>
      )
    });

    const dstYears = curState.topDstYear.map((dst) => {
      return (
        <tr>
          <td>{dst.destination}</td>
          <td>{dst.total_tickets_booked}</td>
        </tr>
      )
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
            <h3 style={{'fontSize': '25px', 'marginBottom': '5px'}}>Top 3 Destinations for {staffObj.airline_name}</h3>
            <table style={{'color': '#372c2e', 'marginBottom': '20px', 'margin-left':'auto', 'margin-right':'auto'}}>
                  <tr>
                      <th>Past 3 Months</th>
                  </tr>
                  <tbody>
                      {dstMonths}
                    </tbody>
                  </table>
            <table style={{'color': '#372c2e', 'marginBottom': '20px', 'margin-left':'auto', 'margin-right':'auto'}}>
                  <tr>
                      <th>Past Year</th>
                  </tr>
                  <tbody>
                      {dstYears}
                    </tbody>
                  </table>
            <h3 style={{'fontSize': '25px', 'marginBottom': '5px'}}>Revenue Information for {staffObj.airline_name}</h3>
            <p style={{'fontSize': '20px', 'marginBottom': '15px'}}>Past Month: <b>${lastMonthRev}</b></p>
            <p style={{'fontSize': '20px', 'marginBottom': '15px'}}>Past Year: <b>${lastYearRev}</b></p>
            <h3 style={{'fontSize': '25px', 'marginBottom': '5px'}}>Ticket Sales for {staffObj.airline_name}</h3>
            <p style={{'fontSize': '20px', 'marginBottom': '15px'}}>Past Month: <b>{curState.lastMonthTix}</b></p>
            <p style={{'fontSize': '20px', 'marginBottom': '15px'}}>Past Year: <b>{curState.lastYearTix}</b></p>
            <p style={{'fontSize': '20px', 'marginBottom': '20px'}}><b>{curState.rangeTix}</b> Tickets Sold Between {curState.startDate} and {curState.endDate}</p>
            <p style={{'fontSize': '15px', 'marginBottom': '15px'}}>Custom Range:</p>
            <form>
                <label style={{'marginBottom': '7px'}}>From: </label>
                <input
                type="text"
                placeholder="YYYY-MM-DD"
                size="25"
                onChange={this.updateStartRange}
                style={{'color': 'black', 'fontSize': '18px'}}
                />
                <br/><br/>
                <label style={{'marginBottom': '7px'}}>To: </label>
                <input
                type="text"
                placeholder="YYYY-MM-DD"
                size="25"
                onChange={this.updateEndRange}
                style={{'color': 'black', 'fontSize': '18px'}}
                />
                <br/><br/>
                <Button
                    variant='primary'
                    onClick={() => this.adjustDateRange()}
                    className='button'>
                        Adjust Date Range
                    </Button>
              </form>
            
        </div>
    );
  }
}
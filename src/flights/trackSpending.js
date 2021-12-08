import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './flight.css';

const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};
const qs = require('querystring');

export default class TrackSpending extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staff_flights: [],
      customer_flights: [],
      yearSpending: [],
      spending: [],
      startDate: '',
      endDate: '',
      displayDuration: 6,
    };
  }

  componentDidMount() {
    if (localStorage.getItem('userType') === 'customer') {
      const customer = localStorage.getItem('user');
      const customerObj = JSON.parse(customer);
      axios.get(`/year-spending/${customerObj.customer_email}`).then((res) => {
        console.log(res.data);
        this.setState({
            yearSpending: res.data
        });
      })
      axios.get(`/6-month-spending/${customerObj.customer_email}`).then((res) => {
        console.log(res.data);
        this.setState({
            spending: res.data
        });
      })
    }
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

  updateDisplayDuration() {
    const curState = this.state;
    const date1 = new Date(curState.startDate);
    const date2 = new Date(curState.endDate);
    const diffDays = Math.floor(Math.ceil((Math.abs(date2 - date1)) / (1000 * 60 * 60 * 24)) / 30);
    this.setState({
      displayDuration: diffDays
    });
  }

  adjustDateRange(){
    const curState = this.state;
    this.updateDisplayDuration();
    const customer = localStorage.getItem('user');
    const customerObj = JSON.parse(customer);
    curState.spending = [];
    if (curState.startDate === '' || curState.endDate === '') {
      alert('ERROR! Please check your inputs!!');
      return;
    }
    axios.get(`/range-spending/${curState.startDate}/${curState.endDate}/${customerObj.customer_email}`).then((res) => {
        console.log(res.data);
        this.setState({
            spending: res.data,
        });
    })
  }

  render() {
    const curState = this.state;
    if (localStorage.getItem('userType') === 'customer') {
        const yearTrs = curState.yearSpending.map((year) => {
            return (
              <tr>
                <td>{year.total_sold_price}</td>
              </tr>
            )
          });
        const monthlyTrs = curState.spending.map((month) => {
            return (
              <tr>
                <td>{month.year}</td>
                <td>{month.month}</td>
                <td>{month.sold_price}</td>
              </tr>
            )
          });
        return(
        <div style={{'color': '#ffffff', 'marginBottom': '70px'}}>
            <h3 style={{'fontSize': '25px', 'marginBottom': '30px'}}> Track My Spending </h3>
            <table id="flights" style={{'color': '#372c2e', 'marginBottom': '20px', 'margin-left':'auto', 'margin-right':'auto'}}>
                  <tr>
                      <th>Annual Spending</th>
                  </tr>
                  <tbody>
                      {yearTrs}
                    </tbody>
                  </table>
            <p style={{'fontSize': '18px', 'marginBottom': '15px'}}> Spending History for {curState.displayDuration} Months</p>
            <table id="flights" style={{'color': '#372c2e', 'marginBottom': '20px', 'margin-left':'auto', 'margin-right':'auto'}}>
                  <tr>
                      <th>Year</th>
                      <th>Month</th>
                      <th>Spending</th>
                  </tr>
                  <tbody>
                      {monthlyTrs}
                    </tbody>
                  </table>
            <p style={{'fontSize': '18px', 'marginBottom': '15px'}}>Adjust Date Range to Display:</p>
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
    return (
    <h3 style={{'fontSize': '20px', 'marginBottom': '50px'}}>Sorry, you don't have permission to view this page.</h3>
    )
    }
}
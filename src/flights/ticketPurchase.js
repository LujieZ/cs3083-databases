import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useLocation } from 'react-router';

const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};
const qs = require('querystring');

export default class TicketPurchase extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email: '',
        airlineName: '',
        flightNum: '',
        soldPrice: '',
        cardType: '',
        cardNum: '',
        cardName: '',
        cardExpDate: '',
        purchaseDate: '',
        purchaseTime: '',
        ticketId: 0,
      };
    }

    componentDidMount() {
      const flight = localStorage.getItem('flight');
      if (flight == null) {
        return;
      }
      const flightObj = JSON.parse(flight);
      axios.get(`/airplanes/${flightObj.airline_name}`).then((res) => {
        console.log('Airplanes: ', res.data);
        const target = res.data.find((obj) => obj.airplane_id === flightObj.airplane_id);
        console.log('Total number of seats on current flight: ', target.num_seats);
        const sold_price = flightObj.num_of_tickets_booked < 0.75 * target.num_seats ? flightObj.base_price : flightObj.base_price * 1.25;
        console.log('Projected sold prict: ', sold_price);
        this.setState({
          soldPrice: sold_price,
        });
      })
      axios.get('/max-ticket-id').then((res) => {
        console.log('Max ticket id: ', res.data[0].max_ticket_id);
        this.setState({
          ticketId: res.data[0].max_ticket_id + 1,
        });
      });
    }

    updateCardType = (e) => {
        this.setState({
            cardType: e.target.value,
        });
    }

    updateCardNum = (e) => {
        this.setState({
            cardNum: e.target.value,
        });
    }

    updateCardName = (e) => {
        this.setState({
            cardName: e.target.value,
        });
    }

    updateExpDate = (e) => {
        this.setState({
            cardExpDate: e.target.value,
        });
    }

    handleSubmitPurchase = () => {
      const curState = this.state;
      if (curState.cardType === '' || curState.cardNum === '' || curState.cardName === '' || curState.cardExpDate === '') {
        alert("ERROR! Please check your inputs!!");
      }
      const flight = localStorage.getItem('flight');
      const flightObj = JSON.parse(flight);
      const customer = localStorage.getItem('user');
      const customerObj = JSON.parse(customer);
      axios.post(`/ticket/${curState.ticketId}/${customerObj.customer_email}/${flightObj.airline_name}/${flightObj.flight_num}/${flightObj.departure_date}/${flightObj.departure_time}`).then((res1) => {
        console.log(res1.data);
        axios.post(`/ticket-purchase/${curState.ticketId}/${customerObj.customer_email}/${curState.soldPrice}/${curState.cardType}/${curState.cardNum}/${curState.cardName}/${curState.cardExpDate}`).then((res2) => {
          console.log(res2.data);
          axios.put(`/flight-tickets/${flightObj.flight_num}/${flightObj.airline_name}/${flightObj.departure_date}/${flightObj.departure_time}`).then((res3) => {
            console.log(res3.data);
            localStorage.removeItem('flight');
          })
        })
      })
    }

    render() {
      const flight = localStorage.getItem('flight');
      const flightObj = JSON.parse(flight);
      console.log(flightObj);
      const loggedInUser = localStorage.getItem('userType');
      if (loggedInUser !== 'customer')
        {
        return (
          <h2 style={{'color': '#ffffff', 'fontSize': '30px', 'marginBottom': '50px'}}>
            Sorry, you need to log in before doing a purchase.
          </h2>
        );
      }
      if (flightObj === null)
      {
      return (
        <h2 style={{'color': '#ffffff', 'fontSize': '20px', 'marginBottom': '50px'}}>
          Please go to home page and do a flight search before doing a purchase.
        </h2>
      );
      }
      return(
          <div style={{'color': '#ffffff'}}>
          <h2 style={{'fontSize': '35px', 'marginBottom': '50px'}}>Purchase a Ticket</h2>
          <form>
            <label for="left" style={{'marginBottom': '7px', 'marginRight': '15px', 'fontSize': '20px'}}><b>Card Type: </b></label>
            <input
              id="left"
              type="text"
              size="25"
              placeholder='...'
              onChange={this.updateCardType}
              style={{'color': 'black', 'fontSize': '20px', 'marginRight': '25px'}}
            />
            <br/><br/>
            <label for="left" style={{'marginBottom': '7px', 'marginRight': '15px', 'fontSize': '20px'}}><b>Card Number: </b></label>
            <input
              id="left"
              type="text"
              size="25"
              placeholder='####-####-####-####'
              onChange={this.updateCardNum}
              style={{'color': 'black', 'fontSize': '20px', 'marginRight': '25px'}}
            />
            <br/><br/>
            <label for="left" style={{'marginBottom': '7px', 'marginRight': '15px', 'fontSize': '20px'}}><b>Name on Card: </b></label>
            <input
              id="left"
              type="text"
              size="25"
              placeholder='...'
              onChange={this.updateCardName}
              style={{'color': 'black', 'fontSize': '20px', 'marginRight': '25px'}}
            />
            <br/><br/>
            <label for="left" style={{'marginBottom': '7px', 'marginRight': '15px', 'fontSize': '20px'}}><b>Expiration Date: </b></label>
            <input
              id="left"
              type="text"
              size="25"
              placeholder='Date in YYYY-mm'
              onChange={this.updateExpDate}
              style={{'color': 'black', 'fontSize': '20px', 'marginRight': '25px'}}
            />
            <br/>
            </form>
            <Button
              varient='primary'
              onClick={() => this.handleSubmitPurchase()}
              className='button'>
                Submit Payment Information
            </Button>
        </div>
      )
    }

}
import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

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
        flight: props.flight,
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
        ticketID: 0,
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

    render() {
        const curState = this.state;
        console.log(curState.flight);
        return(
          <div style={{'color': '#ffffff'}}>
          <h2 style={{'fontSize': '35px', 'marginBottom': '50px'}}>Purchase a Ticket</h2>
          <form>
          <div style={{'marginBottom': '20px'}}>
            <label for="left" style={{'marginBottom': '7px', 'marginRight': '15px', 'fontSize': '20px'}}><b>Card Type</b></label>
            <input
              id="left"
              type="text"
              size="25"
              placeholder='...'
              onChange={this.updateCardType}
              style={{'color': 'black', 'fontSize': '20px', 'marginRight': '25px'}}
            />
            <label for="left" style={{'marginBottom': '7px', 'marginRight': '15px', 'fontSize': '20px'}}><b>Card Number:</b></label>
            <input
              id="left"
              type="text"
              size="25"
              placeholder='####-####-####-####'
              onChange={this.updateCardNumber}
              style={{'color': 'black', 'fontSize': '20px', 'marginRight': '25px'}}
            />
            </div>
            <label for="left" style={{'marginBottom': '7px', 'marginRight': '15px', 'fontSize': '20px'}}><b>Name on Card:</b></label>
            <input
              id="left"
              type="text"
              size="25"
              placeholder='...'
              onChange={this.updateCardName}
              style={{'color': 'black', 'fontSize': '20px', 'marginRight': '25px'}}
            />
            <label for="left" style={{'marginBottom': '7px', 'marginRight': '15px', 'fontSize': '20px'}}><b>Expiration Date:</b></label>
            <input
              id="left"
              type="text"
              size="25"
              placeholder='Date in YYYY-MM-DD'
              onChange={this.updateExpDate}
              style={{'color': 'black', 'fontSize': '20px', 'marginRight': '25px'}}
            />
            
            </form>
            <Button
              varient='primary'
              onClick={this.addPaymentInfo}
              className='button'>
                Submit Payment Information
            </Button>
          </div>
        )
    }

}
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

export default class MyFlights extends Component {
    render() {
        return (
            <p>My flights</p>
        )
    }
}
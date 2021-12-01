import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};
const qs = require('querystring');

export default class Management extends Component {
    render() {
        return (
            <div>
                Management
            </div>
        )
    }
}
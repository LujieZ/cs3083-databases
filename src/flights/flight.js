import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

export default class Flight extends Component {
    constructor(props) {
      super(props);
      this.state = {
        flights: [],
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

    render() {
        const curState = this.state;
        console.log(curState.flights);
        return(
            <>
            <p>Flights</p>
            </>
        )
    }

}
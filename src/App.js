import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Nav, Container } from 'react-bootstrap';
import Demo from "./profile/profile";
import Flight from "./flights/flight";
import Status from "./flights/status";
import Registration from "./profile/registration";
import Management from "./flights/management";
import ViewFlights from "./flights/viewFlights";
import TicketPurchase from "./flights/ticketPurchase";
import Rates from "./flights/flightRates";
import TrackSpending from "./flights/trackSpending";
import PersonalInfo from "./profile/personalInfo";
import Airline from "./flights/airline";
import './App.css';

const Navigation = () => {
  return(
    <>
      <Navbar bg='light' expand='lg' className='topnav'>
        <Container>
            <Nav className='me-auto'>
              <Nav.Link href='/'>Home</Nav.Link>
              <Nav.Link href='/status'>Flight Status</Nav.Link>
              <div className='topnav-right'>
                <Nav.Link href='/profile'>My Account</Nav.Link>
              </div>
            </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default function App() {
  return (
    <Router>
      <div className='App'>
        <Navigation />
        <Switch>
          <Route path="/flights">
            <Flight />
          </Route>
          <Route path="/status">
            <Status />
          </Route>
          <Route path="/profile">
            <Demo />
          </Route>
          <Route path="/registration">
            <Registration />
          </Route>
          <Route path="/management">
            <Management />
          </Route>
          <Route path="/view-flights">
            <ViewFlights />
          </Route>
          <Route path="/purchase">
            <TicketPurchase />
          </Route>
          <Route path="/airline">
            <Airline />
          </Route>
          <Route path="/flight-rates">
            <Rates />
          </Route>
          <Route path="/track-spending">
            <TrackSpending />
          </Route>
          <Route path="/personal-info">
            <PersonalInfo />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div style={{'color': '#ffffff'}}>
    <Flight />
    </div>
  );
}
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Nav, Container } from 'react-bootstrap';
import Demo from "./profile/profile";
import './App.css';

const Navigation = () => {
  return(
    <>
      <Navbar bg='light' expand='lg' className='topnav'>
        <Container>
            <Nav className='me-auto'>
              <Nav.Link href='/'>Home</Nav.Link>
              <Nav.Link href='/about'>About</Nav.Link>
              <Nav.Link href='/users'>Flights</Nav.Link>
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
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/profile">
            <Demo />
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
  return <h2 style={{'color': '#ffffff'}}>CS-UY 3083 Final Project</h2>;
}

function About() {
  return <h2 style={{'color': '#ffffff'}}>About</h2>;
}

function Users() {
  return <h2 style={{'color': '#ffffff'}}>Flights</h2>;
}

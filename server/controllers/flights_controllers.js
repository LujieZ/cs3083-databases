const _ = require('lodash');

const { Flight } = require('../models/flights_models.js');

exports.showAllFlights = (req, res) => {
    Flight.displayAllFlights((err, data) => {
    if (err)
        res.status(500).send({
          message: err.message || 'Some error occurred while showing all flights.',
        });
      else res.send(data);
    });
};

exports.findFlightStatus = (req, res) => {
    Flight.getFlightStatus(req.params.airline_name, req.params.flight_num, req.params.departure_date, req.params.arrival_date, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while finding flight status.',
      });
    else res.send(data);
  });
};

exports.findAllAirplanes = (req, res) => {
  Flight.getAllAirplanes(req.params.airline_name, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while finding all airplanes.',
      });
    else res.send(data);
  });
};

exports.showAllAirports = (req, res) => {
  Flight.displayAllAirports((err, data) => {
    if (err)
        res.status(500).send({
          message: err.message || 'Some error occurred while showing all airports.',
        });
      else res.send(data);
    });
};

exports.createNewAirplane = (req, res) => {
  Flight.addNewAirplane(req.params.id, req.params.airline_name, req.params.num_seats, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while adding new airplane.',
      });
    else res.send(data);
  });
};

exports.createNewAirport = (req, res) => {
  Flight.addNewAirport(req.params.id, req.params.airport_name, req.params.airport_city, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while adding new airport.',
      });
    else res.send(data);
  });
};

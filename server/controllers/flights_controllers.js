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

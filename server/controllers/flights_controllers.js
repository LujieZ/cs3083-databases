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
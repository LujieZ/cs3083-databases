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

exports.find30DaysFlights = (req, res) => {
  Flight.get30DaysFlights(req.params.airline_name, (err, data) => {
    if (err)
        res.status(500).send({
          message: err.message || 'Some error occurred while getting flights within 30 days.',
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

exports.showCustomerFlights = (req, res) => {
  Flight.displayCustomerFlights(req.params.customer_name, (err, data) => {
  if (err)
    res.status(500).send({
      message: err.message || 'Some error occured while showing your flights.',
    });
  else res.send(data);
});
};

exports.searchFlightsOneWay = (req, res) => {
  Flight.getFlightsOneWay(req.params.depart_name,req.params.depart_date,req.params.arrival_name, (err, data) => {
  if (err)
    res.status(500).send({
      message: err.message || 'Some error occured while searching for flights.',
    });
  else res.send(data);
});
};

exports.searchFlightsReturn = (req, res) => {
  Flight.getFlightsReturn(req.params.depart_name,req.params.depart_date,req.params.arrival_name, req.params.return_date, (err, data) => {
  if (err)
    res.status(500).send({
      message: err.message || 'Some error occured while showing your flights.',
    });
  else res.send(data);
});
};


exports.createNewFlight = (req, res) => {
  const flight = new Flight({
    flight_number: req.body.flight_number,
    airline_name: req.body.airline_name,
    airplane_id: req.body.airplane_id,
    departure_date: req.body.departure_date,
    departure_time: req.body.departure_time,
    departure_airport: req.body.departure_airport,
    arrival_date: req.body.arrival_date,
    arrival_time: req.body.arrival_time,
    arrival_airport: req.body.arrival_airport,
    base_price: req.body.base_price,
  });

  Flight.addNewFlight(flight, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while adding new flight.',
      });
    else res.send(data);
  });
}

exports.updateFlightStatus = (req, res) => {
  Flight.changeFlightStatus(req.params.flight_num, req.params.departure_date, req.params.departure_time, req.params.status, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while changing flight status.',
      });
    else res.send(data);
  });
}

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

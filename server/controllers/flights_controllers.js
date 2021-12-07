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

exports.showAirlineRatings = (req, res) => {
  Flight.displayAirlineRatings(req.params.airline_name, (err, data) => {
  if (err)
    res.status(500).send({
      message: err.message || 'Some error occured while getting ratings.',
    });
  else res.send(data);
});
};

exports.showAirlineAvgRating = (req, res) => {
  Flight.displayAirlineAvgRatings(req.params.airline_name, (err, data) => {
  if (err)
    res.status(500).send({
      message: err.message || 'Some error occured while getting ratings.',
    });
  else res.send(data);
});

};
exports.createNewRating = (req, res) => {
  Flight.addRating(req.params.customer_email, req.params.flight_num, req.params.airplane_id, 
    req.params.departure_date, req.params.departure_time, req.params.airline_name, 
    req.params.rating, req.params.comment, (err, data) => {
  if (err)
    res.status(500).send({
      message: err.message || 'Some error occured while adding rating.',
    });
  else res.send(data);
});
};

exports.showPrevFlights = (req, res) => {
  Flight.displayPrevFlights(req.params.customer_email, (err, data) => {
  if (err)
    res.status(500).send({
      message: err.message || 'Some error occured while adding rating.',
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

exports.findMaxTicketId = (req, res) => {
  Flight.getMaxTicketId((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occured while showing number of seats left.',
      });
    else res.send(data);
  });
}

exports.showCustomerFlights = (req, res) => {
  const date_1 = req.params.date_1 === '-1' ? null : req.params.date_1;
  const date_2 = req.params.date_2 === '-1' ? null : req.params.date_2;
  const departure_name = req.params.depart_name === '-1' ? null : req.params.depart_name;
  const arrival_name = req.params.arrival_name === '-1' ? null : req.params.arrival_name;
  console.log(date_1, date_2, departure_name, arrival_name);
  Flight.displayCustomerFlights(req.params.customer_email, date_1, date_2, departure_name, arrival_name, (err, data) => {
  if (err)
    res.status(500).send({
      message: err.message || 'Some error occured while showing your flights.',
    });
  else res.send(data);
});
};


exports.searchFlightsOneWay = (req, res) => {
  Flight.getFlightsOneWay(req.params.depart_name, req.params.departure_date, req.params.arrival_name, (err, data) => {
  if (err)
    res.status(500).send({
      message: err.message || 'Some error occured while searching for flights.',
    });
  else res.send(data);
});
};

exports.searchFlightsReturn = (req, res) => {
  Flight.getFlightsReturn(req.params.depart_name, req.params.departure_date, req.params.arrival_name, req.params.return_date, (err, data) => {
  if (err)
    res.status(500).send({
      message: err.message || 'Some error occured while searching for flights.',
    });
  else res.send(data);
});
};

exports.showStaffFlights = (req, res) => {
  const date_1 = req.params.date_1 === '-1' ? null : req.params.date_1;
  const date_2 = req.params.date_2 === '-1' ? null : req.params.date_2;
  const departure_name = req.params.depart_name === '-1' ? null : req.params.depart_name;
  const arrival_name = req.params.arrival_name === '-1' ? null : req.params.arrival_name;
  console.log(date_1, date_2, departure_name, arrival_name);
  Flight.displayStaffFlights(req.params.airline_name, date_1, date_2, departure_name, arrival_name, (err, data) => {
  if (err)
    res.status(500).send({
      message: err.message || 'Some error occured while showing staff flights.',
    });
  else res.send(data);
});
};

exports.showCustomersOnFlight = (req, res) => {
  Flight.displayCustomersOnFlight(req.params.airline_name, req.params.flight_num, req.params.departure_date, req.params.departure_time, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occured while showing customers on this flight.',
      });
    else res.send(data);
  });
}

exports.showFrequentCustomers = (req, res) => {
  Flight.displayFrequentCustomers(req.params.airline_name, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occured while showing frequent customers.',
      });
    else res.send(data);
  });
}

exports.showMostFrequentCustomer = (req, res) => {
  Flight.displayMostFrequentCustomer((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occured while showing most frequent customer.',
      });
    else res.send(data);
  });
}

exports.showFlightsOfCustomer = (req, res) => {
  Flight.displayFlightsOfCustomer(req.params.airline_name, req.params.customer_email, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occured while showing flights of this customer.',
      });
    else res.send(data);
  });
}

exports.showRevenuePastMonth = (req, res) => {
  Flight.displayRevenuePastMonth(req.params.airline_name, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occured while showing past month revenue.',
      });
    else res.send(data);
  });
}

exports.showRevenuePastYear = (req, res) => {
  Flight.displayRevenuePastYear(req.params.airline_name, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occured while showing past year revenue.',
      });
    else res.send(data);
  });
}

exports.showTop3Destination3Month = (req, res) => {
  Flight.displayTop3Destination3Month(req.params.airline_name, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occured while showing past 3 months top destination.',
      });
    else res.send(data);
  });
}

exports.showTop3DestinationYear = (req, res) => {
  Flight.displayTop3Destination3Month(req.params.airline_name, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occured while showing past year top destination.',
      });
    else res.send(data);
  });
}

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
  Flight.changeFlightStatus(req.params.flight_num, req.params.airline_name, req.params.departure_date, req.params.departure_time, req.params.status, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while changing flight status.',
      });
    else res.send(data);
  });
}

exports.updateFlightNumSeats = (req, res) => {
  Flight.changeFlightNumSeats(req.params.flight_num, req.params.airline_name, req.params.departure_date, req.params.departure_time, (err, data) => {
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

exports.createNewTicket = (req, res) => {
  Flight.addNewTicket(req.params.id, req.params.customer_email, req.params.airline_name, req.params.flight_num, req.params.departure_date, req.params.departure_time, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while creating new ticket.',
      });
    else res.send(data);
  });
};

exports.createNewPurchase = (req, res) => {
  Flight.addNewPurchase(req.params.id, req.params.customer_email, req.params.sold_price, req.params.card_type, req.params.card_num, req.params.card_name, req.params.exp_date, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while creating new ticket.',
      });
    else res.send(data);
  });
};

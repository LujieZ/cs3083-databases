const sql = require('../database');

const Flight = function createFlight(flight) {
    this.flight_number = flight.flight_number;
    this.airline_name = flight.airline_name;
    this.airplane_id = flight.airplane_id;
    this.departure_date = flight.departure_date;
    this.departure_time = flight.departure_time;
    this.depart_airport = flight.depart_airport;
    this.arrival_date = flight.arrival_date;
    this.arrival_time = flight.arrival_time;
    this.arrival_airport = flight.arrival_airport;
    this.base_price = flight.base_price;
    this.status = flight.status;
    this.avg_rating = flight.avg_rating;
    this.num_of_tickets_booked = flight.num_of_tickets_booked;
};

Flight.displayAllFlights = (result) => {
sql.query('SELECT * FROM Flight', (err, res) => {
    if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }

      console.log('Flights: ', res);
      result(null, res);
    });
};

Flight.displayAllAirports = (result) => {
  sql.query('SELECT * FROM Airport', (err, res) => {
    if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }

      console.log('Airports: ', res);
      result(null, res);
    });
};

Flight.get30DaysFlights = (airline_name, result) => {
  sql.query('SELECT * FROM Flight WHERE airline_name=? AND departure_date BETWEEN CURRENT_DATE() AND DATE_ADD(CURRENT_DATE(), INTERVAL 30 DAY)',
  airline_name, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('Flights: ', res);
    result(null, res);
  });
};

Flight.getFlightStatus = (airline_name, flight_number, departure_date, arrival_date, result) => {
  sql.query('SELECT * FROM Flight WHERE airline_name=? AND flight_num=? AND departure_date=? AND arrival_date=?', 
  [airline_name, flight_number, departure_date, arrival_date], (err, res) => {
    if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }

      console.log('Flights: ', res);
      result(null, res);
    });
};

Flight.getAllAirplanes = (airline_name, result) => {
  sql.query('SELECT * FROM Airplane WHERE airline_name=?', airline_name, (err, res) => {
    if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }

      console.log('Airplanes: ', res);
      result(null, res);
    });
};

Flight.changeFlightStatus = (flight_num, departure_date, departure_time, status, result) => {
  sql.query("UPDATE Flight SET status=? WHERE flight_num = ? AND departure_date=? AND departure_time=?",
  [status, flight_num, departure_date, departure_time], (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('Flights: ', res);
    result(null, res);
  });
};

Flight.changeFlightTickets = (flight_num, airline_name, departure_date, departure_time, result) => {
  sql.query("UPDATE Flight SET num_of_tickets_booked = (SELECT COUNT(flight_num) FROM Ticket WHERE Ticket.flight_num=? AND airline_name=? AND departure_date=? AND departure_time=?) WHERE flight_num=? AND airline_name=? AND departure_date=? AND departure_time=?",
  [flight_num, airline_name, departure_date, departure_time, flight_num, airline_name, departure_date, departure_time], (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('Flights: ', res);
    result(null, res);
  });
};

Flight.displayCustomerFlights = (customer_email, date_1, date_2, depart_name, arrival_name, result) => {
  if(date_1 === null && date_2 === null && depart_name === null && arrival_name === null) {
  sql.query("SELECT ticket_id, flight_num, airline_name, departure_date, departure_time, dep.name AS depart_airport_name, dep.city AS \
  depart_city, arrival_date, arrival_time, arr.name AS arrival_airport_name, arr.city as arrival_city, status FROM (Flight, Airport AS \
    arr, Airport AS dep) NATURAL JOIN Ticket WHERE Flight.depart_airport = dep.airport_id AND Flight.arrival_airport = arr.airport_id AND \
    (departure_date > CURRENT_DATE() OR (departure_date = CURRENT_DATE() AND departure_time > CURRENT_TIME())) AND customer_email=?", customer_email, (err, res) => {
    if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }

      console.log('Flights: ', res);
      result(null, res);
    });
  } else if (date_1 === null && date_2 === null && (depart_name !== null || arrival_name !== null))  {
    sql.query("SELECT ticket_id, flight_num, airline_name, departure_date, departure_time, dep.name AS depart_airport_name, dep.city AS \
    depart_city, arrival_date, arrival_time, arr.name AS arrival_airport_name, arr.city as arrival_city, status FROM (Flight, Airport AS \
      arr, Airport AS dep) NATURAL JOIN Ticket WHERE Flight.depart_airport = dep.airport_id AND Flight.arrival_airport = arr.airport_id AND \
      (departure_date > CURRENT_DATE() OR (departure_date = CURRENT_DATE() AND departure_time > CURRENT_TIME())) AND customer_email=? AND (? \
        IS NULL OR dep.name=? OR dep.city=?) AND (? IS NULL OR arr.name=? OR arr.city=?)",
    [customer_email,depart_name, depart_name, depart_name, arrival_name, arrival_name, arrival_name], (err, res) => {
      if (err) {
          console.log('error: ', err);
          result(null, err);
          return;
        }
  
        console.log('Flights: ', res);
        result(null, res);
      });
  } else {
    sql.query("SELECT ticket_id, flight_num, airline_name, departure_date, departure_time, dep.name AS depart_airport_name, dep.city AS depart_city,\
    arrival_date, arrival_time, arr.name AS arrival_airport_name, arr.city as arrival_city, status FROM (Flight, Airport AS arr, Airport AS dep) NATURAL\
    JOIN Ticket WHERE Flight.depart_airport = dep.airport_id AND Flight.arrival_airport = arr.airport_id AND customer_email=? AND (departure_date BETWEEN\
      ? AND ?) AND (? IS NULL OR dep.name=? OR dep.city=?) AND (? IS NULL OR arr.name=? OR arr.city=?)",
    [customer_email, date_1, date_2, depart_name, depart_name, depart_name, arrival_name, arrival_name, arrival_name], (err, res) => {
      if (err) {
          console.log('error: ', err);
          result(null, err);
          return;
        }
  
        console.log('Flights: ', res);
        result(null, res);
      });
  }
};

Flight.getFlightsOneWay = (depart_name, departure_date, arrival_name, result) => {
  sql.query('SELECT flight_num, base_price, status, airline_name, departure_date, departure_time, dep.name AS depart_airport_name, \
  dep.city AS depart_city, arrival_date, arrival_time, arr.name AS arrival_airport_name, arr.city as arrival_city \
  FROM (Flight, Airport AS arr, Airport AS dep) WHERE Flight.depart_airport = dep.airport_id AND \
  Flight.arrival_airport = arr.airport_id AND departure_date=? AND (dep.name=? OR dep.city=?) AND (arr.name=? OR arr.city=?)',
  [departure_date, depart_name, depart_name, arrival_name, arrival_name], (err, res) => {
    if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }

      console.log('Flights: ', res);
      result(null, res);
    });
};

Flight.getFlightsReturn = (depart_name, departure_date, arrival_name, return_date, result) => {
  sql.query('SELECT flight_num, airline_name, departure_date, departure_time, dep.name AS depart_airport_name, \
  dep.city AS depart_city, arrival_date, arrival_time, arr.name AS arrival_airport_name, arr.city as arrival_city \
  FROM (Flight, Airport AS arr, Airport AS dep) WHERE Flight.depart_airport = dep.airport_id AND \
  Flight.arrival_airport = arr.airport_id AND departure_date=? AND (dep.name=? OR dep.city=?) AND (arr.name=? OR arr.city=?) \
  UNION SELECT flight_num, airline_name, departure_date, departure_time, dep.name AS depart_airport_name, \
  dep.city AS depart_city, arrival_date, arrival_time, arr.name AS arrival_airport_name, arr.city as arrival_city \
  FROM (Flight, Airport AS arr, Airport AS dep) WHERE Flight.depart_airport = dep.airport_id AND \
  Flight.arrival_airport = arr.airport_id AND departure_date=? AND (dep.name=? OR dep.city=?) AND (arr.name=? OR arr.city=?)',
  [departure_date, depart_name, depart_name, arrival_name, arrival_name, return_date, arrival_name, arrival_name, depart_name, depart_name], (err, res) => {
    if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }

      console.log('Flights: ', res);
      result(null, res);
    });
};

Flight.displayStaffFlights = (airline_name, date_1, date_2, depart_name, arrival_name, result) => {
  if (date_1 === null && date_2 === null && depart_name === null && arrival_name === null) {
  sql.query("SELECT flight_num, departure_date, departure_time, dep.name AS depart_airport_name, dep.city AS depart_city, \
  arrival_date, arrival_time, arr.name AS arrival_airport_name, arr.city as arrival_city, status FROM (Flight, Airport AS arr, \
  Airport AS dep) WHERE Flight.depart_airport = dep.airport_id AND Flight.arrival_airport = arr.airport_id AND ((departure_date \
  BETWEEN CURRENT_DATE() AND DATE_ADD(CURRENT_DATE(), INTERVAL 30 DAY)) OR (departure_date = CURRENT_DATE() AND departure_time > \
  CURRENT_TIME())) AND airline_name=?",
  [airline_name, depart_name, depart_name, depart_name, arrival_name, arrival_name, arrival_name], (err, res) => {
    if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }

      console.log('Flights: ', res);
      result(null, res);
    });
  }
  else if (date_1 === null && date_2 === null && (depart_name !== null || arrival_name !== null)) {
    sql.query("SELECT flight_num, departure_date, departure_time, dep.name AS depart_airport_name, dep.city AS depart_city, arrival_date,\
    arrival_time, arr.name AS arrival_airport_name, arr.city as arrival_city, status FROM (Flight, Airport AS arr, Airport AS dep) WHERE \
    Flight.depart_airport = dep.airport_id AND Flight.arrival_airport = arr.airport_id AND ((departure_date BETWEEN CURRENT_DATE() AND \
    DATE_ADD(CURRENT_DATE(), INTERVAL 30 DAY)) OR (departure_date = CURRENT_DATE() AND departure_time > CURRENT_TIME())) AND airline_name=? \
    AND (? is NULL OR dep.name=? OR dep.city=?) AND (? is NULL OR arr.name=? OR arr.city=?)",
    [airline_name, depart_name, depart_name, depart_name, arrival_name, arrival_name, arrival_name], (err, res) => {
      if (err) {
          console.log('error: ', err);
          result(null, err);
          return;
        }
  
        console.log('Flights: ', res);
        result(null, res);
      });
  } else {
    sql.query("SELECT flight_num, departure_date, departure_time, dep.name AS depart_airport_name, dep.city AS \
    depart_city, arrival_date, arrival_time, arr.name AS arrival_airport_name, arr.city as arrival_city, status FROM \
    (Flight, Airport AS arr, Airport AS dep) WHERE Flight.depart_airport = dep.airport_id AND Flight.arrival_airport = \
    arr.airport_id AND (departure_date BETWEEN ? AND ?) AND airline_name=? AND (? IS \
      NULL OR dep.name=? OR dep.city=?) AND (? IS NULL OR arr.name=? OR arr.city=?)",
    [date_1, date_2, airline_name, depart_name, depart_name, depart_name, arrival_name, arrival_name, arrival_name], (err, res) => {
      if (err) {
          console.log('error: ', err);
          result(null, err);
          return;
        }
  
        console.log('Flights: ', res);
        result(null, res);
      });
  }
};

Flight.displayCustomersOnFlight = (airline_name, flight_num, departure_date, departure_time, result) => {
  sql.query('SELECT customer_email FROM Flight, Ticket Where Flight.flight_num=Ticket.flight_num AND Flight.airline_name=Ticket.airline_name AND Flight.departure_date=Ticket.departure_date AND Flight.departure_time=Ticket.departure_time AND Flight.flight_num=? AND Flight.airline_name=? AND Flight.departure_date=? AND Flight.departure_time=?', 
  [flight_num, airline_name, departure_date, departure_time], (err, res) => {
    if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }

      console.log('Airports: ', res);
      result(null, res);
    });
};

Flight.displayFrequentCustomers = (airline_name, result) => {
  sql.query('CREATE VIEW frequent_customers AS SELECT customer_email, count(Flight.flight_num) AS times_flown FROM Flight, Ticket Where Flight.flight_num=Ticket.flight_num AND Flight.airline_name=Ticket.airline_name AND Flight.departure_date=Ticket.departure_date AND Flight.departure_time=Ticket.departure_time AND Flight.airline_name=? GROUP BY customer_email ', 
  airline_name, (err, res) => {
    if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }

      console.log('Airplanes: ', res);
      result(null, res);
    });
};

Flight.displayMostFrequentCustomer = (result) => {
  sql.query('SELECT customer_email FROM frequent_customers WHERE times_flown = (SELECT MAX(times_flown) FROM frequent_customers)', 
  (err, res) => {
    if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }

      console.log('Airplanes: ', res);
      result(null, res);
    });
};

Flight.displayFlightsOfCustomer = (airline_name, customer_email, result) => {
  sql.query('SELECT customer_id, flight_num, departure_date, departure_time FROM Flight, Ticket Where Flight.flight_num=Ticket.flight_num AND Flight.airline_name=Ticket.airline_name AND Flight.departure_date=Ticket.departure_date AND Flight.departure_time=Ticket.departure_time AND Flight.airline_name=? AND customer_email=?', 
  [airline_name, customer_email], (err, res) => {
    if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }

      console.log('Airplanes: ', res);
      result(null, res);
    });
};

Flight.displayRevenuePastMonth = (airline_name, result) => {
  sql.query('SELECT SUM(sold_price) AS Revenue FROM Ticket NATURAL JOIN Flight NATURAL JOIN Purchases WHERE purchase_date BETWEEN DATE_ADD(CURRENT_DATE(), INTERVAL -1 MONTH) AND CURRENT_DATE()', 
  airline_name, (err, res) => {
    if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }

      console.log('Airplanes: ', res);
      result(null, res);
    });
};

Flight.displayRevenuePastYear = (airline_name, result) => {
  sql.query('SELECT SUM(sold_price) AS Revenue FROM Ticket NATURAL JOIN Flight NATURAL JOIN Purchases WHERE purchase_date BETWEEN DATE_ADD(CURRENT_DATE(), INTERVAL -1 YEAR) AND CURRENT_DATE()', 
  airline_name, (err, res) => {
    if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }

      console.log('Airplanes: ', res);
      result(null, res);
    });
};

Flight.addNewFlight = (flight, result) => {
  sql.query("INSERT INTO Flight SET flight_num=?, airline_name=?, airplane_id=?, departure_date=?, departure_time=?, depart_airport=?, arrival_date=?, arrival_time=?, arrival_airport=?, base_price=?, status='ONTIME', avg_rating=0.00, num_of_tickets_booked=0",
  [flight.flight_number, flight.airline_name, flight.airplane_id, flight.departure_date, flight.departure_time, flight.depart_airport, flight.arrival_date, flight.arrival_time, flight.arrival_airport, flight.base_price], (err, res) => {
    if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }

      console.log('Airplanes: ', res);
      result(null, res);
    });
};

Flight.addNewAirplane = (id, airline_name, num_seats, result) => {
  sql.query('INSERT INTO Airplane SET airplane_id=?, airline_name=?, num_seats=?',
  [id, airline_name, num_seats], (err, res) => {
    if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }

      console.log('Airplanes: ', res);
      result(null, res);
    });
};

Flight.addNewAirport = (id, airport_name, airport_city, result) => {
  sql.query('INSERT INTO Airport SET airport_id=?, name=?, city=?',
  [id, airport_name, airport_city], (err, res) => {
    if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }

      console.log('Airports: ', res);
      result(null, res);
    });
};

Flight.addNewTicket = (ticket_id, customer_email, airline_name, flight_num, departure_date, departure_time, result) => {
  sql.query('INSERT INTO Ticket SET ticket_id=?, customer_email=?, airline_name=?, flight_num=?, departure_date=?, departure_time=?',
  [ticket_id, customer_email, airline_name, flight_num, departure_date, departure_time], (err, res) => {
    if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }

      console.log('Airports: ', res);
      result(null, res);
    });
};

Flight.addNewPurchase = (ticket_id, customer_email, sold_price, card_type, card_num, card_name, exp_date, result) => {
  sql.query('INSERT INTO Purchases SET ticket_id=?, customer_email=?, sold_price=?, card_type=?, card_num=?, card_name=?, exp_date=?, purchase_date=CURRENT_DATE(), purchase_time=CURRENT_TIME()',
  [ticket_id, customer_email, sold_price, card_type, card_num, card_name, exp_date], (err, res) => {
    if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }

      console.log('Airports: ', res);
      result(null, res);
    });
};

module.exports = { Flight };
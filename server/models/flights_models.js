const sql = require('../database');

const Flight = function createFlight(flight) {
    this.flight_number = flight.flight_number;
    this.airline_name = flight.airline_name;
    this.airplane_id = flight.airplane_id;
    this.departure_date = flight.departure_date;
    this.departure_time = flight.departure_time;
    this.departure_airport = flight.departure_airport;
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

Flight.addNewFlight = (flight, result) => {
  sql.query("INSERT INTO Flight SET flight_num=?, airline_name=?, airplane_id=?, departure_date=?, departure_time=?, depart_airport=?, arrival_date=?, arrival_time=?, arrival_airport=?, base_price=?, status='ONTIME', avg_rating=0.00, num_of_tickets_booked=0",
  [flight.flight_number, flight.airline_name, flight.airplane_id, flight.departure_date, flight.departure_time, flight.departure_airport, flight.arrival_date, flight.arrival_time, flight.arrival_airport, flight.base_price], (err, res) => {
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

module.exports = { Flight };
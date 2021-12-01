const flights = require('../controllers/flights_controllers.js');

module.exports = (app) => {
    app.get('/flights', flights.showAllFlights);

    app.get('/flight-status/:airline_name/:flight_num/:departure_date/:arrival_date', flights.findFlightStatus);
}
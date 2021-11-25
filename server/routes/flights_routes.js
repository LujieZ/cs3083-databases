const flights = require('../controllers/flights_controllers.js');

module.exports = (app) => {
    app.get('/flights', flights.showAllFlights);
}
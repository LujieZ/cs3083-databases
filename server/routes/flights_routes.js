const flights = require('../controllers/flights_controllers.js');

module.exports = (app) => {
    app.get('/flights', flights.showAllFlights);

    app.get('/flights-30/:airline_name', flights.find30DaysFlights);

    app.get('/flight-status/:airline_name/:flight_num/:departure_date/:arrival_date', flights.findFlightStatus);

    app.get('/airplanes/:airline_name', flights.findAllAirplanes);

    app.get('/airports', flights.showAllAirports);
    
    app.get('/flights/:customer_name',flights.showCustomerFlights);

    app.get('/flights-searched/:depart_name/:depart_date/:arrival_name', flights.searchFlightsOneWay);

    app.get('/flights-searched/:depart_name/:depart_date/:arrival_name/:return_date', flights.searchFlightsReturn);

    app.put('/flight-status/:flight_num/:departure_date/:departure_time/:status', flights.updateFlightStatus);

    app.post('/flight', flights.createNewFlight);
    
    app.post('/airplane/:id/:airline_name/:num_seats/', flights.createNewAirplane);

    app.post('/airports/:id/:airport_name/:airport_city/', flights.createNewAirport);
}

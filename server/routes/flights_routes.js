const flights = require('../controllers/flights_controllers.js');

module.exports = (app) => {
    app.get('/flights', flights.showAllFlights);

    app.get('/flights-30/:airline_name', flights.find30DaysFlights);

    app.get('/flight-status/:airline_name/:flight_num/:departure_date/:arrival_date', flights.findFlightStatus);

    app.get('/airplanes/:airline_name', flights.findAllAirplanes);

    app.get('/airports', flights.showAllAirports);

    app.get('/max-ticket-id', flights.findMaxTicketId);
    
    app.get('/flights-customer/:customer_email/:date_1/:date_2/:depart_name/:arrival_name',flights.showCustomerFlights);

    app.get('/flights-staff/:airline_name/:date_1/:date_2/:depart_name/:arrival_name',flights.showStaffFlights);

    app.get('/flights-searched/:depart_name/:departure_date/:arrival_name', flights.searchFlightsOneWay);

    app.get('/flights-searched/:depart_name/:departure_date/:arrival_name/:return_date', flights.searchFlightsReturn);

    app.get('/customers/:airline_name/:flight_num/:departure_date/:departure_time', flights.showCustomersOnFlight);

    app.get('/customers/:airline_name', flights.showFrequentCustomers);

    app.get('/customer-most-frequent', flights.showMostFrequentCustomer);

    app.get('/flights/:airline_name/:customer_email', flights.showFlightsOfCustomer);

    app.get('/revenue-month/:airline_name', flights.showRevenuePastMonth);

    app.get('/revenue-year/:airline_name', flights.showRevenuePastYear);

    app.get('/destination-3month/:airline_name', flights.showTop3Destination3Month);

    app.get('/destination-year/:airline_name', flights.showTop3DestinationYear);

    app.get('/prev-flights/:customer_email', flights.showPrevFlights);

    app.get('/airline-rates/:airline_name', flights.showAirlineRatings);

    app.get('/airline-avg-rating/:airline_name', flights.showAirlineAvgRating);

    app.get('/year-spending/:customer_email', flights.showYearSpending);

    app.get('/6-month-spending/:customer_email', flights.show6MonthSpending);

    app.get('/range-spending/:start/:end/:customer_email', flights.showRangeSpending);

    app.get('/year-tix/:airline_name', flights.showPastYearTix);

    app.get('/month-tix/:airline_name', flights.showPastMonthTix);

    app.get('/range-tix/:start/:end/:airline_name', flights.showRangeTix);

    app.post('/customer-rates/:customer_email/:flight_num/:airplane_id/:departure_date/:departure_time/:airline_name/:rating/:comment', flights.createNewRating);

    app.put('/flight-status/:flight_num/:airline_name/:departure_date/:departure_time/:status', flights.updateFlightStatus);

    app.put('/flight-tickets/:flight_num/:airline_name/:departure_date/:departure_time', flights.updateFlightNumSeats);

    app.post('/flight', flights.createNewFlight);
    
    app.post('/airplane/:id/:airline_name/:num_seats/', flights.createNewAirplane);

    app.post('/airports/:id/:airport_name/:airport_city/', flights.createNewAirport);

    app.post('/ticket/:id/:customer_email/:airline_name/:flight_num/:departure_date/:departure_time', flights.createNewTicket);

    app.post('/ticket-purchase/:id/:customer_email/:sold_price/:card_type/:card_num/:card_name/:exp_date', flights.createNewPurchase);
}

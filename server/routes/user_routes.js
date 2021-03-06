const user = require('../controllers/user_controllers.js');

module.exports = (app) => {
    app.get('/customer/:email', user.getCustomerInfo);

    app.get('/staff/:username', user.getStaffInfo);

    app.post('/customer', user.createCustomer);

    app.post('/staff', user.createStaff);
}
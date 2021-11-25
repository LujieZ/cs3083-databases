const user = require('../controllers/user_controllers.js');

module.exports = (app) => {
    app.get('/customer/:email', user.getCustomerInfo);

    app.get('/staff/:username', user.getStaffInfo);
}
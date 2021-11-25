const sql = require('../database');

const Customer = function createCustomer(customer) {
    this.name = customer.name;
    this.customer_email = customer.customer_email;
    this.password = customer.password;
    this.building_number = customer.building_number;
    this.street = customer.street;
    this.city = customer.city;
    this.state = customer.state;
    this.phone_num = customer.phone_num;
    this.passport_num = customer.passport_num;
    this.passport_country = customer.passport_country;
    this.date_of_birth = customer.date_of_birth;
};

const Staff = function createStaff(staff) {
    this.username = staff.username;
    this.password = staff.password;
    this.airline_name = staff.airline_name;
    this.first_name = staff.first_name;
    this.date_of_birth = staff.date_of_birth;
    this.phone_num = staff.phone_num;
}

Customer.findCustomerInfo = (customerEmail, result) => {
    sql.query('SELECT * FROM Customer WHERE customer_email=?', customerEmail, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
          }
      
          console.log('Customer: ', res);
          result(null, res);
        });
      };

Staff.findStaffInfo = (staffUsername, result) => {
    sql.query('SELECT * FROM Airline_Staff WHERE username=?', staffUsername, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
          }

          console.log('Customer: ', res);
          result(null, res);
        });
      };

module.exports = { Customer, Staff };
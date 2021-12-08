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
    this.passport_expiry = customer.passport_expiry;
    this.date_of_birth = customer.date_of_birth;
};

const Staff = function createStaff(staff) {
    this.username = staff.username;
    this.password = staff.password;
    this.airline_name = staff.airline_name;
    this.first_name = staff.first_name;
    this.last_name = staff.last_name;
    this.date_of_birth = staff.date_of_birth;
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

Customer.create = (customer, result) => {
  sql.query('INSERT INTO Customer SET name=?, customer_email=?, password=?, building_num=?, street=?, city=?, state=?, phone_num=?, passport_num=?, passport_expiry=?, passport_country=?, date_of_birth=?',
  [customer.name, customer.customer_email, customer.password, customer.building_number, customer.street, customer.city, customer.state, customer.phone_num, customer.passport_num, customer.passport_expiry, customer.passport_country, customer.date_of_birth],
  (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('Customer: ', res);
    result(null, res);
  },
);
};

Staff.create = (staff, result) => {
  sql.query('INSERT INTO Airline_Staff SET username=?, first_name=?, last_name=?, password=?, date_of_birth=?, airline_name=?',
  [staff.username, staff.first_name, staff.last_name, staff.password, staff.date_of_birth, staff.airline_name],
  (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('Staff: ', res);
    result(null, res);
  },
);
};

module.exports = { Customer, Staff };
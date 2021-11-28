const _ = require('lodash');

const { Customer, Staff } = require('../models/user_models.js');

exports.getCustomerInfo = (req, res) => {
    Customer.findCustomerInfo(req.params.email, (err, data) => {
        if (err)
            res.status(500).send({
              message: err.message || 'Some error occurred while retrieving user info.',
            });
          else res.send(data);
        });
}

exports.getStaffInfo = (req, res) => {
  Staff.findStaffInfo(req.params.username, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving user info.',
      });
      else res.send(data);
    });
}

exports.createCustomer = (req, res) => {
    // Validate request
    console.log('request', req.body);
    if (_.isEmpty(req.body)) {
      res.status(400).send({
        message: 'Content can not be empty!',
      });
      return;
    }

    const customer = new Customer({
      name: req.body.name,
      customer_email: req.body.customer_email,
      password: req.body.password,
      building_number: req.body.building_number,
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      phone_num: req.body.phone_num,
      passport_num: req.body.passport_num,
      passport_country: req.body.passport_country,
      passport_expiry: req.body.passport_expiry,
      date_of_birth: req.body.date_of_birth,
    });
    console.log(customer);

    Customer.create(customer, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || 'Some error occurred while creating the new SLDP Kit.',
        });
      } else res.send(data);
    });
  };

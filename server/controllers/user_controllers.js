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

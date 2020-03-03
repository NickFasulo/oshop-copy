const User = require('../models/User');
const { validationResult } = require('express-validator');
const faker = require('faker');

module.exports = {
  register: (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    User.findOne({ email: req.body.email }).then(user => {
      if (user) return req.flash('errors', 'User already exists');
      else {
        const newUser = new User();

        newUser.profile.name = req.body.name;
        newUser.profile.picture = faker.image.avatar();
        newUser.email = req.body.email;
        newUser.password = req.body.email;

        newUser
          .save()
          .then(user => {
            req.login(user, err => {
              if (err) {
                return res
                  .status(400)
                  .json({ confirmation: false, messge: err });
              } else {
                res.redirect('/');
                next();
              }
            });
          })
          .catch(err => next(err));
      }
    });
  }
};

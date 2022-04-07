require("dotenv").config({ silent: true }); // load environmental variables from a hidden file named .env
const mongoose = require('mongoose');
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const User = mongoose.model('User');

// set up some JWT authentication options
const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt"); // look for the Authorization request header
jwtOptions.secretOrKey = process.env.JWT_SECRET; // an arbitrary string used during encryption - see the .env file

const jwtStrategy = new JwtStrategy(jwtOptions, function (jwtPayload, next) {
  console.log("JWT payload received", jwtPayload);
  // try to find a matching user in our "database"
  User.findById(jwtPayload.id , function(err, user) {
    if (user) {
      console.log(user);
      return next(null, user);
    }
    else{
      return next(null, false);
    }
  });
});

module.exports = {
  jwtOptions,
  jwtStrategy,
};
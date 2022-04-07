const express = require('express'), 
    router = express.Router(),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

  const bcrypt = require("bcrypt");
  const saltRounds = 10;
  
  const jwt = require("jsonwebtoken");

  //router.use(passport.initialize());
  //router.use(passport.session());
  
const jwtOptions = require("../jwt-config.js").jwtOptions; // import setup options for using JWT in passport
  

router.get('/logout', (req, res) => {
  req.session.user = null;
  req.logout();
  res.redirect('/');
});

router.get('/', (req, res) => {
  res.render('home', {"heading": "Welcome to Note Keeper", user: req.session.user});
});

router.get('/login', (req, res) => {
  res.render('login', {"heading": "Login"});
});

router.get('/register', (req, res) => {
  res.render('register', {"heading": "Sign Up"});
});

router.post('/register', (req, res) => {
  //console.log(req.body);
  const {username, password} = req.body;
  //console.log(username);
  //console.log(password);

  bcrypt.hash(password, saltRounds).then(function (hash) {
    const newUser = new User({ user: username, token: hash, lists:[], folders:[], notes:[] });
    newUser.save(function (err, newUser) {
      if (err) {
        console.log(err);
        if (err.name === "MongoServerError" && err.code === 11000) {
          res.render("register", {heading: "Sign Up", error: "Username already exists"});
        }
        // Some other error
        else{
          res.render("register", {heading: "Sign Up",error: err});
        }
      }
      else{
        //console.log(newUser.id);
        const payload = { id: newUser.id }; // some data we'll encode into the token //change to id later
        const token = jwt.sign(payload, jwtOptions.secretOrKey); // create a signed token
        //console.log(token);
        req.session.user = {user: newUser, username: username, ID: newUser.id, token: token};
        res.setHeader('Authorization', `JWT ${req.session.user.token}`);
        res.render("home", {"heading": "Welcome to Note Keeper", user: req.session.user});
      }
    });
  });
  return;
});

router.post('/login', (req, res) => { 
  const {username, password} = req.body; 

  User.findOne({ user: username }, "token", function (err, users) {
    if (users === null || err){
      console.log(err);
      res.render("login", {header: "Login", error: "Wrong info"});
    }
    else {
      const retPass = users.token;
      // assuming we found the user, check the password is correct
      bcrypt.compare(password, retPass, function (err, result) {
        if (err){
          res.render("login", {header: "Login", error: "Password is incorrect"});
        }
        if (result) {
          const payload = { id: users.id }; // some data we'll encode into the token
          const token = jwt.sign(payload, jwtOptions.secretOrKey); // create a signed token
          req.session.user = {user: users, username: username, ID: users.id, token: token};
          res.setHeader('Authorization', `JWT ${req.session.user.token}`);
          res.render("home", {"heading": "Welcome to Note Keeper", user: req.session.user});
        } 
      });
    }
  });
  return;
});

module.exports = router;

const express = require('express'), 
    router = express.Router(),
    mongoose = require('mongoose'),
    //passport = require('passport'),
    Note = mongoose.model('Note'),
    User = mongoose.model('User');

  const bcrypt = require("bcrypt");
  const saltRounds = 10;
  
  const jwt = require("jsonwebtoken");

  //router.use(passport.initialize());
  //router.use(passport.session());
  
const jwtOptions = require("../jwt-config.js").jwtOptions; // import setup options for using JWT in passport
  

router.get('/logout', (req, res) => {
  req.session.user = null;
  //req.logout();
  res.redirect('/');
});

router.get('/', (req, res) => {
  res.render('home', {user: req.session.user});
});

router.get('/notes/newNote', (req, res) => {
  //console.log(req.session.token);
  res.render('newNote.hbs', {user: req.session.user});
});

router.get('/lists/newList', (req, res) => {
  if(req.session.user){
    Note.find({user: req.session.user.user}, (err, notes) => {
      console.log(notes);
      res.render('newList.hbs', {user: req.session.user, notes: notes});
  });
  }
  else{
    res.render('newList.hbs', {user: req.session.user, notes: null});
  }
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  const {username, password} = req.body;

  bcrypt.hash(password, saltRounds).then(function (hash) {
    const newUser = new User({ user: username, token: hash, lists:[], folders:[], notes:[] });
    newUser.save(function (err, newUser) {
      if (err) {
        console.log(err);
        if (err.name === "MongoServerError" && err.code === 11000) {
          res.status(401).render("register", {error: "Username already exists"});
        }
        // Some other error
        else{
          res.status(401).render("register", {error: err});
        }
      }
      else{
        //console.log(newUser.id);
        const payload = { id: newUser.id }; // some data we'll encode into the token //change to id later
        const token = jwt.sign(payload, jwtOptions.secretOrKey); // create a signed token
        //console.log(token);
        req.session.user = {user: newUser, username: username, ID: newUser.id, token: token};
        res.setHeader('Authorization', `JWT ${req.session.user.token}`);
        res.redirect("/");
        //res.render("homeLogin", {user: req.session.user});
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
      res.status(401).render("login", {error: "User does not exist"});
    }
    else {
      const retPass = users.token;
      // assuming we found the user, check the password is correct
      bcrypt.compare(password, retPass, function (err, result) {
        if (err){
          res.status(401).render("login", {error: err});
        }
        if(result){
          console.log(result);
          const payload = { id: users.id }; // some data we'll encode into the token
          const token = jwt.sign(payload, jwtOptions.secretOrKey); // create a signed token
          req.session.user = {user: users, username: username, ID: users.id, token: token};
          res.setHeader('Authorization', `JWT ${req.session.user.token}`);
          //res.status(200);
          res.redirect("/");
          //res.render("homeLogin", {user: req.session.user});
        } 
        else{
          res.status(401).render("login", {error: "Password is incorrect"});
        }
      });
    }
  });
  return;
});

module.exports = router;

require("dotenv").config({ silent: true });
require('./db');
 
const express = require('express');
const path = require('path');

const routes = require('./routes/index');
const list = require('./routes/list');
const items = require('./routes/items');
const notes = require('./routes/notes');
const folders = require('./routes/folders');

const app = express();

// =================== LOGIN setup =====================

const passport = require('passport');

// ================= END LOGIN setup ==================

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// enable sessions
const session = require('express-session');
const sessionOptions = {
    secret: 'secret cookie thang (store this elsewhere!)',
    resave: true,
    saveUninitialized: true
};
app.use(session(sessionOptions)); 

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());


// passport setup
app.use(passport.initialize());
app.use(passport.session());
/*
// make user data available to all templates
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
}); 
*/
const jwtStrategy = require("./jwt-config").jwtStrategy;
passport.use(jwtStrategy);

app.use('/', routes);
app.use('/lists', list);
app.use('/api', items);
app.use('/notes', notes);
app.use('/folders', folders);

app.listen(process.env.PORT || 3000);

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const rfs = require('rotating-file-stream');
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require('dotenv');
const LocalStrategy = require('passport-local').Strategy;

const db = require('./config/database.js');

const User = require('./models/user.model');
const userRouter = require('./routes/user.route');
const ingredientRouter = require('./routes/ingredient.route');
const recipeRouter = require('./routes/recipe.route');

const logDirectory = path.join(__dirname, 'log');
const port = process.env.PORT || 8080;
const app = express();


// Logging
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
  }
  const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory,
  });
  app.use(morgan('combined', {
    stream: accessLogStream,
    skip: (req, res) => res.statusCode < 400,
  }));


// load env variables
dotenv.config()
 
//db connection
const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then((con) => console.log('Database connected: ', con))
.catch(err => console.error(err));

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

  // Security
  app.use(helmet());

// Body Parse middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

// Session handling
app.use(session({
  secret: 'CraneCrew secret string: just do it!!',
  resave: true,
  httpOnly: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // seconds which equals 1 week
  },
}));

// Passport - Auth
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Enable CORS
app.use(cors({
    credentials: true,
    origin: 'http://localhost:4200',
  }));

// Config routes
app.use('/user/', userRouter);
app.use('/ingredient/', ingredientRouter);
app.use('/recipe/', recipeRouter);

app.listen(port, () => console.log(`Node Js API is on port ${port}`))
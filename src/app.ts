import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import session from 'express-session';
import fs from 'fs';
import path from 'path';
import rfs from 'rotating-file-stream';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import passportLocalMongoose from 'passport-local-mongoose';
import LocalStrategy from 'passport-local';
import User from './models/user.model';
import userRouter from './routes/user.route';
import ingredientRouter from './routes/ingredient.route';
import recipeRouter from './routes/recipe.route';
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
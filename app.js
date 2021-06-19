// Require necessary dependencies
const express         = require('express');
const config          = require('./config/config');
const bodyParser      = require('body-parser');
const mongoose        = require('mongoose');
const MongoClient     = require('mongodb').MongoClient;
const path            = require('path');
const ejsLint         = require('ejs-lint');
const session         = require('express-session');
const cookieParser    = require('cookie-parser');
const MongoStore      = require('connect-mongo')(session);

// create Express app
const app = express();

// Connect to database 
mongoose.connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true); // This is to fix a deprecation error (node:2401) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
});

// Models 
const Project         = require('./models/project-model');
const User            = require('./models/user-model');

// Mount middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname + '/public')));
app.use(cookieParser());
app.use(session({ secret: 'realestate', 
                  resave: false, 
                  saveUninitialized: false, 
                  cookie: {expires: false},
                  store: new MongoStore({ mongooseConnection: db })
                }));               

// Routes 
const indexRoutes     = require('./routes/index-routes');
const projectRoutes   = require('./routes/project-routes');
const toolsRoutes     = require('./routes/tools-routes');
const materialsRoutes = require('./routes/materials-routes');
const userRoutes      = require('./routes/user-routes');

app.use('/', indexRoutes);
app.use('/', userRoutes);
app.use('/projects/', projectRoutes);
app.use('/projects/', toolsRoutes);
app.use('/projects/', materialsRoutes);

// Declare default view directory and view engine 
app.set('views', './views');
app.set('view engine', 'pug');

// Running Server
app.listen(config.port, (req, res, err) => {
  if (err) {
      res.send("Error");
  } else {
      console.log("Running on port " + config.port);
  }
});

module.exports = app;

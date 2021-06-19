const User    = require('../models/user-model');
const Project = require('../models/project-model');
const crypto  = require('crypto');
const async   = require('async');
const session = require('express-session');
const MongoStore      = require('connect-mongo')(session);


// Handle POST request on new user signup 
exports.signup_new = (req, res, next) => {
  
  // Check if user with same email already exists
  User.findOne({ email: req.body.email })
    .exec( (err, found_user) => {
      if (err) { return next(err) };
      
      if (found_user) {
        // User already exists, redirect to login page 
        res.redirect('/')
        console.log('A user with the same email already exists');
      } else {
        // Create New User 
        let user = new User({
          name: '' + req.body.first + ' ' + req.body.last + '',
          email: req.body.email,
          hashed_password: 'placehold',
          salt: 'placehold',
          updated: new Date(),
          created: new Date()
        });
        
        // Create salt 
        let userSalt = user.makeSalt();
        // Encrypt Password 
        const userHash = user.encryptPassword(req.body.password, userSalt);
        // Enter encrypted password into user instance
        user.salt = userSalt;
        user.hashed_password = userHash;
        // Console log is temporary, delete later 
        // console.log(user);
        // Save user into database
        user.save( (err) => {
          if (err) { return next(err) };
        });
        
        // Store session id in MongoStore
        req.session.user = user;
        console.log(req.session.store);
        
        // Render Project Page NEED TO IMPLEMENT!!!!
        res.redirect('/projects');
      }
    })
  
}

// Handle POST request on returning users login 
exports.signup_returning = (req, res, next) => {
  
  async.parallel({
    user: (callback) => {
      User.findOne({ email: req.body.email })
        .exec(callback);
    }
  }, (err, results) => {
    if (err) { return next(err) } // Function error 
  
    // Checks if user email is in database. If user email is not found, returns back to login page with error "User Not Found"
    if (results.user == undefined) {
      res.render('index', { error: "Sorry! User not found. " });
    } 
    // Checks if entered password is the same as the stored password. If password is not correct, returns back to login page with error "Password incorrect"
    let userSalt = results.user.salt;
    let enteredHash = results.user.encryptPassword(req.body.password, userSalt);
    
    if (enteredHash != results.user.hashed_password) {
      console.log(enteredHash);
      console.log(results.user.hashed_password);
      res.render('index', { error: "Sorry! Wrong Password entered." });
    }
    // If everything works perfect, store session cookie and redirect to the projects page
    else {
      // store session cookie 
      req.session.user = results.user;
      
      // render projects page 
      res.redirect('/projects');
    }
    // 
  });

}

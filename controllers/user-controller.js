const User    = require('../models/user-model');
const config  = require('../config/config.js');
const crypto  = require('crypto');

// 00: Check Sign in Function 
exports.check_sign_in = (req, res, next) => {
  if (req.session.user) {
    next(); // If user is signed in exists, proceed to page 
  } else {
    // let err = new Error("Not Logged In!"); // I need to implement exception handling 
    res.render('index', { error: "Not Logged In!" }); // Error, trying to access unauthorized page!
  }
}

// 01: Displays all users on users page 
exports.display_all_users = (req, res, next) => {
  
  // Display all users currently in database
  User.find({})
    .exec((err, users) => {
      if (err) { return next(err); }
      res.render('users', { title: 'Users List', user_list: users, error: err });
    })
}

// 02: Displays individual user details page 
exports.display_user_profile = (req, res, next) => {
  console.log(req.session.user);
  
  // Attempt to decrypt password here 
  let user = new User({
    name: 'placehold',
    email: 'placehold',
    hashed_password: 'placehold',
    encrypted_password: 'placehold',
    salt: 'placehold',
    updated: new Date(),
    created: new Date()
  });
  let plaintextPassword = user.decryptPassword(req.session.user.encrypted_password);
  console.log(plaintextPassword);
  // // Find user from database
  // User.findById(req.session.user._id, (err, user) => {
  //   if (err) { return next(err); }
  // 
  //   // Get user and decrypted password 
  //   const plaintextPassword = user.decryptPassword(user.encrypted_password); 
  //   console.log(plaintextPassword);
  // 
  //   // Display user page 
  //   res.render('user-profile', { user: user, password: plaintextPassword });
  // 
  // });
  res.render('user-profile', { user: req.session.user, password: 'test'} );
}

// 03: Deletes a user from the database 
exports.delete_user = (req, res, next) => {
  User.findById(req.body.userId, (err, user) => {
    user.remove();
    user.save();
    console.log(user);
    
    res.redirect('/users');
  })
}

// 04: Logout a user from the session 
exports.logout_user = (req, res, next) => {
  // Logout user (delete the session) and return to login page
  if (req.session) {
    req.session.destroy( (err) => {
      if (err) { return next(err); }
      res.redirect('/');
    })
  } else {
    // Return to login page
    res.redirect('/'); 
  }

}
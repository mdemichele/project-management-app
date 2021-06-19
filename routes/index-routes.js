const express         = require('express');
const router          = express.Router();
const loginController = require('../controllers/login-controller');
const session         = require('express-session');

// Homepage route
router.get('/', (req, res) => {
  if (req.session.user) {
    res.redirect('/projects'); // If user already logged in, go directly to user projects page 
  } else {
    res.render('index', { error: undefined }); // If user not logged in, go to login page 
  }
});

// New User Sign Up POST request 
router.post('/register', loginController.signup_new);

// New user sign up GET request
router.get('/register', (req, res) => {
  res.render('index');
});
  
// Returning User Login POST request 
router.post('/login', loginController.signup_returning);

// Returning User Login GET request 
router.get('/login', (req, res) => {
  res.render('index');
})

// // List All Users 
// router.get('/users', loginController.display_all_users);

module.exports  = router;

const express         = require('express');
const router          = express.Router();
const userController  = require('../controllers/user-controller');


// List All Users 
router.get('/users', userController.check_sign_in, userController.display_all_users);

// GET request for User profile page 
router.get('/users/:id', userController.display_user_profile);

// POST request to delete a User 
router.post('/users/delete', userController.delete_user);

// POST request to logout a user 
router.post('/users/:id/logout', userController.logout_user);

module.exports = router;
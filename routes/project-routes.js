const express             = require('express');
const router              = express.Router();
const projectController   = require('../controllers/project-controller');
const session             = require('express-session');

// GET request for displaying list of all Projects
router.get('/', projectController.check_sign_in, projectController.project_list);

// GET request for displaying individual project page 
router.get('/:id', projectController.project_detail);

// GET request for creating a Project
router.get('/project/create', projectController.project_create_get);

// POST request for creating a Project
router.post('/project/create', projectController.project_create_post);

// GET request to delete Project 
router.get('/:id/delete', projectController.project_delete_get);

// POST request to delete Project 
router.post('/delete', projectController.project_delete_post);

// GET request to update Project 
router.get('/project/:id/update', projectController.project_update_get);

// POST request to update Project 
router.post('/project/:id/update', projectController.project_update_post);

module.exports = router;
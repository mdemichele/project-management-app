const express           = require('express');
const router            = express.Router();
const toolsController   = require('../controllers/tools-controller');

// POST request to add a Tool to a Project
router.post('/tools/create', toolsController.tools_create_post);

// POST request to delete a tool from a project 
router.post('/tools/delete', toolsController.tools_delete_post);

// POST request to update a tool in a project
router.post('/tools/update', toolsController.tools_update_post);

module.exports = router;
const express             = require('express');
const router              = express.Router();
const materialsController = require('../controllers/material-controller');

// POST request to add a Material to a Project 
router.post('/materials/create', materialsController.materials_create_post);

// POST request to delete a material from a project 
router.post('/materials/delete', materialsController.materials_delete_post);

module.exports = router;
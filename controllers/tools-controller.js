const Project                     = require('../models/project-model');
const async                       = require('async');
const { body, validationResult }  = require('express-validator');

// Create a new Tool
exports.tools_create_post = [
  // Validate: Tool must have a name 
  body('tool', 'tool name required').trim().isLength({ min: 1 }).escape(),
  
  // Validate: Tool must have a price
  body('toolPrice', 'tool price required').trim().isLength({ min: 1 }).escape(),
  
  // Process request after validation and sanitisation
  (req, res, next) => {
    // Handle and errors from our validation 
    const errors = validationResult(req);
    
    // If there are errors, respond with json message containing errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    // Add tool to project 
    Project.findById(req.body.projectId, (err, project) => {
      project.tools.push({ 'name': req.body.tool, 'price': req.body.toolPrice });
      project.save();
      console.log(project);
      
      // Project updated. Redirect back to project detail page 
      res.redirect('/projects/' + project.id);
    });
  
  }

];

// Delete a Tool 
exports.tools_delete_post = (req, res, next) => {
  
  // delete tool
  Project.findById(req.body.projectId, (err, project) => {
    project.tools.id(req.body.toolId).remove();
    project.save();
    console.log(project);
    
    // Tool deleted. Redirect back to project detail page 
    res.redirect('/projects/' + project.id);
  })
};

exports.tools_update_post = (req, res, next) => {
  
  // update tool 
  
  
};
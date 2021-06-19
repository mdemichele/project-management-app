const Project                     = require('../models/project-model');
const async                       = require('async');
const { body, validationResult }  = require('express-validator');

// Create a new Material 
exports.materials_create_post = [
  
  // Validate and sanitize the tool field
  body('tool', 'tool name required').trim().isLength({ min: 1 }).escape(),
  
  body('materialPrice', 'material Price required').trim().isLength({ min: 1 }).escape(),
  
  // Process request after validation and sanitization
  (req, res, next) => {
    
    const errors = validationResult(req);
    // Handle validation errors 
    if (!errors.isEmpty()) { 
      return res.status(400).json({ errors: errors.array() });
    }
    
    // Add material to project
    Project.findById(req.body.projectId, (err, project) => {
      project.materials.push({ 'name': req.body.material, 'price': req.body.materialPrice });
      project.save();
      console.log(project);
      
      // Project updated. Redirect back to project detail page 
      res.redirect('/projects/' + project.id);
    });
  }
  
];

// Delete a material 
exports.materials_delete_post = (req, res, next) => {
  
  // delete tool
  Project.findById(req.body.projectId, (err, project) => {
    project.materials.id(req.body.materialId).remove();
    project.save();
    console.log(project);
    
    // Tool deleted. Redirect back to project detail page 
    res.redirect('/projects/' + project.id);
  })
};
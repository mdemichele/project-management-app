const Project                     = require('../models/project-model');
const async                       = require('async');
const { body, validationResult }  = require('express-validator');
const session                     = require('express-session');

// Check Sign in Function 
exports.check_sign_in = (req, res, next) => {
  if (req.session.user) {
    next(); // If user is signed in exists, proceed to page 
  } else {
    // let err = new Error("Not Logged In!"); // I need to implement exception handling 
    res.render('index', { error: "Not Logged In!" }); // Error, trying to access unauthorized page!
  }
}

// Display list of all Projects
exports.project_list = (req, res, next) => {
  
  // Find the logged in user's projects
  Project.find({ createdBy: req.session.user._id })
        .exec((err, projects) => {
          if (err) {return next(err); }
          // If successful, render the projects page. Should just show projects created by the user currently logged in. 
          res.render('projects', { title: 'Project List', project_list: projects, error: err, user: req.session.user });
        })
    

};

// Display project page for specific project
exports.project_detail = (req, res, next) => {
  
  async.parallel({
    project: (callback) => {
      Project.findById(req.params.id)
        .exec(callback);
    }
  }, (err, results) => {
      if (err) { return next(err); }
      if (results.project == null) { // No results
        let err = new Error('Project not found');
        err.status = 404;
        return next(err);
      }
        
      // Successful, so render  
      res.render('project_detail', { 
        user: req.session.user,
        title: results.project.title, 
        id: results.project.id, 
        tools: results.project.tools, 
        materials: results.project.materials,
      });
      
    });
};

// CREATE 

// Display Project create form on GET 
exports.project_create_get = (req, res) => {
  res.render('project_form', {title: 'Create Project', user: req.session.user });
};

// Handle Project create on POST 
exports.project_create_post = [
  // Validate and sanitise the name field
  body('title', 'Project title required').trim().isLength({ min: 1 }).escape(),
  
  // Process request after validation and sanitization
  (req, res, next) => {
    
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    
    // Create a project object with escaped and trimmed data.
    let project = new Project({ title: req.body.title, createdBy: req.session.user._id });
    
    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render('project_form', { title: 'Create Project', project: project, errors: errors.array()});
      return;
    } else {
      // data from form is valid 
      project.save( (err) => {
        if (err) { return next(err) };
        // Project saved. Redirect to project detail page.
        res.redirect('/projects/' + project.id);
      });
    }
  }  
];

// DELETE 

// Display Project delete form on GET 
exports.project_delete_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Project delete GET');
};

// Handle Project delete on POST 
exports.project_delete_post = (req, res, next) => {
  
  Project.findByIdAndRemove(req.body.projectId, (err) => {
    if (err) { return next(err); }
    // Success - go back to index 
    console.log("success");
    res.redirect('/projects');
  });
  
};

// UPDATE

// Display Project update form on GET 
exports.project_update_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Project update GET');
};

// Handle Project update on POST 
exports.project_update_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Project update POST');
};

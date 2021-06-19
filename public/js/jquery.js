const menuIcon = $('.menu-icon');
const sidenav = $('.sidenav');
const sidenavClose = $('.sidenav_close-icon');
const signupButton = $('#signup-button');
const signupSection = $('#signup-section');
const loginSection = $('#login-section');
const loginButton = $('#login-button');

// Add and remove provided class names
function toggleClassName(el, className) {
  if (el.hasClass(className)) {
    el.removeClass(className);
  } else {
    el.addClass(className);
  }
};
// Open the side nav on click
menuIcon.on('click', function() {
  toggleClassName(sidenav, 'active');
  console.log("fuck trupm");
});
// Close the side nav on click
sidenavClose.on('click', function() {
  toggleClassName(sidenav, 'active');
});

// Toggle between sign up and login forms
signupButton.on('click', function() {
  if (signupSection.hasClass('active')) { 
    return; 
  } else { 
    signupSection.addClass('active'); 
    loginSection.removeClass('active');
    console.log('afss');
  }
});

loginButton.on('click', function() {
  if (loginSection.hasClass('active')) { 
    return; 
  } else { 
    loginSection.addClass('active'); 
    signupSection.removeClass('active');
    console.log("sad ")
  }
})
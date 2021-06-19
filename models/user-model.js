const mongoose = require('mongoose');
const crypto   = require('crypto');
//const Project  = require('../models/project-model');

const UserSchema  = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name is required'
  },
  email: {
    type: String,
    trim: true,
    unique: 'Email already exists',
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    required: 'Email is required'
  },
  hashed_password: {
    type: String,
    required: "Password is required"
  },
  salt: String,
  //projects: Project,
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

UserSchema.methods = {
  authenticate: (plainText) => {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: (password, salt) => {
    if (!password) return ''
    try {
      const userHash = crypto.createHmac('sha256', salt)
                             .update(password)
                             .digest('hex');
      return userHash;
    } catch (err) {
      return ''
    }
  }, 
  makeSalt: () => {
    return Math.round((new Date().valueOf() * Math.random())) + ''
  }
}

module.exports = mongoose.model('User', UserSchema);

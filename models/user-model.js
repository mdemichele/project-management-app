const mongoose = require('mongoose');
const crypto   = require('crypto');
const config   = require('../config/config.js');
//const Project  = require('../models/project-model');

// Password secret 
const secret = config.cryptoSecret;

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
  encrypted_password: {
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
  hashPassword: (password) => {
    if (!password) return ''
    try {
      const userHash = crypto.createHmac('sha256', secret)
                             .update(password)
                             .digest('hex');
      return userHash;
    } catch (err) {
      return ''
    }
  }, 
  encryptPassword: (password) => {
    // If no password entered or if password is empty, return 
    if (!password) return '';
    try {
      // Create cipher instance
      const cipher = crypto.createCipheriv('aes256', config.cryptoSecret, config.cryptoIV);
      
      // transform plaintext password into ciphertext
      let encrypted = cipher.update(password, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      
      // Return ciphertext
      return encrypted;
    } catch (err) {
      console.log('An error happened! ' + err);
      return '';
    }
  },
  decryptPassword: (ciphertext) => {
    if (!ciphertext) return '';
    try {
      let decipher = crypto.createDecipheriv('aes256', config.cryptoSecret, config.cryptoIV);
      
      decipher.setAutoPadding(false);
      
      // transform ciphertext to plaintext password 
      let plaintext = decipher.update(ciphertext, 'hex', 'utf8');
      plaintext += decipher.final('utf8');
      
      // Return plaintext 
      return plaintext;
    } catch (err) {
      console.log('An error happened! ' + err);
      return '';
    }
  },
  makeSalt: () => {
    return Math.round((new Date().valueOf() * Math.random())) + ''
  }
}

module.exports = mongoose.model('User', UserSchema);

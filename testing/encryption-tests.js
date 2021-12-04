const crypto = require('crypto');
const User = require('../models/user-model');

// TEST 1: Test a correct password encryption 
let user = new User({
  name: 'Matt DeMichele',
  email: 'test@test.com',
  hashed_password: 'placehold',
  salt: 'placehold',
  updated: new Date(),
  created: new Date()
});

const userEncrypted = user.encryptPassword('test');
console.log("userEncrypted: " + userEncrypted);

const userHash = user.hashPassword('test');
console.log("hashedPassword: " + userHash);

const userDecrypted = user.decryptPassword(userEncrypted);
console.log("userDecrypted: " + userDecrypted);

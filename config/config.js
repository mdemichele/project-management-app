const crypto = require('crypto');

// Create an iv and secret key to be used in password encryption 
const iv = crypto.randomBytes(16);
const secretKey = crypto.randomBytes(32);

const config = {
  env: 'development',
  port: 3000,
  jwtSecret: "secret",
  mongoUri: 'mongodb://localhost:27017/project-organizer',
  cryptoSecret: secretKey,
  cryptoIV: iv,
}

module.exports = config;
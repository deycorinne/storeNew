'use strict';


var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt');

// Define UserSchema with the various fields that we want to store
// in MongoDB for each user
var UserSchema = new Schema({
  firstname: {
    type: String
  },
  lastname: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: Number
  },
  password: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  postcode: {
    type: Number
  },
  facebookId: {
    type: String
  },
  facebookToken: {
    type: String
  },
  facebookEmail: {
    type: String
  },
  facebookName: {
    type: String
  },
  twitterId: {
    type: String
  },
  twitterToken: {
    type: String
  },
  twitterDisplayName: {
    type: String
  },
  twitterUsername: {
    type: String
  },
  googleId: {
    type: String
  },
  googleToken: {
    type: String
  },
  googleEmail: {
    type: String
  },
  googleName: {
    type: String
  }
});


UserSchema.methods.hash_pw = function(cb) {
  var user = this;

  // generate a salt
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      throw err;
    }

    // hash password with the salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) {
        return cb(err)
      }
      cb(null, hash);
    });
  });
};

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};




module.exports = mongoose.model('User', UserSchema);

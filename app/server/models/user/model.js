'use strict';

/**
 * Created by Vadim on 18.06.2015.
 * edited by Corinne 29.06.2015
 */


var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt');

// Define UserSchema with the various fields that we want to store
// in MongoDB for each user
var UserSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    postcode: { type: Number, required: true }
});

// Hash user password
UserSchema.methods.hash_pw = function(cb) {
    var user = this;

    // generate a salt
    bcrypt.genSalt(10, function(err, salt) {
        if(err) { throw err; }
        //console.log("working1");

        // hash password with the salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) {return cb(err)}
            // override the plaintext password with the hashed one
           // console.log("working2");
            //console.log(hash);
            cb(null, hash);
        });
    });
};




module.exports = mongoose.model('User', UserSchema);


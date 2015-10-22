/**
 * Created by Corinne Konoza on 7/17/15.
 */

'use strict';


var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    fs = require('fs'),
    path = require('path');

// Define CategorySchema with the various fields that we want to store
// in MongoDB for each category in the store
var CategorySchema = new Schema({
    identity: { type: String, required: true },
    segment_url: { type: String, required: true , unique: true },
    key_words: { type: String, required: true },
    description: { type: String, required: true },
    logo: { type: String, required: true },
    cont: { type: String, required: true }
});

CategorySchema.methods.save_image = function(file, cb) {

    var $this = this;
    console.log("File:" + file);
   fs.rename(file.path, './public/images/logos/' + file.name, function (err) { // system path
        if (err) {
            return cb(err);
        }
       $this.logo = 'public/images/logos/' + file.name; // browser path
       $this.save(cb);
    });
};


module.exports = mongoose.model('Category', CategorySchema);
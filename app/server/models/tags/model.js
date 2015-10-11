/**
 * Created by Corinne Konoza on 7/28/15.
 */

'use strict';


var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Define TagSchema with the various fields that we want to store
// in MongoDB for each tag in the store
var TagSchema = new Schema({
    identity: { type: String, required: true },
    segment_url: { type: String, required: true, unique: true }
});


module.exports = mongoose.model('Tag', TagSchema);

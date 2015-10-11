/**
 * Created by Corinne Konoza on 7/17/15.
 */

'use strict';


var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Define BrandSchema with the various fields that we want to store
// in MongoDB for each category in the store
var BrandSchema = new Schema({
    identity: { type: String, required: true },
    segment_url: { type: String, required: true, unique: true },
    key_words: { type: String, required: true },
    description: { type: String, required: true },
    cont: { type: String, required: true }
});


module.exports = mongoose.model('Brand', BrandSchema);
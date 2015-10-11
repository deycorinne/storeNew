/**
 * Created by Corinne Konoza on 8/3/15.
 */

'use strict';


var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    fs = require('fs'),
    path = require('path');

// Define BrandSchema with the various fields that we want to store
// in MongoDB for each category in the store

var ProductSchema = new Schema({
    identity: { type: String, required: true },
    segment_url: {type: String, required: true, unique: true },
    category: { type: String, required: true },
    tags: { type: Array, required: true },
    brands: { type: String, required: true },
    poster: { type: String, required: true },
    content: { type: String, required: true },
    active: { type: Boolean },
    images: { type: Array, required: true },
    price: {type: String, required: true},
    isIndexPage: { type: Boolean}
});

ProductSchema.methods.save_poster = function(file, cb) {

    var $this = this;
    //console.log("File:" + file);
    fs.rename(file.path, './public/images/posters/' + file.name, function (err) { // system path
        if (err) {
            return cb(err);
        }
        $this.poster = '/posters/' + file.name; // browser path
        $this.save(cb);
    });
};


ProductSchema.methods.save_images = function(files, cb) {

    console.log("working-- images1");
    var $this = this;

    var imgs = [];
    if(files.length > 1){

        for (var i = 0; i < files.length; i++) {

            console.log("working-- images2-- " + files[i]);
            var file_element = files[i];

            fs.renameSync(file_element.path, './public/images/product/' + file_element.name);
            imgs.push('/product/' + file_element.name);
        }

        console.log("working-- images3");
        $this.images = imgs;
        $this.save(cb);

    } else {

        console.log("working-- only one image");

        fs.rename(files.path, './public/images/product/' + files.name, function (err) { // system path
            if (err) {
                return cb(err);
            }
            $this.images = '/product/' + files.name;
            $this.save(cb);
        });
    }
};

// only saves files to folder, nothing else -- must declare images & save product after implementation
ProductSchema.methods.save_new_images = function(files, cb) {

    console.log("working-- new images1");

    if(files.length > 1){

        for (var i = 0; i < files.length; i++) {

            console.log("working-- new images2-- " + files[i]);
            var file_element = files[i];

            fs.renameSync(file_element.path, './public/images/product/' + file_element.name);
        }

        console.log("working-- new images3");
        return cb();

    } else {

        console.log("working-- only one image");

        fs.rename(files.path, './public/images/product/' + files.name, function (err) { // system path
            if (err) {
                return cb(err);
            }

            return cb();

        });
    }
};

module.exports = mongoose.model('Product', ProductSchema);
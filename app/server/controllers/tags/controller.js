/*
 CJK
 */

var Tag = require('../../models/tags/model.js'),
    Product = require('../../models/products/model.js');

exports.updateForm = function (req, res) {
    var breadcrumbs = [
        {title: 'Dashboard', link: '/dashboard/'},
        {title: 'Tags', link: '/tags/'},
        {title: 'Edit Tag'}
    ];

    Tag.findOne({_id: req.query._id}, function (err, tag) {
        if (err) { console.log(err); }
        res.render('edit_tag/edit_tag', {title: 'Edit Tag', tag: tag, breadcrumbs: breadcrumbs});
    });

};

exports.get = function (req, res) {
    var breadcrumbs = [
        {title: 'Dashboard', link: '/dashboard/'},
        {title: 'Tags'}
    ];

    Tag.find({}, function(err, tags) {
        if (err) { console.log(err); }
        res.render('tags/tags', {title: 'Tags', tags: tags, breadcrumbs: breadcrumbs});
    });

};

exports.delete = function (req, res) {
    Tag.findOne({_id: req.query._id}, function (err, tag) {
        if (err) { console.log(err); }
            tag.remove();
            res.redirect('/tags/');
    });
};

exports.update = function (req, res) {

    Tag.findOne({_id: req.body._id}, function (err, tag) {
        if (err) { console.log(err); }
        var new_url = req.body.segment_url.split(' ').join('_');
        var temp = [];

        Product.find({tags: tag.identity}, function (err, products) {
            if (err) { console.log(err); }

            products.forEach( function(product) {
                temp = product.tags;
                for (var i = 0; i < product.tags.length; i++) {
                    if (product.tags[i] == tag.identity) {
                        temp[i]= req.body.identity;
                        Product.update({identity: product.identity}, {tags: temp}, function (err, result) {
                            if (err) { console.log(err); }
                        });
                    }
                }
            });

            tag.segment_url = new_url;
            tag.identity = req.body.identity;

            tag.save(function (err) {
                if (err) { console.log(err); }
                res.redirect("/tags/");
            });
        });
    });
};


exports.createForm = function (req, res) {
    var breadcrumbs = [
        {title: 'Dashboard', link: '/dashboard/'},
        {title: 'Tags', link: '/tags/'},
        {title: 'Create Tag'}
    ];

    res.render('create_tag/create_tag', {title: 'Create Tag', breadcrumbs: breadcrumbs});
};


exports.create = function (req, res) {
    var breadcrumbs = [
        {title: 'Dashboard', link: '/dashboard/'},
        {title: 'Tags', link: '/tags/'},
        {title: 'Create Tag'}
    ];
    Tag.findOne({identity: req.body.identity}, function (err, found) {
        if (found == null) {
            var new_url = req.body.segment_url.split(' ').join('_');
            var newTag = new Tag({
                identity: req.body.identity,
                segment_url: new_url
            });

            newTag.save(function (err) {
                if (err) {
                    var error = "Oops! There was a problem creating your tag. Please try again.";
                    res.render('create_tag/create_tag', {title: 'Create Tag', breadcrumbs: breadcrumbs, error: error });
                } else {
                    res.redirect("/tags/");
                }
            });
        } else {
            var error = "Oops! A tag with that name is already in our system. Please create another.";
            res.render('create_tag/create_tag', {title: 'Create Tag', breadcrumbs: breadcrumbs, error: error });
        }
    });
};


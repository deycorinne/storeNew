/*
 CJK
 */


var Brand = require('../../models/brands/model.js'),
    Product = require('../../models/products/model.js');

exports.updateForm = function (req, res) {
    var breadcrumbs = [
        {title: 'Dashboard', link: '/dashboard/'},
        {title: 'Brands', link: '/brands/'},
        {title: 'Edit Brand'}
    ];

    Brand.findOne({_id: req.query._id}, function (err, brand) {
        if (err) {console.log(err);}
        res.render('edit_brand/edit_brand', {title: 'Edit Brand', brand: brand, breadcrumbs: breadcrumbs});
    });

};

exports.get = function (req, res) {
    var breadcrumbs = [
        {title: 'Dashboard', link: '/dashboard/'},
        {title: 'Brands'}
    ];

    Brand.find({}, function(err, brands) {
        if (err) { console.log(err);}
        res.render('brands/brands', {title: 'Brands', brands: brands, breadcrumbs: breadcrumbs});
    });

};

exports.delete = function (req, res) {
    Brand.findOne({_id: req.query._id}, function (err, brand) {
        if(err) {console.log(err);}
        brand.remove();
        res.redirect('/brands/');
    });
};


exports.update = function (req, res) {
    Brand.findOne({_id: req.body._id}, function (err, brand) {
        var new_url = req.body.segment_url.split(' ').join('_');

        Product.find({brands: brand.identity}, function (err, products) {
            if(err){ console.log(err);}

            products.forEach(function(product){
                product.brands = req.body.identity;
                product.save();
            });

            brand.identity = req.body.identity;
            brand.segment_url = new_url;
            brand.key_words = req.body.key_words;
            brand.description = req.body.description;
            brand.cont = req.body.cont;

            brand.save( function (err, brand) {
                return res.redirect('/brands/');
            });
        });
    });
};


exports.createForm = function (req, res) {
    var breadcrumbs = [
        {title: 'Dashboard', link: '/dashboard/'},
        {title: 'Brands', link: '/brands/'},
        {title: 'Create Brand'}
    ];
    res.render('create_brand/create_brand', {title: 'Create Brand', breadcrumbs: breadcrumbs});
};


exports.create = function (req, res) {
    var breadcrumbs = [
        {title: 'Dashboard', link: '/dashboard/'},
        {title: 'Brands', link: '/brands/'},
        {title: 'Create Brand'}
    ];
    Brand.findOne({identity: req.body.identity}, function (err, found) {
        if (found == null) {
            var new_url = req.body.segment_url.split(' ').join('_');
            var newBrand = new Brand({
                identity: req.body.identity,
                segment_url: new_url,
                key_words: req.body.key_words,
                description: req.body.description,
                cont: req.body.cont
            });

            newBrand.save( function (err, brand) {
                if (err) {
                    var error = "Oops! There was a problem creating your brand. Please try again.";
                    res.render('create_brand/create_brand', {title: 'Create Brand', breadcrumbs: breadcrumbs, error: error });
                } else {
                    res.redirect('/brands/');
                }
            });
        } else {
            var error = "Oops! A brand with that name is already in our system. Please create another.";
            res.render('create_brand/create_brand', {title: 'Create Brand', breadcrumbs: breadcrumbs, error: error });
        }
    });
};




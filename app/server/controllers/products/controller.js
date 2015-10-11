/*
 CJK
 */

var Product = require('../../models/products/model.js'),
    Category = require('../../models/categories/model.js'),
    Tag = require('../../models/tags/model.js'),
    Brand = require('../../models/brands/model.js'),
    fs = require('fs');


exports.get = function (req, res) {
    var breadcrumbs = [
        {title: 'Dashboard', link: '/dashboard/'},
        {title: 'Products'}
    ];

    Product.find({}, function(err, products) {
        if (err) { console.log(err);}
        res.render('products/products', {title: 'Products', products: products, breadcrumbs: breadcrumbs});
    });
};


exports.createForm = function (req, res) {
    var breadcrumbs = [
        {title: 'Dashboard', link: '/dashboard/'},
        {title: 'Products', link: '/products/'},
        {title: 'Create Product'}
    ];

    Category.find({}, function(err, categories) {
        if (err) { console.log(err);}
        Tag.find({}, function(err, tags) {
            if (err) { console.log(err);}
            Brand.find({}, function(err, brands) {
                if (err) { console.log(err);}
                res.render('create_product/create_product', {title: 'Create Product',categories: categories, tags: tags, brands: brands, breadcrumbs: breadcrumbs});
            });
        });
    });
};


exports.create = function (req, res) {
    var breadcrumbs = [
        {title: 'Dashboard', link: '/dashboard/'},
        {title: 'Products', link: '/products/'},
        {title: 'Create Product'}
    ];
    Product.findOne({identity: req.body.identity}, function (err, found) {
        if (found == null) {
            var new_url = req.body.segment_url.split(' ').join('_');

            var newProduct = new Product({
                identity: req.body.identity,
                segment_url: new_url,
                category: req.body.category,
                tags: req.body.tag,
                brands: req.body.brand,
                content: req.body.cont,
                active: req.body.active,
                isIndexPage: req.body.isIndexPage,
                price: req.body.price
            });

            newProduct.save( function (err, product) {
                if (err) { console.log(err);}

                newProduct.save_poster(req.files.poster, function (err) {
                    if (err) { console.log(err);}

                    newProduct.save_images(req.files.image, function(err) {
                        if (err) {
                            console.log(err);
                            Category.find({}, function(err, categories) {
                                if (err) { console.log(err);}
                                Tag.find({}, function(err, tags) {
                                    if (err) { console.log(err);}
                                    Brand.find({}, function(err, brands) {
                                        if (err) { console.log(err);}
                                        var error = "Oops! A there was a problem creating your product. Please try again.";
                                        res.render('create_product/create_product', {title: 'Create Product',categories: categories, tags: tags, brands: brands, breadcrumbs: breadcrumbs, error: error });
                                    });
                                });
                            });

                        } else {
                            res.redirect("/products");
                        }
                    });
                });
            });

        } else {
            Category.find({}, function(err, categories) {
                if (err) { console.log(err);}
                Tag.find({}, function(err, tags) {
                    if (err) { console.log(err);}
                    Brand.find({}, function(err, brands) {
                        if (err) { console.log(err);}
                        var error = "Oops! A product with that name is already in our system. Please create another.";
                        res.render('create_product/create_product', {title: 'Create Product',categories: categories, tags: tags, brands: brands, breadcrumbs: breadcrumbs, error: error });
                    });
                });
            });
        }
    });
};


exports.updateForm = function (req, res) {
    var breadcrumbs = [
        {title: 'Dashboard', link: '/dashboard/'},
        {title: 'Products', link: '/products/'},
        {title: 'Edit Product'}
    ];

    Product.findOne({_id: req.query._id}, function (err, product) {
        if (err) { console.log(err);}
        Category.find({'identity':{'$ne': product.category}}, function(err, categories) {
            if (err) { console.log(err);}

            Tag.find({'identity': {'$nin': product.tags}}, function(err, tags) {
                if (err) { console.log(err);}

                Brand.find({'identity':{'$ne':product.brands}}, function(err, brands) {
                    if (err) { console.log(err);}

                    res.render('edit_product/edit_product', {title: 'Edit Product', product: product, categories: categories, tags: tags, brands: brands, breadcrumbs: breadcrumbs
                    });
                });
            });
        });
    });
};

exports.update = function (req, res) {
    Product.findOne({_id: req.body._id}, function (err, product) {
        var new_url = req.body.segment_url.split(' ').join('_');
        var temp = [];

        // if delete_poster is "on"
        if ((req.body.delete_poster == "on")){

            // update all non-image parameters first
            product.identity = req.body.identity;
            product.segment_url = new_url;
            product.category = req.body.category;
            product.tags = req.body.tag;
            product.brands = req.body.brand;
            product.content = req.body.cont;
            product.active = req.body.active;
            product.isIndexPage = req.body.isIndexPage;
            product.price = req.body.price;

            var w = "";

            // check if any current images are "on"
            for(var k=0; k < product.images.length; k++){
                w = "image" + k;
                if(req.body[w] == "on"){
                    fs.unlinkSync('./public' + product.images[k]);
                } else {
                    // if not checked, add to temp array
                    temp.push(product.images[k]);
                }
            }

            // if new_image was uploaded
            if (req.files.new_image != undefined){
                // add all new images to end of temp array
                if(req.files.new_image.length == undefined){ // only one image
                    var img = '/product_images/' + req.files.new_image.name;
                    temp.push(img);
                } else {
                    for (var h =0; h < req.files.new_image.length; h++){
                        var img = '/product_images/' + req.files.new_image[h].name;
                        temp.push(img);
                    }
                }

                // save product
                product.save(function (err, result) {
                    if (err) { console.log(err);}

                    // save new poster
                    product.save_poster(req.files.new_poster, function (err) {
                        if (err) { console.log(err);}

                        // save new images to folder
                        product.save_new_images(req.files.new_image, function (err) {
                            if (err) { console.log(err);}

                            product.images = temp;
                            product.save(function (err, result){
                                if (err) { console.log(err);}
                            });

                            res.redirect("/products");
                        })
                    })
                });

            } else {
                // if no new images uploaded, save product changes, then redirect
                product.save(function (err, result) {
                    if (!req.files.new_poster) {
                        return res.redirect('/products');
                    }

                    // save new poster
                    product.save_poster(req.files.new_poster, function (err) {
                        if (err) { console.log(err);}

                        // update image array
                        product.images = temp;
                        product.save(function (err, result){
                            if (err) { console.log(err);}
                        });

                        res.redirect("/products");
                    })
                });
            }
// if delete_poster is NOT "on"
        } else {

            // update all non-image parameters first
            product.identity = req.body.identity;
            product.segment_url = new_url;
            product.category = req.body.category;
            product.tags = req.body.tag;
            product.brands = req.body.brand;
            product.content = req.body.cont;
            product.active = req.body.active;
            product.isIndexPage = req.body.isIndexPage;
            product.price = req.body.price;


            var r = "";
            // check if any current images are "on"
            for(var k=0; k < product.images.length; k++){
                r = "image" + k;

                if(req.body[r] == "on"){
                    // remove file
                    fs.unlinkSync('./public' + product.images[k]);
                } else {
                    // if not on, add to temp array
                    temp.push(product.images[k]);
                }
            }

            // if new_image was uploaded
            if (req.files.new_image != undefined){
                // add all new images to end of temp array

                if(req.files.new_image.length == undefined){ // only one image
                    var img = '/product_images/' + req.files.new_image.name;
                    temp.push(img);
                } else {
                    for (var h =0; h < req.files.new_image.length; h++){
                        var img = '/product_images/' + req.files.new_image[h].name;
                        temp.push(img);
                    }
                }

                // save product & images
                product.save(function (err, result) {
                    if (err) { console.log(err);}

                    // save new and old images-- temp array
                    product.save_new_images(req.files.new_image, function (err) {
                        if (err) { console.log(err);}

                        // set images and save product
                        product.images = temp;
                        product.save(function (err, result){
                            if(err) {console.log(err);}
                        });

                        res.redirect("/products");
                    })
                });
            } else {
                // if no new images are uploaded, save product
                product.save(function (err, result) {
                    if(err) {console.log(err);}

                    // save new array of old images-- temp array
                    product.images = temp;
                    product.save(function (err, result){
                        if(err) {console.log(err);}
                    });
                    // console log edited product and redirect user
                    res.redirect("/products");
                });
            }
        }
    });
};


exports.delete = function (req, res) {
    Product.findOne({_id: req.query._id}, function (err, product) {
        if(err){console.log(err);}
        product.remove();
        res.redirect('/products/');
    });
};

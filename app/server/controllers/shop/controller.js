/*
 CJK
 */

var Product = require('../../models/products/model.js'),
    Category = require('../../models/categories/model.js');

exports.index = function (req, res) {
    Product.count({'isIndexPage':{'$eq':true}}, function(err, count) {
        Product.find({'isIndexPage':{'$eq':true}}, function(err, products) {
            if (err) { console.log(err);}

            var perPage = 9;
            var page = req.query.page || 1;
            var totalPages = Math.ceil(count / perPage);
            var productsOnPage = [];

            while(products.length > 0){
                productsOnPage.push(products.splice(0, perPage));
            }

            Category.find({}, function(err, categories) {
                if (err) { console.log(err);}
                res.render('index', {products: productsOnPage[page - 1], categories: categories, page: page, perPage: perPage, count: count, totalPages: totalPages
                });
            });
        });
    });
};


exports.category = function (req, res) {
    Category.findOne({segment_url: req.params.url}, function (err, category) {
        if (err) {console.log(err);}

        Product.count({category: category.identity, 'isIndexPage':{'$eq':true}}, function (err, count) {
            Product.find({category: category.identity, 'isIndexPage':{'$eq':true}}, function (err, products) {
                if (err) {console.log(err);}

                var perPage = 3;
                var page = req.query.page || 1;
                var totalPages = Math.ceil(count / perPage);
                var productsOnPage = [];

                while(products.length > 0){
                    productsOnPage.push(products.splice(0, perPage));
                }

                var breadcrumbs = [
                    { title: 'Shop', link: '/'},
                    { title: category.identity}
                ];

                res.render('front/category/list', {products: productsOnPage[page - 1], breadcrumbs: breadcrumbs, category: category, page: page, perPage: perPage, count: count, totalPages: totalPages});
            });
        });
    });
};


exports.shop = function (req, res) {
    res.render('shop/shop', {title: 'Shop'});
};


exports.item = function (req, res) {
    Product.findOne({segment_url: req.params.url}, function (err, product) {
        if (err) { console.log(err);}

        Category.findOne({identity: product.category}, function (err, category) {
            if (err) { console.log(err);}

            var breadcrumbs = [
                {title: 'Shop', link: '/'},
                {title: product.category, link: '/category/' + category.segment_url + '.html'},
                {title: product.identity}
            ];

            res.render('front/item/list', {product: product, breadcrumbs: breadcrumbs});
        });
    });
};


exports.dashboard = function (req, res) {
    res.render('dashboard/list', {title: 'Dashboard'});
};


exports.thanks = function (req, res) {
    res.render('thanks/thanks', {title: 'Thank you!'});
};




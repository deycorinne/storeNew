/*
 * Corinne Konoza
 *  7.21.15
 *  controller for categories page
 */

var Category = require('../../models/categories/model.js'),
  Product = require('../../models/products/model.js'),
  fs = require('fs');

exports.createForm = function(req, res) {
  var breadcrumbs = [{
    title: 'Dashboard',
    link: '/dashboard/'
  }, {
    title: 'Categories',
    link: '/categories/'
  }, {
    title: 'Create Category'
  }];

  res.render('categories/forms/create', {
    title: 'Create Category',
    breadcrumbs: breadcrumbs
  });
};

exports.get = function(req, res) {
  var breadcrumbs = [{
    title: 'Dashboard',
    link: '/dashboard/'
  }, {
    title: 'Categories'
  }];

  Category.find({}, function(err, categories) {
    if (err) {
      console.log(err);
    }
    res.render('categories/list', {
      title: 'Categories',
      categories: categories,
      breadcrumbs: breadcrumbs
    });
  });

};

exports.delete = function(req, res) {
  Category.findOne({
    _id: req.query._id
  }, function(err, category) {
    if (err) {
      console.log(err);
    }
    Product.find({
      category: category.identity
    }, function(err, products) {
      if (err) {
        console.log(err);
      }

      products.forEach(function(element) {
        element.remove();
      });

      category.delete_image(category.logo, function(err) {
        if (err) {
          console.log(err);
        }
        category.remove();

        res.redirect('/categories/');
      });
    });
  });
};


exports.create = function(req, res) {
  var breadcrumbs = [{
    title: 'Dashboard',
    link: '/dashboard/'
  }, {
    title: 'Categories',
    link: '/categories/'
  }, {
    title: 'Create Category'
  }];

  Category.findOne({
    identity: req.body.identity
  }, function(err, found) {
    if (found == null) {
      var new_url = req.body.segment_url.split(' ').join('_');

      var newCategory = new Category({
        identity: req.body.identity,
        segment_url: new_url,
        key_words: req.body.key_words,
        description: req.body.description,
        cont: req.body.cont
      });

      newCategory.save(function(err, category) {
        if (!req.files.logo) {
          return res.redirect('/categories');
        }
        newCategory.save_image(req.files.logo, function(err) {
          if (err) {
            var error = "Oops! There was a problem creating your category. Please try again.";
            res.render('categories/forms/create', {
              title: 'Create Category',
              breadcrumbs: breadcrumbs,
              error: error
            });
          } else {
            res.redirect("/categories");
          }
        })
      });
    } else {
      var error = "Oops! A category with that name is in our system. Please create another.";
      res.render('categories/forms/create', {
        title: 'Create Category',
        breadcrumbs: breadcrumbs,
        error: error
      });
    }
  });
};

exports.updateForm = function(req, res) {
  var breadcrumbs = [{
    title: 'Dashboard',
    link: '/dashboard/'
  }, {
    title: 'Categories',
    link: '/categories/'
  }, {
    title: 'Edit Category'
  }];

  Category.findOne({
    _id: req.query._id
  }, function(err, category) {
    if (err) {
      console.log(err);
    }
    res.render('categories/forms/edit', {
      title: 'Edit Category',
      category: category,
      breadcrumbs: breadcrumbs
    });
  });
};


exports.update = function(req, res) {

  Category.findOne({
    _id: req.body._id
  }, function(err, category) {
    var new_url = req.body.segment_url.split(' ').join('_');

    if ((req.body.delete_logo == "on")) {

      Product.find({
        category: category.identity
      }, function(err, products) {
        products.forEach(function(product) {
          product.category = req.body.identity;
          product.save();
        });

        category.identity = req.body.identity;
        category.segment_url = new_url;
        category.key_words = req.body.key_words;
        category.description = req.body.description;
        category.cont = req.body.cont;

        fs.unlinkSync('./public' + category.logo);

        category.save(function(err, category) {
          if (!req.files.new_logo) {
            return res.redirect('/categories');
          }
          category.save_image(req.files.new_logo, function(err) {
            if (err) {
              console.log(err);
            }
            res.redirect("/categories");
          })
        });
      });


    } else {

      Product.find({
        category: category.identity
      }, function(err, products) {
        products.forEach(function(product) {
          product.category = req.body.identity;
          product.save();
        });

        category.identity = req.body.identity;
        category.segment_url = new_url;
        category.key_words = req.body.key_words;
        category.description = req.body.description;
        category.cont = req.body.cont;

        category.save(function(err, category) {
          if (err) {
            console.log(err);
          }
          return res.redirect('/categories');
        });
      });
    }
  });
};

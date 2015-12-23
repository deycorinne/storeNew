/*
 CJK
 */

var shop = require('../controllers/shop/controller'),
  account = require('../controllers/account/controller'),
  brands = require('../controllers/brands/controller'),
  categories = require('../controllers/categories/controller'),
  products = require('../controllers/products/controller'),
  tags = require('../controllers/tags/controller'),
  user = require('../controllers/user/controller'),
  passport = require('passport');

module.exports = function(app) {

  /* shop routes */
  app.get('/', shop.index);
  app.get('/item/:url.html', shop.item);
  app.get('/shop', shop.shop);
  app.get('/dashboard', shop.dashboard);
  app.get('/thanks', shop.thanks);
  app.get('/category/:url.html', shop.category);

  /* account routes */
  app.get('/account', account.account);
  app.get('/updateAccount', account.updateForm);
  app.post('/updateAccount', account.update);


  /* brand routes */
  app.get('/brands', brands.get);
  app.get('/createBrand', brands.createForm);
  app.get('/updateBrand', brands.updateForm);
  app.get('/deleteBrand', brands.delete);
  app.post('/createBrand', brands.create);
  app.post('/updateBrand', brands.update);

  /* category routes */
  app.get('/categories', categories.get);
  app.get('/createCategory', categories.createForm);
  app.get('/updateCategory', categories.updateForm);
  app.get('/deleteCategory', categories.delete);
  app.post('/createCategory', categories.create);
  app.post('/updateCategory', categories.update);

  /* product routes */
  app.get('/products', products.get);
  app.get('/createProduct', products.createForm);
  app.get('/updateProduct', products.updateForm);
  app.get('/deleteProduct', products.delete);
  app.post('/createProduct', products.create);
  app.post('/updateProduct', products.update);

  /* tag routes */
  app.get('/tags', tags.get);
  app.get('/createTag', tags.createForm);
  app.get('/updateTag', tags.updateForm);
  app.get('/deleteTag', tags.delete);
  app.post('/createTag', tags.create);
  app.post('/updateTag', tags.update);


  /* user routes */
  app.get('/shop', user.getSession);
  app.get('/login', user.login);
  app.get('/logout', user.logout);

  app.get('/registration', user.registerForm);
  app.get('/registerError', user.registerErrorForm);
  app.get('/updatePassword', user.updatePasswordForm);
  app.get('/resetPassword', user.resetPasswordForm);
  app.get('/restorePasswordError', user.restorePasswordErrorForm);
  app.get('/' + user.url_end, user.restorePasswordForm);

  //app.post('/login', user.verify);

  //app.post('/registration', user.register);
  app.post('/registerError', user.registerError);
  app.post('/updatePassword', user.updatePassword);
  app.post('/restorePassword', user.sendEmail);
  app.post('/restorePasswordErrorForm', user.sendEmail);
  app.post('/' + user.url_end, user.resetPassword); // not sure about this fnc


  /* Passport routes */
  app.post('/registration', passport.authenticate('local-signup', {
    successRedirect: '/login',
    failureRedirect: '/registration'
  }));

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
  }));

  app.get('/auth/facebook', passport.authenticate('facebook', {
    scope: 'email'
  }));

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/dashboard/',
      failureRedirect: '/login'
    }));

  app.get('/auth/twitter', passport.authenticate('twitter'));

  app.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
      successRedirect: '/dashboard/',
      failureRedirect: '/login'
    }));

}

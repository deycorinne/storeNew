/*
 CJK
 */

var User = require('../../models/user/model.js'),
  bcrypt = require('bcrypt'),
  session = require('express-session'),
  crypto = require('crypto'),
  email = require('emailjs'),
  url_end = generateRandomUrl(8),
  jwt = require('jsonwebtoken');

server = email.server.connect({
  user: "officalnationcouture",
  password: "lpgproject",
  host: "smtp.gmail.com",
  ssl: true
});

exports.url_end = url_end;

exports.login = function(req, res) {
  res.render('user/login/form', {
    title: 'Login'
  });
};


exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};

exports.verify = function(req, res) {
  User.findOne({
    email: req.body.email
  }).exec(function(err, user) {
    if (err) {
      return res.render('error/error', {
        title: 'Oops!',
        error: 'Something went wrong. Please return to the login page and try again.'
      });
    }

    if (user == null || !user) {
      return res.render('error/error', {
        title: 'Invalid Credentials',
        error: 'This email is not in our system. \n Please return to the login screen and try again.'
      });
    }

    bcrypt.compare(req.body.password, user.password, function(err, result) {
      if (res) {
        req.logIn(user, function(err) {
          if (err) {
            return res.status(400).send(err);
          }
          res.redirect('/dashboard/');
        });
      }
    });
  });
};


exports.resetPasswordForm = function(req, res) {
  res.render('change_pw/change_pw', {
    title: 'Reset Password'
  });
};

exports.resetPassword = function(req, res) {
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) {
      console.log(err);
    }

    user.hash_pw(function(err, hash) {
      if (err) {
        console.log(err);
      }

      user.password = hash;
      user.save();
    });
  });

  res.writeHead(302, {
    'Location': '/login'
  });
  res.end();
};


exports.updatePasswordForm = function(req, res) {
  var breadcrumbs = [{
    title: 'Dashboard',
    link: '/dashboard/'
  }, {
    title: 'Account',
    link: '/account/'
  }, {
    title: 'Update Password'
  }];
  res.render('account/forms/password', {
    title: 'Edit Password',
    breadcrumbs: breadcrumbs
  });
};

exports.updatePassword = function(req, res) {
  User.findOne({
    email: req.user.email
  }, function(err, user) {
    if (err) {
      console.log(err);
    }

    bcrypt.compare(req.body.oldpassword, user.password, function(err, result) {
      if (err) {
        console.log(err);
      }
      if (res) {
        user.hash_pw(function(err, hash) {
          if (err) {
            console.log(err);
          }

          user.password = hash;
          user.save();
        });
      }
    });

    res.writeHead(302, {
      'Location': '/account'
    });
    res.end();
  });
};


exports.registerForm = function(req, res) {
  res.render('user/registration/form', {
    title: 'Registration'
  });
};


exports.register = function(req, res) {
  var newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.bob,
    address: req.body.address,
    postcode: req.body.postcode
  });

  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) {
      console.log(err);
    }
    if (user == null) {
      newUser.hash_pw(function(err, hash) {
        if (err) {
          console.log(err);
        }

        newUser.password = hash;
        newUser.save(function(err) {
          if (err) {
            console.log(err);
          }
        });

        res.writeHead(302, {
          'Location': '/login/'
        });
        res.end();
      });
    } else {
      res.writeHead(302, {
        'Location': '/register_again/'
      });
      res.end();
    }
  });
};


exports.registerErrorForm = function(req, res) {
  res.render('register_again/register_again', {
    title: 'Registration'
  });
};

exports.registerError = function(req, res) {
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) {
      user.hash_pw(function(err, hash) {
        if (err) {
          console.log(err);
        }

        user.password = hash;
        user.save(function(err) {
          if (err) {
            console.log(err);
          }
        });

        res.writeHead(302, {
          'Location': '/login/'
        });
        res.end();
      });
    } else {
      res.writeHead(302, {
        'Location': '/register_again/'
      });
      res.end();
    }
  });
};


exports.restorePasswordForm = function(req, res) {
  res.render('restore_password/restore_password', {
    title: 'Restore Password'
  });
};

exports.restorePasswordErrorForm = function(req, res) {
  res.render('restore_again/restore_again', {
    title: 'Restore Password'
  });
};

exports.sendEmail = function(req, res) {

  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (!err && user) {
      server.send({
        text: "Click the following link or type it into your browser " +
          "to restore your password: \n" +
          "http://localhost:3000/" + url_end,
        from: "Nation Couture <username@youremail.com>",
        to: req.body.email,
        subject: "Nation Couture Password Reset"
      }, function(err, msg) {
        console.log(err || msg);
      });

      res.writeHead(302, {
        'Location': '/thanks'
      });
      res.end();
    } else {
      res.writeHead(302, {
        'Location': '/restore_again'
      });
      res.end();
    }
  });
};


exports.getSession = function(req, res) {
  var sess = req.session;

  if (sess.email) {
    res.render('shop/shop');
  } else {
    res.render('shop/shop');
  }
};

function generateRandomUrl(num) {
  var chars = "abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789";
  var rnd = crypto.randomBytes(num);
  var value = new Array(num);
  var len = chars.length;

  for (var i = 0; i < num; i++) {
    value[i] = chars[rnd[i] % len];
  }

  return value.join('');
}

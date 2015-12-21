var LocalStrategy = require('passport-local').Strategy;
var User = require('./server/models/user/model.js');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('local-login', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form

      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      User.findOne({
        'local.email': email
      }, function(err, user) {
        // if there are any errors, return the error before anything else
        if (err)
          return done(err);

        // if no user is found, return the message
        if (!user)
          return done('No user found.');

        // if the user is found but the password is wrong
        if (!user.validPassword(password))
          return done('Oops! Wrong password.');

        return done(null, user);
      });

    }));


  passport.use('local-signup', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {

      // asynchronous
      // User.findOne wont fire unless data is sent back
      process.nextTick(function() {
        console.log('called');

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({
          'email': email
        }, function(err, user) {
          if (err) {
            console.log(err);
            return done(err);
          }

          if (user) {
            console.log('this email was already in use');
            return done('This email was already in use.');
          } else {

            // if there is no user with that email
            // create the user
            var newUser = new User();

            // set the user's local credentials
            newUser.email = email;
            newUser.password = newUser.generateHash(password);

            // save the user
            newUser.save(function(err, newUser) {
              if (err) {
                console.log(err);
                return done('There was a problem saving the user.');
              }
              console.log(newUser);
              return done(null, newUser);
            });
          }
        });
      });
    }));
};

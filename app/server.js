var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var swig = require('swig');
var fs = require('fs');
var jwt = require('jsonwebtoken');
var multer = require('multer');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var app = express();

var db = mongoose.connect('mongodb://localhost/store', function (err) {
    if (err) { console.error('MongoDB error', err);}
});

var dir = './server/models';
fs.readdirSync(dir).forEach(function (folder) {
    require(dir + '/' + folder + '/model');
});

// view engine setup
app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/public/views');
app.set('view cache', false);

// disable Swig's cache
swig.setDefaults({cache: false});
swig.setFilter('contains', function(arr, value) {
    return arr.indexOf(value) !== -1;
});

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(multer({
        dest: './uploads/',
        limits: {
            fieldNameSize: 1024 * 1024 * 1000 // 1GB
        }
    }
));

// public files are global
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'foo',
    store: new MongoStore({
        url: 'mongodb://localhost/store',
        ttl: 14 * 24 * 60 * 60 // = 14 days. Default
    })
}));

// Use passport session
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session());

require('./auth')(passport);

app.use(function (req, res, next) {
    res.locals.req = req;
    next();
});

// can change
require('./server/routes/index.js')(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function () {
    console.log('Store server listening on port ' + server.address().port);
});

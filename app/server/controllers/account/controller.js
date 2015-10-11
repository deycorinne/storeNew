/*
 CJK
 */

var User = require('../../models/user/model.js');

exports.account = function (req, res) {
    var breadcrumbs = [
        {title: 'Dashboard', link: '/dashboard/'},
        {title: 'Account'}
    ];
    res.render('account/list', {title: 'My Account', breadcrumbs: breadcrumbs});
};

exports.updateForm = function (req, res) {
    var breadcrumbs = [
        {title: 'Dashboard', link: '/dashboard/'},
        {title: 'Account', link: '/account/'},
        {title: 'Edit Account'}
    ];

    res.render('account/forms/account', {title: 'Edit Account', breadcrumbs: breadcrumbs});
};

exports.update = function (req, res) {
    User.findOne({email: req.user.email}, function (err, user) {
        if (err) {console.log(err);}

        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
        user.phone = req.body.phone;
        user.address = req.body.address;
        user.postcode = req.body.postcode;

        user.save();

        res.writeHead(302, {'Location': '/account'});
        res.end();
    });
};
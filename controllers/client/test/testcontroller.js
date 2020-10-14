var express = require('express');
var async = require('async');
var uuid = require("node-uuid");


router = express.Router();



router.get('/home', function (req, res) {
    res.render('client/test/home');
});

router.get('/carView', function (req, res) {
    res.render('client/test/carView');
});

router.get('/vendor', function (req, res) {
    res.render('client/test/vendor');
});

router.get('/editProfile', function (req, res) {
    res.render('client/test/editProfile');
});

router.get('/editProfile', function (req, res) {
    res.render('client/test/editProfile');
});

router.get('/editProfile', function (req, res) {
    res.render('client/test/editProfile');
});

router.get('/editProfile', function (req, res) {
    res.render('client/test/editProfile');
});

router.get('/influencer', function (req, res) {
    res.render('client/test/influencer');
});

router.get('/login', function (req, res) {
    res.render('client/test/login');
});

router.get('/profile', function (req, res) {
    res.render('client/test/profile');
});

router.get('/register', function (req, res) {
    res.render('client/test/register');
});

router.get('/schedule', function (req, res) {
    res.render('client/test/schedule');
});

router.get('/shop', function (req, res) {
    res.render('client/test/shop');
});

router.get('/about', function (req, res) {
    res.render('client/test/about');
});

router.get('/messages', function (req, res) {
    res.render('client/test/messages');
});

router.get('/dealership', function (req, res) {
    res.render('client/test/dealership');
});

router.get('/dealershipList', function (req, res) {
    res.render('client/test/dealershipList');
});

router.get('/contactUs', function (req, res) {
    res.render('client/test/contactUs');
});

router.get('/appointment', function (req, res) {
    res.render('client/test/appointment');
});

router.get('/calendar', function (req, res) {
    res.render('client/test/calendar');
});

router.get('/influencerList', function (req, res) {
    res.render('client/test/influencerList');
});



module.exports = router;
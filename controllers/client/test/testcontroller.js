/*
*  The Spartacus Rapid Prototyping Toolbox 
Copyright (C) 2016 Dean Brennan

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
* */
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
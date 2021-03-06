var express = require('express');
var async = require('async');
const { v4: uuidv4 } = require('uuid');


global.__accessKeyId = 'PnuvF35in4';
global.__secretAccessKey = 'JIO13VOxL2u6FE1czz5tYGkPx8eRYyXZrpRimprI';
var HelperDAO = require(__base + "dao/core/helperdao");
var helperDao = new HelperDAO();

router = express.Router();


router.get('/test_vin2/:vin', function (req, res) {
    var VehicleDAO = require(__base + "dao/vehicle/vehicledao");
    var vehicleDao = new VehicleDAO();
    var vin = req.params.vin;
    var dealerId = '';
    vehicleDao.new('', dealerId, vin, function (err, results) {
        return res.send(results);
    });
});

router.get('/test_vin/:vin', function (req, res) {
    var VehicleDAO = require(__base + "dao/vehicle/vehicledao");
    var vehicleDao = new VehicleDAO();
    var vin = req.params.vin;
    var dealerId = '';

    vehicleDao.vinDecode('', vin, function (err, result) {
        return res.send(result);

    });

});


router.get('/car_photo', function (req, res) {
    res.render('core/carPhotoTest');
});

router.get('/barcode_malik', function (req, res) {
    res.render('core/barcode_malik');
});
router.get('/barcode', function (req, res) {
    res.render('core/barcode');
});

router.get('/barcode2', function (req, res) {
    res.render('core/barcode2');
});

router.get('/test_camera', function (req, res) {
    res.render('core/test_camera');
});


router.get('/notification', function (req, res) {
    res.render('core/notification');
});



router.get('/test_login', function (req, res) {
    res.render('core/test_login');
});

router.get('/home', function (req, res) {
    res.render('client/test/home');
});

router.get('/carView', function (req, res) {
    res.render('client/test/carView');
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



router.get('/profile', function (req, res) {
    res.render('client/test/profile');
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

router.get('/tuluLogin', function (req, res) {
    res.render('client/test/tuluLogin');
});

router.get('/tuluRegister', function (req, res) {
    res.render('client/test/tuluRegister');
});

router.get('/dashboard', function (req, res) {
    res.render('client/test/dashboard');
});

router.get('/dashboardTulu', function (req, res) {
    res.render('client/test/dashboardTulu');
});

router.get('/dashboard/user', function (req, res) {
    res.render('client/test/dashboardUser');
});

router.get('/dashboard/vehicle', function (req, res) {
    res.render('client/test/dashboardVehicle');
});


module.exports = router;
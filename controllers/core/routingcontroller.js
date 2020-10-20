var express = require('express');
var async = require('async');
var uuid = require("node-uuid");

router = express.Router();

router.get('/test', function (req, res) {
	var obj = req.body;
	var tokenId = obj.tokenId;
	if (__currentTokens[tokenId] !== undefined) {
		__currentTokens[tokenId].timestamp = new Date();
		var type = __currentTokens[tokenId].type;
		if (type === 'SysAdmin') {
			res.render('core/test');
		} else {
			res.render('client/test/home');
		}
	} else { res.render('client/test/home'); }
});

router.get('/login', function (req, res) {
    res.render('final/login');
});

router.get('/', function (req, res) {
    res.render('client/test/home');
});

router.get('/user', function (req, res) {
    console.log("DOING IT");
    res.render('client/test/login');
});

module.exports = router;

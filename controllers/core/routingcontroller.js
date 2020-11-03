var express = require('express');
var async = require('async');
const { v4: uuidv4 } = require('uuid');

router = express.Router();

router.get('/test', function (req, res) {
	var tokenId = req.query.tokenId;
	if (__currentTokens[tokenId] !== undefined) {
		__currentTokens[tokenId].timestamp = new Date();
		var roles = __currentTokens[tokenId].userRoles;
		if (roles.indexOf('SysAdmin') !== -1) {
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

router.get('/register', function (req, res) {
	res.render('final/register');
});

router.get('/vendor', function (req, res) {
	var tokenId = req.query.tokenId;
	if (__currentTokens[tokenId] !== undefined) {
		__currentTokens[tokenId].timestamp = new Date();
		var roles = __currentTokens[tokenId].user.userRoles;
		if (roles.indexOf('Dealer') !== -1 || roles.indexOf('DealerAdmin') !== -1) {
			res.render('client/test/vendor');
		} else {
			res.render('client/test/home');
		}
	} else { res.render('client/test/home'); }
});

module.exports = router;

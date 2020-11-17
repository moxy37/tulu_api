var express = require('express');
var async = require('async');
const { v4: uuidv4 } = require('uuid');


var UsersDAO = require(__base + "dao/users/usersdao");
var usersDao = new UsersDAO();
router = express.Router();

router.put("/api/user/current", function (req, res) {
    var obj = req.body;
    var tokenId = obj.tokenId;
    if (__currentTokens[tokenId] !== undefined) {
        __currentTokens[tokenId].timestamp = new Date();
        return res.send(__currentTokens[tokenId]);
    } else { return res.status(400).send("Invalid tokenId"); }
});

router.put("/api/user/list", function (req, res) {
    var obj = req.body;
    var tokenId = obj.tokenId;
    if (__currentTokens[tokenId] !== undefined) {
        __currentTokens[tokenId].timestamp = new Date();
        return res.send(__currentTokens[tokenId]);
    } else { return res.status(400).send("Invalid tokenId"); }
});

router.put("/api/user/save", function (req, res) {
	var obj = req.body;
	var tokenId = obj.tokenId;
	if (__currentTokens[tokenId] !== undefined) {
		__currentTokens[tokenId].timestamp = new Date();
		usersDao.save(tokenId, obj.user, function (err, user) {
			return res.send(user);
		});
	} else { return res.status(400).send("Invalid tokenId"); }
});

router.put("/api/user/login", function (req, res) {
    var data = req.body;
    var username = data.email;
    var password = data.password;
    usersDao.login(username, password, function (err, user) {
        return res.send(user);
    });
});

router.put("/api/user/new", function (req, res) {
    // var obj = req.body;
    // var tokenId = obj.tokenId;
    // if (__currentTokens[tokenId] !== undefined) {
    //     __currentTokens[tokenId].timestamp = new Date();
    var tokenId = '';
    usersDao.new(tokenId, function (err, result) {
        return res.send(result);
    });
    // } else { return res.status(400).send("Invalid tokenId"); }
});

router.put('/api/user/register', function (req, res) {
    var obj = req.body;
    var user = obj.user;
    var tokenId = '';
    usersDao.save(tokenId, user, function (err, result) {
        return res.send(result);
    });
});


setInterval(usersDao.checkTokens, 60000);

module.exports = router;
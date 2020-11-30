var express = require('express');
var async = require('async');
const { v4: uuidv4 } = require('uuid');

var TuluDAO = require(__base + "dao/users/tuludao");
var tuluDao = new TuluDAO();

router = express.Router();

router.put("/api/tulu/favorite/save", function (req, res) {
	var obj = req.body;
	var tokenId = obj.tokenId;
	if (__currentTokens[tokenId] !== undefined) {
		__currentTokens[tokenId].timestamp = new Date();
		tuluDao.saveFav(tokenId, obj.tuluId, obj.vin, obj.dealerId, function (err, result) {
			return res.send(result);
		});
	} else { return res.status(400).send("Invalid tokenId"); }
});

router.put("/api/tulu/favorite/list", function (req, res) {
	var obj = req.body;
	var tokenId = obj.tokenId;
	if (__currentTokens[tokenId] !== undefined) {
		__currentTokens[tokenId].timestamp = new Date();
		tuluDao.listFav(tokenId, obj.tuluId, function (err, result) {
			return res.send(result);
		});
	} else { return res.status(400).send("Invalid tokenId"); }
});

router.put("/api/tulu/favorite/delete", function (req, res) {
	var obj = req.body;
	var tokenId = obj.tokenId;
	if (__currentTokens[tokenId] !== undefined) {
		__currentTokens[tokenId].timestamp = new Date();
		tuluDao.deleteFav(tokenId, obj.tuluId, obj.vin, obj.dealerId, function (err, result) {
			return res.send(result);
		});
	} else { return res.status(400).send("Invalid tokenId"); }
});

module.exports = router;
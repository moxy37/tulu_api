var express = require('express');
var async = require('async');
var uuid = require("node-uuid");

var DealerDAO = require(__base + "dao/client/dealer/dealerdao");
var dealerDao = new DealerDAO();
router = express.Router();

router.put("/api/dealer/save", function (req, res) {
	var obj = req.body;
	var tokenId = obj.tokenId;
	if (__currentTokens[tokenId] !== undefined) {
		__currentTokens[tokenId].timestamp = new Date();
		dealerDao.save(tokenId, obj.dealer, function (err, result) {
			return res.send(result);
		});
	} else { return res.status(400).send("Invalid tokenId"); }
});

router.put("/api/dealer/get", function (req, res) {
	var obj = req.body;
	var tokenId = obj.tokenId;
	if (__currentTokens[tokenId] !== undefined) {
		__currentTokens[tokenId].timestamp = new Date();
		dealerDao.get(tokenId, obj.id, function (err, result) {
			return res.send(result);
		});
	} else { return res.status(400).send("Invalid tokenId"); }
});

router.put("/api/dealer/new", function (req, res) {
	var obj = req.body;
	var tokenId = obj.tokenId;
	if (__currentTokens[tokenId] !== undefined) {
		__currentTokens[tokenId].timestamp = new Date();
		dealerDao.new(tokenId, function (err, result) {
			return res.send(result);
		});
	} else { return res.status(400).send("Invalid tokenId"); }
});

router.put("/api/dealer/list", function (req, res) {
	var obj = req.body;
	var tokenId = obj.tokenId;
	if (__currentTokens[tokenId] !== undefined) {
		__currentTokens[tokenId].timestamp = new Date();
		dealerDao.list(tokenId, function (err, result) {
			return res.send(result);
		});
	} else { return res.status(400).send("Invalid tokenId"); }
});


module.exports = router;
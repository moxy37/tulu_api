var express = require('express');
var async = require('async');
const { v4: uuidv4 } = require('uuid');

var HelperDAO = require(__base + "dao/core/helperdao");
var helperDao = new HelperDAO();

router = express.Router();

router.put('/api/helper/new', function (req, res) {
	var obj = req.body;
	// var tokenId = obj.tokenId;
	var tokenId = '';
	// if (__currentTokens[tokenId] !== undefined) {
	// 	__currentTokens[tokenId].timestamp = new Date();
	var table = obj.table;
	var primary = obj.primary;
	helperDao.new(tokenId, table, primary, function (err, result) {
		return res.send(result);
	});
	// } else { return res.status(400).send("Invalid tokenId"); }

});

module.exports = router;

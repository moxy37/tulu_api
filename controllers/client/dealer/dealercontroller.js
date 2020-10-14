var express = require('express');
var async = require('async');
var uuid = require("node-uuid");

var DealerDAO = require(__base + "dao/client/dealer/dealerdao");
var dealerDao = new DealerDAO();
router = express.Router();


router.put("/api/dealer/get", function (req, res) {
	var obj = req.body;
	var tokenId = obj.tokenId;
	if (__currentTokens[tokenId] !== undefined) {
		__currentTokens[tokenId].timestamp = new Date();
		dealerDao.get(tokenId, obj.dealerId, function (err, result) {
			return res.send(result);
		});
	} else { return res.status(400).send("Invalid tokenId"); }
});



module.exports = router;
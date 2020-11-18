var express = require('express');
var async = require('async');
const { v4: uuidv4 } = require('uuid');
// const { router } = require('../../app');


var MessageDAO = require(__base + "dao/users/messagedao");
var messageDao = new MessageDAO();

router = express.Router();

/**
 * id
 * type
 * senderId
 * targetId - the dealership or user getting the message - left empty if not decided
 * dealerId - the dealership the car is at
 * vin - the vin of the car
 * */
router.put('/api/message/list', function (req, res) {
	var obj = req.body;
	var tokenId = obj.tokenId;
	if (__currentTokens[tokenId] !== undefined) {
		__currentTokens[tokenId].timestamp = new Date();
		messageDao.list(tokenId, obj, function (err, list) {
			return res.send(list);
		});
	} else { return res.status(400).send("Invalid tokenId"); }
});

router.put('/api/message/read', function (req, res) {
	var obj = req.body;
	var tokenId = obj.tokenId;
	if (__currentTokens[tokenId] !== undefined) {
		__currentTokens[tokenId].timestamp = new Date();
		messageDao.read(tokenId, obj.id, function (err, m) {
			return res.send(m);
		});
	} else { return res.status(400).send("Invalid tokenId"); }
});

/**
 * userId
 * targetId - the dealership or user getting the message - left empty if not decided
 * dealerId - the dealership the car is at
 * vin - the vin of the car
 * */
router.put('/api/message/new', function (req, res) {
	var obj = req.body;
	var tokenId = obj.tokenId;
	if (__currentTokens[tokenId] !== undefined) {
		__currentTokens[tokenId].timestamp = new Date();
		messageDao.new(tokenId, obj, function (err, m) {
			return res.send(m);
		});
	} else { return res.status(400).send("Invalid tokenId"); }
});

router.put('/api/message/save', function (req, res) {
	var obj = req.body;
	var tokenId = obj.tokenId;
	if (__currentTokens[tokenId] !== undefined) {
		__currentTokens[tokenId].timestamp = new Date();
		messageDao.save(tokenId, obj, function (err, m) {
			return res.send(m);
		});
	} else { return res.status(400).send("Invalid tokenId"); }
});
module.exports = router;
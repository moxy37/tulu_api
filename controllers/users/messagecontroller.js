var express = require('express');
var async = require('async');
const { v4: uuidv4 } = require('uuid');
// const { router } = require('../../app');


var MessageDAO = require(__base + "dao/users/messagedao");
var messageDao = new MessageDAO();

router = express.Router();

/**
 * id - optional
 * type - what time, right now just message - ptional
 * senderId - the user in question - not optional
 * targetId - the dealership or user getting the message - left empty if not decided
 * dealerId - the dealership the car is at
 * vin - the vin of the car
 * isRead - determine if only unread or not. 0 is not read
 * 
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
		messageDao.isRead(tokenId, obj.id, function (err, m) {
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

/**
 * userId - the user who is doing test drive
 * tuluId - the tulu doing the test drive
 * dealerId - the dealership the car is at
 * vin - the vin of the car
 * */
router.put('/api/testdrive/new', function (req, res) {
	var obj = req.body;
	var tokenId = obj.tokenId;
	if (__currentTokens[tokenId] !== undefined) {
		__currentTokens[tokenId].timestamp = new Date();
		messageDao.newTestDrive(tokenId, obj, function (err, m) {
			return res.send(m);
		});
	} else { return res.status(400).send("Invalid tokenId"); }
});

module.exports = router;
var express = require('express');
var async = require('async');
var uuid = require("node-uuid");

var VehicleDAO = require(__base + "dao/client/vehicle/vehicledao");
var vehicleDao = new VehicleDAO();
router = express.Router();

router.put("/api/vehicle/decode/vin", function (req, res) {
	var obj = req.body;
	var tokenId = obj.tokenId;
	if (__currentTokens[tokenId] !== undefined) {
		__currentTokens[tokenId].timestamp = new Date();
		var vin = obj.vin;
		var dealerId = obj.dealerId;
		vehicleDao.vinDecode(tokenId, vin, function (err, result) {
			return res.send(result);
		});
	} else { return res.status(400).send("Invalid tokenId"); }
});

router.put("/api/vehicle/new", function (req, res) {
	var obj = req.body;
	var tokenId = obj.tokenId;
	if (__currentTokens[tokenId] !== undefined) {
		__currentTokens[tokenId].timestamp = new Date();
		vehicleDao.new(tokenId, obj.dealerId, obj.vin, function (err, vehicle) {
			return res.send(vehicle);
		});
	} else { return res.status(400).send("Invalid tokenId"); }
});

router.put("/api/vehicle/list", function (req, res) {
	var obj = req.body;
	var tokenId = obj.tokenId;
	if (__currentTokens[tokenId] !== undefined) {
		__currentTokens[tokenId].timestamp = new Date();
		vehicleDao.list(tokenId, obj, function (err, list) {
			return res.send(list);
		});
	} else { return res.status(400).send("Invalid tokenId"); }
});

router.put("/api/vehicle/save", function (req, res) {
	var obj = req.body;
	var tokenId = obj.tokenId;
	if (__currentTokens[tokenId] !== undefined) {
		__currentTokens[tokenId].timestamp = new Date();
		vehicleDao.save(tokenId, obj.vehicle, function (err, vehicle) {
			return res.send(vehicle);
		});
	} else { return res.status(400).send("Invalid tokenId"); }
});

router.put("/api/vehicle/get", function (req, res) {
	var obj = req.body;
	var tokenId = obj.tokenId;
	if (__currentTokens[tokenId] !== undefined) {
		__currentTokens[tokenId].timestamp = new Date();
		vehicleDao.get(tokenId, obj.vin, obj.dealerId, function (err, vehicle) {
			return res.send(vehicle);
		});
	} else { return res.status(400).send("Invalid tokenId"); }
});

router.put("/api/vehicle/delete", function (req, res) {
	var obj = req.body;
	var tokenId = obj.tokenId;
	if (__currentTokens[tokenId] !== undefined) {
		__currentTokens[tokenId].timestamp = new Date();
		vehicleDao.delete(tokenId, obj.vehicle, function (err, result) {
			return res.send(result);
		});
	} else { return res.status(400).send("Invalid tokenId"); }
});

module.exports = router;
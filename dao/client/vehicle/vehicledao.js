var uuid = require("node-uuid");
var async = require('async');

var HelperDAO = require(__base + "dao/core/helperdao");
var helperDao = new HelperDAO();

module.exports = VehicleDAO;

function VehicleDAO() {
	this.new = function (tokenId, dealerId, next) {
		helperDao.new(tokenId, "Vehicle", null, function (err, obj) {
			if (err) return next(err);
			obj.links = [];
			obj.dealerId = dealerId;

		});
	}

	this.get = function (tokenId, vin, dealerId, next) {
		var primary = new Object();
		primary.dealerId = dealerId;
		primary.vin = vin;
		helperDao.get(tokenId, "Vehicle", primary, function (err, obj) {
			if (err) return next(err);
			if (obj === undefined) return next(new Error("Vehicle not found"));
			obj.links = [];
			helperDao.list(tokenId, "VehicleLinks", primary, 'ORDER BY `sequence`', function (err, links) {
				if (err) return next(err);
				obj.links = links;
				return next(null, obj);
			});
		});
	}

	this.save = function (tokenId, vehicle, next) {
		var list = [];
		var primary = new Object();
		primary.dealerId = dealerId;
		primary.vin = vin;
		async.series([
			function (callback) {
				helperDao.save(tokenId, "Vehicle", vehicle, primary, function (err, result) {
					callback();
				});
			},
			function (callback) {
				helperDao.delete(tokenId, "VehicleLinks", primary, function (err, result) {
					callback();
				});
			},
			function (callback) {
				var sequence = 0;
				async.forEach(vehicle.links, function (link, callback2) {
					link.sequence = sequence;
					primary.sequence = sequence;
					sequence++;
					helperDao.save(tokenId, "VehicleLinks", link, primary, function (err, l) {
						list.push(link);
						callback2;
					});
				}, function (err) {
					vehicle.links = list;
					callback();
				});
			}
		], function (err) {
			return next(null, vehicle);
		})
	}

	this.delete = function (tokenId, vehicle, next) {
		var primary = new Object();
		primary.vin = vehicle.vin;
		primary.dealerId = vehicle.dealerId;
		helperDao.delete(tokenId, "Vehicle", primary, function (err, result) {
			if (err) return next(err);
			helperDao.delete(tokenId, "VehicleLinks", primary, function (err, result) {
				if (err) return next(err);
				return next(null, result);
			});
		});
	}

	this.list = function (tokenId, obj, next) {
		var sql = "SELECT * FROM `Vehicle` ";
		var whereAdded = false;
		var params = [];
		if (obj.dealerIds !== undefined && obj.dealerIds.length !== 0) {
			if (whereAdded === true) {
				sql += "AND ";
			} else {
				whereAdded = truel
				sql += "WHERE ";
			}
			sql += "`dealerId` IN (";
			for (var i = 0; i < obj.dealerIds.length; i++) {
				if (i > 0) { sql += ", "; }
				sql += "?";
				params.push(obj.dealerIds[i]);
			}
			sql += ") ";
		}
		if (obj.makes !== undefined && obj.makes.length !== 0) {
			if (whereAdded === true) {
				sql += "AND ";
			} else {
				whereAdded = truel
				sql += "WHERE ";
			}
			sql += "`make` IN (";
			for (var i = 0; i < obj.makes.length; i++) {
				if (i > 0) { sql += ", "; }
				sql += "?";
				params.push(obj.makes[i]);
			}
			sql += ") ";
		}
		if (obj.models !== undefined && obj.models.length !== 0) {
			if (whereAdded === true) {
				sql += "AND ";
			} else {
				whereAdded = truel
				sql += "WHERE ";
			}
			sql += "`model` IN (";
			for (var i = 0; i < obj.models.length; i++) {
				if (i > 0) { sql += ", "; }
				sql += "?";
				params.push(obj.models[i]);
			}
			sql += ") ";
		}
		if (obj.isSold !== undefined && obj.isSold !== '') {
			if (whereAdded === true) {
				sql += "AND ";
			} else {
				whereAdded = truel
				sql += "WHERE ";
			}
			sql += "`isSold` = ? ";
			if (String(obj.isSold) === 'true' || String(obj.isSold) === '1') {
				params.push(true);
			} else {
				params.push(false);
			}
		}
		sql += "ORDER BY `dealerId`, `make`, `model`, `year` ";
		let self = this;
		__con.query(tokenId, sql, params, function (err, results) {
			if (err) return next(err);
			helperDao.loadResults(tokenId, results, function (err, list) {
				if (err) return next(err);
				return next(null, list);
			});
		});
	}

	this.vinDecode = function (tokenId, vin, next) {
		var request = require('request');
		var options = {
			'method': 'POST',
			'url': 'https://api.dataonesoftware.com/webservices/vindecoder/decode',
			'headers': { 'Content-Type': 'application/x-www-form-urlencoded' },
			form: {
				'access_key_id': __accessKeyId,
				'secret_access_key': __secretAccessKey,
				'decoder_query': '{ "decoder_settings" : { "display" : "full", "version" : "7.2.0", "styles" : "on", "style_data_packs" : {  "basic_data" : "on", "pricing" : "on", "engines" : "on", "transmissions" : "on", "standard_specifications" : "on", "standard_generic_equipment" : "on", "oem_options" : "off", "optional_generic_equipment" : "on", "colors" : "on", "warranties" : "on", "fuel_efficiency" : "on", "green_scores" : "on", "crash_test" : "on", "awards" : "on" }, "common_data" : "on", "common_data_packs" : {  "basic_data" : "on", "pricing" : "on", "engines" : "on", "transmissions" : "on", "standard_specifications" : "on", "standard_generic_equipment" : "on", "oem_options" : "on", "optional_generic_equipment" : "on", "colors" : "on", "warranties" : "on", "fuel_efficiency" : "on", "green_scores" : "on", "crash_test" : "on", "awards" : "on" } }, "query_requests" : { "Request-Sample" : { "vin" : "' + vin + '", "year" : "", "make" : "", "model" : "", "trim" : "", "model_number" : "", "package_code" : "", "drive_type" : "", "vehicle_type" : "", "body_type" : "", "body_subtype" : "", "doors" : "", "bedlength" : "", "wheelbase" : "", "msrp" : "", "invoice_price" : "", "engine" : { "description" : "", "block_type" : "", "cylinders" : "", "displacement" : "", "fuel_type" : "" }, "transmission" : { "description" : "", "trans_type" : "", "trans_speeds" : "" }, "optional_equipment_codes" : "", "installed_equipment_descriptions" : "", "interior_color" : { "description" : "", "color_code" : "" }, "exterior_color" : { "description" : "", "color_code" : "" } } }}'
			}
		};
		request(options, function (error, response) {
			if (error) next(new Error(error));
			return next(null, JSON.parse(response.body));
		});
	}
}
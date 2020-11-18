const { v4: uuidv4 } = require('uuid');
var async = require('async');

var HelperDAO = require(__base + "dao/core/helperdao");
var helperDao = new HelperDAO();

module.exports = VehicleDAO;

function VehicleDAO() {
	this.new = function (tokenId, dealerId, vin, next) {
		let self = this;
		helperDao.new(tokenId, "Vehicle", null, function (err, obj) {
			if (err) return next(err);
			obj.links = [];
			obj.dealerId = dealerId;
			obj.vin = vin;
			obj.timeline = [];
			var tl = new Object();
			tl.vin = vin;
			tl.dealerId = dealerId;
			tl.label = 'New';
			tl.timestamp = new Date();
			tl.value = 0;
			tl.targetId = '';
			tl.notes = '';
			obj.timeline.push(tl);
			self.vinDecode(tokenId, vin, function (err, r) {
				var data = r['query_responses']['Request-Sample']['us_market_data']['common_us_data'];
				obj.year = parseInt(data.basic_data.year);
				obj.make = data.basic_data.make;
				obj.model = data.basic_data.model;
				obj.trim = data.basic_data.trim;
				obj.vehicleType = data.basic_data.vehicle_type;
				obj.bodyType = data.basic_data.body_type;
				obj.doors = parseInt(data.basic_data.doors);
				obj.modelNumber = data.basic_data.model_number;
				obj.driveType = data.basic_data.drive_type;
				obj.plant = data.basic_data.plant;
				obj.msrp = parseFloat(data.pricing.msrp);
				obj.engineName = data.engines[0].name;
				obj.engineBrand = data.engines[0].brand;
				obj.fuelType = data.engines[0].fuel_type;
				obj.iceMaxHp = data.engines[0].ice_max_hp;
				obj.iceMaxHpAt = data.engines[0].ice_max_hp_at;
				obj.iceMaxTorque = data.engines[0].ice_max_torgue;
				obj.iceMaxTorqueAt = data.engines[0].ice_max_torgue_at;
				obj.maxPayload = data.engines[0].max_payload;
				obj.transmissionName = data.transmissions[0].name;
				obj.colorName = data.colors.exterior_colors[0].generic_color_name;
				obj.colorHex = data.colors.exterior_colors[0].primary_rgb_code.hex;
				obj.wholeSalePrice = 0;
				async.forEach(data.standard_specifications, function (ss, callback) {
					if (ss.specification_category === 'Weights and Capacities') {
						async.forEach(ss.specification_values, function (v, callback2) {
							if (v.specification_name === 'Base Towing Capacity') {
								obj.baseTowingCapacity = v.specification_value;
								callback2();
							} else if (v.specification_name === 'Gross Vehicle Weight Rating') {
								obj.grossWeight = parseFloat(v.specification_value);
								callback2();
							} else if (v.specification_name === 'Fuel Tank Capacity') {
								obj.fuelTankCapacity = parseFloat(v.specification_value);
								callback2();
							} else if (v.specification_name === 'Max Payload') {
								obj.maxPayload = v.specification_value;
								callback2();
							} else {
								callback2();
							}
						}, function (err) {
							callback();
						});
					} else {
						callback();
					}
				}, function (err) {
					return next(null, obj);
				});
			});
		});
	}

	this.checkDump = function (tokenId, vin, next) {

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
				obj.timeline = [];
				__con.query(tokenId, "SELECT `vin`, `dealerId`, `label`, `value`, UNIX_TIMESTAMP(`timestamp`) AS `epoch_time`, `targetId` FROM `VehicleTimeline` WHERE `vin`=? AND `dealerId`=? ORDER BY `timestamp`", [vin, dealerId], function (err, results) {
					if (err) return next(err);
					async.forEach(results, function (r, callback) {
						var o = new Object();
						o.vin = vin;
						o.dealerId = dealerId;
						o.timestamp = new Date(r.epoch_time * 1000);
						o.label = r.label;
						o.value = r.value;
						o.targetId = r.targetId;
						o.notes = r.notes;
						obj.timeline.push(o);
						callback();
					}, function (err) {
						return next(null, obj);
					});
				});
			});
		});
	}

	this.save = function (tokenId, vehicle, next) {
		var list = [];
		var primary = new Object();
		primary.dealerId = vehicle.dealerId;
		primary.vin = vehicle.vin;
		async.series([
			function (callback) {
				if (vehicle.wholeSalePrice === '') vehicle.wholeSalePrice = 0;
				helperDao.save(tokenId, "Vehicle", vehicle, primary, function (err, result) {
					if (err) console.log(JSON.stringify(err));
					callback();
				});
			},
			function (callback) {
				helperDao.delete(tokenId, "VehicleLinks", primary, function (err, result) {
					if (err) console.log(JSON.stringify(err));
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
						if (err) console.log(JSON.stringify(err));
						list.push(link);
						callback2();
					});
				}, function (err) {
					vehicle.links = list;
					callback();
				});
			},
			function (callback) {
				__con.query(tokenId, "DELETE FROM `VehicleTimeline` WHERE `vin`=? AND `dealerId`=?", [vehicle.vin, vehicle.dealerId], function (err, result) {
					if (err) return next(err);
					callback();
				});
			},
			function (callback) {
				async.forEach(vehicle.timeline, function (tl, callback2) {
					var date = new Date(tl.timestamp);
					var date2 = date.toISOString().slice(0, 19).replace('T', ' ');
					__con.query(tokenId, "INSERT INTO `VehicleTimeline` (`vin`, `dealerId`, `label`, `timestamp`, `value`, `targetId`, `notes`) VALUES (?, ?, ?, ?, ?, ?, ?)", [vehicle.vin, vehicle.dealerId, tl.label, date2, tl.value, tl.targetId, tl.notes], function (err, result) {
						if (err) return next(err);
						callback2();
					});
				}, function (err) {
					if (err) return next(err);
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
				helperDao.delete(tokenId, "VehicleTimeline", primary, function (err, result) {
					if (err) return next(err);
					return next(null, result);
				});
			});
		});
	}




	// this.chaka = function (tokenId, vin,next) {
	// 	var primary = new Object();
	// 	primary.tokenId = tokenId;
	// 	primary.vin = vin;
	// 	__con.query(tokenId, "DELETE FROM `Vehicle` WHERE `vin`=?", vin, function (err, results) {
	// 		if (err) return next(err);
	// 		var list = [];
	// 		async.forEach(results, function (r, callback) {
	// 			self.get(tokenId, r.vin, r.dealerId, function (err, v) {
	// 				if (err) return next(err);
	// 				list.push(v);
	// 				callback();
	// 			});
	// 		}, function (err) {
	// 			if (err) return next(err);
	// 			return next(null, list);
	// 		});
	// 	});
	// }

	this.chaka = function (tokenId, vin, next) {
		var sql = "DELETE FROM `Vehicle` WHERE `vin` = ?";

		console.log(sql)
		let self = this;
		__con.query(tokenId, sql , vin, function (err, results) {
			if (err) return next(err);
			var list = [];
			async.forEach(results, function (r, callback) {
				self.get(tokenId ,function (err, v) {
					if (err) return next(err);
					list.push(v);
					callback();
				});
			}, function (err) {
				if (err) return next(err);
				return next(null, list);
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
			var list = [];
			async.forEach(results, function (r, callback) {
				self.get(tokenId, r.vin, r.dealerId, function (err, v) {
					if (err) return next(err);
					list.push(v);
					callback();
				});
			}, function (err) {
				if (err) return next(err);
				return next(null, list);
			});
		});
	}

	this.vinDecode = function (tokenId, vin, next) {
		__con.query(tokenId, "SELECT * FROM `VehicleDump` WHERE `vin`=?", vin, function (err, result) {
			if (err) return next(err);
			if (result.length === 0) {
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
					__con.query(tokenId, "INSERT INTO `VehicleDump` (`vin`, `value`) VALUES (?, ?)", [vin, response.body], function (err, result) {
						if (err) return next(err);
						return next(null, JSON.parse(response.body));
					});
				});
			} else {
				return next(null, JSON.parse(result[0].value));
			}
		});
	}
}
var uuid = require("node-uuid");
var async = require('async');
module.exports = HelperDAO;

function HelperDAO() {
	this.new = function (tokenId, table, primary, next) {
		var sql = "DESC `" + table + "`";
		__con.query(tokenId, sql, function (err, results) {
			if (err) return next(err);
			var obj = new Object();
			async.forEach(results, function (r, callback) {
				var t = String(r.Type);
				if (t.includes('int')) {
					obj[r.Field] = 0;
					try {
						if (r.Default !== undefined && r.Default !== "null" && r.Default !== null) {
							obj[r.Field] = parseInt(String(r.Default));
						}
					} catch (err) { obj[r.Field] = 0; }
				} else if (t.includes('float') || t.includes('double') || t.includes('decimal')) {
					obj[r.Field] = 0;
					try {
						if (r.Default !== undefined && r.Default !== "null" && r.Default !== null) {
							obj[r.Field] = parseFloat(String(r.Default));
						}
					} catch (err) { obj[r.Field] = 0; }
				} else if (t.includes('boolean')) {
					obj[r.Field] = false;
				} else if (t.includes('date') || t.includes('time')) {
					obj[r.Field] = new Date();
				} else {
					obj[r.Field] = '';
					if (r.Default !== undefined && r.Default !== "null" && r.Default !== null) {
						obj[r.Field] = r.Default;
					}
				}
				callback();
			}, function (err) {
				if (primary !== null && primary !== undefined) {
					var pKeys = Object.keys(primary);
					async.forEach(pKeys, function (pk, callback2) {
						obj[pk] = primary[pk];
						callback2();
					}, function (err) {
						return next(null, obj);
					});
				} else {
					return next(null, obj);
				}
			});
		});
	}

	this.delete = function (tokenId, table, primary, next) {
		var keys = Object.keys(primary);
		var sql = "DELETE FROM `" + table + "` ";
		var isFirst = false;
		var params = [];
		async.forEach(keys, function (p, callback) {
			if (isFirst === true) {
				sql += "AND ";
			} else {
				sql += "WHERE ";
				isFirst = true;
			}
			sql += "`" + p + "` = ? ";
			params.push(primary[p]);
			callback();
		}, function (err) {
			if (isFirst === true) {
				__con.query(tokenId, sql, params, function (err, results) {
					if (err) return next(err);
					var obj = new Object();
					obj.message = "Deleted from " + table;
					return next(null, obj);
				});
			} else {
				return next(new Error("SQL Error"));
			}
		});
	}

	this.list = function (tokenId, table, primary, order = '', next) {
		let self = this;
		var keys = Object.keys(primary);
		var sql = "SELECT * FROM `" + table + "` ";
		var isFirst = false;
		var params = [];
		async.forEach(keys, function (p, callback) {
			if (isFirst === true) {
				sql += "AND ";
			} else {
				sql += "WHERE ";
				isFirst = true;
			}
			sql += "`" + p + "` = ? ";
			params.push(primary[p]);
			callback();
		}, function (err) {
			if (order !== undefined && order !== '') { sql += order; }
			if (isFirst === true) {
				__con.query(tokenId, sql, params, function (err, results) {
					if (err) return next(err);
					self.loadResults(tokenId, results, function (err, result) {
						if (err) return next(err);
						return next(null, result);
					});
				});
			} else {
				return next(new Error("SQL Error"));
			}
		});
	}

	this.get = function (tokenId, table, primary, next) {
		let self = this;
		var keys = Object.keys(primary);
		var sql = "SELECT * FROM `" + table + "` ";
		var isFirst = false;
		var params = [];
		async.forEach(keys, function (p, callback) {
			if (isFirst === true) {
				sql += "AND ";
			} else {
				sql += "WHERE ";
				isFirst = true;
			}
			sql += "`" + p + "` = ? ";
			params.push(primary[p]);
			callback();
		}, function (err) {
			if (isFirst === true) {
				__con.query(tokenId, sql, params, function (err, results) {
					if (err) return next(err);
					if (results.length === 0) return next(new Error("Not found"));
					self.loadResult(tokenId, results[0], function (err, result) {
						if (err) return next(err);
						return next(null, result);
					});
				});
			} else {
				return next(new Error("SQL Error"));
			}
		});
	}

	this.save = function (tokenId, table, obj, primary, next) {
		let self = this;
		var keys = Object.keys(primary);
		var sql = "SELECT * FROM `" + table + "` ";
		var isFirst = false;
		var params = [];
		async.forEach(keys, function (p, callback) {
			if (isFirst === true) {
				sql += "AND ";
			} else {
				sql += "WHERE ";
				isFirst = true;
			}
			sql += "`" + p + "` = ? ";
			params.push(primary[p]);
			callback();
		}, function (err) {
			if (isFirst === true) {
				__con.query(tokenId, sql, params, function (err, results) {
					if (err) return next(err);
					if (results.length === 0) {
						self.insert(tokenId, table, obj, function (err, result) {
							if (err) return next(err);
							return next(null, result);
						});
					} else {
						self.update(tokenId, table, obj, primary, function (err, result) {
							if (err) return next(err);
							return next(null, result);
						});
					}
				});
			} else {
				return next(new Error("SQL Error"));
			}
		});
	}

	this.update = function (tokenId, table, obj, primary, next) {
		var keys = Object.keys(obj);
		var sql = "UPDATE `" + table + "` ";
		var isFirst = false;
		var params = [];
		async.forEach(keys, function (k, callback) {
			if (typeof (obj[k]) === "boolean" || typeof (obj[k]) === "number" || typeof (obj[k]) === "bigint" || typeof (obj[k]) === "string") {
				if (isFirst === true) {
					sql += ", ";
				} else {
					sql += "SET ";
					isFirst = true;
				}
				sql += "`" + k + "` = ? ";
				params.push(obj[k]);
				callback();
			} else if (obj[k] instanceof Date) {
				if (isFirst === true) {
					sql += ", ";
				} else {
					sql += "SET ";
					isFirst = true;
				}
				sql += "`" + k + "` = ? ";
				params.push(obj[k]);
				callback();
			} else {
				callback();
			}
		}, function (err) {
			var pKeys = Object.keys(primary);
			isFirst = false;
			async.forEach(pKeys, function (p, callback2) {
				if (isFirst === true) {
					sql += "AND ";
				} else {
					sql += "WHERE ";
					isFirst = true;
				}
				sql += "`" + p + "` = ? ";
				params.push(primary[p]);
				callback2();
			}, function (err) {
				if (isFirst === true) {
					__con.query(tokenId, sql, params, function (err, results) {
						if (err) return next(err);
						return next(null, results);
					});
				} else {
					return next(new Error("SQL Error"));
				}
			});
		});
	}

	this.insert = function (tokenId, table, obj, next) {
		var keys = Object.keys(obj);
		var sql = "INSERT INTO `" + table + "` (";
		var tempSql = "VALUES (";
		var isFirst = false;
		var params = [];
		async.forEach(keys, function (k, callback) {
			if (typeof (obj[k]) === "boolean" || typeof (obj[k]) === "number" || typeof (obj[k]) === "bigint" || typeof (obj[k]) === "string") {
				if (isFirst === true) {
					sql += ", ";
					tempSql += ", ";
				} else {
					isFirst = true;
				}
				sql += "`" + k + "`";
				tempSql += "?";
				params.push(obj[k]);
				callback();
			} else if (obj[k] instanceof Date) {
				if (isFirst === true) {
					sql += ", ";
					tempSql += ", ";
				} else {
					isFirst = true;
				}
				sql += "`" + k + "`";
				tempSql += "?";
				params.push(obj[k]);
				callback();
			} else {
				callback();
			}
		}, function (err) {
			sql += ") " + tempSql + ") ";
			if (isFirst === true) {
				__con.query(tokenId, sql, params, function (err, results) {
					if (err) return next(err);
					return next(null, results);
				});
			} else {
				return next(new Error("SQL Error"));
			}
		});
	}

	this.loadResult = function (tokenId, result, next) {
		var obj = new Object();
		var keys = Object.keys(result);
		async.forEach(keys, function (k, callback) {
			obj[k] = result[k];
			callback();
		}, function (err) {
			return next(null, obj);
		});
	}

	this.loadResults = function (tokenId, results, next) {
		let self = this;
		var list = [];
		if (results === undefined || results.length === 0) {
			return next(null, list);
		} else {
			async.forEach(results, function (r, callback) {
				self.loadResult(tokenId, r, function (err, obj) {
					list.push(obj);
					callback();
				});
			}, function (err) {
				return next(null, list);
			});
		}
	}
}
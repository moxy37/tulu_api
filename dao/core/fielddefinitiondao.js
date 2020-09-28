/*
*  The Spartacus Rapid Prototyping Toolbox 
Copyright (C) 2016 Dean Brennan

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
* */
// var con = require(__base + 'dbGateway');
var async = require('async');
var uuid = require("node-uuid");

module.exports = FieldDefinitionDAO;

function FieldDefinitionDAO() {
    this.save = function (tokenId, obj, callback) {
        if (obj.isNew.toString() == "true") {
            this.create(tokenId, obj, callback);
        } else {
            this.update(tokenId, obj, callback);
        }
    }

    this.create = function (tokenId, obj, next) {
        var isTracked = 0;
        var newList = [];
        if (obj.isTracked.toString() === "true") { isTracked = 1; }
        async.series([
            function (callback) {
                __con.query(tokenId, "INSERT INTO `FieldDefinition` (`id`, `label`, `fieldDataType`, `isTracked`, `defaultValue`) VALUES (?, ?, ?, ?, ?)", [obj.id, obj.label, obj.fieldDataType, isTracked, obj.defaultValue], function (err, result) {
                    if (err) {
                        console.log("Added " + result.affectedRows + "into FieldDefinition");
                        return next(err);
                    }
                    obj.isNew = false;
                    callback();
                });
            },
            function (callback) {
                if (obj.fieldDataType === 6 || obj.fieldDataType === 8 || obj.fieldDataType === 9 || obj.fieldDataType === '6' || obj.fieldDataType === '8' || obj.fieldDataType === '9') {
                    __con.query(tokenId, "DELETE FROM `FieldDefinitionSelect` WHERE `fieldDefinitionId`=?", obj.id, function (err, result) {
                        console.log("Deleted from FieldDefinitionSelect");
                        if (err) return next(err);
                        callback();
                    });
                } else { callback(); }
            },
            function (callback) {
                if (obj.fieldDataType === 6 || obj.fieldDataType === 8 || obj.fieldDataType === 9 || obj.fieldDataType === '6' || obj.fieldDataType === '8' || obj.fieldDataType === '9') {
                    var index = 0;
                    async.forEach(obj.listOfValues, function (val, callback1) {
                        var FieldValueDAO = require(__base + "dao/core/fieldvaluedao");
                        var fvCon = new FieldValueDAO();
                        fvCon.save(tokenId, val, obj.fieldDataType, function (err, fv) {
                            if (err) return next(err);
                            newList.push(fv);
                            index++;
                            var FieldValueDAO1 = require(__base + "dao/core/fieldvaluedao");
                            var fvCon1 = new FieldValueDAO1();
                            fvCon1.saveSelect(tokenId, obj.id, val.id, obj.fieldDataType, index, function (err2) {
                                if (err2) return next(err);
                                callback1();
                            });
                        });
                    }, function (err) {
                        obj.listOfValues = newList;
                        callback();
                    });
                } else { callback(); }
            }
        ], function (err) {
            if (err) return next(err);
            return next(null, obj);
        });

    }

    this.update = function (tokenId, obj, next) {
        var isTracked = 0;
        var newList = [];
        if (obj.isTracked.toString() === "true") { isTracked = 1; }
        async.series([
            function (callback) {
                __con.query(tokenId, "UPDATE `FieldDefinition` SET `label`=?, `fieldDataType`=?, `isTracked`=?, `defaultValue`=? WHERE `id`=?", [obj.label, obj.fieldDataType, isTracked, obj.defaultValue, obj.id], function (err, result) {
                    if (err) {
                        console.log("Added " + result.affectedRows + "into FieldDefinition");
                        return next(err);
                    }
                    obj.isNew = false;
                    callback();
                });
            },
            function (callback) {
                if (obj.fieldDataType === 6 || obj.fieldDataType === 8 || obj.fieldDataType === 9 || obj.fieldDataType === '6' || obj.fieldDataType === '8' || obj.fieldDataType === '9') {
                    var sql = "DELETE FROM FieldValue";
                    if (obj.fieldDataType === 6) {
                        sql += "String ";
                    } else if (obj.fieldDataType === 8) {
                        sql += "Integer ";
                    } else {
                        sql += "Float ";
                    }
                    sql += "WHERE `id` IN (SELECT `valueId` FROM `FieldDefinitionSelect` WHERE `fieldDefinitionId`=?)";
                    __con.query(tokenId, sql, obj.id, function (err, results) {
                        callback();
                    });
                } else { callback(); }
            },
            function (callback) {
                if (obj.fieldDataType === 6 || obj.fieldDataType === 8 || obj.fieldDataType === 9 || obj.fieldDataType === '6' || obj.fieldDataType === '8' || obj.fieldDataType === '9') {
                    __con.query(tokenId, "DELETE FROM `FieldDefinitionSelect` WHERE `fieldDefinitionId`=?", obj.id, function (err, result) {
                        if (err) {
                            console.log("Deleted from FieldDefinitionSelect");
                            return next(err);
                        }
                        callback();
                    });
                } else { callback(); }
            },
            function (callback) {
                if (obj.fieldDataType === 6 || obj.fieldDataType === 8 || obj.fieldDataType === 9 || obj.fieldDataType === '6' || obj.fieldDataType === '8' || obj.fieldDataType === '9') {
                    var index = 0;
                    async.forEach(obj.listOfValues, function (val, callback1) {
                        var FieldValueDAO = require(__base + "dao/core/fieldvaluedao");
                        var fvCon = new FieldValueDAO();
                        val.isNew = true;
                        fvCon.save(tokenId, val, obj.fieldDataType, function (err, fv) {
                            if (err) return next(err);
                            newList.push(fv);
                            index++;
                            var FieldValueDAO1 = require(__base + "dao/core/fieldvaluedao");
                            var fvCon1 = new FieldValueDAO1();
                            fvCon1.saveSelect(tokenId, obj.id, val.id, obj.fieldDataType, index, function (err2) {
                                if (err2) return next(err2);
                                callback1();
                            });
                        });
                    }, function (err) {
                        obj.listOfValues = newList;
                        callback();
                    });
                } else { callback(); }
            }
        ], function (err) {
            if (err) return next(err);
            return next(null, obj);
        });
    }

    this.saveFieldDefs = function (tokenId, docDefId, fieldDefs, next) {
        var arr = new Array();
        for (var i = 0; i < fieldDefs.length; i++) {
            arr.push([docDefId, fieldDefs[i].id, i]);
        }
        __con.query(tokenId, "INSERT INTO `DocDefField` (`documentDefinitionId`, `fieldDefinitionId`, `sequence`) VALUES ?", [arr], function (err, result) {
            if (err) {
                console.log("Error saving" + err);
            }
            return next(null, fieldDefs);
        });
    }

    this.get = function (tokenId, id, next) {
        var o = __myCache.get(id);
        if (o !== undefined) {
            // console.log("Getting Cached fd " + o.label);
            return next(null, o);
        } else {
            __con.query(tokenId, "SELECT * FROM `FieldDefinition` WHERE `id`=?", id, function (err, result) {
                if (err) return next(err);
                var fd = new Object();
                var r = result[0];
                fd.id = r.id;
                fd.label = r.label;
                fd.isNew = false;
                fd.fieldDataType = r.fieldDataType;
                fd.isTracked = false;
                fd.defaultValue = r.defaultValue;
                fd.listOfValues = [];
                if (fd.fieldDataType === 6 || fd.fieldDataType === 8 || fd.fieldDataType === 9) {
                    var FieldDAO = require(__base + "dao/core/fielddao");
                    var fCon = new FieldDAO();
                    fCon.findSelect(tokenId, id, function (err, values) {
                        fd.listOfValues = values;
                        __myCache.set(id, fd, 0);
                        return next(null, fd);
                    });
                } else if (fd.fieldDataType === 11 || fd.fieldDataType === 12 || fd.fieldDataType === 13 || fd.fieldDataType === 14) {
                    fd.docDefs = [];
                    var arr = fd.defaultValue.split(';');
                    async.forEach(arr, function (a, callback) {
                        __con.query(tokenId, "SELECT * FROM `DocumentDefinition` WHERE `id`=?", a, function (err, result) {
                            if (err) return next(err);
                            if (result.length === 0) {
                                callback();
                            } else {
                                var o = new Object();
                                o.id = result[0].id;
                                o.name = result[0].label;
                                o.label = result[0].label;
                                fd.docDefs.push(o);
                                callback();
                            }
                        });
                    }, function (err) {
                        __myCache.set(id, fd, 0);
                        return next(null, fd);
                    });
                }
                else {
                    __myCache.set(id, fd, 0);
                    return next(null, fd);
                }
            });
        }
    }

    this.getAll = function (tokenId, next) {
        let self = this;
        __con.query(tokenId, "SELECT * FROM `FieldDefinition` ORDER BY `label`", function (err, results) {
            var list = [];
            async.forEach(results, function (r, callback) {
                self.get(tokenId, r.id, function (err, fd) {
                    list.push(fd);
                    callback();
                });
            }, function (err) {
                return next(null, list);
            });
        });
    }
    this.getFieldDefs = function (tokenId, docDefId, next) {
        let self = this;
        __con.query(tokenId, "SELECT * FROM `DocDefField` WHERE `documentDefinitionId`=? ORDER BY `sequence`", docDefId, function (err, results) {
            if (err) return next(err);
            var list = [];
            async.forEach(results, function (r, callback) {
                self.get(tokenId, r.fieldDefinitionId, function (err, fd) {
                    fd.sequence = r.sequence;
                    list.push(fd);
                    callback();
                });
            }, function (err) {
                return next(null, list);
            });
        });
    }

    this.getFieldDefByLabel = function (tokenId, label, next) {
        let self = this;
        __con.query(tokenId, "SELECT * FROM FieldDefinition WHERE `label`=?", label, function (err, result) {
            if (err) return next(err);
            if (result.length === 0) {
                return next(new Error("Not found"));
            } else {
                self.get(tokenId, result[0].id, function (err, fd) {
                    return next(null, fd);
                });
            }
        });
    }
}
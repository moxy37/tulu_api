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
var FieldDefinitionDAO = require(__base + "dao/core/fielddefinitiondao");
var fdCon = new FieldDefinitionDAO();
var uuid = require("node-uuid");
module.exports = FieldDAO;

function FieldDAO() {
    this.save = function (tokenId, obj, next) {
        if (obj.isNew === true || obj.isNew === 'true' || obj.isNew === 'True') {
            console.log("In Field Insert in Field COntroller");
            this.create(tokenId, obj, next);
        } else {
            console.log("In Field Update in Field COntroller");
            this.update(tokenId, obj, next);
        }
    }

    this.update = function (tokenId, obj, next) {
        async.series([
            function (callback) {
                var created_at = new Date();
                __con.query(tokenId, "UPDATE `Field` SET `fieldDefinitionId`=?, `documentId`=?, `valueId`=?, `sequence`=? WHERE `id`=?", [obj.fieldDefinition.id, obj.documentId, obj.value.id, obj.sequence, obj.id], function (err, result) {
                    if (err) { return next(err); }
                    obj.isNew = false;
                    callback();
                });
            },
            function (callback) {
                switch (parseInt(obj.fieldDefinition.fieldDataType)) {
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                        callback();
                        break;
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 10:
                    case 17:
                    case 18:
                        var FieldValueDAO = require(__base + "dao/core/fieldvaluedao");
                        var fvCon = new FieldValueDAO();
                        fvCon.save(tokenId, obj.value, obj.fieldDefinition.fieldDataType, function (err, fv) {
                            if (err) return next(err);
                            fv.isNew = false;
                            fv.fieldId = obj.id;
                            obj.value = fv;
                            obj.value.isNew = false;
                            callback();
                        });
                        break;
                    case 11:
                        callback();
                        break;
                    case 12:
                        if (obj.value !== undefined) {
                            var DocumentDAO = require(__base + "dao/core/documentdao");
                            var dCon = new DocumentDAO();
                            dCon.save(tokenId, obj.value, function (err, doc) {
                                if (err) return next(err);
                                obj.value = doc;
                                callback();
                            });
                        } else {
                            callback();
                        }
                        break;
                    case 13:
                        var GroupsDAO = require(__base + "dao/core/groupsdao");
                        var gCon = new GroupsDAO();
                        gCon.save(tokenId, obj.value, false, function (err, groups) {
                            if (err) return next(err);
                            obj.value = groups;
                            callback();
                        });
                        break;
                    case 14:
                        var GroupsDAO = require(__base + "dao/core/groupsdao");
                        var gCon = new GroupsDAO();
                        gCon.save(tokenId, obj.value, true, function (err, groups) {
                            if (err) return next(err);
                            obj.value = groups;
                            callback();
                        });
                        break;
                    default:
                        callback();
                        break;
                }
            }
        ], function (err) {
            if (err) return next(err);
            return next(null, obj);
        });
    }

    this.create = function (tokenId, obj, next) {
        async.series([
            function (callback) {
                var created_at = new Date();
                __con.query(tokenId, "INSERT INTO `Field` (`fieldDefinitionId`, `documentId`, `valueId`, `sequence`, `id`) VALUES (?, ?, ?, ?, ?)", [obj.fieldDefinition.id, obj.documentId, obj.value.id, obj.sequence, obj.id], function (err, result) {
                    if (err) { return next(err); }
                    obj.isNew = false;
                    callback();
                });
            },
            function (callback) {
                switch (parseInt(obj.fieldDefinition.fieldDataType)) {
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                        callback();
                        break;
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 10:
                    case 17:
                    case 18:
                        var FieldValueDAO = require(__base + "dao/core/fieldvaluedao");
                        var fvCon = new FieldValueDAO();
                        fvCon.save(tokenId, obj.value, obj.fieldDefinition.fieldDataType, function (err, fv) {
                            if (err) return next(err);
                            fv.isNew = false;
                            fv.fieldId = obj.id;
                            obj.value = fv;
                            obj.value.isNew = false;
                            callback();
                        });
                        break;
                    case 11:
                        callback();
                        break;
                    case 12:
                        if (obj.value !== undefined) {
                            var DocumentDAO = require(__base + "dao/core/documentdao");
                            var dCon = new DocumentDAO();
                            dCon.save(tokenId, obj.value, function (err, doc) {
                                if (err) return next(err);
                                obj.value = doc;
                                callback();
                            });
                        } else {
                            callback();
                        }
                        break;
                    case 13:
                        var GroupsDAO = require(__base + "dao/core/groupsdao");
                        var gCon = new GroupsDAO();
                        gCon.save(tokenId, obj.value, false, function (err, groups) {
                            if (err) return next(err);
                            obj.value = groups;
                            callback();
                        });
                        break;
                    case 14:
                        var GroupsDAO = require(__base + "dao/core/groupsdao");
                        var gCon = new GroupsDAO();
                        gCon.save(tokenId, obj.value, true, function (err, groups) {
                            if (err) return next(err);
                            obj.value = groups;
                            callback();
                        });
                        break;
                    default:
                        callback();
                        break;
                }
            }
        ], function (err) {
            if (err) return next(err);
            return next(null, obj);
        });
    }

    this.find = function (tokenId, element, next) {
        var obj = new Object();
        obj.id = uuid.v4();
        obj.documentId = '';
        obj.value = new Object();
        obj.fieldDefinition = new Object();
        obj.isNew = false;
        obj.sequence = 0;
        obj.history = [];
        var valueId = element.valueId;
        async.series([
            function (callback) {
                obj.sequence = element.sequence;
                obj.documentId = element.documentId;
                obj.isNew = false;
                obj.id = element.id;
                callback();
            },
            function (callback) {
                fdCon.get(tokenId, element.fieldDefinitionId, function (err, fd) {
                    obj.fieldDefinition = fd;
                    callback();
                });
            },
            function (callback) {
                switch (parseInt(obj.fieldDefinition.fieldDataType)) {
                    case 6:
                    case 8:
                    case 9:
                        var FieldValueDAO = require(__base + "dao/core/fieldvaluedao");
                        var fvCon = new FieldValueDAO();
                        fvCon.find(tokenId, valueId, obj.fieldDefinition.fieldDataType, function (err, fv) {
                            if (err) return next(err);
                            obj.value = fv;
                            callback();
                        });
                        break;
                    case 7:
                        callback();
                        break;
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 10:
                    case 17:
                    case 18:
                        var FieldValueDAO = require(__base + "dao/core/fieldvaluedao");
                        var fvCon = new FieldValueDAO();
                        fvCon.findHistory(tokenId, obj.id, obj.fieldDefinition.fieldDataType, function (err, history) {
                            if (err) return next(err);
                            obj.history = history;
                            if (history.length > 0) {
                                obj.value = history[0];
                                callback();
                            } else {
                                fvCon.find(tokenId, valueId, obj.fieldDefinition.fieldDataType, function (err, fv) {
                                    // console.log("Found fv");
                                    if (err) return next(err);
                                    obj.value = fv;
                                    callback();
                                });
                            }
                        });

                        break;
                    case 11:
                        var DocumentDAO = require(__base + "dao/core/documentdao");
                        var dCon = new DocumentDAO();
                        dCon.find(tokenId, valueId, function (err, doc) {
                            if (err) return next(err);
                            obj.value = doc;
                            callback();
                        });
                        break;
                    case 12:
                        var DocumentDAO = require(__base + "dao/core/documentdao");
                        var dCon = new DocumentDAO();
                        dCon.find(tokenId, valueId, function (err, doc) {
                            if (err) return next(err);
                            obj.value = doc;
                            callback();
                        });
                        break;
                    case 13:
                    case 14:
                        var GroupsDAO = require(__base + "dao/core/groupsdao");
                        var gCon = new GroupsDAO();
                        gCon.find(tokenId, valueId, function (err, groups) {
                            if (err) return next(err);
                            obj.value = groups;
                            callback();
                        });
                        break;
                    default:
                        this.value = new Object();
                        callback();
                        break;
                }
            }
        ], function (err) {
            if (err) return next(err);
            return next(null, obj);
        });
    }

    this.remove = function (tokenId, obj, next) {
        async.series([
            function (callback) {
                __con.query(tokenId, "DELETE FROM `Field` WHERE `id`=?", obj.id, function (err, result) {
                    if (err) { return next(err); }
                    callback();
                });
            },
            function (callback) {
                switch (parseInt(obj.fieldDefinition.fieldDataType)) {
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                        callback();
                        break;
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 10:
                    case 17:
                    case 18:
                        var FieldValueDAO = require(__base + "dao/core/fieldvaluedao");
                        var fvCon = new FieldValueDAO();
                        fvCon.remove(tokenId, obj.value.id, obj.fieldDefinition.fieldDataType, function (err) {
                            if (err) return next(err);
                            callback();
                        });
                        break;
                    case 11:
                        callback();
                        break;
                    case 12:
                        var DocumentDAO = require(__base + "dao/core/documentdao");
                        var dCon = new DocumentDAO();
                        dCon.removeDoc(tokenId, obj.value, function (err) {
                            if (err) return next(err);
                            callback();
                        });
                        break;
                    // callback();
                    // break;
                    case 13:
                        var GroupsDAO = require(__base + "dao/core/groupsdao");
                        var gCon = new GroupsDAO();
                        gCon.remove(tokenId, obj.value, false, function (err) {
                            if (err) return next(err);
                            callback();
                        });
                        break;
                    case 14:
                        var GroupsDAO = require(__base + "dao/core/groupsdao");
                        var gCon = new GroupsDAO();
                        gCon.remove(tokenId, obj.value, true, function (err) {
                            if (err) return next(err);
                            callback();
                        });
                        break;
                    default:
                        callback();
                        break;
                }
            }
        ], function (err) {
            if (err) return next(err);
            return next();
        });
    }

    this.findSelect = function (tokenId, fieldDefinitionId, next) {
        __con.query(tokenId, "SELECT * FROM `FieldDefinitionSelect` WHERE `fieldDefinitionId`=? ORDER BY `sequence`", fieldDefinitionId, function (err, result) {
            if (err) return next(err);
            // console.log("Found " + result.length + " results");
            var values = [];
            async.forEach(result, function (element, callback) {
                var FieldValueDAO = require(__base + "dao/core/fieldvaluedao");
                var fvCon = new FieldValueDAO();
                fvCon.find(tokenId, element.valueId, element.fieldDataType, function (err2, fv) {
                    if (err2) return next(err);
                    values.push(fv);
                    callback();
                });

            }, function (err) {
                if (err) return next(err);
                return next(null, values);
            });
        });
    }

    this.newWithFieldDef = function (tokenId, fieldDefinition, documentId, next) {
        var obj = new Object();
        obj.id = uuid.v4();
        obj.documentId = documentId;
        obj.value = new Object();
        obj.value.id = uuid.v4();
        obj.value.fieldId = obj.id;
        obj.value.isNew = true;
        obj.value.fieldDataType = fieldDefinition.fieldDataType;
        obj.value.timestamp = new Date();
        obj.fieldDefinition = fieldDefinition;
        obj.isNew = true;
        obj.sequence = 0;
        obj.history = [];
        obj.timestamp = new Date();
        if (fieldDefinition.fieldDataType === 13 || fieldDefinition.fieldDataType === 14) {
            obj.value = new Object();
            obj.value.id = uuid.v4();
            obj.value.entities = [];
            obj.value.isNew = true;
            return next(null, obj);
        } else if (fieldDefinition.fieldDataType === 11 || fieldDefinition.fieldDataType === 12) {
            var DocumentDefinitionDAO = require(__base + "dao/core/documentdefinitiondao");
            var ddCon = new DocumentDefinitionDAO();
            var DocumentDAO = require(__base + "dao/core/documentdao");
            var dCon = new DocumentDAO();
            ddCon.get(tokenId, fieldDefinition.defaultValue, function (err, dd) {
                dCon.newWithDocDef(tokenId, dd, function (err, doc) {
                    obj.value = doc;
                    return next(null, obj);
                });
            });
        } else {
            switch (fieldDefinition.fieldDataType) {
                case 0:
                case 10:
                case 17:
                case 18:
                    obj.value.value = fieldDefinition.defaultValue;
                    break;
                case 1:
                    obj.value.value = 0;
                    if (fieldDefinition.defaultValue !== '') {
                        obj.value.value = parseInt(fieldDefinition.defaultValue);
                    }
                    break;
                case 6:
                case 8:
                case 9:
                    if (fieldDefinition.defaultValue !== '') {
                        var index = parseInt(fieldDefinition.defaultValue);
                        if (index < fieldDefinition.listOfValues.length) {
                            obj.value = fieldDefinition.listOfValues[index];
                        }
                    }
                    if (obj.value === undefined) {
                        obj.value = fieldDefinition.listOfValues[0];
                    }
                    obj.value.fieldId = '';
                    break;
                case 2:
                    obj.value.value = 0;
                    if (fieldDefinition.defaultValue !== '') {
                        obj.value.value = parseFloat(fieldDefinition.defaultValue);
                    }
                    break;
                case 4:
                    if (fieldDefinition.defaultValue === '1') {
                        obj.value.value = true;
                    } else {
                        obj.value.value = false;
                    }
                    break;
                case 3:
                    obj.value.value = new Date();
                    break;

                default:
                    break;
            }
            return next(null, obj);
        }
    }
}
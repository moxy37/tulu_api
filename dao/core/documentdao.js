var FieldDAO = require(__base + "dao/core/fielddao");
var fCon = new FieldDAO();

var async = require('async');
var uuid = require("node-uuid");
var FieldDefinitionDAO = require(__base + "dao/core/fielddefinitiondao");
var fdCon = new FieldDefinitionDAO();

module.exports = DocumentDAO;

function DocumentDAO() {
    this.remove = function (tokenId, id, next) {
        let self = this;
        self.find(tokenId, id, function (err, doc) {
            if (err) return next(err);
            self.removeDoc(tokenId, doc, function (err) {
                if (err) return next(err);
                return next();
            });
        });
    }

    this.removeDoc = function (tokenId, obj, next) {
        if (obj === undefined) return next();
        try { __myCache.del(obj.id); } catch (er) { }
        async.series([
            function (callback) {
                __con.query(tokenId, "DELETE FROM `Document` WHERE `id`=?", obj.id, function (err, result) {
                    if (err) return next(err);
                    callback();
                });
            },
            function (callback) {
                async.forEachSeries(obj.fields, function (field, callback2) {
                    var FieldDAO = require(__base + "dao/core/fielddao");
                    var fCon = new FieldDAO();
                    fCon.remove(tokenId, field, function (err) {
                        if (err) return next(err);
                        callback2();
                    });
                }, function (err) {
                    if (err) return next(err);
                    callback();
                });
            }
        ], function (err) {
            if (err) return next(err);
            return next();
        });
    }

    this.find = function (tokenId, id, next) {
        var DocumentDefinitionDAO = require(__base + "dao/core/documentdefinitiondao");
        var ddCon = new DocumentDefinitionDAO();
        var o = __myCache.get(id);
        if (o !== undefined) {
            // console.log("Found Cached " + o.documentDefinition.label + " Document: " + o.tostring);
            return next(null, o);
        } else {
            var obj = new Object();
            obj.id = '';
            obj.isNew = true;
            obj.fields = [];
            obj.toString = '';
            obj.timestamp = new Date();
            obj.sequence = 0;
            obj.documentDefinition = new Object();
            var docDefId = '';
            async.series([
                function (callback) {
                    __con.query(tokenId, "SELECT * FROM `Document` WHERE `id`=?", id, function (err, result) {
                        if (err) return next(err);
                        if (result.length === 0) { return next(err); }
                        var r = result[0];
                        obj.id = r.id;
                        obj.isNew = false;
                        obj.fields = [];
                        obj.tostring = r.toString;
                        obj.toString = r.toString;
                        obj.timestamp = r.timestamp;
                        obj.sequence = 0;
                        docDefId = r.documentDefinitionId;
                        callback();
                    });
                }, function (callback) {
                    ddCon.get(tokenId, docDefId, function (err, dd) {
                        obj.documentDefinition = dd;
                        callback();
                    });
                }, function (callback) {
                    obj.fields = [];
                    async.forEach(obj.documentDefinition.fieldDefinitions, function (fd, callback2) {
                        fCon.newWithFieldDef(tokenId, fd, obj.id, function (err, f) {
                            f.sequence = obj.fields.length;
                            f.documentId = obj.id;
                            obj.fields.push(f);
                            callback2();
                        });
                    }, function (err) {
                        callback();
                    });
                }, function (callback) {
                    __con.query(tokenId, "SELECT * FROM `Field` WHERE `documentId`=? ORDER BY `sequence`", id, function (err, result) {
                        if (err) return next(err);
                        async.forEach(result, function (element, callback2) {
                            fCon.find(tokenId, element, function (err, field) {
                                field.sequence = element.sequence;
                                obj.fields[field.sequence] = field;
                                // obj.fields.push(field);
                                callback2();
                            });
                        }, function (err) {
                            if (err) return next(err);
                            callback();
                        });
                    });
                }
            ], function (err) {
                if (err) return next(err);
                if (obj !== undefined) {
                    if (obj.documentDefinition !== undefined) {
                        if (obj.documentDefinition.isCached === true) {
                            __myCache.set(obj.id, obj, 0);
                        }
                    }
                }
                return next(null, obj);
            });
        }
    }

    this.save = function (tokenId, obj, next) {
        if (obj.isNew === true || obj.isNew === 'True' || obj.isNew === 'true') {
            console.log("In Document Controller, Document Insert from Save");
            this.create(tokenId, obj, next);
        } else {
            console.log("In Document Controller, Document Update from Save");
            this.update(tokenId, obj, next);
        }
    }

    this.create = function (tokenId, obj, next) {
        var FieldDAO = require(__base + "dao/core/fielddao");
        var fCon = new FieldDAO();
        async.series([
            function (callback) {
                if (obj.toString === undefined || obj.toString === '') {
                    if (obj.fields !== undefined && obj.fields[0] !== undefined) {
                        if (obj.fields[0].value !== undefined) {
                            if (obj.fields[0].value.toString !== undefined) {
                                obj.toString = obj.fields[0].value.toString;
                            } else if (obj.fields[0].value.value !== undefined) {
                                obj.toString = String(obj.fields[0].value.value);
                            } else if (obj.fields[0].value.entities !== undefined) {
                                if (obj.fields[0].fieldDefinition !== undefined && obj.fields[0].fieldDefinition.label !== undefined) {
                                    obj.toString = obj.fields[0].fieldDefinition.label;
                                }
                            }
                        }
                    } else { obj.toString = obj.documentDefinition.label; }
                }
                callback();
            },
            function (callback) {
                var created_at = new Date();
                __con.query(tokenId, "INSERT INTO `Document` (`documentDefinitionId`, `toString`, `id`) VALUES (?, ?, ?)", [obj.documentDefinition.id, obj.toString, obj.id], function (err, result) {
                    if (err) return next(err);
                    console.log("Inserted " + result.affectedRows + " xinto Document");
                    obj.isNew = false;
                    callback();
                });
            },
            function (callback) {
                var fieldList = [];
                async.forEach(obj.fields, function (element, callback2) {
                    if (element === undefined) {
                        callback2();
                    } else {
                        fCon.save(tokenId, element, function (err, field) {
                            if (err) {
                                console.log("Error saving field for doc: " + JSON.stringify(element));
                                field = new Object();
                            }
                            field.isNew = false;
                            field.sequence = fieldList.length;
                            fieldList.push(field);
                            callback2();
                        });
                    }
                }, function (err) {
                    if (err) { return next(err); }
                    obj.fields = fieldList;
                    callback();
                });
            }
        ], function (err) {
            if (err) return next(err);
            if (obj !== undefined) {
                if (obj.documentDefinition !== undefined) {
                    if (obj.documentDefinition.isCached === true) {
                        __myCache.set(obj.id, obj, 0);
                    }
                }
            }
            return next(null, obj);
        });
    }

    this.update = function (tokenId, obj, next) {
        async.series([
            function (callback) {
                if (obj.toString === undefined || obj.toString === '') {
                    if (obj.fields !== undefined && obj.fields[0] !== undefined) {
                        if (obj.fields[0].value !== undefined) {
                            if (obj.fields[0].value.toString !== undefined) {
                                obj.toString = obj.fields[0].value.toString;
                            } else if (obj.fields[0].value.value !== undefined) {
                                obj.toString = String(obj.fields[0].value.value);
                            } else if (obj.fields[0].value.entities !== undefined) {
                                if (obj.fields[0].fieldDefinition !== undefined && obj.fields[0].fieldDefinition.label !== undefined) {
                                    obj.toString = obj.fields[0].fieldDefinition.label;
                                }
                            }
                        }
                    } else {
                        obj.toString = obj.documentDefinition.label;
                    }
                }
                callback();
            },
            function (callback) {
                var created_at = new Date();
                __con.query(tokenId, "UPDATE `Document` SET `documentDefinitionId`=?, `toString`=? WHERE `id`=?", [obj.documentDefinition.id, obj.toString, obj.id], function (err, result) {
                    if (err) return next(err);
                    console.log("Updated " + result.affectedRows + "into Document");
                    obj.isNew = false;
                    callback();
                });
            },
            function (callback) {
                async.forEach(obj.fields, function (element, callback2) {
                    element.documentId = obj.id;
                    fCon.save(tokenId, element, function (err, field) {
                        field.isNew = false;
                        obj.fields[field.sequence] = field;
                        callback2();
                    });
                }, function (err) {
                    if (err) { return next(err); }
                    callback();
                });
            }
        ], function (err) {
            if (err) return next(err);
            if (obj !== undefined) {
                if (obj.documentDefinition !== undefined) {
                    if (obj.documentDefinition.isCached === true) {
                        __myCache.set(obj.id, obj, 0);
                    }
                }
            }
            return next(null, obj);
        });
    }

    this.ensureUniqueByDefName = function (tokenId, label, value, next) {
        __con.query(tokenId, "SELECT * FROM FieldDefinition WHERE `label` = ?", label, function (err, result) {
            if (err) return next(err);
            if (result.length === 0) { return next(null, true); }
            var fdId = result[0].id;
            __con.query(tokenId, "SELECT * FROM `FieldValueString` fvs JOIN `Field` f ON fvs.`id`=f.`valueId` WHERE fvs.`value`=? AND f.`fieldDefinitionId`=?", [value, fdId], function (err, results) {
                if (err) { return next(err); }
                if (results.length === 0) { return next(null, true); }
                return next(null, false);
            });
        });
    }

    this.ensureUnique = function (tokenId, fieldDefinitionId, value, next) {
        __con.query(tokenId, "SELECT * FROM `FieldValueString` fvs JOIN `Field` f ON fvs.`id`=f.`valueId` WHERE fvs.`value`=? AND f.`fieldDefinitionId`=?", [value, fieldDefinitionId], function (err, results) {
            if (err) { return next(err); }
            if (results.length === 0) { return next(null, true); }
            return next(null, false);
        });
    }

    this.newByLabel = function (tokenId, label, next) {
        let self = this;
        var DocumentDefinitionDAO = require(__base + "dao/core/documentdefinitiondao");
        var ddCon = new DocumentDefinitionDAO();
        ddCon.getDocDefByLabel(tokenId, label, function (err, dd) {
            self.newWithDocDef(tokenId, dd, function (err, doc) {
                return next(null, doc);
            });
        });
    }

    this.newWithDocDef = function (tokenId, dd, next) {
        var doc = new Object();
        doc.id = uuid.v4();
        doc.fields = [];
        doc.toString = '';
        doc.tostring = '';
        doc.sequence = 0;
        doc.documentDefinition = dd;
        doc.isNew = true;
        async.forEach(dd.fieldDefinitions, function (fd, callback) {
            fCon.newWithFieldDef(tokenId, fd, doc.id, function (err, f) {
                f.sequence = doc.fields.length;
                doc.fields.push(f);
                callback();
            });
        }, function (err) {
            if (err) {
                console.log("Error making new field");
                return next(err);
            }
            return next(null, doc);
        });
    }

    this.new = function (tokenId, docDefId, next) {
        let self = this;
        ddCon.get(tokenId, docDefId, function (err, dd) {
            if (dd === undefined) {
                self.newByLabel(tokenId, docDefId, function (err, ddd) {
                    self.newWithDocDef(tokenId, ddd, function (err, doc) {
                        return next(null, doc);
                    });
                });
            } else {
                self.newWithDocDef(tokenId, dd, function (err, doc) {
                    return next(null, doc);
                });
            }

        });
    }


    this.packContainer = function (tokenId, doc, next) {
        let self = this;
        var obj = new Object();
        obj.id = doc.id;
        obj.doc = doc;
        async.forEach(doc.fields, function (field, callback) {
            switch (parseInt(field.fieldDefinition.fieldDataType)) {
                case 11:
                case 12:
                    self.packContainer(tokenId, field.value, function (err, c) {
                        obj[field.fieldDefinition.label] = c;
                        callback();
                    });
                    break;
                case 13:
                case 14:
                    obj[field.fieldDefinition.label] = [];
                    async.forEach(field.value.entities, function (d, callback2) {
                        self.packContainer(tokenId, d, function (err, c) {
                            obj[field.fieldDefinition.label].push(c);
                            callback2();
                        });
                    }, function (err) {
                        callback();
                    });
                    break;
                case 6:
                case 8:
                case 9:
                    obj[field.fieldDefinition.label] = field.value.value;
                    obj[field.fieldDefinition.label + '-list'] = [];
                    async.forEach(field.fieldDefinition.listOfValues, function (fv, callback2) {
                        obj[field.fieldDefinition.label + '-list'].push(fv.value);
                        callback2();
                    }, function (err) {
                        callback();
                    });
                    break;
                default:
                    obj[field.fieldDefinition.label] = field.value.value;
                    callback();
                    break;
            }
        }, function (err) {
            return next(null, obj);
        });
    }

    this.unpackContainer = function (tokenId, obj, next) {
        let self = this;
        var doc = obj.doc;
        var list = [];
        async.forEach(doc.fields, function (field, callback) {
            if (obj[field.fieldDefinition.label] !== undefined) {
                switch (parseInt(field.fieldDefinition.fieldDataType)) {
                    case 6:
                    case 8:
                    case 9:
                        async.forEach(field.fieldDefinition.listOfValues, function (fv, callback2) {
                            if (obj[field.fieldDefinition.label] === fv.value) {
                                field.value = fv;
                                callback2();
                            } else {
                                callback2();
                            }

                        }, function (err) {
                            field.sequence = list.length;
                            list.push(field);
                            callback();
                        });
                        break;
                    case 1:
                        field.value.value = parseInt(obj[field.fieldDefinition.label]);
                        field.sequence = list.length;
                        list.push(field);
                        callback();
                        break;
                    case 2:
                        field.value.value = parseFloat(obj[field.fieldDefinition.label]);
                        field.sequence = list.length;
                        list.push(field);
                        callback();
                        break;
                    case 0:
                    case 3:
                    case 5:
                    case 7:
                    case 10:
                    case 17:
                    case 18:
                        field.value.value = obj[field.fieldDefinition.label];
                        field.sequence = list.length;
                        list.push(field);
                        callback();
                        break;
                    case 4:
                        field.value.value = false;
                        if (str(obj[field.fieldDefinition.label]) === 'true' || str(obj[field.fieldDefinition.label]) === '1') { field.value.value = true; }
                        field.sequence = list.length;
                        list.push(field);
                        callback();
                        break;
                    case 11:
                    case 12:
                        self.unpackContainer(tokenId, obj[field.fieldDefinition.label], function (err, d) {
                            field.value = d;
                            field.sequence = list.length;
                            list.push(field);
                            callback();
                        });
                        break;
                    case 13:
                    case 14:
                        var entities = [];
                        async.forEach(obj[field.fieldDefinition.label], function (c, callback2) {
                            self.unpackContainer(tokenId, c, function (err, d) {
                                entities.push(d);
                                callback2();
                            });
                        }, function (err) {
                            field.value.entities = entities;
                            field.sequence = list.length;
                            list.push(field);
                            callback();
                        });
                        break;
                    default:
                        field.sequence = list.length;
                        list.push(field);
                        callback();
                        break;
                }
            } else {
                field.sequence = list.length;
                list.push(field);
                callback();
            }
        }, function (err) {
            doc.fields = list;
            var f = list[0];
            if (f !== undefined) {
                if (f.fieldDefinition.fieldDataType === 11 || f.fieldDefinition.fieldDataType === 12) {
                    doc.toString = f.value.toString;
                } else {
                    doc.toString = f.value.value;
                }
            }
            return next(null, doc);
        });
    }

    this.getListWithSearch = function (tokenId, label, fieldLabel, fieldValue, isPacked, next) {
        let self = this;
        var list = [];
        var DocumentDefinitionDAO = require(__base + "dao/core/documentdefinitiondao");
        var ddCon = new DocumentDefinitionDAO();
        ddCon.getDocDefByLabel(tokenId, label, function (err, dd) {
            if (err) return next(err);
            if (fieldLabel === undefined || fieldLabel === '') {
                sql = "SELECT * FROM `Document` WHERE `documentDefinitionId`=? ORDER BY `toString`";
                __con.query(tokenId, sql, dd.id, function (err, results) {
                    if (err) return next(err);
                    async.forEach(results, function (r, callback) {
                        self.find(tokenId, r.id, function (err, doc) {
                            if (err) return next(err);
                            if (isPacked === 'true') {
                                self.packContainer(tokenId, doc, function (err, o) {
                                    list.push(o);
                                    callback();
                                });
                            } else {
                                list.push(doc);
                                callback();
                            }
                        });
                    }, function (err) {
                        return next(null, list);
                    });
                });
            } else {
                fdCon.getFieldDefByLabel(tokenId, fieldLabel, function (err, fd) {
                    if (err) return next(err);
                    var sql = "";
                    if (fd.fieldDataType === 0 || fd.fieldDataType === 6 || fd.fieldDataType === 10 || fd.fieldDataType === 17 || fd.fieldDataType === 18) {
                        sql = "SELECT d.`id`, d.`toString` FROM `Document` d JOIN `Field` f ON d.`id`=f.`documentId` JOIN `FieldValueString` fvs ON f.`valueId`=fvs.`id` WHERE f.`fieldDefinitionId`='" + fd.id + "' AND d.`documentDefinitionId`='" + dd.id + "' AND fvs.`value`='" + fieldValue + "' ORDER BY d.`toString` ";
                    } else if (fd.fieldDataType === 1 || fd.fieldDataType === 9) {
                        sql = "SELECT d.`id`, d.`toString` FROM `Document` d JOIN `Field` f ON d.`id`=f.`documentId` JOIN `FieldValueInteger` fvs ON f.`valueId`=fvs.`id` WHERE f.`fieldDefinitionId`='" + fd.id + "' AND d.`documentDefinitionId`='" + dd.id + "' AND fvs.`value`=" + fieldValue + " ORDER BY d.`toString` ";
                    } else if (fd.fieldDataType === 2 || fd.fieldDataType === 8) {
                        sql = "SELECT d.`id`, d.`toString` FROM `Document` d JOIN `Field` f ON d.`id`=f.`documentId` JOIN `FieldValueFloat` fvs ON f.`valueId`=fvs.`id` WHERE f.`fieldDefinitionId`='" + fd.id + "' AND d.`documentDefinitionId`='" + dd.id + "' AND fvs.`value`=" + fieldValue + " ORDER BY d.`toString` ";
                    } else if (fd.fieldDataType === 11 || fd.fieldDataType === 12) {
                        sql = "SELECT d.`id`, d.`toString` FROM `Document` d JOIN `Field` f ON d.`id`=f.`documentId` JOIN `Document` fvs ON f.`valueId`=fvs.`id` WHERE f.`fieldDefinitionId`='" + fd.id + "' AND d.`documentDefinitionId`='" + dd.id + "' AND fvs.`id`='" + fieldValue + "' ORDER BY d.`toString` ";
                    } else if (fd.fieldDataType === 13 || fd.fieldDataType === 14) {
                        sql = "SELECT d.`id`, d.`toString` FROM `Document` d JOIN `Field` f ON d.`id`=f.`documentId` LEFT JOIN `Groups` fvs ON f.`valueId`=fvs.`id` WHERE f.`fieldDefinitionId`='" + fd.id + "' AND d.`documentDefinitionId`='" + dd.id + "' AND fvs.`entityId`='" + fieldValue + "' ORDER BY d.`toString` ";
                    }
                    if (sql === '') {
                        return next(null, list);
                    } else {
                        __con.query(tokenId, sql, function (err, results) {
                            if (err) return next(err);
                            async.forEach(results, function (r, callback) {
                                self.find(tokenId, r.id, function (err, doc) {
                                    if (err) return next(err);
                                    if (isPacked === 'true') {
                                        self.packContainer(tokenId, doc, function (err, o) {
                                            list.push(o);
                                            callback();
                                        });
                                    } else {
                                        list.push(doc);
                                        callback();
                                    }
                                });
                            }, function (err) {
                                return next(null, list);
                            });
                        });
                    }
                });
            }
        });
    }

    this.checkTokens = function () {
        var keys = Object.keys(__currentTokens);
        var endTime = new Date();
        async.forEach(keys, function (key, callback) {
            var startTime = __currentTokens[key].timestamp;
            var difference = endTime.getTime() - startTime.getTime();
            if (difference > __defaultSessionTime) {
                if (__userToTokens[__currentTokens[key].userId] !== undefined) {
                    delete __userToTokens[__currentTokens[key].userId];
                }
                callback();
            }
        }, function (err) {
            return "OK";
        });
    }

    this.login = function (username, password, next) {
        var tokenId = uuid.v4();
        let self = this;
        var sql = "SELECT * FROM UserLoginView WHERE `email`=? AND `password`=? ";
        __con.query(tokenId, sql, [username, password], function (err, results) {
            if (err) {
                console.log("Error Running Report: " + err.message);
                return next(err);
            }
            if (results.length === 0) {
                console.log("Error Logging In");
                return next(new Error("Error Logging In"));
            }
            var id = results[0].userId;
            self.find(tokenId, id, function (err, doc) {
                self.packContainer(tokenId, doc, function (err, user) {
                    if (err) {
                        console.error(err.stack);
                        return next(err);
                    }
                    if (__userToTokens[user.id] !== undefined) {
                        user.tokenId = __userToTokens[user.id];
                    } else {
                        user.tokenId = uuid.v4();
                    }
                    if (__userToTokens[user.id] !== undefined) {
                        if (__currentTokens[__userToTokens[user.id]] !== undefined) { delete __currentTokens[__userToTokens[user.id]]; }
                        delete __userToTokens[user.id];
                    }
                    __currentTokens[user.tokenId] = new Object();
                    __currentTokens[user.tokenId].user = user;
                    __currentTokens[user.tokenId].timestamp = new Date();
                    __userToTokens[user.id] = user.tokenId;
                    return next(null, user);
                });
            });
        });
    }
}
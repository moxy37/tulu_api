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
module.exports = GroupsDAO;

function GroupsDAO() {
    this.find = function(tokenId, id, next) {
        __con.query(tokenId, "SELECT * FROM `Groups` WHERE `id`=? ORDER BY `sequence`", id, function(err, result) {
            if (err) return next(err);
            var obj = new Object();
            obj.id = id;
            obj.isNew = false;
            obj.entities = [];
            if (result.length == 0) {
                return next(null, obj);
            }
            var DocumentDAO = require(__base + "dao/core/documentdao");
            var dCon = new DocumentDAO();
            async.forEachSeries(result, function(element, callback) {
                dCon.find(tokenId, element.entityId, function(err, doc) {
                    if (err) return callback(err);
                    doc.isNew = false;
                    doc.sequence = obj.entities.length;
                    obj.entities.push(doc);
                    callback();
                });
            }, function(err) {
                if (err) return next(err);
                return next(null, obj);
            });
        });
    }

    this.remove = function(tokenId, obj, saveDocs, next) {
        async.series([
            function(callback) {
                __con.query(tokenId, "DELETE FROM `Groups` WHERE `id`=?", obj.id, function(err, result) {
                    if (err) return next(err);
                    callback();
                });
            },
            function(callback) {
                if (saveDocs === true) {
                    async.forEachSeries(obj.entities, function(element, callback2) {
                        var DocumentDAO = require(__base + "dao/core/documentdao");
                        var dCon = new DocumentDAO();
                        dCon.removeDoc(tokenId, element, function(err) {
                            if (err) return next(err);
                            callback2();
                        });
                    }, function(err) {
                        if (err) return next(err);
                        callback();
                    });
                } else {
                    callback();
                }
            }
        ], function(err) {
            if (err) return next(err);
            return next();
        });
    }

    this.save = function(tokenId, obj, saveDocs, next) {
        obj.isNew = false;
        var newEntities = [];
        var insertGroups = [];
        var oldIds = [];
        var DocumentDAO = require(__base + "dao/core/documentdao");
        var dCon = new DocumentDAO();
        async.series([
            function(callback) {
                //First check to see if we've any orphans to remove
                __con.query(tokenId, "SELECT * FROM `Groups` WHERE `id`=?", obj.id, function(err, result) {
                    if (err) return next(err);
                    async.forEach(result, function(r, callback) {
                        oldIds.push(r.entityId);
                        callback();
                    }, function(err) {
                        if (err) return next(err);
                        callback();
                    });
                });
            },
            function(callback) {
                //Delete the old ones
                __con.query(tokenId, "DELETE FROM `Groups` WHERE `id`=?", obj.id, function(err, result) {
                    if (err) return next(err);
                    console.log("Deleted " + result.affectedRows + " from Groups");
                    callback();
                });
            },
            function(callback) {
                async.forEach(obj.entities, function(element, callback2) {
                    var i = insertGroups.length;
                    insertGroups.push([obj.id, element.id, i]);
                    var oldIndex = oldIds.indexOf(element.id);
                    if (oldIndex !== -1) {
                        oldIds.splice(oldIndex, 1);
                    }
                    callback2();
                }, function(err) {
                    if (err) return next(err);
                    if (insertGroups.length > 0) {
                        __con.query(tokenId, "INSERT INTO `Groups` (`id`, `entityId`, `sequence`) VALUES ? ", [insertGroups], function(err, result) {
                            if (err) return next(err);
                            callback();
                        });
                    } else {
                        callback();
                    }
                });
            },
            function(callback) {
                if (saveDocs === true) {
                    async.forEach(obj.entities, function(element, callback2) {
                        dCon.save(tokenId, element, function(err, doc) {
                            if (err) return next(err);
                            newEntities.push(doc);
                            callback2();
                        });
                    }, function(err) {
                        if (err) return next(err);
                        obj.entities = newEntities;
                        callback();
                    });
                } else {
                    callback();
                }
            },
            function(callback) {
                if (saveDocs === true) {
                    async.forEach(oldIds, function(docId, callback2) {
                        dCon.find(tokenId, docId, function(err, doc) {
                            if (err) return next(err);
                            dCon.removeDoc(tokenId, doc, function(err) {
                                if (err) return next(err);
                                callback2();
                            });
                        });
                    }, function(err) {
                        if (err) return next(err);
                        callback();
                    });
                } else {
                    callback();
                }
            }
        ], function(err) {
            if (err) return next(err);
            return next(null, obj);
        });
    }
}
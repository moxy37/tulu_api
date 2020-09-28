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
var async = require("async");
var FieldDefinitionDAO = require(__base + "dao/core/fielddefinitiondao");
var fdCon = new FieldDefinitionDAO();
var DocumentDAO = require(__base + "dao/core/documentdao");
var dCon = new DocumentDAO();

module.exports = DocumentDefinitionDAO;

function DocumentDefinitionDAO() {
  this.save = function (tokenId, obj, callback) {
    if (obj.isNew.toString() == "true") {
      this.create(tokenId, obj, callback);
    } else {
      this.update(tokenId, obj, callback);
    }
  }

  this.create = function (tokenId, obj, callback) {
    var isCached = 0;
    if (obj.isCached.toString() === "true") { isCached = 1; }
    async.series([
      function (callback) {
        var customToString = "";
        if (obj.customToString !== undefined) { customToString = obj.customToString; }
        __con.query(tokenId, "INSERT INTO `DocumentDefinition` (`id`, `label`, `isCached`, `customToString`) VALUES (?, ?, ?, ?)", [obj.id, obj.label, isCached, customToString], function (err, result) {
          if (err) return callback(err);
          console.log("Updated " + result.affectedRows + "into DocumentDefinition");
          obj.isNew = false;
          callback();
        });
      },
      function (callback) {
        __con.query(tokenId, "DELETE FROM `DocDefField` WHERE `documentDefinitionId` = ?", obj.id, function (err, result) {
          if (err) return callback(err);
          console.log("Deleted " + result.affectedRows + "from DocDefField");
          callback();
        });
      }, function (callback) {
        var arr = new Array();
        for (var i = 0; i < obj.fieldDefinitions.length; i++) { arr.push([obj.id, obj.fieldDefinitions[i].id, i]); }
        __con.query(tokenId, "INSERT INTO `DocDefField` (`documentDefinitionId`, `fieldDefinitionId`, `sequence`) VALUES ?", [arr], function (err, result) {
          if (err) return callback(err);
          console.log("Inserted " + result.affectedRows + "into DocDefField");
          callback();
        });
      },
    ], function (err) {
      if (err) return next(err);
      return callback(null, obj);
    });
  }

  this.update = function (tokenId, obj, callback) {
    var isCached = 0;
    if (obj.isCached.toString() === "true") { isCached = 1; }
    var oldFds = [];
    var newFds = [];
    async.series([
      function (callback) {
        var customToString = "";
        if (obj.customToString !== undefined) { customToString = obj.customToString; }
        __con.query(tokenId, "UPDATE `DocumentDefinition` SET `label`=?, `isCached`=?, `customToString`=? WHERE `id`=?", [obj.label, isCached, customToString, obj.id], function (err, result) {
          if (err) return callback(err);
          console.log("Updated " + result.affectedRows + "into DocumentDefinition");
          obj.isNew = false;
          callback();
        });
      },
      function (callback) {
        __con.query(tokenId, "SELECT * FROM `DocDefField` WHERE `documentDefinitionId` = ?", obj.id, function (err, result) {
          if (err) return callback(err);
          result.forEach(function (r) {
            oldFds.push(r.fieldDefinitionId);
          });
          callback();
        });
      }, function (callback) {
        async.forEach(obj.fieldDefinitions, function (fd, callback) {
          var index = oldFds.indexOf(fd.id);
          if (index !== -1) { oldFds.splice(index, 1); } else { newFds.push(fd); }
          callback();
        }, function (err) {
          callback();
        });
      },
      function (callback) {
        if (oldFds.length > 0) {
          async.forEach(oldFds, function (id, callback) {
            fdCon.get(tokenId, id, function (err, fd) {
              if (fd !== undefined) {
                switch (fd.fieldDataType) {
                  case 6:
                  case 7:
                  case 8:
                  case 9:
                    __con.query(tokenId, "DELETE FROM `Field` WHERE `fieldDefinitionId`=?", id, function (err, result) {
                      if (err) return callback(err);
                      callback();
                    });
                    break;
                  case 0:
                  case 10:
                  case 17:
                    __con.query(tokenId, "DELETE FROM Field WHERE fieldDefinitionId=?", id, function (err, result) {
                      if (err) return callback(err);
                      __con.query(tokenId, "DELETE FROM FieldValueString WHERE id NOT IN (SELECT valueId FROM Field) AND fieldId<>'' AND fieldDataType<>6", function (err, result) {
                        if (err) return callback(err);
                        callback();
                      });
                    });
                    break;
                  case 1:
                    __con.query(tokenId, "DELETE FROM `Field` WHERE `fieldDefinitionId`=?", id, function (err, result) {
                      if (err) return callback(err);
                      __con.query(tokenId, "DELETE FROM `FieldValueInteger` WHERE `id` NOT IN (SELECT `valueId` FROM `Field`) AND `fieldId`<>'' AND `fieldDataType`<>9", function (err, result) {
                        if (err) return callback(err);
                        callback();
                      });
                    });
                    break;
                  case 2:
                    __con.query(tokenId, "DELETE FROM `Field` WHERE `fieldDefinitionId`=?", id, function (err, result) {
                      if (err) return callback(err);
                      __con.query(tokenId, "DELETE FROM `FieldValueFloat` WHERE `id` NOT IN (SELECT `valueId` FROM `Field`) AND `fieldId`<>'' AND `fieldDataType`<>8", function (err, result) {
                        if (err) return callback(err);
                        callback();
                      });
                    });
                    break;
                  case 3:
                    __con.query(tokenId, "DELETE FROM `Field` WHERE `fieldDefinitionId`=?", id, function (err, result) {
                      if (err) return callback(err);
                      __con.query(tokenId, "DELETE FROM `FieldValueDateTime` WHERE `id` NOT IN (SELECT `valueId` FROM `Field`) AND `fieldId`<>''", function (err, result) {
                        if (err) return callback(err);
                        callback();
                      });
                    });
                    break;
                  case 4:
                    __con.query(tokenId, "DELETE FROM `Field` WHERE `fieldDefinitionId`=?", id, function (err, result) {
                      if (err) return callback(err);
                      __con.query(tokenId, "DELETE FROM `FieldValueBit` WHERE `id` NOT IN (SELECT `valueId` FROM `Field`) AND `fieldId`<>''", function (err, result) {
                        if (err) return callback(err);
                        callback();
                      });
                    });
                    break;
                  case 5:
                    __con.query(tokenId, "DELETE FROM `Field` WHERE `fieldDefinitionId`=?", id, function (err, result) {
                      if (err) return callback(err);
                      callback();
                    });
                    break;
                  case 11:
                    callback();
                    break;
                  case 12:
                    callback();
                    break;
                  case 13:
                    __con.query(tokenId, "DELETE FROM `Field` WHERE `fieldDefinitionId`=?", id, function (err, result) {
                      if (err) return callback(err);
                      __con.query(tokenId, "DELETE FROM `Groups` WHERE `id` NOT IN (SELECT `valueId` FROM `Field`)", function (err, result) {
                        if (err) return callback(err);
                        callback();
                      });
                    });
                    break;
                  case 14:
                    __con.query(tokenId, "DELETE FROM `Field` WHERE `fieldDefinitionId`=?", id, function (err, result) {
                      if (err) return callback(err);
                      var docIds = [];
                      async.series([
                        function (callback) {
                          __con.query(tokenId, "SELECT * FROM `Groups` WHERE `id` NOT IN (SELECT `valueId` FROM `Field`)", function (err, result) {
                            if (err) return callback(err);
                            result.forEach(function (r) {
                              docIds.push(r.entityId);
                            });
                            callback();
                          });
                        }, function (callback) {
                          async.forEach(docIds, function (docId, callback) {
                            var DocumentDAO = require(__base + "dao/core/documentdao");
                            var dCon = new DocumentDAO();
                            dCon.remove(tokenId, docId, function (err) {
                              if (err) { return callback(err); }
                              callback();
                            });
                          }, function (err) {
                            if (err) return callback(err);
                            callback();
                          });
                        },
                      ], function (err) {
                        if (err) return callback(err);
                        __con.query(tokenId, "DELETE FROM `Groups` WHERE `id` NOT IN (SELECT `valueId` FROM `Field`)", function (err, result) {
                          if (err) return callback(err);
                          callback();
                        });
                      });
                    });
                    break;
                  default:
                    callback();
                    break;
                }
              }
            });
          },
            function (err) {
              callback();
            });
        } else { callback(); }
      },
      function (callback) {
        __con.query(tokenId, "DELETE FROM `DocDefField` WHERE `documentDefinitionId` = ?", obj.id, function (err, result) {
          if (err) return callback(err);
          console.log("Deleted " + result.affectedRows + "from DocDefField");
          callback();
        });
      },
      function (callback) {
        var arr = new Array();
        for (var i = 0; i < obj.fieldDefinitions.length; i++) { arr.push([obj.id, obj.fieldDefinitions[i].id, i]); }
        __con.query(tokenId, "INSERT INTO `DocDefField` (`documentDefinitionId`, `fieldDefinitionId`, `sequence`) VALUES ?", [arr],
          function (err, result) {
            if (err) return callback(err);
            console.log("Inserted " + result.affectedRows + "into DocDefField");
            callback();
          });
      },
    ], function (err) {
      if (err) return next(err);
      return callback(null, obj);
    });
  }

  this.getAllDocDefs = function (tokenId, next) {
    let self = this;
    __con.query(tokenId, "SELECT * FROM `DocumentDefinition`", function (err, result) {
      if (err) return next(err);
      if (result.length == 0) {
        err = new Error("Could not find DocumentDefs");
        return next(err);
      }
      var dds = [];
      async.forEach(result, function (element, callback) {
        self.get(tokenId, element.id, function (err, dd) {
          dds.push(dd);
          callback();
        });
      }, function (err) {
        if (err) { console.log("Errors"); }
        return next(null, dds);
      });
    });
  }

  this.getAll = function (tokenId, next) {
    // __myCache = new NodeCache();
    var list = [];
    let self = this;

    __con.query(tokenId, "SELECT * FROM `DocumentDefinition`", function (err, results) {
      async.forEach(results, function (r, callback) {
        self.get('', r.id, function (err, dd) {
          list.push(dd);
          if (dd.isCached === true) {
            __con.query(tokenId, "SELECT * FROM `Document` WHERE `documentDefinitionId`=?", dd.id, function (err, result) {
              async.forEach(result, function (rr, callback2) {
                dCon.find(tokenId, rr.id, function (err, doc) {
                  callback2();
                });
              }, function (err) {
                callback();
              });
            });
          } else {
            callback();
          }
        });
      }, function (err) {
        return next(null, list);
      });
    });
  }

  this.get = function (tokenId, id, next) {
    var o = __myCache.get(id);
    if (o !== undefined) {
      // console.log("Getting Cached dd " + o.label);
      return next(null, o);
    } else {
      __con.query(tokenId, "SELECT * FROM `DocumentDefinition` WHERE `id` = ? ", id, function (err, result) {
        var dd = new Object();
        var r = result[0];
        dd.id = r.id;
        dd.isNew = false;
        dd.label = r.label;
        dd.fieldDefinitions = [];
        dd.isCached = false;
        if (r.isCached === 1) { dd.isCached = true; }
        dd.customToString = r.customToString;
        fdCon.getFieldDefs(tokenId, dd.id, function (err, list) {
          dd.fieldDefinitions = list;
          __myCache.set(id, dd, 0);
          return next(null, dd);
        });
      });
    }
  }

  this.findByDocDefId = function (tokenId, docDefId, searchString, next) {
    __con.query(tokenId, "SELECT * FROM `Document` WHERE `documentDefinitionId`=? AND `toString` LIKE '%" + searchString + "%' ORDER BY `toString`", docDefId, function (err, result) {
      if (err) return next(err);
      if (result.length === 0) {
        // err = new Error("Could not find Document with ID: " + id);
        return next(err);
      }
      // console.log("Found some docs");
      var docs = [];
      async.forEach(result, function (element, callback) {
        var o = new Object();
        o.id = element.id;
        o.toString = element.toString;
        docs.push(o);
        callback();
      }, function (err) {
        return next(null, docs);
      });
    });
  }

  this.findDocsByDocDefLabel = function (tokenId, label, parentId, callback) {
    var sql = "SELECT * FROM `Document` WHERE `documentDefinitionId` IN (SELECT `id` FROM `DocumentDefinition` WHERE `label` LIKE '%" + label + "%') ORDER BY `toString`";
    if (parentId !== undefined && parentId !== null) {
      sql = "SELECT g.entityId AS `id` FROM `Field` f LEFT JOIN `Groups` g ON f.valueId=g.Id JOIN `Document` d ON g.entityId=d.id JOIN `FieldDefinition` fd ON f.fieldDefinitionId=fd.id JOIN `Document` dd ON f.documentId=dd.id WHERE fd.`label`='" + label + "' AND dd.`id`='" + parentId + "' ";
    }
    __con.query(tokenId, sql, function (err, result) {
      if (err) return callback(err);
      if (result.length === 0) {
        // err = new Error("Could not find Document with ID: " + id);
        return callback(err);
      }
      // console.log("Found some docs");
      var docs = [];
      var DocumentDAO = require(__base + "dao/core/documentdao");
      var dCon = new DocumentDAO();
      async.forEach(result, function (element, callback) {
        dCon.find(tokenId, element.id, function (err, doc) {
          if (err) return callback(err);
          docs.push(doc);
          callback();
        });
      }, function (err) {
        if (err) return callback(err);
        return callback(null, docs);
      });
    });
  }

  this.getDocDefByLabel = function (tokenId, label, next) {
    let self = this;
    __con.query(tokenId, "SELECT * FROM `DocumentDefinition` WHERE `label`=? ", label, function (err, results) {
      if (err) return next(err);
      if (results.length === 0) return next(err);
      var id = results[0].id;
      self.get(tokenId, id, function (err, dd) {
        return next(null, dd);
      });
    });
  }

  this.searchByDocDef = function (tokenId, docDefId, searchString, groupsId, callback) {
    __con.query(tokenId, "SELECT * FROM `Document` WHERE `documentDefinitionId`=? AND `toString` LIKE '%" + searchString + "%' AND `id` NOT IN (SELECT `entityId` FROM `Groups` WHERE `id`=?) ORDER BY `toString`", [docDefId, groupsId], function (err, result) {
      if (err) return callback(err);
      if (result.length == 0) {
        // err = new Error("Could not find Document with ID: " + id);
        return callback(err);
      }
      // console.log("Found some docs");
      var docs = [];
      result.forEach(function (element) {
        var temp = new Object();
        temp.id = element.id;
        temp.toString = element.toString;
        docs.push(temp);
      });
      return callback(null, docs);
    });
  }
}

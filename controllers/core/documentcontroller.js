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
var express = require("express");
var async = require("async");

global.__cachedDocs = new Object();
global.__ccc = require(__base + "dbConnection");
global.__con = require(__base + "dbGateway");
router = express.Router();

const NodeCache = require("node-cache");
global.__myCache = new NodeCache();

var DocumentDAO = require(__base + "dao/core/documentdao");
var dCon = new DocumentDAO();
var DocumentDefinitionDAO = require(__base + "dao/core/documentdefinitiondao");
var ddCon = new DocumentDefinitionDAO();

router.put("/api/document/list/pack", function (req, res) {
  var obj = req.body;
  var tokenId = obj.tokenId;
  if (__currentTokens[tokenId] !== undefined) {
    __currentTokens[tokenId].timestamp = new Date();
    ddCon.findDocsByDocDefLabel(tokenId, obj.label, obj.parentId, function (err, docs) {
      if (err) {
        console.error(err.stack);
        return res.status(404).send("Error");
      }
      var list = [];
      async.forEach(docs, function (doc, callback) {
        dCon.packContainer(tokenId, doc, function (err, d) {
          list.push(d);
          callback();
        });
      }, function (err) {
        return res.send(list);
      });
    });
  } else { return res.status(400).send("Invalid tokenId"); }
});

router.put("/api/document/get/packed", function (req, res) {
  var obj = req.body;
  var tokenId = obj.tokenId;
  var id = obj.id;
  var isPacked = obj.isPacked;
  if (__currentTokens[tokenId] !== undefined) {
    __currentTokens[tokenId].timestamp = new Date();
    dCon.find(tokenId, id, function (err, doc) {
      if (err) {
        console.error(err.stack);
        return res.status(404).send(err.message);
      }
      if (doc.toString === undefined) { doc.toString = ''; }
      if (doc.toString === undefined || doc.toString === "") {
        doc.toString = doc.fields[0].value.value;
        console.log(doc.toString);
      }
      if (isPacked === undefined || isPacked === 'true') {
        dCon.packContainer(tokenId, doc, function (err, o) {
          return res.send(o);
        });
      } else {
        return res.send(doc);
      }
    });
  } else { return res.status(400).send("Invalid tokenId"); }
});

router.put("/api/document/save/packed", function (req, res) {
  var obj = req.body;
  var ddd = obj.doc;
  var tokenId = obj.tokenId;
  dCon.unpackContainer(tokenId, ddd, function (err, data) {
    dCon.save(tokenId, data, function (err, doc) {
      if (err) {
        console.error(err.stack);
        res.status(400).send(err.message);
      }
      dCon.packContainer(tokenId, doc, function (err, o) {
        return res.send(o);
      });
    });
  });
});

router.put("/api/document/save", function (req, res) {
  var obj = req.body;
  var tokenId = obj.tokenId;
  if (__currentTokens[tokenId] !== undefined || tokenId === "OVERRIDE") {
    if (tokenId !== "OVERRIDE") { __currentTokens[tokenId].timestamp = new Date(); }
    var data = obj.doc;
    dCon.save(tokenId, data, function (err, doc) {
      if (err) {
        console.error(err.stack);
        res.status(400).send(err.message);
      }
      return res.send(doc);
    });
  } else { return res.status(400).send("Invalid tokenId"); }
});

router.put("/api/docdef/search", function (req, res) {
  var obj = req.body;
  var tokenId = obj.tokenId;
  var s = obj.s;
  var temp = s.split(";");
  var id = temp[0];
  var groupsId = "";
  if (temp.length > 1) { groupsId = temp[1]; }
  var searchString = "";
  if (temp.length > 2) { searchString = temp[2]; }
  ddCon.searchByDocDef(tokenId, id, searchString, groupsId, function (err, docs) {
    if (err) {
      console.error(err.stack);
      return res.status(404).send(err.message);
    }
    return res.send(docs);
  });
});

router.put("/api/document/listbydocdefid", function (req, res) {
  var obj = req.body;
  var tokenId = obj.tokenId;
  var id = obj.id;
  ddCon.findByDocDefId(tokenId, id, "", function (err, docs) {
    if (err) {
      console.error(err.stack);
      return res.status(404).send(err.message);
    }
    return res.send(docs);
  });
});

router.put("/api/check/unique", function (req, res) {
  var obj = req.body;
  var tokenId = obj.tokenId;
  if (__currentTokens[tokenId] !== undefined) {
    __currentTokens[tokenId].timestamp = new Date();
    var label = obj.label;
    var value = obj.value;
    dCon.ensureUniqueByDefName(tokenId, label, value, function (err, o) {
      if (err) { return res.status(404).send(err.message); }
      var temp = new Object();
      temp.value = result;
      temp.id = data.fieldId;
      return res.send(temp);
    });
  } else { return res.status(400).send("Invalid tokenId"); }
});

router.post("/api/ensure/unique", function (req, res) {
  var obj = req.body;
  var tokenId = obj.tokenId;
  if (__currentTokens[tokenId] !== undefined || tokenId === "OVERRIDE") {
    if (tokenId !== "OVERRIDE") { __currentTokens[tokenId].timestamp = new Date(); }
    var text = obj.text;
    var data = JSON.parse(text);
    dCon.ensureUnique(tokenId, data.fieldDefinitionId, data.value, function (err, result) {
      if (err) { return res.status(404).send(err.message); }
      var temp = new Object();
      temp.value = result;
      temp.id = data.fieldId;
      return res.send(temp);
    });
  } else { return res.status(400).send("Invalid tokenId"); }
});

router.get("/api/document/get/:id/:tokenId", function (req, res) {
  var id = req.params.id;
  var tokenId = req.params.tokenId;
  if (__currentTokens[tokenId] !== undefined) {
    __currentTokens[tokenId].timestamp = new Date();
    dCon.find(tokenId, id, function (err, doc) {
      if (err) {
        console.error(err.stack);
        return res.status(404).send(err.message);
      }
      if (doc.toString === undefined || doc.toString === "") {
        doc.toString = doc.fields[0].value.value;
      }
      return res.send(doc);
    });
  } else { return res.status(400).send("Invalid tokenId"); }
});

router.put("/api/document/delete", function (req, res) {
  var obj = req.body;
  var tokenId = obj.tokenId;
  if (__currentTokens[tokenId] !== undefined || tokenId === "OVERRIDE") {
    if (tokenId !== "OVERRIDE") { __currentTokens[tokenId].timestamp = new Date(); }
    var id = obj.id;
    dCon.remove(tokenId, id, function (err) {
      if (err) {
        console.log("Error deleting");
        res.status(404).send(err.message);
      }
      var o = new Object();
      o.message = "OK";
      return res.send(o);
    });
  } else { return res.status(400).send("Invalid tokenId"); }
});

router.put("/api/document/new", function (req, res) {
  var obj = req.body;
  var tokenId = obj.tokenId;
  if (__currentTokens[tokenId] !== undefined || tokenId === "OVERRIDE") {
    if (tokenId !== "OVERRIDE") {
      __currentTokens[tokenId].timestamp = new Date();
    }
    if (obj.label !== undefined) {
      ddCon.getDocDefByLabel(tokenId, obj.label, function (err, dd) {
        if (err) {
          console.error(err.stack);
          return res.status(400).send(err.message);
        }
        dCon.newWithDocDef(tokenId, dd, function (err, doc) {
          if (err) {
            console.error(err.stack);
            return res.status(400).send(err.message);
          }
          return res.send(doc);
        });
      });
    } else {
      var docDefId = obj.docDefId;
      ddCon.get(tokenId, docDefId, function (err, dd) {
        if (err) {
          console.error(err.stack);
          return res.status(400).send(err.message);
        }
        dCon.newWithDocDef(tokenId, dd, function (err, doc) {
          if (err) {
            console.error(err.stack);
            return res.status(400).send(err.message);
          }
          return res.send(doc);
        });
      });
    }
  } else {
    return res.status(400).send("Invalid tokenId");
  }
});

router.put("/api/document/new/packed", function (req, res) {
  var obj = req.body;
  var tokenId = obj.tokenId;
  if (__currentTokens[tokenId] !== undefined) {
    __currentTokens[tokenId].timestamp = new Date();
    if (obj.label !== undefined) {
      ddCon.getDocDefByLabel(tokenId, obj.label, function (err, dd) {
        if (err) {
          console.error(err.stack);
          return res.status(400).send(err.message);
        }
        dCon.newWithDocDef(tokenId, dd, function (err, doc) {
          if (err) {
            console.error(err.stack);
            return res.status(400).send(err.message);
          }
          dCon.packContainer(tokenId, doc, function (err, o) {
            return res.send(o);
          });
        });
      });
    } else {
      var docDefId = obj.docDefId;
      ddCon.get(tokenId, docDefId, function (err, dd) {
        if (err) {
          console.error(err.stack);
          return res.status(400).send(err.message);
        }
        dCon.newWithDocDef(tokenId, dd, function (err, doc) {
          if (err) {
            console.error(err.stack);
            return res.status(400).send(err.message);
          }
          dCon.packContainer(tokenId, doc, function (err, o) {
            return res.send(o);
          });
        });
      });
    }
  } else { return res.status(400).send("Invalid tokenId"); }
});

router.put("/api/document/search/list", function (req, res) {
  var obj = req.body;
  var tokenId = obj.tokenId;
  if (__currentTokens[tokenId] !== undefined) {
    __currentTokens[tokenId].timestamp = new Date();
    dCon.getListWithSearch(tokenId, obj.label, obj.fieldLabel, obj.fieldValue, obj.isPacked, function (err, list) {
      if (err) {
        console.error(err.stack);
        return res.status(400).send(err.message);
      }
      return res.send(list);
    });
  } else { return res.status(400).send("Invalid tokenId"); }
});

module.exports = router;

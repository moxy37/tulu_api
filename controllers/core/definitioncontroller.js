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
var express = require('express');



var DocumentDefinitionDAO = require(__base + "dao/core/documentdefinitiondao");
var ddCon = new DocumentDefinitionDAO();
var FieldDefinitionDAO = require(__base + "dao/core/fielddefinitiondao");
var fdCon = new FieldDefinitionDAO();
var uuid = require("node-uuid");
const { unlinkSync } = require('fs');
router = express.Router();

router.get('/api/definition/document/list/:tokenId', function (req, res) {
    var tokenId = req.params.tokenId;
    ddCon.getAllDocDefs(tokenId, function (err, dds) {
        return res.send(dds);
    });
});

router.put('/api/definition/document/get', function (req, res) {
    var obj = req.body;
    var id = obj.id;
    var tokenId = obj.tokenId;
    if (__currentTokens[tokenId] !== undefined) {
        __currentTokens[tokenId].timestamp = new Date();
        ddCon.get(tokenId, id, function (err, docDef) {
            return res.send(docDef);
        });
    } else { return res.status(400).send("Invalid tokenId"); }
});

router.get('/api/definition/document/new', function (req, res) {
    var dd = new Object();
    dd.id = uuid.v4();
    dd.isNew = true;
    dd.fieldDefinitions = [];
    dd.label = '';
    dd.customToString = '';
    dd.isCached = false;
    return res.send(dd);
});


router.post('/api/definition/document/save', function (req, res) {
    var obj = req.body;
    var tokenId = obj.tokenId;
    if (__currentTokens[tokenId] !== undefined || tokenId === 'OVERRIDE') {
        if (tokenId !== 'OVERRIDE') { __currentTokens[tokenId].timestamp = new Date(); }
        var dd = obj.dd;
        ddCon.save(tokenId, dd, function (err, dd) {
            if (err) {
                console.error(err.stack);
                return res.status(400).send(err.message);
            }
            ddCon.getAll(tokenId, function (err, list) { return res.send(dd); });
        });
    } else { return res.status(400).send("Invalid tokenId"); }
});

router.get('/api/definition/field/list', function (req, res) {
    fdCon.getAll('', function (err, fds) {
        return res.send(fds);
    });
});

router.get('/api/definition/field/new', function (req, res) {
    var fd = new Object();
    fd.id = uuid.v4();
    fd.isNew = true;
    fd.label = '';
    /*
        String = 0,
        Integer = 1,
        Float = 2,
        DateTime = 3,
        Bit = 4,
        UUID = 5,
        SelectString = 6,
        File = 7,
        SelectFloat = 8,
        SelectInteger = 9,
        Text = 10,
        Document = 11,
        ReferenceDocument = 12,
        Groups = 13,
        DocumentList = 14,
        Password = 17,
        UniqueString = 18
    */
    fd.fieldDataType = 0;
    fd.isTracked = false;
    fd.defaultValue = '';
    fd.listOfValues = [];
    return res.send(fd);
});

router.get('/api/definition/field/get/:id', function (req, res) {
    var id = req.params.id;
    fdCon.get('', id, function (err, fd) {
        return res.send(fd);
    });
});

router.post('/api/definition/field/save', function (req, res) {
    var obj = req.body;
    var text = obj.text;
    var data = JSON.parse(text);
    var fd = data;
    var tokenId = obj.tokenId;
    if (__currentTokens[tokenId] !== undefined) {
        __currentTokens[tokenId].timestamp = new Date();
        fdCon.save(tokenId, fd, function (err, fd) {
            if (err) {
                console.error(err.stack);
                return res.status(400).send(err.message);
            }
            var FieldDefinitionDAO = require(__base + "dao/core/fielddefinitiondao");
            var fdCon = new FieldDefinitionDAO();
            ddCon.getAll(tokenId, function (err, list) { return res.send(fd); });
        });
    } else { return res.status(400).send("Invalid tokenId"); }
});

router.get('/s', function (req, res) {
    var tokenId = req.query.tokenId;
    if (__currentTokens[tokenId] !== undefined) {
        __currentTokens[tokenId].timestamp = new Date();
        res.render('core/index');
    } else {
        res.render('client/index');
    }
});

// router.get('/test', function (req, res) {
//     var tokenId = req.query.tokenId;
//     if (__currentTokens[tokenId] !== undefined) {
//         __currentTokens[tokenId].timestamp = new Date();
//         if (__currentTokens[tokenId].user['User Type'] === 'SysAdmin' || __currentTokens[tokenId].user['User Type'] === 'Admin') {
//     res.render('core/test');
//         } else {
//             res.render('core/index');
//         }
//     } else { res.render('core/user'); }
// });

// router.get('/defs', function (req, res) {
//     var tokenId = req.query.tokenId;
//     if (__currentTokens[tokenId] !== undefined) {
//      __currentTokens[tokenId].timestamp = new Date(); 
//         if (__currentTokens[tokenId].user['User Type'] === 'SysAdmin') {
//             res.render('core/definition');
//         } else {
//             res.render('client/index');
//         }
//     } else { res.render('client/index'); }
// });

router.get('/defs', function (req, res) {
    var tokenId = req.query.tokenId;
    if (__currentTokens[tokenId] !== undefined) {
        __currentTokens[tokenId].timestamp = new Date();
        if (__currentTokens[tokenId].user['User Type'] === 'SysAdmin') {
            res.render('core/definition');
        } else {
            res.render('core/definition');
        }
    } else { res.render('core/definition'); }
});

module.exports = router;
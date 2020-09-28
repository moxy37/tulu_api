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
module.exports = FieldValueDAO;

function FieldValueDAO() {
    this.save = function (tokenId, obj, fieldDataType, callback) {
        var queryString = "UPDATE `FieldValue";
        if (obj.isNew === true || obj.isNew === 'true' || obj.isNew === 'True') {
            queryString = "INSERT INTO `FieldValue";
        }
        switch (parseInt(fieldDataType)) {
            case 0:
            case 6:
            case 10:
            case 17:
            case 18:
                queryString += "String` ";
                break;
            case 1:
            case 9:
                queryString += "Integer` ";
                break;
            case 2:
            case 8:
                queryString += "Float` ";
                break;
            case 3:
                queryString += "DateTime` ";
                break;
            case 4:
                queryString += "Bit` ";
                break;
            case 5:
                queryString += "GUID` ";
                break;
            default:
                queryString += "String` ";
                break;
        }
        var reportText = "Updated ";
        if (obj.isNew === true || obj.isNew === 'true' || obj.isNew === 'True') {
            queryString += "(`fieldId`, `fieldDataType`, `value`, `id`) VALUES (?, ?, ?, ?)";
            reportText = "Inserted ";
        } else {
            queryString += "SET `fieldId`=?, `fieldDataType`=?, `value`=? WHERE `id`=?";
        }
        var created_at = new Date();
        __con.query(tokenId, queryString, [obj.fieldId, obj.fieldDataType, obj.value, obj.id], function (err, result) {
            if (err) {
                console.log("Error saving FieldValue: " + JSON.stringify(err));
                return callback(err);
            }
            console.log(reportText + result.affectedRows + " record to FieldValue");
            obj.isNew = false;
            obj.timestamp = new Date();
            return callback(null, obj);
        });
    }

    this.saveSelect = function (tokenId, fieldDefinitionId, valueId, fieldDataType, sequence, callback) {
        var id = uuid.v4();
        __con.query(tokenId, "INSERT INTO `FieldDefinitionSelect` (`id`, `fieldDefinitionId`, `valueId`, `fieldDataType`, `sequence`) VALUES (?, ?, ?, ?, ?)", [id, fieldDefinitionId, valueId, fieldDataType, sequence], function (err, result) {
            if (err) return callback(err);
            console.log("Added " + result.affectedRows + " record to FieldDefinitionSelect");
            return callback(null);
        });
    }

    this.findHistory = function (tokenId, fieldId, fieldDataType, next) {
        var queryString = "SELECT * FROM `FieldValue";
        switch (parseInt(fieldDataType)) {
            case 0:
            case 6:
            case 10:
            case 17:
            case 18:
                queryString += "String` ";
                break;
            case 1:
            case 9:
                queryString += "Integer` ";
                break;
            case 2:
            case 8:
                queryString += "Float` ";
                break;
            case 3:
                queryString += "DateTime` ";
                break;
            case 4:
                queryString += "Bit` ";
                break;
            case 5:
                queryString += "GUID` ";
                break;
            default:
                queryString += "String` ";
                break;
        }
        queryString += "WHERE `fieldId`=? ORDER BY `timestamp` DESC";
        __con.query(tokenId, queryString, fieldId, function (err, result) {
            if (err) return callback(err);
            if (result.length == 0) {
                var err = new Error("Unable to find FieldValue with ID: " + id);
                return callback(err);
            }
            var history = [];
            async.forEach(result, function (r, callback) {
                var fieldValue = new Object();
                fieldValue.id = r.id;
                fieldValue.fieldId = r.fieldId;
                fieldValue.fieldDataType = r.fieldDataType;
                fieldValue.timestamp = r.timestamp;
                fieldValue.value = r.value;
                history.push(fieldValue);
                callback();
            }, function (err) {
                if (err) return next(err);
                return next(null, history);
            });
        });
    }

    this.find = function (tokenId, id, fieldDataType, callback) {
        var queryString = "SELECT * FROM `FieldValue";
        switch (parseInt(fieldDataType)) {
            case 0:
            case 6:
            case 10:
            case 17:
            case 18:
                queryString += "String` ";
                break;
            case 1:
            case 9:
                queryString += "Integer` ";
                break;
            case 2:
            case 8:
                queryString += "Float` ";
                break;
            case 3:
                queryString += "DateTime` ";
                break;
            case 4:
                queryString += "Bit` ";
                break;
            case 5:
                queryString += "GUID` ";
                break;
            default:
                queryString += "String` ";
                break;
        }
        queryString += "WHERE id=?";
        __con.query(tokenId, queryString, id, function (err, result) {
            if (err) return callback(err);
            if (result.length == 0) {
                var err = new Error("Unable to find FieldValue with ID: " + id);
                return callback(err);
            }
            var r = result[0];
            var fieldValue = new Object();
            fieldValue.id = r.id;
            fieldValue.fieldId = r.fieldId;
            fieldValue.fieldDataType = r.fieldDataType;
            fieldValue.timestamp = new Date();
            fieldValue.value = r.value;
            return callback(null, fieldValue);
        });
    }

    this.remove = function (tokenId, id, fieldDataType, callback) {
        var queryString = "DELETE FROM `FieldValue";
        switch (parseInt(fieldDataType)) {
            case 0:
            case 6:
            case 10:
            case 17:
            case 18:
                queryString += "String` ";
                break;
            case 1:
            case 9:
                queryString += "Integer` ";
                break;
            case 2:
            case 8:
                queryString += "Float` ";
                break;
            case 3:
                queryString += "DateTime` ";
                break;
            case 4:
                queryString += "Bit` ";
                break;
            case 5:
                queryString += "GUID` ";
                break;
            default:
                queryString += "String` ";
                break;
        }
        queryString += "WHERE `id`=?";
        __con.query(tokenId, queryString, id, function (err, result) {
            if (err) return callback(err);
            console.log('Deleted ' + result.affectedRows + ' records from FieldValue');
            return callback();
        });
    }
}
var async = require('async');
var DocumentDAO = require(__base + "dao/core/documentdao");
var dCon = new DocumentDAO();
var DocumentDefinitionDAO = require(__base + "dao/core/documentdefinitiondao");
var ddCon = new DocumentDefinitionDAO();


module.exports = CompanyDAO;

function CompanyDAO() {
    this.getUserCompany = function (tokenId, user, next) {
        var sql = "SELECT * FROM CompanyUser WHERE userId=?";
        __con.query(tokenId, sql, user.id, function (err, results) {
            if (err) {
                console.log(err.message);
                return next(err);
            }
            user.companyId = '';
            user.companyName = '';
            user.companyUserType = '';
            user.operator = null;
            user.companyType = '';
            if (results.length > 0) {
                user.companyId = results[0].companyId;
                user.companyName = results[0].companyName;
                user.companyUserType = results[0].companyUserType;
                user.companyType = results[0].companyType;
                __con.query(tokenId, "SELECT DISTINCT(operatorId) AS operatorId FROM `CompanyOperators` WHERE `userId`=?", user.id, function (err, results) {
                    if (results.length === 0) {
                        return next(null, user);
                    } else {
                        dCon.find(tokenId, results[0].operatorId, function (err, doc) {
                            dCon.packContainer(tokenId, doc, function (err, o) {
                                user.operator = o;
                                return next(null, user);
                            });
                        });
                    }
                });
            } else {
                return next(null, user);
            }
        });
    }

    this.newProject = function (tokenId, userId, companyId, next) {
        var obj = null;
        dCon.newByLabel(tokenId, 'Project', function (err, doc) {
            var fields = [];
            async.forEach(doc.fields, function (f, callback) {
                if (f.fieldDefinition.label === 'User') {
                    dCon.find(tokenId, userId, function (err, d) {
                        f.value = d;
                        fields.push(f);
                        callback();
                    });
                } else if (f.fieldDefinition.label === 'Company') {
                    dCon.find(tokenId, companyId, function (err, d) {
                        f.value = d;
                        fields.push(f);
                        callback();
                    });
                } else if (f.fieldDefinition.label === 'Companies') {
                    dCon.find(tokenId, companyId, function (err, d) {
                        async.forEach(d.fields, function (ff, callback2) {
                            if (ff.fieldDefinition.label === 'Companies') {
                                f.value.entities = ff.value.entities;
                                callback2();
                            } else {
                                callback2();
                            }
                        }, function (err) {
                            fields.push(f);
                            callback();
                        });
                    });
                } else {
                    fields.push(f);
                    callback();
                }
            }, function (err) {
                doc.fields = fields;
                return next(null, doc);
            });
        });
    }

    this.newRequest = function (tokenId, next) {
        let self = this;
        dCon.newByLabel(tokenId, 'Request', function (err, doc) {
            var fields = [];
            async.forEach(doc.fields, function (f, callback) {
                if (f.fieldDefinition.label === 'Operator') {
                    self.loadDummyOperator(tokenId, function (err, opp) {
                        f.value = opp;
                        fields.push(f);
                        callback();
                    });
                } else if (f.fieldDefinition.label === 'Location') {
                    ffList = [];
                    async.forEach(f.value.fields, function (ff, callback2) {
                        if (ff.fieldDefinition.label === 'Location Type') {
                            ff.value = ff.fieldDefinition.listOfValues[1];
                            ffList.push(ff);
                            callback2();
                        } else {
                            ffList.push(ff);
                            callback2();
                        }
                    }, function (err) {
                        f.value.fields = ffList;
                        fields.push(f);
                        callback();
                    });
                } else {
                    fields.push(f);
                    callback();
                }
            }, function (err) {
                doc.fields = fields;
                return next(null, doc);
            });
        });
    }

    this.loadDummyOperator = function (tokenId, next) {
        if (__dummyOperator === undefined || __dummyOperator === null) {
            __con.query(tokenId, "SELECT d.`id` FROM `Document` d JOIN `DocumentDefinition` dd ON d.`documentDefinitionId`=dd.`id` WHERE d.`toString`='dummy' AND dd.`label`='Operator'", function (err, result) {
                dCon.find(tokenId, result[0].id, function (err, doc) {
                    __dummyOperator = doc;
                    return next(null, doc);
                });
            });
        } else {
            return next(null, __dummyOperator);
        }
    }

    this.operatorProjects = function (tokenId, userId, next) {
        __con.query(tokenId, "SELECT * FROM `CompanyOperators` WHERE `userId`=?", userId, function (err, results) {
            if (err) {
                console.log(err.message);
                return next(err);
            }
            if (results.length === 0) {
                return next(null, []);
            } else {
                __con.query(tokenId, "SELECT `projectId`, `projectName`, `requestId`, `requestName` FROM `ProjectRequests` WHERE `operatorId`=? GROUP BY `projectId`, `projectName`, `requestId`, `requestName`", results[0].operatorId, function (err, result) {
                    var list = [];
                    async.forEach(result, function (r, callback) {
                        __con.query(tokenId, "SELECT * FROM ProjectCompany WHERE projectId=?", r.projectId, function (err, rr) {
                            if (err) {
                                console.log(err.message);
                                return next(err);
                            }
                            var o = new Object();
                            o.companyId = rr[0].companyId;
                            o.companyName = rr[0].companyName;
                            o.projectName = rr[0].projectName;
                            o.projectId = rr[0].projectId;
                            o.date = rr[0].date;
                            o.requestId = r.requestId;
                            o.requestName = r.requestName;
                            list.push(o);
                            callback();
                        });
                    }, function (err) {
                        return next(null, list);
                    });
                });
            }
        });
    }

    this.getTruckTypeIdsForCompany = function (tokenId, companyId, next) {
        __con.query(tokenId, "SELECT DISTINCT(`truckTypeId`) AS `truckTypeId` FROM `CompanyOperators` WHERE `companyId`=?", companyId, function (err, results) {
            var whereClause = "(";
            if (err) {
                console.log(err.message);
                return next(err);
            }
            var addComma = false;
            async.forEach(results, function (r, callback) {
                if (addComma === true) {
                    whereClause += ", ";
                } else {
                    addComma = true;
                }
                whereClause += "'" + r.truckTypeId + "'";
                callback();
            }, function (err) {
                whereClause += ") ";
                return next(null, whereClause);
            });
        });
    }

    this.getRequestsToAssign = function (tokenId, companyId, next) {
        let self = this;
        self.getTruckTypeIdsForCompany(tokenId, companyId, function (err, truckTypes) {
            __con.query(tokenId, "SELECT `projectId`, `projectName`, `requestId`, `requestName` FROM `ProjectRequests` WHERE `operatorName`='dummy' AND `targetCompanyId`=? AND `truckTypeId` IN " + truckTypes + " GROUP BY `projectId`, `projectName`, `requestId`, `requestName`", companyId, function (err, results) {
                var list = [];
                async.forEach(results, function (r, callback) {
                    __con.query(tokenId, "SELECT * FROM ProjectCompany WHERE projectId=?", r.projectId, function (err, rr) {
                        if (err) {
                            console.log(err.message);
                            return next(err);
                        }
                        var o = new Object();
                        o.companyId = rr[0].companyId;
                        o.companyName = rr[0].companyName;
                        o.projectName = rr[0].projectName;
                        o.projectId = rr[0].projectId;
                        o.date = rr[0].date;
                        o.requestId = r.requestId;
                        o.requestName = r.requestName;
                        list.push(o);
                        callback();
                    });
                }, function (err) {
                    return next(null, list);
                });
            });
        });
    }

    this.getCopmanyOperators = function (tokenId, companyId, addDummy, next) {
        let self = this;
        __con.query(tokenId, "SELECT DISTINCT(`operatorId`) AS `operatorId` FROM `CompanyOperators` WHERE `companyId`=?", companyId, function (err, results) {
            var list = [];
            if (err) {
                console.log(err.message);
                return next(err);
            }
            async.forEach(results, function (r, callback) {
                dCon.find(tokenId, r.operatorId, function (err, doc) {
                    dCon.packContainer(tokenId, doc, function (err, o) {
                        list.push(o);
                        callback();

                    });
                });
            }, function (err) {
                if (addDummy === undefined) {
                    return next(null, list);
                } else {
                    if (__dummyOperator === null || __dummyOperator === undefined) {
                        self.loadDummyOperator(tokenId, function (err, d) {
                            dCon.packContainer(tokenId, d, function (err, dum) {
                                list.push(dum);
                                return next(null, list);
                            });
                        });
                    } else {
                        dCon.packContainer(tokenId, __dummyOperator, function (err, dum) {
                            list.push(dum);
                            return next(null, list);
                        });
                    }
                }
            });
        });
    }
}
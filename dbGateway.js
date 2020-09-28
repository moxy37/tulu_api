

module.exports = new DbGateway();

function DbGateway() {
    this.query = function (tokenId, sql, params, next) {
        if (next === undefined) {
            next = params;
            params = [];
        }
        if (Array.isArray(params) === false) {
            var temp = params;
            params = [];
            params.push(temp);
        }
        __ccc.query(sql, params, function (err, result) {
            if (err) {
                return next(err);
            }
            return next(err, result);
        });
    }
}
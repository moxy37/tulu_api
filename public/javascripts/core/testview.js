function PageLoadFunction() {
	$("#TestDiv").append(JSON.stringify(gUser));
	ListDealers();
}

var primary = new Object();
var testObj = null;

function ListDealers(){
	var obj = new Object();
	obj.tokenId = tokenId;
	$.ajax({
		type: "PUT",
		url: "/api/dealer/list",
		data: obj,
		cache: false,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded",
		success: function (results) {
			$("#TestResults").empty();
			$("#TestResults").append(JSON.stringify(results));
		},
		error: function (results) {
			alert("Error");
		},
	});
}

function TestGetDealer() {
	var obj = new Object();
	obj.tokenId = tokenId;
	obj.id = $("#DealerId").val();
	$.ajax({
		type: "PUT",
		url: "/api/dealer/get",
		data: obj,
		cache: false,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded",
		success: function (results) {
			$("#TestResults").empty();
			$("#TestResults").append(JSON.stringify(results));
			primary = new Object();
			primary['targetId'] = results.id;
			testObj = results;
			$("#PrimaryData").empty();
			$("#PrimaryData").append(JSON.stringify(primary));
		},
		error: function (results) {
			alert("Error");
		},
	});
}

function TestSaveDealer() {
	var obj = new Object();
	obj.tokenId = tokenId;
	obj.dealer = testObj;
	$.ajax({
		type: "PUT",
		url: "/api/dealer/save",
		data: obj,
		cache: false,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded",
		success: function (results) {
			$("#TestResults").empty();
			$("#TestResults").append("<h1>Saved</h1>");
			$("#TestResults").append(JSON.stringify(results));
		},
		error: function (results) {
			alert("Error");
		},
	});
}
function TestNew() {
	var obj = new Object();
	obj.tokenId = tokenId;
	obj.table = $("#TestTableName").val();
	obj.primary = primary;
	$.ajax({
		type: "PUT",
		url: "/api/helper/new",
		data: obj,
		cache: false,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded",
		success: function (results) {
			var k = $("#KeyAdd").val();
			if (k !== '' && testObj !== null) {
				if (testObj[k] === undefined) {
					testObj[k] = [];
				}
				if (obj.table === 'Phone') {
					results.type = 'home';
					results.value = '444-325-4343_' + testObj[k].length;
				} else if (obj.table === 'Address') {
					results.name = 'home';
					results.street = '123 Any Street SW' + testObj[k].length;
					results.city = 'Calgary';
					results.province = 'Alberta';
					results.postal = 'T2T3T3';
				}
				results.sequence = testObj[k].length;
				testObj[k].push(results);
			}
			$("#TestResults").empty();
			$("#TestResults").append(JSON.stringify(testObj));
		},
		error: function (results) {
			alert("Error");
		},
	});
}

function TestNewDealer() {
	var obj = new Object();
	obj.tokenId = tokenId;
	$.ajax({
		type: "PUT",
		url: "/api/dealer/new",
		data: obj,
		cache: false,
		dataType: "json",
		contentType: "application/x-www-form-urlencoded",
		success: function (results) {
			results.name = "My Test Dealership";
			results.accountId = "DUDE";
			$("#PrimaryKey").val("targetId");
			$("#PrimaryValue").val(results.id);
			$("#TestResults").append(JSON.stringify(results));
			testObj = results;
			primary['targetId'] = results.id;
			$("#PrimaryData").empty();
			$("#PrimaryData").append(JSON.stringify(primary));
		},
		error: function (results) {
			alert("Error");
		},
	});
}

function AddPrimary() {
	var key = $("#PrimaryKey").val();
	var value = $("#PrimaryValue").val();
	primary[key] = value;
	$("#PrimaryData").empty();
	$("#PrimaryData").append(JSON.stringify(primary));
}
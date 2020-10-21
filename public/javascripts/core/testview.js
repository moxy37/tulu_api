function PageLoadFunction() {
	TestAjax();
}

var primary = new Object();
var testObj = null;

function TestAjax() {
	$.ajax({
		type: "POST",
		url: "https://api.dataonesoftware.com/webservices/vindecoder/decode",
		data: {

			"decoder_query":{
			"decoder_settings" : {
				"version" : "7.2.0",
				"display" : "full",
				"styles" : "on",
				"style_data_packs" : {
					"basic_data" : "on",
					"pricing" : "on",
					"engines" : "on",
					"transmissions" : "on",
					"standard_specifications" : "on",
					"standard_generic_equipment" : "on",
					"oem_options" : "on",
					"colors" : "on",
					"safety_equipment" : "on",
					"warranties" : "on",
					"fuel_efficiency" : "on"	
				},
				"common_data" : "on",
				"common_data_packs" : {
					"basic_data" : "on",
					"pricing" : "on",
					"engines" : "on",
					"transmissions" : "on",
					"standard_specifications" : "on",
					"standard_generic_equipment" : "on"
				}
			},
			"query_requests" : {
				"Request-Sample" : {
					"vin" : "WAUBVAFB4BN123456",
					"year" : "",
					"make" : "",
					"model" : "",
					"trim" : "",
					"model_number" : "",
					"package_code" : "",
					"drive_type" : "",
					"vehicle_type" : "",
					"body_type" : "",
					"doors" : "",
					"bedlength" : "",
					"wheelbase" : "",
					"msrp" : "",
					"invoice_price" : "",
					"engine" : {
						"description" : "",
						"block_type" : "",
						"cylinders" : "",
						"displacement" : "",
						"fuel_type" : ""
					},
					"transmission" : {
						"description" : "",
						"trans_type" : "",
						"trans_speeds" : ""
					},
					"optional_equipment_codes" : "",
					"installed_equipment_descriptions" : "",
					"interior_color" : {
						"description" : "",
						"color_code" : ""
					},
					"exterior_color" : {
						"description" : "",
						"color_code" : ""
					}
				}
			}
		},
		"access_key_id":"PnuvF35in4",
		"secret_access_key":"JIO13VOxL2u6FE1czz5tYGkPx8eRYyXZrpRimprI"
		},
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
function ListDealers() {
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
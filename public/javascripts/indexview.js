var gEvent;

function ListEvents() {
    $.ajax({
        type: "GET",
        url: "/api/events/list",
        cache: false,
        dataType: "json",
        success: function (results) {
            var html = '';
            for (var i = 0; i < results.length; i++) {
                html += '<option value="' + results[i].id + '">' + results[i].name + '</option>';
            }
            $("#EventSelect").empty();
            $("#EventSelect").append(html);
            $.ajax({
                type: "GET",
                url: "/api/events/current/get",
                cache: false,
                dataType: "json",
                success: function (results) {
                    $("#Message").empty();
                    var html = '<h3>' + results.name + ' set as current event</h3>';
                    $("#Message").append(html);
                    $('#eventName').empty();
                    $('#eventName').append(results.name);
                },
                error: function (results) { }
            });
        },
        error: function (results) { }
    });
}

function ForceReset() {
    $.ajax({
        type: "GET",
        url: "/api/events/resetSystem",
        cache: false,
        dataType: "json",
        success: function (results) { },
        error: function (results) { }
    });
}

function SetEvent() {
    var id = $("#EventSelect option:selected").val();
    $.ajax({
        type: "GET",
        url: "/api/events/current/set/" + id,
        cache: false,
        dataType: "json",
        success: function (results) {
            $("#Message").empty();
            var html = '<h3>' + results.name + ' set as current event</h3>';
            $("#Message").append(html);
            $('#eventName').empty();
            $('#eventName').append(results.name);
            // location.href = '/weddingconfig';
        },
        error: function (results) { }
    });
}

function LoadEventLights() {
    var url = '/weddingconfig';
    window.open(url, '_blank');
}

function LoadEvent() {
    var url = '/events';
    window.open(url, '_blank');
}

function ToggleOverride() {
    $.ajax({
        type: "GET",
        url: "/api/socket/override",
        cache: false,
        dataType: "json",
        success: function (results) {
            var html = '<h3>IP Override OFF</h3>'
            if (results.override === true) {
                html = '<h3>IP Override ON</h3>';
            }
            $("#Message").empty();
            $("#Message").append(html);
        },
        error: function () { }
    });
}

ListEvents();
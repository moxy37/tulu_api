function TestSave() {
    var dd = new Object();
    dd.result = new Object();
    dd.result.message = "This is a sample message";
    dd.id = "New Id";
    dd.test = "New Test";
    //testWebhookExample

    $.ajax({
        type: "POST",
        url: "/testWebhookExample",
        data: dd,
        cache: false,
        dataType: "json",
        contentType: "application/x-www-form-urlencoded", //This is what made the difference.
        success: function(results) {},
        error: function(results) {}
    });
}

function PageLoadFunction() {
    // $("#Results").hide();
    // $("#ActionDiv").hide();
    $("#Test").addClass('active');
    // LoadAllDocDefs();

}
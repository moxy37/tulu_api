var thisUser;

function PageLoadFunction() {
    if (gUser) {
        GetDoc(gUser.id).then(function (result) {
            thisUser = result;
            if (thisUser.Name) {
                $("#name").val(thisUser.Name);
            }
            if (thisUser.Email) {
                $("#email").val(thisUser.Email);
            }
            if (thisUser.Password) {
                $("#password").val(thisUser.Password);
            }
        });
        DynamicFooter();
    }
}

function revealPassword() {
    if ($("#password").prop("type") != 'text') {
        $("#password").prop("type", "text");
        $(".seeIconContainer i").prop('class', 'fas fa-eye-slash');
    }
    else {
        $("#password").prop("type", "password");
        $(".seeIconContainer i").prop('class', 'fas fa-eye');
    }
}

function UpdateUser() {
    if ($("#name").val()) {
        thisUser.Name = $("#name").val();
    }
    if ($("#email").val()) {
        thisUser.Email = $("#email").val();
    }
    console.log("thisUser.Email");
    console.log(thisUser.Email);
    SaveDoc(thisUser).then(function (user) {
        //console.log(user);
        LocationChange('updateUser');
    });
    return false;
}

async function NewDoc(doc) {
    var obj = new Object();
    obj.tokenId = tokenId;
    obj.label = "Project";
    const result = await $.ajax({
        type: "PUT",
        url: "/api/document/new/packed",
        data: obj,
        cache: false,
        dataType: "json",
        //contentType: "application/x-www-form-urlencoded",
        success: function (results) { },
        error: function (results) {
            console.log(results.statusText);
        },
    });
    return result;
}
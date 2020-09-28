function PageLoadFunction() {
    //console.log(gUser);
    GetDoc('899fce09-814e-42a0-9f03-e80df9e78c4a').then(function (result) {
        console.log(result);
    });
    if (sessionStorage.getItem("registration-ownertype") === 'Fleet' || sessionStorage.getItem("registration-ownertype") === 'Construction') {
        $("#submit-company").css('display', 'flex');
    }
    else {
        $("#submit").css('display', 'flex');
    }
    DynamicFooter();
}
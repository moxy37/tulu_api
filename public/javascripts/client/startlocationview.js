const latRegex = /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,15}/g;
const lngRegex = /^-?(([-+]?)([\d]{1,3})((\.)(\d+))?)/g;
const isValid = /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/;

function PageLoadFunction() {
    //console.log(document.referrer);
    GetDocs('Location Type').then(function (result) {
        console.log("result");
        console.log(result);
        // projects = result;
        // $("#projects").empty()
        // for (const key in projects) {
        //     //console.log(projects[key]);
        //     $("main").prepend(showProject(projects[key]));
        // }
    });

    $('.coordinatesTextBox input[type="text"]').change(function () {
        var lat = false;
        var long = false;
        if (isValid.test($("#latitude").val()) === true) {
            lat = $("#latitude").val();
            $("#latitude").removeClass("invalid");
        }
        else {
            $("#latitude").addClass("invalid");
        }
        if (isValid.test($("#longitude").val()) === true) {
            long = $("#longitude").val();
            $("#longitude").removeClass("invalid");
        }
        else {
            $("#longitude").addClass("invalid");
        }
        if (lat && long) {
            mymap.setView([lat, long], 13);
            var marker = L.marker([lat, long])
                .addTo(mymap);;
        }
    });
    DynamicFooter();
    mymap.on('click', function (e) {
        $("#latitude").val(e.latlng.lat);
        $("#longitude").val(e.latlng.lng);
        // alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)
        $.get('https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' + e.latlng.lat + '&lon=' + e.latlng.lng, function (data) {
            var text = data.address.road + ', ' + data.address.city + ' ' + data.address.state + ', ' + data.address.postcode;
            $("#locationAddress").val(text);
        });
    });
}


function SelectLocation() {
    sessionStorage.setItem("locationName", $("#locationName").val());
    sessionStorage.setItem("locationAddress", $("#locationAddress").val());
    sessionStorage.setItem("latitude", $("#latitude").val());
    sessionStorage.setItem("longitude", $("#longitude").val());
    //window.history.back()
    window.location.href = document.referrer;
    //LocationChange('seeMoreProject');
    return false;
}
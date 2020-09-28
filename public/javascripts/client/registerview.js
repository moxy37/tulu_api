function PageLoadFunction() {
    $("a.button").click(function (e) {
        sessionStorage.setItem("registration-ownertype", this.dataset.ownertype);
        LocationChange('registerInfo');
        e.preventDefault();
    });
    DynamicFooter();
}
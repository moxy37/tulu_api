function PageLoadFunction() {
    console.log("login");
    console.log(gUser);
    if (gUser) {
        DashboardRedirect();
    }
}
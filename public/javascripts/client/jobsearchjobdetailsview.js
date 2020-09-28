function PageLoadFunction() {

    GetDoc('461733ca-b346-41d1-9503-738da58989e7').then(function (project) {
        console.log(project);
        //$("#today-projects").empty().html(showProject(currentProjects));
    });
    DynamicFooter();
}
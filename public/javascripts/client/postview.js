function PageLoadFunction() {
	GetDocs('Project', 'Company', gUser.companyId, 'true').then(function (projects) {
		ShowProjectSelect(projects);
	});
	DynamicFooter();
}

function ShowProjectSelect(projects) {
	var html = '';
	for (var i = 0; i < projects.length; i++) {
		html += '<option value="' + projects[i]['id'] + '">' + projects[i]['Name'] + '</option>';
	}
	$("#ProjectCopySelect").empty();
	$("#ProjectCopySelect").append(html);
}

function NewProjectClick() {
	var id = $("#ProjectTypeSelect option:selected").val();
	sessionStorage.setItem("projectType", id);
	LocationChange('newProject');
}
function CopyProject() {
	var id = $("#ProjectCopySelect option:selected").val();
	sessionStorage.setItem("projectId", id);
	LocationChange('newProject');
}
var schedule = [{
    time:"9:00",
    name:"Alex Caruso",
    number:"4035631234",
    email:"AC@sample.com",
},{
    time:"10:00",
    name:"Jimmy Butler",
    number:"4035631234",
    email:"jimjim@sample.com",
},{
    time:"11:00",
    name:"Lebron James",
    number:"4035631234",
    email:"lbjames@sample.com",
},{
    time:"12:00",
    name:"Andre Igoudala",
    number:"4035631234",
    email:"andre@sample.com",
},{
    time:"13:00",
    name:"Anthony Davis",
    number:"4035631234",
    email:"EagleBrows@sample.com",
},{
    time:"14:00",
    name:"Tyler Herro",
    number:"4035631234",
    email:"Rookie3s@sample.com",
}
]

function LoadSchedule() {
	var html = '';
	for(var i=0;i!=schedule.length;i++){
        html=html+'<li>';
        html=html+'    <p class="scheduleTime">'+schedule[i].time+'</p>';
        html=html+'    <p class="clientName">'+schedule[i].name+'</p>';
        html=html+'    <p class="clientPhone">'+schedule[i].number+'</p>';
        html=html+'    <p class="clientEmail">'+schedule[i].email+'</p>';
        html=html+'</li>';
    }

	$("#ScheduleContainer").empty();
	$("#ScheduleContainer").append(html);

}
LoadSchedule()

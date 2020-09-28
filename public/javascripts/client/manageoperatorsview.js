function PageLoadFunction() {
    console.log(gUser);
    GetOperatorsOfCompany().then(function (operators) {
        console.log("operators");
        console.log(operators);
        $("main").empty();
        for (const key in operators) {
            $("main").append(showOperator(operators[key]));
        }
    });
    DynamicFooter();
}

function showOperator(operator) {
    if (!operator) return;
    if (operator.User.Name !== 'dummy') {
        var html = `<div>
                    <div class="operator">
                        <div class="operatorInfo">
                            <p>` + operator.User.Name + ` - <span>Active</span></p>
                            <p>Phone Number : <span>403-123-4567</span></p>
                            <p>Email Address : <span>` + operator.User.Email + `</span></p>
                        </div>
                        <div class="trashContainer">
                            <i class="far fa-trash-alt fa-lg"></i>
                        </div>
                    </div>
                </div>`;
    }
    return html;
}
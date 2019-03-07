function addRecord(){

    var record_name = document.getElementById("recordName").value;
    var record_desc = document.getElementById("recordDesc").value;
    var amount      = document.getElementById("amount").value;
    var category_id = document.getElementById("categorySelect").value;
    var acc_id      = document.getElementById("accSelect").value;

    fetch("../index.php?target=record&action=recordRegistration",{
        method: "POST",
        headers: {'Content-type': 'application/x-www-form-urlencoded'},
        body: "record_name=" + record_name + "&record_desc=" + record_desc + "&amount=" + amount +
            "&category_id=" + category_id + "&acc_id=" + acc_id
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            if(myJson.message === "success"){
                var h = document.createElement("H1");
                var t = document.createTextNode("You create successfully an record!");
                h.appendChild(t);
                document.body.appendChild(h);
            }
            else{
                var h = document.createElement("H1");
                var t = document.createTextNode("Sorry bro");
                h.appendChild(t);
                document.body.appendChild(h);
            }
        })
        .catch(function (e) {
            alert(e.message);
        })
}

function fillRecordsTable() {
    fetch("../index.php?target=record&action=listRecords")
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            var recordSet = myJson;
            $(document).ready(function () {
                $('#records').DataTable(
                    {
                        data: recordSet,
                        columns: [
                            {title: "Name"},
                            {title: "Description"},
                            {title: "Amount"},
                            {title: "Date"},
                            {title: "Category"},
                            {title: "Category Type"}
                        ]
                    });
            });
        })
        .catch(function (e) {
            alert(e.message);
        })
}

function getLastFiveRecords() {
    fetch("../index.php?target=record&action=listLastFiveRecords")
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            document.getElementById('box_content').innerHTML = "";

            var record_row = document.getElementById('box_content');

            var box_header = document.createElement("div");
            box_header.className = "box-header width-border";

            var box_title = document.createElement("H3");
            box_title.innerText = "Last 5 records";

            var box_tools = document.createElement("div");
            box_tools.className = "box-tools pull-right";

            var box_button = document.createElement("button");
            box_button.className = "btn btn-box-tool";
            box_button.setAttribute("data-widget", "collapse");

            var box_button_i = document.createElement("i");
            box_button_i.className = "fa fa-minus";

            record_row.appendChild(box_header);
            box_header.appendChild(box_title);
            box_header.appendChild(box_tools);
            box_tools.appendChild(box_button);
            box_button.appendChild(box_button_i);

            for (var i=0; i < myJson.length; i++){
                var div = document.createElement('div');
                div.className = "box-body";
                var cat_div = document.createElement('div');
                cat_div.className = "box_cat_name";
                cat_div.innerHTML = myJson[i]["category_name"] + "<br>" + myJson[i]["acc_name"];;

                var amount_date = document.createElement("div");
                amount_date.className = "amount_date";
                var amount = document.createElement('div');
                amount.className = "box_amount";
                amount.style.fontWeight = "700";
                if(myJson[i]["category_type"] === "expense"){
                    amount.id = "amount_red";
                }
                else{
                    amount.id = "amount_green";
                }
                amount.innerHTML = myJson[i]["amount"] + "лв.";
                var action_date = document.createElement("div");
                action_date.className = "box_action_date";
                action_date.innerHTML = myJson[i]["action_date"];

                record_row.appendChild(div);
                div.appendChild(cat_div);
                div.appendChild(amount_date);
                amount_date.appendChild(amount);
                amount_date.appendChild(action_date);
            }
        })
        .catch(function (e) {
            alert(e.message);
        })
}

function avgIncome(){
    var CurrentDate = new Date();
        var newDate = new Date();
        var x = 1;
        newDate.setMonth(CurrentDate.getMonth() - x);
        var month = newDate.getUTCMonth() + 1;
        var day = newDate.getUTCDate();
        var year = newDate.getUTCFullYear();

        var curr_month = CurrentDate.getUTCMonth() + 1;
        var curr_day = newDate.getUTCDate();
        var curr_year = newDate.getUTCFullYear();

        if(month < 9){
            month = "0" + month;
        }
        if(day < 9){
            day = "0" + day;
        }

        if(curr_month < 9){
            curr_month = "0" + curr_month;
        }
        if(curr_day < 9){
            curr_day = "0" + curr_day;
        }
        var start_date;
        var end_date;
        if(document.getElementById("start_date") === null){
            start_date = year + "-" + month + "-" +  day;
            end_date = curr_year + "-" +  curr_month+ "-" + curr_day ;
        }
        else{
        start_date = document.getElementById("start_date").value;
        end_date = document.getElementById("end_date").value;
    }

    console.log(document.getElementById("end_date"));

    fetch("../index.php?target=record&action=averageIncomeInfo",{
        method: "POST",
        headers: {'Content-type': 'application/x-www-form-urlencoded'},
        body:"start_date=" + start_date + "&end_date=" + end_date + "&type=income"
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {

            var avgField = document.getElementById("avgIncomeField");
            avgField.innerText = myJson.average;
        })
        .catch(function (e) {
            alert(e.message);
        })
}

function avgExpense(){
    var CurrentDate = new Date();
    var newDate = new Date();
    var x = 1;
    newDate.setMonth(CurrentDate.getMonth() - x);
    var month = newDate.getUTCMonth() + 1;
    var day = newDate.getUTCDate();
    var year = newDate.getUTCFullYear();

    var curr_month = CurrentDate.getUTCMonth() + 1;
    var curr_day = newDate.getUTCDate();
    var curr_year = newDate.getUTCFullYear();

    if(month < 9){
        month = "0" + month;
    }
    if(day < 9){
        day = "0" + day;
    }

    if(curr_month < 9){
        curr_month = "0" + curr_month;
    }
    if(curr_day < 9){
        curr_day = "0" + curr_day;
    }
    var start_date;
    var end_date;
    if(document.getElementById("start_date") === null){
        start_date = year + "-" + month + "-" +  day;
        end_date = curr_year + "-" +  curr_month+ "-" + curr_day ;
    }
    else{
        start_date = document.getElementById("start_date").value;
        end_date = document.getElementById("end_date").value;
    }

    console.log(document.getElementById("end_date"));

    fetch("../index.php?target=record&action=averageIncomeInfo",{
        method: "POST",
        headers: {'Content-type': 'application/x-www-form-urlencoded'},
        body:"start_date=" + start_date + "&end_date=" + end_date + "&type=expense"
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {

            var avgField = document.getElementById("avgExpenseField");
            avgField.innerText = myJson.average;
        })
        .catch(function (e) {
            alert(e.message);
        })
}

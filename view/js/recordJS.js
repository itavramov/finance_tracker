function addRecord(){

    var record_name = document.getElementById("recordName").value;
    var record_desc = document.getElementById("recordDesc").value;
    var amount      = document.getElementById("amount").value;
    var category_id = document.getElementById("categorySelect").value;
    var acc_id      = document.getElementById("accSelect").value;

    fetch("index.php?target=record&action=recordRegistration",{
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
    fetch("index.php?target=record&action=listLastFiveRecords")
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            var record_row = document.getElementById('box_content');

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

    $('input[name="avgIncome_daterange"]').daterangepicker({
        opens: 'left'
    }, function(start, end, label) {
        var start_date = start.format('YYYY-MM-DD');
        var end_date = end.format('YYYY-MM-DD');
        fetch("index.php?target=record&action=averageIncomeInfo",{
            method: "POST",
            headers: {'Content-type': 'application/x-www-form-urlencoded'},
            body: "start_date=" + start_date + "&end_date=" + end_date + "&type=income"
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
    });
}

function avgExpense(){

    $('input[name="avgExpense_daterange"]').daterangepicker({
        opens: 'left'
    }, function(start, end, label) {
        var start_date = start.format('YYYY-MM-DD');
        var end_date = end.format('YYYY-MM-DD');
        fetch("index.php?target=record&action=averageIncomeInfo",{
            method: "POST",
            headers: {'Content-type': 'application/x-www-form-urlencoded'},
            body: "start_date=" + start_date + "&end_date=" + end_date + "&type=expense"
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
    });
}

function default_avgIncome(){

    fetch("index.php?target=record&action=averageIncomeInfo",{
        method: "POST",
        headers: {'Content-type': 'application/x-www-form-urlencoded'},
        body:"type=income"
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

function default_avgExpense(){

    fetch("index.php?target=record&action=averageIncomeInfo",{
        method: "POST",
        headers: {'Content-type': 'application/x-www-form-urlencoded'},
        body:"type=expense"
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

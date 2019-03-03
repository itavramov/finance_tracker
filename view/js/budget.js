function addBudget(){

    var budget_name   = document.getElementById("budget_name").value;
    var budget_desc   = document.getElementById("budget_desc").value;
    var category_id   = document.getElementById("categorySelectBudget").value;
    var budget_amount = document.getElementById("budget_amount").value;
    var from_date     = document.getElementById("from_date").value;
    var to_date       = document.getElementById("to_date").value;

    fetch("index.php?target=budget&action=registerBudget",{
        method: "POST",
        headers: {'Content-type': 'application/x-www-form-urlencoded'},
        body: "budget_name=" + budget_name + "&budget_desc=" + budget_desc + "&budget_amount=" + budget_amount +
            "&category_id=" + category_id + "&from_date=" + from_date + "&to_date=" + to_date
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            if(myJson.response === "success"){
                var h = document.createElement("H1");
                var t = document.createTextNode("You create successfully an budget!");
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

function listAllBudgets(){
    $('input[name="daterange3"]').daterangepicker({
        opens: 'left'
    }, function(start, end) {
        var start_date = start.format('YYYY-MM-DD');
        var end_date = end.format('YYYY-MM-DD');
    fetch("index.php?target=budget&action=listAllBudgets",{
        method: "POST",
        headers: {'Content-type': 'application/x-www-form-urlencoded'},
        body: "start_date=" + start_date + "&end_date=" + end_date
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {

            document.getElementById("all_budgets_progress").innerHTML = "";

            var ict_unit = [];
            var efficiency = [];
            var coloR = [];

            var dynamicColors = function() {
                var r = Math.floor(Math.random() * 255);
                var g = Math.floor(Math.random() * 255);
                var b = Math.floor(Math.random() * 255);
                return "rgb(" + r + "," + g + "," + b + ")";
            };

            for (var i in myJson) {
                ict_unit.push("ICT Unit " + myJson[i].ict_unit);
                efficiency.push(myJson[i].efficiency);
                coloR.push(dynamicColors());
            }

            if(myJson == "")
            {
                var parent = document.getElementById('all_budgets_progress');
                var h = document.createElement('H3');
                var t = document.createTextNode("No data!");

                h.appendChild(t);
                parent.appendChild(h);
            }
            else{
                for (var i = 0; i < myJson.length; i++){
                    var parent = document.getElementById('all_budgets_progress');
                    var progress = document.createElement('div');
                    var progress_bar = document.createElement('div');
                    progress.className = "progress";
                    progress_bar.className = "progress-bar";
                    progress_bar.id = "bar_" + i;
                    progress_bar.style.backgroundColor = coloR[i];
                    var table = document.createElement("div");
                    var td_first = document.createElement("div");
                    var td_second = document.createElement("div");
                    table.className = "budget_table";
                    td_first.className = "budget_names";
                    td_second.className = "budget_amount";

                    td_first.innerHTML = myJson[i]["budget_name"] + "<br>" + myJson[i]["category_name"];

                    if(myJson[i]["current_amount"] < 0){
                        td_second.innerHTML = "<span class='red'>" + myJson[i]["current_amount"] + " лв.</span>" + "<br>" + myJson[i]["from_date"] + " - " + myJson[i]["to_date"];
                    }
                    else{
                        td_second.innerHTML = "<span class='green'>" + myJson[i]["current_amount"] + " лв.</span>" + "<br>" + myJson[i]["from_date"] + " - " + myJson[i]["to_date"];
                    }

                    parent.appendChild(table);
                    table.appendChild(td_first);
                    table.appendChild(td_second);
                    parent.appendChild(progress);
                    progress.appendChild(progress_bar);

                    $("#bar_" + i).attr('aria-valuenow', 0).attr('aria-valuemin', 0).attr('aria-valuemax', 100).
                    attr('role', "progressbar").css("width",(myJson[i]["current_amount"]/myJson[i]["init_amount"])*100 + "%");
                }
            }
        })
        .catch(function (e) {
            alert(e.message);
        })
    });
}

function defaultListAllBudgets() {
    fetch("index.php?target=budget&action=listAllBudgets")
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {

            var ict_unit = [];
            var efficiency = [];
            var coloR = [];

            var dynamicColors = function() {
                var r = Math.floor(Math.random() * 255);
                var g = Math.floor(Math.random() * 255);
                var b = Math.floor(Math.random() * 255);
                return "rgb(" + r + "," + g + "," + b + ")";
            };

            for (var i in myJson) {
                ict_unit.push("ICT Unit " + myJson[i].ict_unit);
                efficiency.push(myJson[i].efficiency);
                coloR.push(dynamicColors());
            }

            document.getElementById("all_budgets_progress").innerHTML = "";

            if(myJson == "")
            {
                var parent = document.getElementById('all_budgets_progress');
                var h = document.createElement('H3');
                var t = document.createTextNode("No data!");

                h.appendChild(t);
                parent.appendChild(h);
            }
            else{
                for (var i = 0; i < myJson.length; i++){
                    var parent = document.getElementById('all_budgets_progress');
                    var progress = document.createElement('div');
                    var progress_bar = document.createElement('div');
                    progress.className = "progress";
                    progress_bar.className = "progress-bar";
                    progress_bar.id = "bar_" + i;
                    progress_bar.style.backgroundColor = coloR[i];
                    var table = document.createElement("div");
                    var td_first = document.createElement("div");
                    var td_second = document.createElement("div");
                    table.className = "budget_table";
                    td_first.className = "budget_names";
                    td_second.className = "budget_amount";

                    td_first.innerHTML = myJson[i]["budget_name"] + "<br>" + myJson[i]["category_name"];

                    if(myJson[i]["current_amount"] < 0){
                        td_second.innerHTML = "<span class='red'>" + myJson[i]["current_amount"] + " лв.</span>" + "<br>" + myJson[i]["from_date"] + " - " + myJson[i]["to_date"];
                    }
                    else{
                        td_second.innerHTML = "<span class='green'>" + myJson[i]["current_amount"] + " лв.</span>" + "<br>" + myJson[i]["from_date"] + " - " + myJson[i]["to_date"];
                    }

                    parent.appendChild(table);
                    table.appendChild(td_first);
                    table.appendChild(td_second);
                    parent.appendChild(progress);
                    progress.appendChild(progress_bar);

                    $("#bar_" + i).attr('aria-valuenow', 0).attr('aria-valuemin', 0).attr('aria-valuemax', 100).
                    attr('role', "progressbar").css("width",(myJson[i]["current_amount"]/myJson[i]["init_amount"])*100 + "%");
                }
            }
        })
        .catch(function (e) {
            alert(e.message);
        })
}
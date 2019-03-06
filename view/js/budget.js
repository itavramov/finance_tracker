function addBudget(){

    var budget_name   = document.getElementById("budgetName").value;
    var budget_desc   = document.getElementById("budgetDesc").value;
    var category_id   = document.getElementById("categorySelectBudget").value;
    var budget_amount = document.getElementById("budgetAmount").value;
    var from_date     = document.getElementById("fromDate").value;
    var to_date       = document.getElementById("toDate").value;

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

            if(curr_month < 10){
                curr_month = "0" + curr_month;
            }
            if(curr_day < 10){
                curr_day = "0" + curr_day;
            }

            var start_date = month + "/" + day + "/" +  year;
            var end_date = curr_month + "/" + curr_day + "/" +  curr_year;

            console.log(start_date + " = " + end_date);
            document.getElementById("daterange3").value = start_date + " - " + end_date;

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

function fillBudgets(){
    fetch("../index.php?target=budget&action=listAllBudgets")
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            document.getElementById("budgets_main").innerHTML = "";
            var budgets_main = document.getElementById("budgets_main");
            label = document.createElement("H3");
            label.innerText = "All budgets";
            budgets_main.appendChild(label);
            var ict_unit = [];
            var efficiency = [];
            var coloR = [];

            var dynamicColors = function() {
                var r = Math.floor(Math.random() * 255);
                var g = Math.floor(Math.random() * 255);
                var b = Math.floor(Math.random() * 255);
                return "rgb(" + r + "," + g + "," + b + ")";
            };

            for (var i=0; i < myJson.length; i++){
                ict_unit.push("ICT Unit " + myJson[i].ict_unit);
                efficiency.push(myJson[i].efficiency);
                coloR.push(dynamicColors());
                var info_box = document.createElement('div');
                info_box.className = "info-box";
                var span_info = document.createElement("span");
                span_info.className = "info-box-icon";
                span_info.style.backgroundColor = coloR[i];
                var span_i = document.createElement("i");
                span_i.className = "fa fa-usd";
                var box_content = document.createElement("div");
                box_content.className = "info-box-content";
                var span_box_text = document.createElement("span");
                span_box_text.className = "info-box-text";
                span_box_text.innerText = myJson[i]["budget_name"];
                var span_box_number= document.createElement("span");
                span_box_number.className = "info-box-number";
                span_box_number.innerText = myJson[i]["current_amount"];
                if(myJson[i]["current_amount"] > 0){
                    span_box_number.style.color = "rgb(40, 203, 124)";
                }
                else{
                    span_box_number.style.color = "rgb(231, 76, 60)";
                }
                budgets_main.appendChild(info_box);
                info_box.appendChild(span_info);
                span_info.appendChild(span_i);
                info_box.appendChild(box_content);
                box_content.appendChild(span_box_text);
                box_content.appendChild(span_box_number);
            }
        })
        .catch(function (e) {
            alert(e.message);
        })
}
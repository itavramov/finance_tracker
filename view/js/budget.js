function addBudget(){

    var budget_name   = document.getElementById("budgetName").value;
    var budget_desc   = document.getElementById("budgetDesc").value;
    var category_id   = document.getElementById("categorySelectBudget").value;
    var budget_amount = document.getElementById("budgetAmount").value;
    var from_date     = document.getElementById("fromDate").value;
    var to_date       = document.getElementById("toDate").value;

    fetch("../index.php?target=budget&action=registerBudget",{
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

function fillBudgets(){
    fetch("../index.php?target=budget&action=listAllBudgets")
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

            var parent = document.getElementById('all_budgets_progress');
            if(myJson == "")
            {
                var h = document.createElement('H3');
                var t = document.createTextNode("No data!");

                h.appendChild(t);
                parent.appendChild(h);
            }
            else{
                for (var i = 0; i < myJson.length; i++){
                    var check = myJson[i]["budget_id"];
                    var delete_btn = document.createElement("i");
                    delete_btn.className = "fa fa-trash";
                    delete_btn.style.cssFloat = "right";
                    delete_btn.setAttribute("data-toggle", "modal");
                    delete_btn.addEventListener('click', function (check) {
                        return function () {
                            $('#deleteBudget').modal('show');
                            document.getElementById("magicField").value = check;
                        }
                    }(check));
                    var progress = document.createElement('div');
                    var progress_bar = document.createElement('div');
                    progress.className = "progress";
                    progress_bar.className = "progress-bar";
                    progress_bar.id = "bar_" + i;
                    progress_bar.style.backgroundColor = coloR[i];
                    var table = document.createElement("div");
                    var td_first = document.createElement("div");
                    var td_second = document.createElement("div");
                    var td_third = document.createElement("div");
                    table.className = "budget_table";
                    td_first.className = "budget_names";
                    td_second.className = "budget_amount";
                    td_third.className = "budget_delete";

                    td_first.innerHTML = myJson[i]["budget_name"] + "<br>" + myJson[i]["category_name"];

                    if(myJson[i]["current_amount"] < 0){
                        td_second.innerHTML = "<span class='red'>" + myJson[i]["current_amount"] + " лв.</span>" +
                            "<br>" + myJson[i]["from_date"] + " - " + myJson[i]["to_date"];
                    }
                    else{
                        td_second.innerHTML = "<span class='green'>" + myJson[i]["current_amount"] + " лв.</span>"
                            + "<br>" + myJson[i]["from_date"] + " - " + myJson[i]["to_date"];
                    }

                    parent.appendChild(table);
                    table.appendChild(td_first);
                    table.appendChild(td_second);
                    table.appendChild(td_third);
                    parent.appendChild(progress);
                    progress.appendChild(progress_bar);
                    td_third.appendChild(delete_btn);

                    $("#bar_" + i).attr('aria-valuenow', 0).attr('aria-valuemin', 0).attr('aria-valuemax', 100).
                    attr('role', "progressbar").css("width",(myJson[i]["current_amount"]/myJson[i]["init_amount"])*100 + "%");
                }
            }
        })
        .catch(function (e) {
            alert(e.message);
        })
}

function deleteBudget() {
    var deleteConf   = document.getElementById("deleteConfBud");
    var budget_id    = document.getElementById('magicField').value;
    if (deleteConf.value === "DELETE"){
        fetch("../index.php?target=budget&action=deleteBudget",{
            method: "POST",
            headers: {'Content-type': 'application/x-www-form-urlencoded'},
            body:"budget_id=" + budget_id
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                if (myJson.success === "done"){
                    alert("You just deleted budget!");
                }else {
                    alert("Please try again!");
                }
            })
            .catch(function (e) {
                alert(e.message);
            })
    }else {
        alert("Please type DELETE correctly!");
    }
}
function cashFlowBars(start_date, end_date, acc_id){
    fetch("../index.php?target=record&action=getSumTotal",{
        method: "POST",
        headers: {'Content-type': 'application/x-www-form-urlencoded'},
        body:"start_date=" + start_date + "&end_date=" + end_date + "&acc_id=" + acc_id
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            document.getElementById("cash_flow_value").innerHTML = "";
            document.getElementById('progressBarExpense').innerHTML = "";
            $('#progressBarExpense').css("width", "0%");
            document.getElementById('progressBarIncome').innerHTML = "";
            $('#progressBarIncome').css("width", "0%");

            document.getElementById("cash_flow_value").innerHTML = myJson[1]['total_sum'] - myJson[0]['total_sum'] + "лв.";

            if(myJson[0]['total_sum'] > myJson[1]['total_sum']){
                document.getElementById('progressBarExpense').innerHTML = myJson[0]['total_sum'];
                $('#progressBarExpense').css("width", "100%");
            }
            else{
                document.getElementById('progressBarExpense').innerHTML = (myJson[0]['total_sum']);
                $('#progressBarExpense').css("width", (myJson[0]['total_sum']/myJson[1]['total_sum'])*100 + "%");
            }

            if(myJson[1]['total_sum']>myJson[0]["total_sum"]){
                document.getElementById('progressBarIncome').innerHTML = myJson[1]['total_sum'];
                $('#progressBarIncome').css("width", "100%");
            }
            else{
                document.getElementById('progressBarIncome').innerHTML = myJson[1]["total_sum"];
                $('#progressBarIncome').css("width", (myJson[1]['total_sum']/myJson[0]['total_sum'])*100 + "%");
            }

        })
        .catch(function (e) {
            alert(e.message);
        })
}

function cash(){
    fetch("../index.php?target=record&action=getSumTotal")
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            document.getElementById("cash_flow_value").innerHTML = "";
            document.getElementById('progressBarExpense').innerHTML = "";
            $('#progressBarExpense').css("width", "0%");
            document.getElementById('progressBarIncome').innerHTML = "";
            $('#progressBarIncome').css("width", "0%");

            document.getElementById("cash_flow_value").innerHTML = myJson[1]['total_sum'] - myJson[0]['total_sum'] + " лв.";

            if(myJson[0]['total_sum'] > myJson[1]['total_sum']){
                document.getElementById('progressBarExpense').innerHTML = myJson[0]['total_sum'];
                $('#progressBarExpense').css("width", "100%");
            }
            else{
                document.getElementById('progressBarExpense').innerHTML = (myJson[0]['total_sum']);
                $('#progressBarExpense').css("width", (myJson[0]['total_sum']/myJson[1]['total_sum'])*100 + "%");
            }

            if(myJson[1]['total_sum']>myJson[0]["total_sum"]){
                document.getElementById('progressBarIncome').innerHTML = myJson[1]['total_sum'];
                $('#progressBarIncome').css("width", "100%");
            }
            else{
                document.getElementById('progressBarIncome').innerHTML = myJson[1]["total_sum"];
                $('#progressBarIncome').css("width", (myJson[1]['total_sum']/myJson[0]['total_sum'])*100 + "%");
            }

        })
        .catch(function (e) {
            alert(e.message);
        })
}

function changeAccCashFlow(acc_id){
    var res = document.getElementById("cashFlowDate").value.split(" ");
    var res_start_date = new Date(res[0]);
    var res_end_date = new Date(res[2]);
    var start_month = res_start_date.getMonth()+1;
    var start_day = res_start_date.getDate();
    var start_year = res_start_date.getFullYear();

    var end_month = res_end_date.getMonth()+1;
    var end_day = res_end_date.getDate();
    var end_year = res_end_date.getFullYear();

    if(start_month < 10)
    {
        start_month='0'+start_month;
    }
    if(end_month < 10)
    {
        end_month='0'+end_month;
    }

    var start_date = start_year + "-" + start_month + "-" +  start_day;
    var end_date = end_year + "-" + end_month + "-" + end_day;
    fetch("../index.php?target=record&action=getSumTotal",{
        method: "POST",
        headers: {'Content-type': 'application/x-www-form-urlencoded'},
        body:"start_date=" + start_date + "&end_date=" + end_date + "&acc_id=" + acc_id
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            document.getElementById("cash_flow_value").innerHTML = "";
            document.getElementById('progressBarExpense').innerHTML = "";
            $('#progressBarExpense').css("width", "0%");
            document.getElementById('progressBarIncome').innerHTML = "";
            $('#progressBarIncome').css("width", "0%");

            document.getElementById("cash_flow_value").innerHTML = myJson[1]['total_sum'] - myJson[0]['total_sum'] + "лв.";

            if(myJson[0]['total_sum'] > myJson[1]['total_sum']){
                document.getElementById('progressBarExpense').innerHTML = myJson[0]['total_sum'];
                $('#progressBarExpense').css("width", "100%");
            }
            else{
                document.getElementById('progressBarExpense').innerHTML = (myJson[0]['total_sum']);
                $('#progressBarExpense').css("width", (myJson[0]['total_sum']/myJson[1]['total_sum'])*100 + "%");
            }

            if(myJson[1]['total_sum']>myJson[0]["total_sum"]){
                document.getElementById('progressBarIncome').innerHTML = myJson[1]['total_sum'];
                $('#progressBarIncome').css("width", "100%");
            }
            else{
                document.getElementById('progressBarIncome').innerHTML = myJson[1]["total_sum"];
                $('#progressBarIncome').css("width", (myJson[1]['total_sum']/myJson[0]['total_sum'])*100 + "%");
            }

        })
        .catch(function (e) {
            alert(e.message);
        })
}
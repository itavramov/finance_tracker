function cashFlowBars(){
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
    fetch("../index.php?target=record&action=getSumTotal",{
        method: "POST",
        headers: {'Content-type': 'application/x-www-form-urlencoded'},
        body:"start_date=" + start_date + "&end_date=" + end_date
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
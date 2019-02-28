function cashFlowBars(){
    fetch("index.php?target=record&action=getSumTotal")
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {

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
function addRecord(){

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
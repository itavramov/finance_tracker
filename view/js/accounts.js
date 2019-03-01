function showAccounts() {
    fetch("index.php?target=account&action=listAllAccounts")
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            var record_row = document.getElementById('acc_content');

            for (var i=0; i < myJson.length; i++){
                var div = document.createElement('div');
                div.className = "box-body";
                var cat_div = document.createElement('div');
                cat_div.className = "box_cat_name";
                cat_div.innerHTML = myJson[i]["acc_name"];

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
                amount.innerHTML = myJson[i]["balance"];
                var action_date = document.createElement("div");
                action_date.className = "box_action_date";
                action_date.innerHTML = myJson[i]["currency"].toUpperCase();

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

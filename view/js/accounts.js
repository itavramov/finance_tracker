function fillAccounts() {
    fetch("../index.php?target=account&action=allUserAccounts")
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            document.getElementById("accounts_main").innerHTML = "";
            var acc_main = document.getElementById("accounts_main");
            label = document.createElement("H3");
            label.innerText = "All accounts";
            acc_main.appendChild(label);
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
                span_i.className = "fa fa-money";
                var box_content = document.createElement("div");
                box_content.className = "info-box-content";
                var span_box_text = document.createElement("span");
                span_box_text.className = "info-box-text";
                span_box_text.innerText = myJson[i]["acc_name"];
                var span_box_number= document.createElement("span");
                span_box_number.className = "info-box-number";
                span_box_number.innerText = myJson[i]["balance"];
                var span_currency = document.createElement("span");
                span_currency.innerText = myJson[i]["currency"];
                if(myJson[i]["balance"] > 0){
                    span_box_number.style.color = "rgb(40, 203, 124)";
                }
                else{
                    span_box_number.style.color = "rgb(231, 76, 60)";
                }
                acc_main.appendChild(info_box);
                info_box.appendChild(span_info);
                span_info.appendChild(span_i);
                info_box.appendChild(box_content);
                box_content.appendChild(span_box_text);
                box_content.appendChild(span_box_number);
                box_content.appendChild(span_currency);
            }
        })
        .catch(function (e) {
            alert(e.message);
        })
}

function showAccounts() {
    fetch("../index.php?target=account&action=listAllAccounts")
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {

            document.getElementById('acc_content').innerHTML = "";

            var record_row = document.getElementById('acc_content');

            var box_header = document.createElement("div");
            box_header.className = "box-header width-border";

            var box_title = document.createElement("H3");
            box_title.className = "box-title";
            box_title.innerText = "Your Accounts";

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

function addAccount() {
    var acc_name = document.getElementById('acc_name').value;
    var acc_type = document.getElementById('acc_type').value;
    var balance = document.getElementById('balance').value;
    var acc_currency = document.getElementById('acc_currency').value;

    fetch("../index.php?target=account&action=regAccount",{
        method: "POST",
        headers: {'Content-type': 'application/x-www-form-urlencoded'},
        body: "acc_name=" + acc_name + "&acc_type=" + acc_type + "&balance=" + balance + "&acc_currency=" + acc_currency
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            if(myJson.success === true){
                document.getElementById('addAccount').style.display='none';
                document.getElementById('addAccount').classList.remove("show");
                document.getElementById('addAccount').setAttribute('aria-hidden', 'true');
                var h = document.createElement("H1");
                var t = document.createTextNode("You create successfully an account");
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

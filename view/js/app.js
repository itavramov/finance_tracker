//THIS IS JUST THE BEGINING
function welcomeMessage() {
    fetch("index.php?target=user&action=userData")
        .then(function (response) {
            return response.json();
        }).then(function (json) {
            var header = document.getElementById("hello_section");
            header.innerHTML = "";
            header.innerHTML = "Welcome " + json.first_name + " " + json.last_name;
    }).catch(function (e) {
        alert("The total error message: " + e.message);
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

function addCategory(){
    var cat_name = document.getElementById('acc_name').value;
    var cat_type = document.getElementById('acc_type').value;

    fetch("../index.php?target=category&action=regCategory",{
        method: "POST",
        headers: {'Content-type': 'application/x-www-form-urlencoded'},
        body: "cat_name=" + cat_name + "&cat_type=" + cat_type
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            if(myJson.success === true){
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
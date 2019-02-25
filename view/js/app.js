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
    var acc_name = document.getElementById('acc_name');
    var acc_type = document.getElementById('acc_type');
    var balance = document.getElementById('balance');
    var acc_currency = document.getElementById('acc_currency');

    fetch("index.php?target=account&action=regAccount",{
        method: "POST",
        headers: {'Content-type': 'application/x-www-form-urlencoded'},
        body: "acc_name=" + acc_name + "acc_type=" + acc_type + "balance=" + balance + "acc_currency=" + acc_currency
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            
        })
        .catch(function (e) {
            alert(e.message);
        })
}
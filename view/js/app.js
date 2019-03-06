//THIS IS JUST THE BEGINING
function userHeaderInfo() {
    fetch("../index.php?target=user&action=userData")
        .then(function (response) {
            return response.json();
        }).then(function (json) {
            var user_image_nav = document.getElementById("user_image_nav");
            var user_image_header = document.getElementById("user_image_header");
            var user_info = document.getElementById("user_info");
            var user_name_nav = document.getElementById("user_name_nav");
            var small = document.createElement("small");
            user_image_nav.src = json.picture;
            user_image_header.src = json.picture;
            user_info.innerText = json.first_name + " " + json.last_name;
            small.innerHTML = json.sign_up_date;
            user_name_nav.innerHTML = json.first_name + " " + json.last_name;
            user_info.appendChild(small);
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

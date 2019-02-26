function addRecord(){

    var record_name = document.getElementById("recordName").value;
    var record_desc = document.getElementById("recordDesc").value;
    var amount      = document.getElementById("amount").value;
    var category_id = document.getElementById("categorySelect").value;
    var acc_id      = document.getElementById("accSelect").value;

    fetch("index.php?target=record&action=recordRegistration",{
        method: "POST",
        headers: {'Content-type': 'application/x-www-form-urlencoded'},
        body: "record_name=" + record_name + "&record_desc=" + record_desc + "&amount=" + amount +
            "&category_id=" + category_id + "&acc_id=" + acc_id
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
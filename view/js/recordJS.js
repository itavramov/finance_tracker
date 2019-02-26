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
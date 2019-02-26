function addCategory(){
    var cat_name = document.getElementById('cat_name').value;
    var cat_type = document.getElementById('cat_type').value;

    fetch("index.php?target=category&action=regCategory",{
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
                var t = document.createTextNode("You create successfully a category");
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

function fillCategories(){
    fetch("index.php?target=category&action=allUserCategories")
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            var cat_select = document.getElementById('categorySelect');
            for (var i=0; i < myJson.length; i++){
                var option = document.createElement('option');
                option.value = myJson[i]["category_id"];
                option.text = myJson[i]["category_name"];
                cat_select.options.add(option,1);
            }
        })
        .catch(function (e) {
            alert(e.message);
        })
}
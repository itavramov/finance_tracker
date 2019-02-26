function fillAccounts() {
    fetch("index.php?target=account&action=allUserAccounts")
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            var cat_select = document.getElementById('accSelect');
            for (var i=0; i < myJson.length; i++){
                var option = document.createElement('option');
                option.value = myJson[i]["acc_id"];
                option.text = myJson[i]["acc_name"];
                cat_select.options.add(option,1);
            }
        })
        .catch(function (e) {
            alert(e.message);
        })
}
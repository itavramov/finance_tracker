function showUserData(){
    fetch("../index.php?target=user&action=userData")
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            var first_name = myJson["first_name"];
            var last_name = myJson["last_name"];
            var email = myJson["email"];
            var age = myJson["age"];

            document.getElementById("new_first_name").value = first_name;
            document.getElementById("new_last_name").value = last_name;
            document.getElementById("new_age").value = age;
            document.getElementById("new_email").value = email;
            document.getElementById("user_id").value = myJson["user_id"];
        })
        .catch(function (e) {
            alert(e.message);
        })
}

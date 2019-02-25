function welcomeMessage() {
    fetch("index.php?target=user&action=userData")
        .then(function (response) {
            return response.json();
        }).then(function (json) {
            var header = document.getElementById("hello_section");
            header.innerHTML = "";
            header.innerHTML = json.first_name + " " + json.last_name;
    }).catch(function (e) {
        alert("The total error message: " + e.message);
    })
}
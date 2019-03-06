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

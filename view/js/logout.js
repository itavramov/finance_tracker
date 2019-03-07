function logout() {
    fetch("../index.php?target=user&action=userLogout")
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            if(myJson.message === "true"){
                location.href="./login.html";
                console.log("ok");
            }
        })
        .catch(function (e) {
            alert(e.message);
        })
}
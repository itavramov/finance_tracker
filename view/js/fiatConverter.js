const ACCESS_KEY = "154a5be03b5074fb63ab";
const API_URL    = "https://free.currencyconverterapi.com";

function getAllCurrencies() {
    var query = "/api/v6/currencies?apiKey=";
    var url   = API_URL + query + ACCESS_KEY;
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            var results = myJson.results;
            for (var object in results){
                var currencySelect1 = document.getElementById("curr_select_1");
                var option = document.createElement("option");
                option.text =  results[object].id;
                option.value = results[object].currencyName;
                currencySelect1.options.add(option,1);
                var currencySelect2 = document.getElementById("curr_select_2");
                var option = document.createElement("option");
                option.text =  results[object].id;
                option.value = results[object].currencyName;
                currencySelect2.options.add(option,1);
            }
        })
        .catch(function (e) {
            alert(e.message);
        })
}

function changeCurrencyName(select_id,text_id,hidden_id) {
    var currencySelect     = document.getElementById(select_id);
    var currencyText       = document.getElementById(text_id);
    currencyText.innerText = currencySelect.value;
    var query = "/api/v6/currencies?apiKey=";
    var url   = API_URL + query + ACCESS_KEY;
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            var results = myJson.results;
            for (var object in results){
                var hidden  = document.getElementById(hidden_id);
                if (results[object].currencyName === currencySelect.value){
                    hidden.value = results[object].id;
                }
            }
        })
        .catch(function (e) {
            alert(e.message);
        })
}

function convert(actionInput) {
    var firstValue  = document.getElementById("hidden_id_1").value;
    var secondValue = document.getElementById("hidden_id_2").value;
    var pairOne     = firstValue + "_" + secondValue;
    var pairTwo     = secondValue + "_" + firstValue;
    var query       = "/api/v6/convert?q=" + pairOne + "," + pairTwo + "&compact=ultra&apiKey=";
    var url         = API_URL + query + ACCESS_KEY;
    if (firstValue > 9999999 || firstValue < 0 || secondValue > 9999999 || secondValue < 0 ){
        if (actionInput === "curr_input_1"){
            document.getElementById("curr_input_1").value = "Invalid number...";
            return;
        } else {
            document.getElementById("curr_input_2").value = "Invalid number..."
            return;
        }
    }
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            var firstVal    = document.getElementById("curr_input_1").value;
            var secondVal   = document.getElementById("curr_input_2").value;
            if (actionInput === "curr_input_1"){
                for (var value in myJson){
                    if (value === pairOne){
                        secondVal = firstVal*myJson[value];
                        document.getElementById("curr_input_2").value = secondVal;
                        document.getElementById("curr_input_2").innerText = secondVal;
                        console.log(secondVal);
                    }
                }
            }else {
                for (var value2 in myJson){
                    if (value2 === pairTwo){
                        firstVal = secondVal*myJson[value2];
                        document.getElementById("curr_input_1").value = secondVal;
                        console.log(secondVal);
                    }
                }
            }
        })
        .catch(function (e) {
            alert(e.message);
        })
}
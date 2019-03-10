function calculateCrypto() {
    var amount        = document.getElementById('converterAmount');
    var crypto        = document.getElementById('cryptoSelect').value;
    var fiat          = document.getElementById('fiatSelect').value;
    var fiatOutput    = document.getElementById('fiatOutput');
    var cryptoField   = document.getElementById('cryptoOutput');
    var prependAmount = document.getElementById('prependAmount');
    var url;
    switch (crypto) {
        case 'BTC': url ='https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=BGN,USD,EUR';
            break;
        case 'ETH': url ='https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BGN,USD,EUR';
            break;
        case 'XRP': url ='https://min-api.cryptocompare.com/data/price?fsym=XRP&tsyms=BGN,USD,EUR';
            break;
        case 'LTC': url ='https://min-api.cryptocompare.com/data/price?fsym=LTC&tsyms=BGN,USD,EUR';
            break;
        default:   url ='https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=BGN,USD,EUR';
            break;
    }

    if (amount.value !== ""){
        fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                //cryptoField.innerText = amount.value + " : " + amount.value;
                if (amount.value > 999999999){
                    prependAmount.innerText = amount.value;
                    cryptoField.innerText   = crypto + " : " + amount.value;;
                    fiatOutput.innerText    = "Your number is over the limit...";
                }else if (amount.value < 0) {
                    prependAmount.innerText = amount.value;
                    cryptoField.innerText =  crypto + " : " + "( " + amount.value + " )";
                    fiatOutput.innerText  = "Your number is below the limit...";
                }
                else {
                    if (fiat === "BGN"){
                        prependAmount.innerText = amount.value;
                        cryptoField.innerText = crypto + " : " + amount.value;
                        fiatOutput.innerText ="BGN: " + (amount.value*myJson.BGN).toFixed(2);
                    } else if(fiat === "USD"){
                        prependAmount.innerText = amount.value;
                        fiatOutput.innerText ="USD: " + (amount.value*myJson.USD).toFixed(2);
                    }else if(fiat === "EUR"){
                        prependAmount.innerText = amount.value;
                        fiatOutput.innerText ="EUR: " + (amount.value*myJson.EUR).toFixed(2);
                    }
                }
            })
            .catch(function (e) {
                alert(e.message);
            })
    }
}

function changeCrypto() {
    var crypto        = document.getElementById('cryptoSelect');
    var cryptoField   = document.getElementById('cryptoOutput');
    var prependAmount = document.getElementById('prependAmount');
    var mainAmount    = document.getElementById('converterAmount').value


    if (document.getElementById('converterAmount').value === ""){
        cryptoField.innerText = crypto.value + " : 0";
    } else {
        cryptoField.innerText = crypto.value + " : " + mainAmount;
    }
    calculateCrypto();
}

function changeFiat() {
    var fiat = document.getElementById('fiatSelect');
    var fiatField = document.getElementById('fiatOutput');


    if (document.getElementById('converterAmount').value === ""){
        fiatField.innerText = fiat.value + " : 0";
    }else {
        fiatField.innerText = fiat.value + " : " + document.getElementById('converterAmount').value;
    }
    calculateCrypto();
}
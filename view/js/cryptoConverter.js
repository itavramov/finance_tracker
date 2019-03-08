function calculateCrypto() {
    var amount = document.getElementById('converterAmount');
    var crypto = document.getElementById('cryptoSelect').value;
    var fiat   = document.getElementById('fiatSelect').value;
    var result = document.getElementById('converterAmount');
    var fiatOutput = document.getElementById('fiatOutput');
    var cryptoField = document.getElementById('cryptoOutput');
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
                //cryptoField.innerText = amount.value + " : " + result.value;
                if (fiat === "BGN"){
                    cryptoField.innerText = crypto + " : " + amount.value;
                    fiatOutput.innerText ="BGN: " + result.value*myJson.BGN;
                } else if(fiat === "USD"){
                    fiatOutput.innerText ="USD: " + result.value*myJson.USD;
                }else if(fiat === "EUR"){
                    fiatOutput.innerText ="EUR: " + result.value*myJson.EUR;
                }
            })
            .catch(function (e) {
                alert(e.message);
            })
    }
}

function changeCrypto() {
    var crypto = document.getElementById('cryptoSelect');
    var cryptoField = document.getElementById('cryptoOutput');


    if (document.getElementById('converterAmount').value === ""){
        cryptoField.innerText = crypto.value + " : 0";
    }else {
        cryptoField.innerText = crypto.value + " : " + document.getElementById('converterAmount').value;
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
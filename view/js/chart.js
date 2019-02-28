function incomeExpenseDonut() {
    fetch("index.php?target=record&action=chartExpenses")
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {

            var ict_unit = [];
            var efficiency = [];
            var coloR = [];

            var dynamicColors = function() {
                var r = Math.floor(Math.random() * 255);
                var g = Math.floor(Math.random() * 255);
                var b = Math.floor(Math.random() * 255);
                return "rgb(" + r + "," + g + "," + b + ")";
            };

            for (var i in myJson[0]) {
                ict_unit.push("ICT Unit " + myJson[0][i].ict_unit);
                efficiency.push(myJson[0][i].efficiency);
                coloR.push(dynamicColors());
            }

            var ctx = document.getElementById("myChart");
            var data_arr = {
                datasets: [{
                    data: myJson[1],
                    backgroundColor: coloR,
                }],

                labels: myJson[0]
            };
            var options = {
                maintainAspectRatio: false
            };
            var firstDiagram = new Chart(ctx, {
                type: 'doughnut',
                data: data_arr,
                options: options
            });


        })
        .catch(function (e) {
            alert(e.message);
        })
}
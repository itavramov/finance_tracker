function incomeExpenseDonut() {
    fetch("index.php?target=record&action=getSumTotal")
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            var ctx = document.getElementById("myChart");
            var data_arr = {
                datasets: [{
                    data: [myJson[0]["total_sum"], myJson[1]["total_sum"]],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)'
                    ],
                }],

                labels: [
                    'Income',
                    'Expense'
                ]
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
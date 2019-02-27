function incomeExpenseDonut() {
    fetch("index.php?target=record&action=getSumTotal")
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            var ctx = document.getElementById("myChart");
            var data_arr = {
                datasets: [{
                    data: [myJson[0]["total_sum"], 54322312],
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
                animation: {
                    duration: 5000,
                    onProgress: function(animation) {
                        progress.value = animation.currentStep / animation.numSteps;
                    },
                    onComplete: function() {
                        window.setTimeout(function() {
                            progress.value = 0;
                        }, 2000);
                    }
                },
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        stacked: true,
                        gridLines: {
                            display: true,
                            color: "rgba(255,99,132,0.2)"
                        }
                    }],
                    xAxes: [{
                        gridLines: {
                            display: false
                        }
                    }]
                }
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
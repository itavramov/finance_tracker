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

function incomeVsExpenseLineChart() {
    fetch("index.php?target=record&action=listIncomesAndExpense")
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {

            var ctx = document.getElementById("incomeVsExpenseLineChart");

            var secondDiagram = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: myJson[0],
                    datasets: [{
                        label: 'Income',
                        backgroundColor: "rgba(40, 203, 124, 0.3)",
                        data: myJson[1],
                        showLine: true,
                    },
                    {
                        label: 'Expense',
                        backgroundColor: "rgba(231, 76, 60,0.3)",
                        data: myJson[3],
                        showLine: true,
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            stacked: false
                        }]
                    }
                }
            });
        })
        .catch(function (e) {
            alert(e.message);
        })
}

function redrawChart() {
    $('input[name="daterange"]').daterangepicker({
        opens: 'left'
    }, function(start, end, label) {
        var start_date = start.format('YYYY-MM-DD');
        var end_date = end.format('YYYY-MM-DD');
        console.log(start_date + " " + end_date);
            fetch("index.php?target=record&action=listIncomesAndExpense",{
                method: "POST",
                headers: {'Content-type': 'application/x-www-form-urlencoded'},
                body: "start_date=" + start_date + "end_date=" + end_date
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (myJson) {

                    document.getElementById("incomeVsExpenseLineChart").innerHTML="";

                    var ctx = document.getElementById("incomeVsExpenseLineChart");

                    var thirdDiagram = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: myJson[0],
                            datasets: [{
                                label: 'Income',
                                backgroundColor: "rgba(40, 203, 124, 0.3)",
                                data: myJson[1],
                                showLine: true,
                            },
                                {
                                    label: 'Expense',
                                    backgroundColor: "rgba(231, 76, 60,0.3)",
                                    data: myJson[3],
                                    showLine: true,
                                }]
                        },
                        options: {
                            scales: {
                                yAxes: [{
                                    stacked: false
                                }]
                            }
                        }
                    });
                })
                .catch(function (e) {
                    alert(e.message);
                })
    });
}

function incomeVsExpenseLineChart() {
    fetch("index.php?target=record&action=listIncomesAndExpense")
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {

            var ctx = document.getElementById("incomeVsExpenseLineChart");

            var secondDiagram = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: myJson[0],
                    datasets: [{
                        label: 'Income',
                        backgroundColor: "rgba(40, 203, 124, 0.3)",
                        data: myJson[1],
                        showLine: true,
                    },
                        {
                            label: 'Expense',
                            backgroundColor: "rgba(231, 76, 60,0.3)",
                            data: myJson[3],
                            showLine: true,
                        }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            stacked: false
                        }]
                    }
                }
            });
        })
        .catch(function (e) {
            alert(e.message);
        })
}

function radarDiagram() {
    fetch("index.php?target=record&action=listIncomesAndExpense")
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {

            var ctx = document.getElementById("incomeVsExpenseLineChart");

            var secondDiagram = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: myJson[0],
                    datasets: [{
                        label: 'Income',
                        backgroundColor: "rgba(40, 203, 124, 0.3)",
                        data: myJson[1],
                        showLine: true,
                    },
                        {
                            label: 'Expense',
                            backgroundColor: "rgba(231, 76, 60,0.3)",
                            data: myJson[3],
                            showLine: true,
                        }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            stacked: false
                        }]
                    }
                }
            });
        })
        .catch(function (e) {
            alert(e.message);
        })
}
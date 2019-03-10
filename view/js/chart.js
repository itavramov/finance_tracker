function ExpenseDonut(start_date, end_date) {
    fetch("../index.php?target=record&action=chartExpenses",{
        method: "POST",
        headers: {'Content-type': 'application/x-www-form-urlencoded'},
        body:"start_date=" + start_date + "&end_date=" + end_date
    })
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

            var ctx = document.getElementById("donutChart");
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

            document.getElementById("donut_legend").innerHTML = "";
            var total_sum = 0;
            var donut_legend = document.getElementById("donut_legend");
            donut_legend.innerHTML = "";
            for (var i in myJson[0]){
                var name = document.createElement("div");
                name.innerHTML = "<b>" + myJson[0][i] + "</b>" + " - " + myJson[1][i];
                name.style.paddingBottom = "10px";

                total_sum += parseInt(myJson[1][i])
                donut_legend.appendChild(name);
            }
            var total = document.createElement("div");
            total.innerHTML = "<b> Total: </b>" + total_sum;
            total.style.marginTop = "100px";
            total.style.marginLeft = "10px";

            donut_legend.appendChild(total);
        })
        .catch(function (e) {
            alert(e.message);
        })
}

function defaultExpenseDonut(){
    fetch("../index.php?target=record&action=chartExpenses")
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

            $('#results-graph').remove();

            var ctx = document.getElementById("donutChart");
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


            document.getElementById("donut_legend").innerHTML = "";
            var total_sum = 0;
            var donut_legend = document.getElementById("donut_legend");
            donut_legend.innerHTML = "";
            for (var i in myJson[0]){
                var name = document.createElement("div");
                name.innerHTML = "<b>" + myJson[0][i] + "</b>" + " - " + myJson[1][i];
                name.style.paddingBottom = "10px";

                total_sum += parseInt(myJson[1][i])
                donut_legend.appendChild(name);
            }
            var total = document.createElement("div");
            total.innerHTML = "<b> Total: </b>" + total_sum;
            total.style.marginTop = "100px";
            total.style.marginLeft = "10px";

            donut_legend.appendChild(total);


        })
        .catch(function (e) {
            alert(e.message);
        })
}

function defaultIncomeVsExpense() {
    fetch("../index.php?target=record&action=listIncomesAndExpense")
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {

            document.getElementById("incomeVsExpenseLineChart").innerHTML = "";

            var ctx = document.getElementById("incomeVsExpenseLineChart");

            var secondDiagram = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: myJson[0],
                    datasets: [{
                        label: 'Expense',
                        backgroundColor: "rgba(231, 76, 60,0.3)",
                        data: myJson[1],
                        showLine: true,
                    },
                        {
                            label: 'Income',
                            backgroundColor: "rgba(40, 203, 124, 0.3)",
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

function incomeVsExpenseLineChart(start_date, end_date) {
    fetch("../index.php?target=record&action=listIncomesAndExpense",{
        method: "POST",
        headers: {'Content-type': 'application/x-www-form-urlencoded'},
        body: "start_date=" + start_date + "&end_date=" + end_date
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {

            document.getElementById("incomeVsExpenseLineChart").innerHTML = "";
            var ctx = document.getElementById("incomeVsExpenseLineChart");

            var secondDiagram = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: myJson[0],
                    datasets: [{
                        label: 'Expense',
                        backgroundColor: "rgba(231, 76, 60,0.3)",
                        data: myJson[1],
                        showLine: true,
                    },
                        {
                            label: 'Income',
                            backgroundColor: "rgba(40, 203, 124, 0.3)",
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

            console.log(myJson[1] + " - " + myJson[3]);
        })
        .catch(function (e) {
            alert(e.message);
        })
}

function defaultRadarDiagram() {
    fetch("../index.php?target=record&action=radarDiagramExpenses")
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {

            document.getElementById("radarDiagram").innerHTML = "";

            var radarDiagram = new Chart(chart,{
                type: 'radar',
                data:{
                    labels: labels,
                    datasets: data,
                }
            });
            var current_labels = radarDiagram.data.labels;
            for (var i = 0; i < myJson[0].length; i++){
                if (!current_labels.includes(myJson[0][i])){
                    radarDiagram.data.labels.push(myJson[0][i]);
                }
            }
            var newColor = function() {
                var r = Math.floor(Math.random() * 255);
                var g = Math.floor(Math.random() * 255);
                var b = Math.floor(Math.random() * 255);
                var colors      = [];
                var mainColor   =  "rgb(" + r + "," + g + "," + b + ", 0.3)";
                var borderColor =  "rgb(" + r + "," + g + "," + b + ")";
                colors.push(mainColor);
                colors.push(borderColor);
                return colors;
            };
            var dataset = {
                label: 'First Compare Period',
                backgroundColor: newColor()[0],
                borderColor: newColor()[1],
                borderWidth: 2,
                data: myJson[1]
            };
            radarDiagram.data.datasets[0] = dataset;
            radarDiagram.update();

        })
        .catch(function (e) {
            alert(e.message);
        })
}

function compareRadarRedraw() {
    var chart  = document.getElementById("radarDiagram");
    var labels = [];
    var data   = [
        {},
        {}
    ];
    var radarDiagram = new Chart(chart,{
        type: 'radar',
        data:{
            labels: labels,
            datasets: data,
        }
    });

        $('input[name="daterange1"]').daterangepicker({
            opens: 'left'
        }, function(start, end, label) {
            var start_date = start.format('YYYY-MM-DD');
            var end_date = end.format('YYYY-MM-DD');
            fetch("../index.php?target=record&action=radarDiagramExpenses",{
                method: "POST",
                headers: {'Content-type': 'application/x-www-form-urlencoded'},
                body: "start_date=" + start_date + "&end_date=" + end_date
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (myJson) {
                    var current_labels = radarDiagram.data.labels;
                    for (var i = 0; i < myJson[0].length; i++){
                        if (!current_labels.includes(myJson[0][i])){
                            radarDiagram.data.labels.push(myJson[0][i]);
                        }
                    }
                    var newColor = function() {
                        var r = Math.floor(Math.random() * 255);
                        var g = Math.floor(Math.random() * 255);
                        var b = Math.floor(Math.random() * 255);
                        var colors      = [];
                        var mainColor   =  "rgb(" + r + "," + g + "," + b + ", 0.3)";
                        var borderColor =  "rgb(" + r + "," + g + "," + b + ")";
                        colors.push(mainColor);
                        colors.push(borderColor);
                        return colors;
                    };
                    var dataset = {
                        label: 'First Compare Period',
                        backgroundColor: newColor()[0],
                        borderColor: newColor()[1],
                        borderWidth: 2,
                        data: myJson[1]
                    };
                    radarDiagram.data.datasets[0] = dataset;
                    radarDiagram.update();
                    console.log(radarDiagram);
                })
                .catch(function (e) {
                    alert(e.message);
                })
        });

        $('input[name="daterange2"]').daterangepicker({
            opens: 'left'
        }, function(start, end, label) {
            var start_date = start.format('YYYY-MM-DD');
            var end_date = end.format('YYYY-MM-DD');

            fetch("../index.php?target=record&action=radarDiagramExpenses",{
                method: "POST",
                headers: {'Content-type': 'application/x-www-form-urlencoded'},
                body: "start_date=" + start_date + "&end_date=" + end_date
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (myJson) {
                    var current_labels = radarDiagram.data.labels;
                    for (var i = 0; i < myJson[0].length; i++){
                        if (!current_labels.includes(myJson[0][i])){
                            radarDiagram.data.labels.push(myJson[0][i]);
                        }
                    }
                    var newColor = function() {
                        var r = Math.floor(Math.random() * 255);
                        var g = Math.floor(Math.random() * 255);
                        var b = Math.floor(Math.random() * 255);
                        var colors      = [];
                        var mainColor   =  "rgb(" + r + "," + g + "," + b + ", 0.3)";
                        var borderColor =  "rgb(" + r + "," + g + "," + b + ")";
                        colors.push(mainColor);
                        colors.push(borderColor);
                        return colors;
                    };

                    var dataset = {
                        label: 'Second Compare Period',
                        backgroundColor: newColor()[0],
                        borderColor: newColor()[1],
                        borderWidth: 2,
                        data: myJson[1]
                    };
                    radarDiagram.data.datasets[1] = dataset;
                    radarDiagram.update();
                })
                .catch(function (e) {
                    alert("problema e " + e.message);
                })

        });
}

function compareRadar() {
    document.getElementById("radarDiagram").innerHTML = "";

    var radarDiagram = new Chart(chart,{
        type: 'radar',
        data:{
            labels: labels,
            datasets: data,
        }
    });

    var chart  = document.getElementById("radarDiagram");
    var labels = [];
    var data   = [
        {},
        {}
    ];
    var radarDiagram = new Chart(chart,{
        type: 'radar',
        data:{
            labels: labels,
            datasets: data,
        }
    });

    $('input[name="daterange1"]').daterangepicker({
        opens: 'left'
    }, function(start, end, label) {
        var start_date = start.format('YYYY-MM-DD');
        var end_date = end.format('YYYY-MM-DD');
        var radarDiagram = new Chart(chart,{
            type: 'radar',
            data:{
                labels: labels,
                datasets: data,
            }
        });
        fetch("../index.php?target=record&action=radarDiagramExpenses",{
            method: "POST",
            headers: {'Content-type': 'application/x-www-form-urlencoded'},
            body: "start_date=" + start_date + "&end_date=" + end_date
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                var current_labels = radarDiagram.data.labels;
                for (var i = 0; i < myJson[0].length; i++){
                    if (!current_labels.includes(myJson[0][i])){
                        radarDiagram.data.labels.push(myJson[0][i]);
                    }
                }
                var newColor = function() {
                    var r = Math.floor(Math.random() * 255);
                    var g = Math.floor(Math.random() * 255);
                    var b = Math.floor(Math.random() * 255);
                    var colors      = [];
                    var mainColor   =  "rgb(" + r + "," + g + "," + b + ", 0.3)";
                    var borderColor =  "rgb(" + r + "," + g + "," + b + ")";
                    colors.push(mainColor);
                    colors.push(borderColor);
                    return colors;
                };
                var dataset = {
                    label: 'First Compare Period',
                    backgroundColor: newColor()[0],
                    borderColor: newColor()[1],
                    borderWidth: 2,
                    data: myJson[1]
                };
                radarDiagram.data.datasets[0] = dataset;
                radarDiagram.update();
                console.log(radarDiagram);
            })
            .catch(function (e) {
                alert(e.message);
            })
    });

    $('input[name="daterange2"]').daterangepicker({
        opens: 'left'
    }, function(start, end, label) {
        var start_date = start.format('YYYY-MM-DD');
        var end_date = end.format('YYYY-MM-DD');

        fetch("../index.php?target=record&action=radarDiagramExpenses",{
            method: "POST",
            headers: {'Content-type': 'application/x-www-form-urlencoded'},
            body: "start_date=" + start_date + "&end_date=" + end_date
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                var current_labels = radarDiagram.data.labels;
                for (var i = 0; i < myJson[0].length; i++){
                    if (!current_labels.includes(myJson[0][i])){
                        radarDiagram.data.labels.push(myJson[0][i]);
                    }
                }
                var newColor = function() {
                    var r = Math.floor(Math.random() * 255);
                    var g = Math.floor(Math.random() * 255);
                    var b = Math.floor(Math.random() * 255);
                    var colors      = [];
                    var mainColor   =  "rgb(" + r + "," + g + "," + b + ", 0.3)";
                    var borderColor =  "rgb(" + r + "," + g + "," + b + ")";
                    colors.push(mainColor);
                    colors.push(borderColor);
                    return colors;
                };

                var dataset = {
                    label: 'Second Compare Period',
                    backgroundColor: newColor()[0],
                    borderColor: newColor()[1],
                    borderWidth: 2,
                    data: myJson[1]
                };
                radarDiagram.data.datasets[1] = dataset;
                radarDiagram.update();
            })
            .catch(function (e) {
                alert("problema e " + e.message);
            })

    });
}

    function firstCompareRadar(start_date,end_date,radarDiagram) {
    fetch("../index.php?target=record&action=radarDiagramExpenses",{
        method: "POST",
        headers: {'Content-type': 'application/x-www-form-urlencoded'},
        body: "start_date=" + start_date + "&end_date=" + end_date
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            var current_labels = radarDiagram.data.labels;
            for (var i = 0; i < myJson[0].length; i++){
                if (!current_labels.includes(myJson[0][i])){
                    radarDiagram.data.labels.push(myJson[0][i]);
                }
            }
            var newColor = function() {
                var r = Math.floor(Math.random() * 255);
                var g = Math.floor(Math.random() * 255);
                var b = Math.floor(Math.random() * 255);
                var colors      = [];
                var mainColor   =  "rgb(" + r + "," + g + "," + b + ", 0.3)";
                var borderColor =  "rgb(" + r + "," + g + "," + b + ")";
                colors.push(mainColor);
                colors.push(borderColor);
                return colors;
            };
            var dataset = {
                label: 'First Compare Period',
                backgroundColor: newColor()[0],
                borderColor: newColor()[1],
                borderWidth: 2,
                data: myJson[1]
            };
            radarDiagram.data.datasets[0] = dataset;
            radarDiagram.update();
            console.log(radarDiagram);
        })
        .catch(function (e) {
            alert(e.message);
        })
}

function secondCompareRadar(start_date,end_date,radarDiagram) {
    fetch("../index.php?target=record&action=radarDiagramExpenses",{
        method: "POST",
        headers: {'Content-type': 'application/x-www-form-urlencoded'},
        body: "start_date=" + start_date + "&end_date=" + end_date
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            var current_labels = radarDiagram.data.labels;
            for (var i = 0; i < myJson[0].length; i++){
                if (!current_labels.includes(myJson[0][i])){
                    radarDiagram.data.labels.push(myJson[0][i]);
                }
            }
            var newColor = function() {
                var r = Math.floor(Math.random() * 255);
                var g = Math.floor(Math.random() * 255);
                var b = Math.floor(Math.random() * 255);
                var colors      = [];
                var mainColor   =  "rgb(" + r + "," + g + "," + b + ", 0.3)";
                var borderColor =  "rgb(" + r + "," + g + "," + b + ")";
                colors.push(mainColor);
                colors.push(borderColor);
                return colors;
            };

            var dataset = {
                label: 'Second Compare Period',
                backgroundColor: newColor()[0],
                borderColor: newColor()[1],
                borderWidth: 2,
                data: myJson[1]
            };
            radarDiagram.data.datasets[1] = dataset;
            radarDiagram.update();
        })
        .catch(function (e) {
            alert("problema e " + e.message);
        })

}
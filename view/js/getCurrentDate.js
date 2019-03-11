function getCurrDate(){
    var CurrentDate = new Date();
    var newDate = new Date();
    var x = 1;
    newDate.setMonth(CurrentDate.getMonth() - x);
    var month = newDate.getUTCMonth() + 1;
    var day = newDate.getUTCDate();
    var year = newDate.getUTCFullYear();

    var curr_month = CurrentDate.getUTCMonth() + 1;
    var curr_day = newDate.getUTCDate() + 1;
    var curr_year = newDate.getUTCFullYear();

    if(month < 9){
        month = "0" + month;
    }
    if(day < 9){
        day = "0" + day;
    }

    if(curr_month < 9){
        curr_month = "0" + curr_month;
    }
    if(curr_day < 9){
        curr_day = "0" + curr_day;
    }
    var start_date = month + "/" + day + "/" +  year;
    var end_date = curr_month + "/" +  curr_day + "/" + curr_year ;

    return {
        start_date : start_date,
        end_date : end_date
    };
}
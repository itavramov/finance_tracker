
function loginValidation() {

    var isValid    = true;
    var $mailAlert = $('#mailAlert');
    var $email     = $('#email');
    var $passAlert = $('#passAlert');
    var $pass      = $('#password');

    if (!validateEmail($email.val())){
        $mailAlert.addClass('text-danger');
        $mailAlert.html('Invalid Email Address!');
        $email.addClass('alert alert-danger');
        $email.attr( 'data-content', 'Please enter valid email address!');
        $email.popover('show');
        isValid = false;
    }

    if ($pass.val() === ""){
        $passAlert.addClass('text-danger');
        $passAlert.html('Empty Password Field');
        $pass.addClass('alert alert-danger');
        $pass.attr( 'data-content', 'Please enter your password!');
        $pass.popover('show');
        isValid = false;
    }

    return isValid;

    function validateEmail(email) {
        var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);
    }

}

function registerValidation(form){
    var errors = true;
    var firstNameErr = document.getElementById("firstNameErr");
    var lastNameErr = document.getElementById("lastNameErr");
    var emailErr = document.getElementById("emailErr");
    var ageErr = document.getElementById("ageErr");
    var passErr = document.getElementById("passErr");
    var rePassErr = document.getElementById("rePassErr");
    var imageErr = document.getElementById("imageErr");

    var nameRegex = /^[a-zA-Z \.\,\+\-]*$/;
    var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var ageRegex = /\b(1[89]|[2-9][0-9]|1[01][0-9]|100)\b/;
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

    if(form.first_name.value.trim() === ""){
        firstNameErr.innerHTML = "<div class='mess'>There is no First name entered!</div>";
        errors = false;
    }else if(!nameRegex.test(form.first_name.value.trim())){
        firstNameErr.innerHTML = "<div class='mess'>First Name is not valid!</div>";
        errors = false;
    }else{
        firstNameErr.innerHTML = "";
    }

    if(form.last_name.value.trim() === ""){
        lastNameErr.innerHTML = "<div class='mess'>There is no Last name entered!</div>";
        errors = false;
    }else if(!nameRegex.test(form.last_name.value.trim())){
        lastNameErr.innerHTML = "<div class='mess'>Last Name is not valid!</div>";
        errors = false;
    }else{
        lastNameErr.innerHTML = "";
    }

    if(form.email.value.trim() === ""){
        emailErr.innerHTML = "<div class='mess'>There is no e-mail entered!</div>";
        errors = false;
    }else if(!emailRegex.test(form.email.value.trim())){
        emailErr.innerHTML = "<div class='mess'>E-mail is not valid!</div>";
        errors = false;
    }else{
        emailErr.innerHTML = "";
    }

    if(form.age.value.trim() === ""){
        ageErr.innerHTML = "<div class='mess'>There is no age entered!</div>";
        errors = false;
    }else if(!ageRegex.test(form.age.value.trim())){
        ageErr.innerHTML = "<div class='mess'>Age is not valid!</div>";
        errors = false;
    }else{
        ageErr.innerHTML = "";
    }

    if(form.password_1.value.trim() === ""){
        passErr.innerHTML = "<div class='mess'>There is no password entered!</div>";
        errors = false;
    }else if(!passwordRegex.test(form.password_1.value.trim())){
        passErr.innerHTML = "<div class='mess'>Password is not valid!</div>";
        errors = false;
    }else{
        passErr.innerHTML = "";
    }

    if (form.password_1.value.trim() !== form.password_2.value.trim()){
        rePassErr.innerHTML = "<div class='mess'>Passwords mismatch!</div>";
        errors=false;

    }else{
        rePassErr.innerHTML="";
    }

    if(document.getElementById("user_image").value !== "") {
        if (document.getElementById("avatar").files[0].size > 2097152) {
            imageErr.innerHTML = "<div class='mess'>File must be under 2MB </div>";
            errors = false;
        } else {
            imageErr.innerHTML = "";
        }
    }

    return errors;
}

function logSubmit() {

    if (loginValidation()){
        $( "#submitBtn" ).click(function() {
            $( "#logForm" ).submit();
        });
    }
}

function addAccountValidation() {

    var isValid           = true;
    var $accNameAlert     = $('#accNameAlert');
    var $accName          = $('#acc_name');
    var $accTypeAlert     = $('#accTypeAlert');
    var $accType          = $('#acc_type');
    var $accCurrencyAlert = $('#accCurrencyAlert');
    var $accCurrency      = $('#acc_currency');
    var $accBalance       = $('#balance');
    var $balanceAlert     = $('#balanceAlert');
    
    if ($accName.val() === ""){
        $accName.addClass('alert alert-danger');
        $accName.attr('data-content', 'Please enter account name!');
        $accName.popover('show');
        
        $accNameAlert.addClass('text-danger');
        $accNameAlert.html('The account name field is empty');
        isValid = false;
    } 
    
    if ($accType.val() === "none"){
        $accType.addClass('border border-danger');
        $accType.attr('data-content', 'Please choose account type!');
        $accType.popover('show');

        $accTypeAlert.addClass('text-danger');
        $accTypeAlert.html('No account type is picked!');
        isValid = false;
    }

    if ($accCurrency.val() === "none"){
        $accCurrency.addClass('border border-danger');
        $accCurrency.attr('data-content', 'Please choose ');
        $accCurrency.popover('show');

        $accCurrencyAlert.addClass('text-danger');
        $accCurrencyAlert.html('No account type is picked!');
        isValid = false;
    }
    if (!validateBalance($accBalance.val()) || !validateBalanceValue($accBalance.val())){
        $accBalance.addClass('alert alert-danger');
        $accBalance.attr('data-content', 'Please enter a positive number!');
        $accBalance.popover('show');

        $balanceAlert.addClass('text-danger');
        $balanceAlert.html('Invalid number for account balance!');
        isValid = false;
    }

    return isValid;

    function validateBalance(balance) {
        var regex = /^\d*[1-9]\d*$/;
        return regex.test(balance);
    }

    function validateBalanceValue(str) {
        var n = Math.floor(Number(str));
        return n !== Infinity && String(n) === str && n >= 0;
    }
}

function addAccountSubmit() {

    if (addAccountValidation()){
        $addAccBtn = $('#addAccBtn');
        $addAccBtn.attr('data-dismiss', 'modal');
        addAccount();
    }
}
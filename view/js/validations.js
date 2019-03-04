
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
    if (!validateNumber($accBalance.val()) || !validateNumberValue($accBalance.val())){
        $accBalance.addClass('alert alert-danger');
        $accBalance.attr('data-content', 'Please enter a positive number!');
        $accBalance.popover('show');

        $balanceAlert.addClass('text-danger');
        $balanceAlert.html('Invalid number for account balance!');
        isValid = false;
    }

    return isValid;
}

function addAccountSubmit() {

    if (addAccountValidation()){
        $addAccBtn = $('#addAccBtn');
        $addAccBtn.attr('data-dismiss', 'modal');
        addAccount();
    }
}

function addBudgetValidation(){
    var isValid = true;
    var $budgetName = $('#budgetName');
    var $budgetNameAlert = $('#budgetNameAlert');
    var $budgetDesc = $('#budgetDesc');
    var $budgetDescAlert = $('#budgetDescAlert');
    var $categorySelectBudget = $('#categorySelectBudget');
    var $categorySelectBudgetAlert = $('#categorySelectBudgetAlert');
    var $budgetAmount = $('#budgetAmount');
    var $budgetAmountAlert = $('#budgetAmountAlert');
    var $fromDate = $('#fromDate');
    var $fromDateAlert = $('#fromDateAlert');
    var $toDate = $('#toDate');
    var $toDateAlert = $('#toDateAlert');

    if ($budgetName.val() === "" || !validateName($budgetName.val())){
        $budgetName.addClass('alert alert-danger');
        $budgetName.attr('data-content', 'Please enter only letters!');
        $budgetName.popover('show');

        $budgetNameAlert.addClass('text-danger');
        $budgetNameAlert.html('The budget name field is empty or invalid value');
        isValid = false;
    }

    if ($budgetDesc.val() === ""){
        $budgetDesc.addClass('alert alert-danger');
        $budgetDesc.attr('data-content', 'Please enter budget desc!');
        $budgetDesc.popover('show');

        $budgetDescAlert.addClass('text-danger');
        $budgetDescAlert.html('The budget desc field is empty');
        isValid = false;
    }

    if ($categorySelectBudget.val() === "none"){
        $categorySelectBudget.addClass('border border-danger');
        $categorySelectBudget.attr('data-content', 'Please choose category!');
        $categorySelectBudget.popover('show');

        $categorySelectBudgetAlert.addClass('text-danger');
        $categorySelectBudgetAlert.html('No category type is picked!');
        isValid = false;
    }

    if (!validateNumber($budgetAmount.val()) || !validateNumberValue($budgetAmount.val())){
        $budgetAmount.addClass('alert alert-danger');
        $budgetAmount.attr('data-content', 'Please enter a positive number!');
        $budgetAmount.popover('show');

        $budgetAmountAlert.addClass('text-danger');
        $budgetAmountAlert.html('Invalid number for budget amount!');
        isValid = false;
    }

    if ($fromDate.val() === ""){
        $fromDate.addClass('alert alert-danger');
        $fromDate.attr('data-content', 'Please enter date!');
        $fromDate.popover('show');

        $fromDateAlert.addClass('text-danger');
        $fromDateAlert.html('Date field is empty');
        isValid = false;
    }

    if ($toDate.val() === ""){
        $toDate.addClass('alert alert-danger');
        $toDate.attr('data-content', 'Please enter date!');
        $toDate.popover('show');

        $toDateAlert.addClass('text-danger');
        $toDateAlert.html('Date field is empty');
        isValid = false;
    }

    return isValid;
}

function addBudgetSubmit() {
    if (addBudgetValidation()){
        $addBudgetBtn = $('#addBudgetBtn');
        $addBudgetBtn.attr('data-dismiss', 'modal');
        addBudget();
    }
}

function addRecordValidation() {
    var isValid      = true;
    var $recordName      = $('#recordName');
    var $recordNameAlert = $('#recordNameAlert');
    var $recordDesc      = $('#recordDesc');
    var $recordDescAlert = $('#recordDescAlert');
    var $amount          = $('#amount');
    var $amountAlert     = $('#amountAlert');
    var $category        = $('#categorySelect');
    var $categoryAlert   = $('#categorySelectAlert');
    var $accSelect       = $('#accSelect');
    var $accSelectAlert  = $('#accSelectAlert');

    if ($recordName.val() === ""){
        $recordName.addClass('alert alert-danger');
        $recordName.attr('data-content', 'Please enter record name!');
        $recordName.popover('show');

        $recordNameAlert.addClass('text-danger');
        $recordNameAlert.html('The record name field is empty');
        isValid = false;
    }

    if ($recordDesc.val() === "" || $recordDesc.val().length < 10){
        $recordDesc.addClass('alert alert-danger');
        $recordDesc.attr('data-content', 'Please enter record name!');
        $recordDesc.popover('show');

        $recordDescAlert.addClass('text-danger');
        $recordDescAlert.html('The record name field is empty');
        isValid = false;
    }

    if (!validateNumber($amount.val()) || !validateNumberValue($amount.val())){
        $amount.addClass('alert alert-danger');
        $amount.attr('data-content', 'Please enter a positive number!');
        $amount.popover('show');

        $amountAlert.addClass('text-danger');
        $amountAlert.html('Invalid number for record amount!');
        isValid = false;
    }

    if ($category.val() === "none"){
        $category.addClass('border border-danger');
        $category.attr('data-content', 'Please choose ');
        $category.popover('show');

        $categoryAlert.addClass('text-danger');
        $categoryAlert.html('No account type is picked!');
        isValid = false;
    }

    if ($accSelect.val() === "none"){
        $accSelect.addClass('border border-danger');
        $accSelect.attr('data-content', 'Please choose ');
        $accSelect.popover('show');

        $accSelectAlert$accSelectAlert.addClass('text-danger');
        $accSelectAlert.html('No account type is picked!');
        isValid = false;
    }

    return isValid;
}

function addRecordSubmit() {

    if (addRecordValidation()){
        $addRecordBtn = $('#addRecordBtn');
        $addRecordBtn.attr('data-dismiss', 'modal');
        addRecord()
    }
}

function addCategoryValidation(){
    var isValid            = true;
    var $categoryName      = $('#categoryName');
    var $categoryNameAlert = $('#categoryNameAlert');
    var $categoryType      = $('#categoryType');
    var $categoryTypeAlert = $('#categoryTypeAlert');

    if ($categoryName.val() === "" || !validateName($categoryName.val())){
        $categoryName.addClass('alert alert-danger');
        $categoryName.attr('data-content', 'Please enter category name!');
        $categoryName.popover('show');

        $categoryNameAlert.addClass('text-danger');
        $categoryNameAlert.html('The category name field is empty');
        isValid = false;
    }

    if ($categoryType.val() === "none"){
        $categoryType.addClass('border border-danger');
        $categoryType.attr('data-content', 'Please choose category!');
        $categoryType.popover('show');

        $categoryTypeAlert.addClass('text-danger');
        $categoryTypeAlert.html('No category type is picked!');
        isValid = false;
    }

    return isValid;
}

function addCategorySubmit(){
    if (addCategoryValidation()){
        $addCategorydBtn = $('#addCategoryBtn');
        $addCategorydBtn.attr('data-dismiss', 'modal');
        addCategory();
    }
}

//HELPING VALIDATION FUNCTIONS
function validateEmail(email) {
    var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
}

function validateNumber(number) {
    var regex = /^\d*[1-9]\d*$/;
    return regex.test(number);
}

function validateNumberValue(str) {
    var n = Math.floor(Number(str));
    return n !== Infinity && String(n) === str && n >= 0;
}

function validateName(name){
    var regex = /^[a-zA-Z \.\,\+\-]*$/;
    return regex.test(name);
}

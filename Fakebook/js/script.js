var email = document.forms['form']['mail']
var password = document.forms['form']['password']
var email_regex =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

var email_error = document.getElementById("email_error");
var pass_error = document.getElementById("pass_error");


function validated(){
    if(email.value.match(email_regex)){
        if(password.value.length > 6){
            return true;
        } else { //shitty password
            email_error.style.display = "none";
            password.style.border = "3px solid red";
            pass_error.style.display = "block";
            password.focus();
            return false;
        }
    } else { //shitty email
        email.style.border = "3px solid red";
        email_error.style.display = "block";
        email.focus();
        return false;
    }
}
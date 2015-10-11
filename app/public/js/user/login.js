/*
 * Corinne Konoza
 * June 17, 2015
 * corinne@lampostlabs.com
 * Store login validation code- JavaScript
 *
 */

/******************FUNCTION CALLED ON SUBMIT********************/

function loginValidation() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    if(email_Validation(email)){
        if(password_Validation(password)){
            alert("Thank you.");
            document.getElementById("login").submit();
        }
    }
}


/******************SUPPORT FUNCTIONS********************/

function email_Validation (em) {

    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (em.match(mailformat)) {
        return true;
    } else {
        alert('You have entered an invalid email address.');
        return false;
    }

}
function password_Validation(pass) {

    var pass_len = pass.length;
    var letters = /[^a-zA-Z0-9]$/; // alphanumeric options negated by ^


    if (pass_len === 0 || pass_len <= 5 || pass_len > 15) {

        alert("Password must have a length between 5 and 15 characters.");
        return false;

    } else {
        // length is ok, now check characters used:

        if(pass.match(letters) === null){
            // match fn tests for match in a string, returns an array of matches
            // if they exist, null otherwise
            // if null, there are only alphanumeric characters used and pw is ok
            return true;
        } else {
            alert("Password must have alphanumeric characters only.");
            return false;
        }
    }
}
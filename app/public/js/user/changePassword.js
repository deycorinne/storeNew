/*
 * Corinne Konoza
 * June 16, 2015
 * corinne@lampostlabs.com
 * change pw validation code- JavaScript
 *
 */

/******************FUNCTION CALLED ON SUBMIT********************/

function changePassValidation(){
    var password = document.getElementById('password').value;
    var passwordrep = document.getElementById('passwordrep').value;

    if (password_validation(password, passwordrep)) {
        alert('Your password has been changed.');
        document.getElementById("changepw").submit()
    }
}

/******************SUPPORT FUNCTION********************/

function password_validation(pass, passrep) {
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

            // now we check to see if the passrep matches the pass:
            if(pass == passrep){
                return true;
            } else {
                alert("The password fields do not match!");
                return false;
            }

        } else {
            alert("Password must have alphanumeric characters only.");
            return false;
        }
    }
}
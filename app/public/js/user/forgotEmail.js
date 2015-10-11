/*
 * Corinne Konoza
 * June 18, 2015
 * corinne@lampostlabs.com
 * Store forgot email validation code- JavaScript
 *
 */

/******************FUNCTION CALLED ON SUBMIT********************/

function forgotEmailValidation() {
    var phone = document.getElementById("phone").value;
    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;

    if(phone_validation(phone)){
        if(firstname_validation(firstname)){
            if(lastname_validation(lastname)){
                alert('A text message will be sent to the phone number provided.');
                // will eventually have form submit to a database
                //TODO submit form here
            }
        }
    }
}


/******************SUPPORT FUNCTIONS********************/

function phone_validation(ph) {
    // Note: making type number means it cannot be submitted unless
    // the value is only numbers, so no check necessary with phone
    // or postcode

    var phone_len = ph.length;

    if (phone_len < 10) {
        alert('Phone number must be ten numbers.');
        return false;
    } else {
        return true;
    }
}


function firstname_validation(fn) {

    var fn_len = fn.length;

    if (fn_len === 0) {
        alert("First name field should not be empty!");
        return false;
    } else {
        return true;
    }
}

function lastname_validation(ln) {

    var ln_len = ln.length;

    if (ln_len === 0) {
        alert("Last name field should not be empty!");
        return false;
    } else {
        return true;
    }
}


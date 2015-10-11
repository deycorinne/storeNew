/*
 * Corinne Konoza
 * June 18, 2015
 * corinne@lampostlabs.com
 * Store restore password validation code- JavaScript
 *
 */

/******************FUNCTION CALLED ON SUBMIT********************/

function restorePassValidation() {
    var email = document.getElementById("email").value;

    if(email_Validation(email)){
        alert("Thank you.");
            document.getElementById("restore").submit();
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

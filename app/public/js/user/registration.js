/*
 * Corinne Konoza
 * Store registration validation code- JavaScript
 *
 */

/******************FUNCTION CALLED ON SUBMIT********************/

function formValidation() {
  // var firstname = document.getElementById('firstname').value;
  // var lastname = document.getElementById('lastname').value;
  var email = document.getElementById('username').value;
  //  var phone = document.getElementById('phone').value;
  var password = document.getElementById('password').value;
  var passwordrep = document.getElementById('passwordrep').value;
  //var address = document.getElementById('address').value;
  //    var postcode = document.getElementById('postcode').value;

  // nest all supporting functions, if all true then send thank you alert
  // if (firstname_validation(firstname)) {
  //   if (lastname_validation(lastname)) {
  if (email_validation(email)) {
    //  if (phone_validation(phone)) {
    if (password_validation(password, passwordrep)) {
      //  if (address_validation(address)) {
      //  if (postcode_validation(postcode)) {
      alert('Thank you for submitting the form.');
      document.getElementById("registration").submit();
      //  }
      //  }
    }
    //  }
  }
  //   }
  // }
}


/******************SUPPORT FUNCTIONS********************/

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

function email_validation(em) {

  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (em.match(mailformat)) {
    return true;
  } else {
    alert('You have entered an invalid email address.');
    return false;
  }
}

function password_validation(pass, passrep) {

  var pass_len = pass.length;
  var letters = /[^a-zA-Z0-9]$/; // alphanumeric options negated by ^


  if (pass_len === 0 || pass_len <= 5 || pass_len > 15) {

    alert("Password must have a length between 5 and 15 characters.");
    return false;

  } else {
    // length is ok, now check characters used:

    if (pass.match(letters) === null) {
      // match fn tests for match in a string, returns an array of matches
      // if they exist, null otherwise
      // if null, there are only alphanumeric characters used and pw is ok

      // now we check to see if the passrep matches the pass:
      if (pass == passrep) {
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

function address_validation(ad) {

  var ad_len = ad.length;

  if (ad_len === 0) {
    alert("Address should not be empty!");
    return false;
  } else {
    return true;
  }
}

function postcode_validation(pc) {

  var post_len = pc.length;

  if (post_len < 5) {
    alert('Post code must be five numbers.');
    return false;
  } else {
    return true;
  }
}

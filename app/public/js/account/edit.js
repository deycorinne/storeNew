/*
 * Corinne Konoza
 * 7.15.15
 * corinne@lampostlabs.com
 * edit account validation code- JavaScript
 *
 */

/******************FUNCTION CALLED ON SUBMIT********************/

function formValidation() {
  var email = document.getElementById('email').value;
  var firstname = document.getElementById('firstname').value;
  var lastname = document.getElementById('lastname').value;
  var phone = document.getElementById('phone').value;
  var address = document.getElementById('address').value;
  var postcode = document.getElementById('postcode').value;

  // nest all supporting functions, if all true then send thank you alert
  if (email_validation(email)) {
    if (firstname_validation(firstname)) {
      if (lastname_validation(lastname)) {
        if (phone_validation(phone)) {
          if (address_validation(address)) {
            if (postcode_validation(postcode)) {
              alert('Thank you for submitting the form.');
              document.getElementById("edit_account").submit();
            }
          }
        }
      }
    }
  }

}


/******************SUPPORT FUNCTIONS********************/

function email_validation(em) {

  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (em.match(mailformat)) {
    return true;
  } else {
    alert('You have entered an invalid email address.');
    return false;
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

/*
 * Corinne Konoza
 * 7.23.15
 * corinne@lampostlabs.com
 * edit brand validation code- JavaScript
 *
 */

/******************FUNCTION CALLED ON SUBMIT********************/

function formValidation() {
    var identity = document.getElementById('identity').value;
    var segment_url = document.getElementById('segment_url').value;
    var description = document.getElementById('description').value;
    var key_words = document.getElementById('key_words').value;
    var cont = document.getElementById('cont').value;

    // nest all supporting functions, if all true then send thank you alert
    if (segment_url_validation(segment_url)) {
        if (description_validation(description)) {
            if(key_words_validation(key_words)) {
                if (cont_validation(cont)) {
                    alert('Thank you for submitting the form.');
                    document.getElementById("edit_brand").submit();
                }
            }
        }
    }

}


/******************SUPPORT FUNCTIONS********************/

function id_validation(id) {

    var id_len = id.length;

    if (id_len === 0) {
        alert("Name field should not be empty!");
        return false;
    } else {
        return true;
    }
}

function segment_url_validation(url) {

    var url_len = url.length;

    if (url_len === 0) {
        alert("Segment url field should not be empty!");
        return false;
    } else {
        return true;
    }
}

function key_words_validation(k) {

    var k_len = k.length;

    if (k_len === 0) {
        alert("Key words should not be empty!");
        return false;
    } else {
        return true;
    }
}

function description_validation(d) {

    var d_len = d.length;

    if (d_len === 0) {
        alert("Description field should not be empty!");
        return false;
    } else {
        return true;
    }
}

function cont_validation(c) {

    var c_len = c.length;

    if (c_len === 0) {
        alert("Content field should not be empty!");
        return false;
    } else {
        return true;
    }
}
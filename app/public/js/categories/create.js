/*
* Corinne Konoza
* 7.21.15
* corinne@lampostlabs.com
* create category form validation code- JavaScript
*
*/

/******************FUNCTION CALLED ON SUBMIT********************/

    function formValidation() {
    var identity = document.getElementById('identity').value;
    var segment_url = document.getElementById('segment_url').value;
    var logo = document.getElementById('logo').value;
    var key_words = document.getElementById('key_words').value;
    var description = document.getElementById('description').value;
    var cont = document.getElementById('cont').value;

    // nest all supporting functions, if all true then send thank you alert
    if (identity_validation(identity)) {
        if (segment_url_validation(segment_url)) {
            if (key_words_validation(key_words)) {
                if (description_validation(description)) {
                    if (logo_validation(logo)) {
                        if (cont_validation(cont)) {
                            alert('Thank you for submitting the form.');
                            document.getElementById("createCategory").submit();
                        }
                    }
                }
            }
        }
    }
}


/******************SUPPORT FUNCTIONS********************/

function identity_validation(n) {

    var n_len = n.length;

    if (n_len === 0) {
        alert("Name field should not be empty!");
        return false;
    } else {
        return true;
    }
}


function segment_url_validation(seg) {

    var seg_len = seg.length;

    if (seg_len === 0) {
        alert("Segment URL should not be empty!");
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
        alert("Description should not be empty!");
        return false;
    } else {
        return true;
    }
}

function logo_validation(l) {

    var l_len = l.length;

    if (l_len === 0) {
        alert("Logo field should not be empty!");
        return false;
    } else {
        return true;
    }
}



function cont_validation(c) {

    var c_len = c.length;

    if (c_len === 0) {
        alert("Content should not be empty!");
        return false;
    } else {
        return true;
    }
}

/*
 * Corinne Konoza
 * 7.28.15
 * corinne@lampostlabs.com
 * edit tag form validation code- JavaScript
 *
 */

/******************FUNCTION CALLED ON SUBMIT********************/

function formValidation() {
    var name = document.getElementById('identity').value;
    var segment_url = document.getElementById('segment_url').value;

    // nest all supporting functions, if all true then send thank you alert
    if (name_validation(name)) {
        if (segment_url_validation(segment_url)) {
            alert('Thank you for submitting the form.');
            document.getElementById("edit_tag").submit();
        }
    }
}


/******************SUPPORT FUNCTIONS********************/

function name_validation(n) {

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




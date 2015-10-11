/*
 * Corinne Konoza
 * 7.21.15
 * corinne@lampostlabs.com
 * create product form validation code- JavaScript
 *
 */

/******************FUNCTION CALLED ON SUBMIT********************/

function formValidation() {
    var identity = document.getElementById('identity').value;
    var segment_url = document.getElementById('segment_url').value;
    var category = document.getElementById('category');
    var tag = document.getElementById('tag');
    var brand = document.getElementById('brand');
    var poster = document.getElementById('poster').value;
    var cont = document.getElementById('cont').value;
    var image = document.getElementById('image');
    var price = document.getElementById('price').value;

    // nest all supporting functions, if all true then send thank you alert
    if (identity_validation(identity)) {
        if (segment_url_validation(segment_url)) {
            if (category_validation(category)) {
                if (tag_validation(tag)) {
                    if (brand_validation(brand)) {
                        if (poster_validation(poster)) {
                            if (content_validation(cont)) {
                                if (image_validation(image)) {
                                    if (price_validation(price)) {
                                        alert('Thank you for submitting the form.');
                                        document.getElementById("create_product").submit();
                                    }
                                }
                            }
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

// select-- check only if empty
function category_validation(c) {

    //if undefined, return false

    var c_len = c.length;
    if(c_len === 0) {
        alert("Please select a category!");
        return false;
    } else {
        return true;
    }


}


function tag_validation(choice) {
    // array not string

    var values = 0;
    for (var i = 0; i < choice.length; i++){
        if(choice[i].selected == true){
            values = values + 1;
        }
    }

    if(values != 0){
        return true;
    } else {
        alert("Please select at least one tag!");
        return false;
    }


}

// SELECT
function brand_validation(b) {

    //if undefined, return false
    var b_len = b.length;
    if(b_len === 0) {
        alert("Please select a brand!");
        return false;
    } else {
        return true;
    }


}

function poster_validation(p) {

    var p_len = p.length;

    if (p_len === 0) {
        alert("Poster field should not be empty!");
        return false;
    } else {
        return true;
    }
}



function content_validation(c) {

    var c_len = c.length;

    if (c_len === 0) {
        alert("Content should not be empty!");
        return false;
    } else {
        return true;
    }
}

// CHECKBOX-- don't need to validate

function image_validation(i) {

    if (i.files.length === 0) {
        alert("At least one image should be uploaded!");
        return false;
    } else if (i.files.length > 5) {
        alert("You can only upload five images per product!");
        return false;
    } else {
        return true;
    }
}

function price_validation(p) {

    if( /^(\d{1,3})?(,?\d{3})*(\.\d{2})?$/.test(p))
        return true;
    else {
        alert('Price must be formatted correctly!');
        return false;
    }
}
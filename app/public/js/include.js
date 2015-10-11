/*
 * Corinne Konoza
 * June 29, 2015
 * Navigation file for store
 */

// Main navigation bars
window.onload = function () {

    document.getElementById("nav01").innerHTML =
        "<a href='/login/'>LOGIN</a>   " +
        "<a href='/registration/'><div id='signup_text'>SIGN UP</div></a>   " +
        "<a href='/shop/'>SHOP</a>";

    // Shop sections navigation--
    // will add proper routes when those pages have been created
    document.getElementById("nav02").innerHTML =
        "<a href='#'>MEN</a>  " +
        "<a href='#'>WOMEN</a>  " +
        "<a href='#'>KIDS</a>  " +
        "<a href='#'>HOME</a>  " +
        "<a href='#'><div id='sale'>SALE</div></a>";


    document.getElementById("nav03").innerHTML =
        "<a href='/logout/'>LOGOUT</a>   " +
       // "<div id='signup_text'> Welcome, "+ sess.email + "!</div> " +
        "<a href='/shop/'>SHOP</a>";


}

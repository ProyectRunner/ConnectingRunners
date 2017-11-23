$(document).ready(function(){
    // Toggling the nav menu
    $('.menu-toggle').click(function(){ $('.menu-background, .menu-card, .menu-content').toggleClass('active'); });
    // Toggle the nav-search
    $('.search-icon').click(function(){$('.nav-search, .sign-div').toggleClass('active');});
});

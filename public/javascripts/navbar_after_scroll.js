$(document).ready(function(){
    // set welcome height to window height
    $(".welcome").height($(window).innerHeight());
    // hide .navbar first on page load
    if(window.outerWidth > 576) { // desktop
        if(window.location.pathname === '/index.html'){ // only hide on the index page
            $(".navbar").hide();
            // fade in .navbar
            $(function () {
                $(window).scroll(function () {
                    if ($(this).scrollTop() > ($(window).innerHeight() * 0.3)) {
                        $('.navbar').fadeIn();
                        $('#scrollInvite').fadeOut();
                    } else {
                        $('.navbar').fadeOut();
                    }
                });
            });
        }
    } else { // mobile screen
        // source https://www.solodev.com/blog/web-design/bootstrap/build-a-fixed-top-navigation-that-disappears-as-users-scroll.stml
        hideNav();
        var previousScroll = 0;
        $(window).scroll(function () {
            var currentScroll = $(this).scrollTop();
            if (currentScroll > 0 && currentScroll < $(document).height() - $(window).height()) {
                if (currentScroll > previousScroll) { // scrolling down (to the lower part of the page)
                    hideNav();
                } else {
                    showNav();
                }
                previousScroll = currentScroll;
            }
        });
    }
    function hideNav() {
        $(".navbar").removeClass("is-visible").addClass("is-hidden");
    }
    function showNav() {
        $(".navbar").removeClass("is-hidden").addClass("is-visible").addClass("scrolling");
    }
});
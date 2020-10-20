jQuery(document).ready(function ($) {

    var isTablet;

    function init() {
        isTablet = $(document).width() >= 768;


        onScrollFixHeader();

    }

    function onScrollFixHeader() {
        $(window).scroll(function () {
            var scroll = $(window).scrollTop();

            if (scroll > 0) {
                $('.header').addClass('fixed');
            } else {
                $('.header').removeClass('fixed');
            }
        });
    }



    init();
});



jQuery(document).ready(function ($) {

    var isDesktop;

    function init() {
        isDesktop = $(document).width() > 960;

        if(!isDesktop) {
            detectMobile();
        }

        // detect ie11
        if(navigator.userAgent.match(/Trident.*rv:11\./)) {
            $('.page-unit').addClass('ie');
            $('.block__pdf').hide();
            $('.block__pdf-text').show();
        }

    }

    function detectMobile() {
        $('.block__pdf').hide();
        $('.block__pdf-text').show();
    }


    init();
});



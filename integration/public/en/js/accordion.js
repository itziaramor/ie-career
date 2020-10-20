jQuery(document).ready(function ($) {
    var isDesktop;
    var isTablet;

    function init() {
        isDesktop = $(document).width() >= 960;
        isTablet = $(document).width() >= 768;

        accordion();
    }

    function accordion() {
        jQuery.fn.extend({
            toggleText: function (stateOne, stateTwo) {
                return this.each(function () {
                    stateTwo = stateTwo || '';
                    $(this).text() !== stateTwo && stateOne ? $(this).text(stateTwo)
                        : $(this).text(stateOne);
                });
            }
        });

        if(isDesktop) {
            //Set default open/close settings
            if($('.accordion-introduction')) {
                $('.accordion-introduction .accordion__body').show().addClass('open'); 
                $('.accordion-introduction .accordion__body').attr('aria-expanded','true');
                $('.accordion-introduction .accordion__button').addClass('active');
                $('.accordion-introduction .accordion__button').find('.accordion__button-text').text('Collapse');
                $('.accordion-introduction .accordion__body').attr('aria-expanded','true');
            } else {
                $('.accordion-introduction .accordion__body:not(.open)').hide(); 
                $('.accordion-introduction .accordion__body').attr('aria-expanded','false');
                $('.accordion-introduction .accordion__button').removeClass('active');
            }
        } else {
                $('.accordion-introduction .accordion__body').removeClass('open').hide(); 
                $('.accordion-introduction .accordion__body').attr('aria-expanded','false');
                $('.accordion-introduction .accordion__button').removeClass('active');
        }

        //On Click
        $('.accordion__button').click(function (e) {
            e.preventDefault();

            var $this = $(this),
                thisActive = $this.hasClass('active'),
                active;

            // If this one is active, we always just close it.
            if (thisActive) {
                $this.removeClass('active').parent().next().slideUp();
                $this.removeClass('active').parent().next().removeClass('active');
                $this.addClass('active').parent().next().attr('aria-expanded','false');
                $this.removeClass('active');

                $(this).find('.accordion__button-text').text('Expand');
            }
            else {

                // Open this one
                $this.addClass('active').parent().next().slideDown();
                $this.addClass('active').parent().next().addClass('active');
                $this.addClass('active').parent().next().attr('aria-expanded','true');

                $(this).find('.accordion__button-text').text('Collapse');


            }
        });


        $('.js-expand-all').click(function (e) {
            e.preventDefault();

            var all = $('.accordion__button'),
                active = all.filter('.active');
            var expandAllActive = $(this).hasClass('active');

            if (active.length && expandAllActive) {
                $(this).removeClass('active');
                // All open; close them
                active.removeClass('active').parent().next().slideUp();
                all.removeClass('active').parent().next().attr('aria-expanded','false');
                active.parent().next().removeClass('active');
                
                $(this).find('.btn-text').text('Expand all');
                $(this).parents('.page__content').find('.accordion__button-text').text('Expand');
            }
            else {
                // At least some are closed, open all
                $(this).addClass('active');
                all.addClass('active').parent().next().slideDown();
                all.parent().next().removeClass('active');
                $(this).find('.btn-text').text('Collapse all');
                $(this).parents('.page__content').find('.accordion__button-text').text('Collapse');
                all.addClass('active').parent().next().attr('aria-expanded','true');

            }

            return false;
        });

    }


    init();
});



jQuery(document).ready(function ($) {

    function init() {
        
        checkPageId();
        checkUnitsVisited();
        checkContinueUnit();
        //visorPdf();

    }

    function checkPageId() {

        var myIdArray = [];
                        
                

        // on click button check data-id and save it on sessionStorage
        if($('.page-unit').length) {
            var linkData = $('.page-unit').attr('id');

            // Obtengo el string previamente salvado y luego
            var saveData = sessionStorage.getItem('data-array');
            if(saveData == null) {
                saveData = [];
            } else {
                saveData = JSON.parse(saveData);
            }

            // if not exist push to array
            if(!saveData.indexOf(linkData)!== -1) {
                saveData.push(linkData);
            }

        
            sessionStorage.setItem('data-array', JSON.stringify(saveData));
        }

        var recoveredData = JSON.parse(sessionStorage.getItem('data-array'));

        if(recoveredData == null) {
            recoveredData = [];
        }

        // detect data id of all buttons 
        $('.accordion__list-item .btn').each(function () {
            var linkIds = $(this).data('id');

            // compare if is equal to sessionStorage key
            if(recoveredData.indexOf(linkIds)!== -1) {
                $(this).parent('.accordion__list-item').addClass('active');
            } 
        });

        $('.navbar__list-item:not(.active) a').each(function () {
            var navLinkIds = $(this).data('id');

            // compare if is equal to sessionStorage key
            if(recoveredData.indexOf(navLinkIds)!== -1) {
                $(this).parent('.navbar__list-item').addClass('visited');
            } 
        });

        progressBar();

        // check how many units visited and increase progressbar
        function progressBar(){
            var sum = 0;
            var numberListChild = $('.accordion__list .btn[data-id]').length;
            var progressBarChild = 100 / numberListChild;
            var recoverDataLength = recoveredData.filter(Boolean).length;
            sum = recoverDataLength * progressBarChild;
            sumToFixed = sum.toFixed(0);
            $('.progress-bar__text strong').text(sumToFixed + '%');
            $('.progress-bar progress').val(sumToFixed);
        }

    }

    function checkUnitsVisited() {
        // if next list has all childs with active class then addclass to active on subtitle
        $('.accordion__subtitle').addClass(function(){
            if($(this).next('ul').find('li').length === $(this).next('ul').find('li.active').length) return 'active';
        });

        // if all accordion_subtitle on module hasClass active then addclass to active on accordion__header
        $('.accordion__header .btn').addClass(function(){
            if($(this).parents('.accordion__header').next('.accordion__body').find('.accordion__subtitle').length === $(this).parents('.accordion__header').next('.accordion__body').find('.accordion__subtitle.active').length) return 'active';
        });
    }

    function checkContinueUnit() {
        // set variable to first unit so when click on button continue unit redirect to unit 1
        var unitState = 'unit-introduction-video/';
        var urlUnit = '../../' + unitState;

        $('.btn-unit').attr('href', urlUnit);


        if($('.page-unit').length) {
            var dataUnit = $('.page-unit').attr('data-unit');
            sessionStorage.setItem('unitState', dataUnit);
        }

        if(sessionStorage.getItem('unitState')){
            var unitStateStorage = sessionStorage.getItem('unitState');

            var unitAccount = $('.accordion__list-item.active .btn').length;
            
            if( $('.accordion__list-item .btn').length !==  $('.accordion__list-item.active .btn').length) {
                var btnHref = $('.page__content .accordion__list-item:not(.active) .btn').attr('href');
                var urlUnit = '../../' + btnHref;
                
                $('.btn-unit .btn__text').text('Continue');
                $('.btn-unit').attr('href', urlUnit);
            } 

        } 
    }

    // visor pdf
    function visorPdf(){
        var dataPdf = $('.block__pdf').attr('data');

        // production
        if (window.location.pathname.indexOf('/en') != -1) {
            var dataPdfUrl = '../../en/' + dataPdf;
        } else if (window.location.pathname.indexOf('/es') != -1) {
            var dataPdfUrl = '../../es/' + dataPdf;
        }
    }

    


    init();
});



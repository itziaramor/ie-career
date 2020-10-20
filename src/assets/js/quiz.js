jQuery(document).ready(function ($) {

    var isTablet;

    function init() {
        isTablet = $(document).width() >= 768;

        quizQuestion();

    }



    function isCheckedById() {
        var getDataVal = $('.block__question input:checked').map(function () {
            return $(this).data('val');
        }).get();
    }

    function quizQuestion() {
        // set variable to 1 so when click on button quiz redirect to question 1
        var quizState = 1;
        // localhost
        // var urlQuiz = '../../final-quiz-question-' + quizState + '/';
        // $('.btn-quiz').attr('href', urlQuiz);

        // production
        if (window.location.pathname.indexOf('/en') != -1) {
            var urlQuiz = '../../en/final-quiz-question-' + quizState + '/';
            $('.btn-quiz').attr('href', urlQuiz);
        } else if (window.location.pathname.indexOf('/es') != -1) {
            var urlQuiz = '../../es/final-quiz-question-' + quizState + '/';
            $('.btn-quiz').attr('href', urlQuiz);
        }

        //////////
        var checkboxValues = JSON.parse(sessionStorage.getItem('checkboxValues')) || {};
        var $checkboxes = $('.block__question :checkbox');

        $checkboxes.on('change', function () {
            $checkboxes.each(function () {
                checkboxValues[this.id] = this.checked;
            });
            sessionStorage.setItem('checkboxValues', JSON.stringify(checkboxValues));

           var thisCheckbox = $(this);
           var thisAtributeData = $(thisCheckbox).attr('data-val');
           var srcBad = 'img/icons/bad.svg';
           var srcGood = 'img/icons/good.svg';
        });

        var checkboxValues = JSON.parse(sessionStorage.getItem('checkboxValues'));

        if (checkboxValues === null) {
            checkboxValues = {};
        }

        $.each(checkboxValues, function(key, value) {
            $('#' + key).prop('checked', value);
        });
        
        //////////////////////////////
        
        // // on input change show button check feedback
        $('.page-quiz .form-control__checkbox').find('input').on('change', function(){
            $('.page-quiz .btn--check').css('display', 'block');
        });
        
        // on click button check feedback
        $('.page-quiz .btn--check').on('click', function(e){
            e.preventDefault();

            // check all keys of array and if has same id add disabled and save it on sessionStorage
            $.each(checkboxValues, function(key) {
                var thisAtributeData = $('#' + key).attr('data-val');
                var srcBad = 'img/icons/bad.svg';
                var srcGood = 'img/icons/good.svg';

                $('#' + key).attr('disabled', true).addClass('disabled');
                $('#' + key).parents('.block__checkbox').find('.js-feedback').css('display', 'block');

                if($('.page-quiz-15')) {
                    if($('.page-quiz input').hasClass('disabled')) {
                        $('.page-quiz-15 .js-finish-question').css('display', 'flex');
                    }
                }

                sessionStorage.setItem('disabled', $('#' + key).attr('disabled'));

                // if is checked or not and that feedback
                if ($('#' + key).is(':checked')) {

                    // feedback
                    if ($('#' + key).attr('data-val') === 'yes') {

                        if (window.location.pathname.indexOf('/en') != -1) {
                            var srcImage = '../../en/' + srcGood;
                            $('#' + key).parents('.block__checkbox').find('.js-feedback img').attr('src', srcImage);
                        } else if (window.location.pathname.indexOf('/es') != -1) {
                            var srcImage = '../../es/' + srcGood;
                            $('#' + key).parents('.block__checkbox').find('.js-feedback img').attr('src', srcImage);
                        }

                    } else {
                        if (window.location.pathname.indexOf('/en') != -1) {
                            var srcImage = '../../en/' + srcBad;
                            $('#' + key).parents('.block__checkbox').find('.js-feedback img').attr('src', srcImage);
                        } else if (window.location.pathname.indexOf('/es') != -1) {
                            var srcImage = '../../es/' + srcBad;
                            $('#' + key).parents('.block__checkbox').find('.js-feedback img').attr('src', srcImage);
                        }
                    }
                }
                else {

                    // feedback
                    if ($('#' + key).attr('data-val') === 'no') {
                        if (window.location.pathname.indexOf('/en') != -1) {
                            var srcImage = '../../en/' + srcGood;
                            $('#' + key).parents('.block__checkbox').find('.js-feedback img').attr('src', srcImage);
                        } else if (window.location.pathname.indexOf('/es') != -1) {
                            var srcImage = '../../es/' + srcGood;
                            $('#' + key).parents('.block__checkbox').find('.js-feedback img').attr('src', srcImage);
                        }
                    } else {
                        if (window.location.pathname.indexOf('/en') != -1) {
                            var srcImage = '../../en/' + srcBad;
                            $('#' + key).parents('.block__checkbox').find('.js-feedback img').attr('src', srcImage);
                        } else if (window.location.pathname.indexOf('/es') != -1) {
                            var srcImage = '../../es/' + srcBad;
                            $('#' + key).parents('.block__checkbox').find('.js-feedback img').attr('src', srcImage);
                        }
                    }
                }
            });
            
            // show next question button and hide check button
            $('.js-next-question').css('display', 'flex');
            $('.btn--check').hide();

            // get data-question of every question page and save it on sessionStorage
            var quizState = $(this).parents('.page-quiz').attr('data-question');
            sessionStorage.setItem('quizState', quizState);

        })

        // check all keys of array and if has same id add disabled and save it on sessionStorage
        if(sessionStorage.getItem('disabled') === 'disabled'){
            $.each(checkboxValues, function(key) {
                var thisAtributeData = $('#' + key).attr('data-val');
                var srcBad = 'img/icons/bad.svg';
                var srcGood = 'img/icons/good.svg';

                $('#' + key).attr('disabled', 'disabled').addClass('disabled');
                $('#' + key).parents('.block__checkbox').find('.js-feedback').css('display', 'block');

                if($('.page-quiz-15')) {
                    if($('.page-quiz input').hasClass('disabled')) {
                        $('.page-quiz-15 .js-finish-question').css('display', 'flex');
                    }
                }
                
                // if is checked or not and that feedback
                if ($('#' + key).is(':checked')) {

                    // feedback
                    if ($('#' + key).attr('data-val') === 'yes') {
                        if (window.location.pathname.indexOf('/en') != -1) {
                            var srcImage = '../../en/' + srcGood;
                            $('#' + key).parents('.block__checkbox').find('.js-feedback img').attr('src', srcImage);
                        } else if (window.location.pathname.indexOf('/es') != -1) {
                            var srcImage = '../../es/' + srcGood;
                            $('#' + key).parents('.block__checkbox').find('.js-feedback img').attr('src', srcImage);
                        }
                    } else {
                        if (window.location.pathname.indexOf('/en') != -1) {
                            var srcImage = '../../en/' + srcBad;
                            $('#' + key).parents('.block__checkbox').find('.js-feedback img').attr('src', srcImage);
                        } else if (window.location.pathname.indexOf('/es') != -1) {
                            var srcImage = '../../es/' + srcBad;
                            $('#' + key).parents('.block__checkbox').find('.js-feedback img').attr('src', srcImage);
                        }
                    }
                }
                else {

                    // feedback
                    if ($('#' + key).attr('data-val') === 'no') {
                        if (window.location.pathname.indexOf('/en') != -1) {
                            var srcImage = '../../en/' + srcGood;
                            $('#' + key).parents('.block__checkbox').find('.js-feedback img').attr('src', srcImage);
                        } else if (window.location.pathname.indexOf('/es') != -1) {
                            var srcImage = '../../es/' + srcGood;
                            $('#' + key).parents('.block__checkbox').find('.js-feedback img').attr('src', srcImage);
                        }
                    } else {

                        if (window.location.pathname.indexOf('/en') != -1) {
                            var srcImage = '../../en/' + srcBad;
                            $('#' + key).parents('.block__checkbox').find('.js-feedback img').attr('src', srcImage);
                        } else if (window.location.pathname.indexOf('/es') != -1) {
                            var srcImage = '../../es/' + srcBad;
                            $('#' + key).parents('.block__checkbox').find('.js-feedback img').attr('src', srcImage);
                        }
                    }
                }
            });
        }

        // if has class disabled then next button show
        if($('.page-quiz input').hasClass('disabled')) {
            $('.page-quiz .js-next-question').css('display', 'flex');
        }

        // recover variable quizstate on click and redirect it to the number of question
     
            if(sessionStorage.getItem('quizState')){
                var quizStateStorage = sessionStorage.getItem('quizState');
                var quizStateStorageNumber = parseFloat(quizStateStorage);
                var quizStateStorageNext = quizStateStorageNumber + 1;
                
                // localhost
                // var urlQuiz = '../../final-quiz-question-' + quizStateStorageNext + '/';
                // $('.btn-quiz').attr('href', urlQuiz);

                // production
                if (window.location.pathname.indexOf('/en') != -1) {
                    var urlQuiz = '../../en/final-quiz-question-' + quizStateStorageNext + '/';
                    $('.btn-quiz').attr('href', urlQuiz);
                } else if (window.location.pathname.indexOf('/es') != -1) {
                    var urlQuiz = '../../es/final-quiz-question-' + quizStateStorageNext + '/';
                    $('.btn-quiz').attr('href', urlQuiz);
                }

                if (quizStateStorage == '15') {
                    quizStateStorageNumber = parseFloat(quizStateStorage);
                    quizStateStorageNext = quizStateStorageNumber;
                    
                    // localhost
                    // var urlQuiz = '../../final-quiz-question-' + quizStateStorageNext + '/';
                    // $('.btn-quiz').attr('href', urlQuiz);

                    // production
                    if (window.location.pathname.indexOf('/en') != -1) {
                        var urlQuiz = '../../en/final-quiz-question-' + quizStateStorageNext + '/';
                        $('.btn-quiz').attr('href', urlQuiz);
                    } else if (window.location.pathname.indexOf('/es') != -1) {
                        var urlQuiz = '../../es/final-quiz-question-' + quizStateStorageNext + '/';
                        $('.btn-quiz').attr('href', urlQuiz);
                    }
                }
            } 

    }

    function backtoQuestion() {
        $('.page-quiz .js-prev-question').on('click', function(e) {
            e.preventDefault();

            $('.block__question input[type="checkbox"]').prop("disabled", false);
            $(this).parents('.block--quiz').find('.js-feedback').hide();
        })
    }



    init();
});



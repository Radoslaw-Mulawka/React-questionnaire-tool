import $ from 'jquery';
$(document).ready(function () {
    
    let userName= $('.user-block .user-name').text();
    let userNameArray = userName.split('');
    const arrayCheckFunction = (element)=>{
        return element == '@'
    }
    let filteredUserName = userNameArray.filter(arrayCheckFunction);
    if(filteredUserName.length>0){
        $('.user-block .user-name').addClass("userNameEmail");
    }



    // popover / tooltip block when hover on navigation
    $('#dashboard-link').popover();
    $('#results-link').popover();
    $('#campaigns-link').popover();
    $('#places-link').popover();
    $('#popoverOption').popover({ trigger: "hover" });
 
    
    
    // style remove block when resizing window (to make nav responsive)
    $(window).on('resize', function () {
        $('.navigation-column-visible nav').removeAttr('style');
        $('.navigation-column-visible ').removeAttr('style');
        $('.user-block').removeAttr('style');
        $("#progressBar").removeAttr("style");
        $('.user-name').removeAttr('style');
        $(".user-avatar img").removeAttr('style');
        $('.user-settings').removeAttr('style');
        $('.nav-item-name').removeAttr('style');
        $('.arrow-block').removeAttr('style');
        if ($('.arrow-block').hasClass('arrow-reverse')) {
            return null
        }
        else {
            $('.arrow-block').addClass('arrow-reverse');
        }
    });


    // hamburger functionality when nav is minified
    $(".mini-hamburger").on('click', function () {
        $(".navigation-column-visible nav").slideToggle();
        $(".nav-item").removeClass('nav-item-minified');
    });


    var winWidth2 = $(window).width();

    $(".other-answer-content div:first-child img").addClass("rotate-up");



    // form hiding
    $("#campaign-hide-info").hide();
    // $("#campaign-hide-questions").hide();
    $("#campaign-hide-places").hide();


    // wyniki - poszczegolne pytania hide 
    $(".section-content").hide();
    // $(".form-data-flex span").parent().next().hide();
    $(".form-data-flex span").on("click", function () {
        $(this).parent().next().slideToggle(300);
    });




    $(".other-answer-content").on("click", function (e) {
        e.stopPropagation();
        $(this).find("div:first img").toggleClass("rotate-down");
        $(this).children().not(":first-child").slideToggle(300);
    });

    $(".other-answer-content-wide").on("click", function (e) {
        e.stopPropagation();
        $(this).find("img").toggleClass("rotate-down");
        $(this).next().slideToggle(300);
    });


    $("#wg-pytan .section .section__name").on("click", function (e) {
        e.stopPropagation();
        $(this).nextAll().slideToggle(300);
        $(this).find("img:first").toggleClass("rotate-down");
    });

    $("#wg-miejsc .place-info").on("click", function (e) {
        e.stopPropagation();
        $(this).nextAll().slideToggle(300);
        $(this).find("img:first").toggleClass("rotate-down");
    });

    $(".wow .section__name").on("click", function () {
        $(this).find("img").toggleClass("rotate-down");
        $(this).nextAll().slideToggle(300);
    });



    // rozwiązanie problemu ze skrolowaniem fixed navigacji podczas kliknięcia na Publikuj w kampaniach przy nie wypełnionej liscie pytan
    var offset = $(':target').offset();
    if (offset) {
        var scrollto = offset.top - 130; // minus fixed header height
    }
    $('html, body').animate({ scrollTop: scrollto }, 500);



    





    if (winWidth2 < 700) {
        $(".question-list tbody .last-textarea-row-breaker td:lt(3)").hide();

    } else {
        $(".question-list tbody .last-textarea-row-breaker td:lt(3)").show();
    }



    $('.fileContainer [type=file]').on('click', function updateFileName(event) {
        var $input = $(this);

        setTimeout(function delayResolution() {
            $input.parent().text($input.val().replace(/([^\\]*\\)*/, ''))
        }, 0)
    });

});

$(document).ready(function () {
    $('#addnewPlaceButton').click(function (event) {
        var name = $('#addNewPlaceName').val();
        if (name.length > 100) {
            event.preventDefault();
            $('#addNewPlaceName').parent().addClass('has-error');
        }
    });
});



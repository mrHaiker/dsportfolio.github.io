var main = function () {
    var menu = $('#menu');
    var menuToggle = $('.toggle');
    var screen = $('body, html');
    var heightHeader,
        heightWork,
        heightAbout;


    function closeMobileMenu () {
        (menu).removeClass('active-menu');
        menuToggle.removeClass('open');
    }

    createPlates();

//************************************** Собития **************************************
    $('.btn-down').click(function () {
        screen.animate({scrollTop: $('header').height()}, 400);
    });
    $('#btn-home').click(function () {
        screen.animate({scrollTop: 0}, 400);
        closeMobileMenu();
    });
    $('#my-work').click(function () {
        screen.animate({scrollTop:$('header').height()}, 400);
        closeMobileMenu();
    });
    $('#about').click(function () {
        heightHeader = $('header').height();
        heightWork = $('#my-works').height();
        screen.animate({scrollTop: heightHeader+heightWork});
        closeMobileMenu();
    });
    $('#contactNav').click(function () {
        heightHeader = $('header').height();
        heightWork = $('#my-works').height();
        heightAbout = $('#about-me').height();
        screen.animate({scrollTop: heightHeader+heightWork+heightAbout}, 400);
        closeMobileMenu();
    });
    $('.toTop').click(function () {
        screen.animate({scrollTop: 0}, 400);
    });
    $('.menu').click(function () {   // обработчик клика по Menu Bars
        if((menu).hasClass('active-menu')) {
            (menu).removeClass('active-menu');
        } else {
            (menu).addClass('active-menu');
        }
        if(menuToggle.hasClass('open')) {
            menuToggle.removeClass('open');
        } else {
            menuToggle.addClass('open');
        }
    });


    // обработчик собития Scroll
    $(window).scroll(function () {
        var scrollTopWindow = $(this).scrollTop();
        var position = 'relative';
        var marginTop = 0;
        var navigation = $('#navigation');

        heightHeader = $('header').height();
        heightWork = $('#my-works').height();
        heightAbout = $('#about-me').height();

        positionHeader();

        //if(scrollTopWindow >= heightHeader) {
        //    position = 'fixed';
        //    marginTop = navigation.height();
        //}
        //
        //navigation.css('position',position);
        //$('body').css('margin-top', marginTop);

        if($(this).scrollTop() > heightHeader) {
            $('.toTop').fadeIn();
        } else {
            $('.toTop').fadeOut();
        }

        if (scrollTopWindow >= heightHeader) {
            $('#my-work').addClass('active-link');
        } else {
            $('#my-work').removeClass('active-link');
        }
        if (scrollTopWindow >= heightHeader+heightWork) {
            $('#about').addClass('active-link');
            $('#my-work').removeClass('active-link');
        } else {
            $('#about').removeClass('active-link');
        }
        if (scrollTopWindow >= heightHeader+heightWork+heightAbout) {
            $('#contactNav').addClass('active-link');
            $('#about').removeClass('active-link');
            $('#my-work').removeClass('active-link');
        } else {
            $('#contactNav').removeClass('active-link');
        }
    });

    $(document).on('click', '.plates', function () {
        var $id = $(this).attr('id');
        var $title = $('<div>').addClass('title col-xs-offset-1 col-xs-10 col-md-offset-3 col-md-6 col-lg-offset-4 col-lg-4');
        $.getJSON('json/title.json', function (data) {
            for (var i = 0; i < data.length; i++) {
                if(data[i].name == $id) {
                    var $preview = $('<div>').addClass('preview').css({
                        'background': 'rgba(0,0,0,.75)',
                        'zIndex': 1200
                    })
                        .append($title
                            .append($('<span>').addClass('moon icon-close'))
                            .append($('<div>').addClass('row')
                                .append($('<div>').addClass('col-xs-12 col-sm-6 pic').css('background', 'url(img/'+data[i].name_pic+') no-repeat'))
                                .append($('<div>').addClass('col-xs-12 col-sm-6 description').text(data[i].full_description)
                                    .append($('<a>').attr('href', data[i].link).text('Перейти к проектру')))));

                    $('body').append($preview);
                }
            }

            setMarginTop($('.preview .title'));
        });
    });

    $(window).resize(function(){    // Применяет стиль при изминении высоты окна
        setMarginTop($('.preview .title'));
        positionHeader();
    });

    // кнопка закрытия окна с preview
    $(document).on('click', '.preview .icon-close', function () {
        $('.preview').remove();
    });

};

$(document).ready(main);
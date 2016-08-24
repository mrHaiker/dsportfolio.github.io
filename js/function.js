function createPlates () {
    $.getJSON('json/title.json', function (data) {
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            var $plate = $('<div>').addClass('col-sm-6 col-md-4')
                .append($('<div>').addClass('plates')
                    .attr('id', item.name)
                    .css('background', 'url(img/'+item.name_pic)
                    .append($('<div>').addClass('description')
                        .append($('<p>').text(item.description),
                        $('<p>').addClass('data')
                            .text(item.date)
                            .prepend($('<i>').addClass('fa fa-clock-o')))));

            $('.windows .row').prepend($plate);
        }

    })
}

function setMarginTop (elem) {
    var $windowHeight = $(window).height();
    var $elementHeight = $(elem).height();

    if($elementHeight > $windowHeight) {
        $(elem).css('height', $elementHeight = $windowHeight-30);
        $('.title .description').css('height', $elementHeight);
    }

    $(elem).css('marginTop', ($windowHeight-$elementHeight)/2);
}

function positionHeader () {
    var scrollTopWindow = $(this).scrollTop();
    var position = 'relative';
    var marginTop = 0;
    var navigation = $('#navigation');
    var heightHeader = $('header').height();

    if(scrollTopWindow >= heightHeader) {
        position = 'fixed';
        marginTop = navigation.height();
    }
    navigation.css('position',position);
    $('body').css('margin-top', marginTop);
}

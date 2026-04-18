$(function(){
        tiles = $("#wl").fadeTo(0, 0);

$(window).scroll(function(d,h) {
    tiles.each(function(i) {
        a = $(this).offset().top + $(this).height();
        b = $(window).scrollTop() + $(window).height();
        if (a < b) $(this).fadeTo(1200,0.9);
    });
});    

    
    $(window).on('scroll',function(){
        if($(window).scrollTop()>20){
            $('.header').addClass('fixed');
        }
        else{
            $('.header').removeClass('fixed');
        }
    });
});
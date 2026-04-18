$(function(){
    
     $(window).on('scroll',function(){
        if($(window).scrollTop()>20){
            $('.header').addClass('fixed');
        }
        else{
            $('.header').removeClass('fixed');
        }
    });
});
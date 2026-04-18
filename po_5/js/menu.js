$(function(){
    
     $(window).on('scroll',function(){
        if($(window).scrollTop()>20){
            $('.header').addClass('fixed');
        }
        else{
            $('.header').removeClass('fixed');
        }
    });
        $('.visual-items').bxSlider({
        mode:'fade', auto:true
    });
});
 $(document).ready(function() {

            $(window).load(function() {

                $('#loadOverlay').fadeOut('slow');

            })

        })


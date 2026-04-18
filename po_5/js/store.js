$(function(){
    
      $('.visual-items').bxSlider({
        mode:'fade', auto:true
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

$(document).ready(function(){
    
    var posXY=[[37.515614,126.906741],[37.517200,126.904133],[37.491055,126.924710],[37.555841,126.922617],[37.477620,126.889090],[37.529402,126.875926],[37.614711,127.030521],[37.517220,126.904078],[37.581050,127.047574],[37.477834,126.982234],[36.991620,127.085731]];
   
    function pulip_map(x,y){
      map_pulip=new google.maps.Map(document.getElementById('pulip'),{
           center:{lat:x, lng:y},
           zoom:17
       });  
      new google.maps.Marker({
      position:{lat:x,lng:y}, //marker를 표시할 위치정보
      map:map_pulip,//위치정보를 표시할 지도의 변수이름
      title:'풀잎채', //표시할 위치의 장소명
      draggable: true,
      animation: google.maps.Animation.DROP,
      icon:'img/marker.png'
   });
    };
    

    $(window).on('load',function(){
        pulip_map(posXY[0][0],posXY[0][1]);
    }); 
    
    $('.tab a').on('click',function(e){
        e.preventDefault();
        n=$('.tab a').index($(this));
        $('.tab li').eq(n).addClass('on').siblings().removeClass('on');
        pulip_map(posXY[n][0],posXY[n][1]);
    }); 
    
});




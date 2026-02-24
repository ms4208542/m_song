/* ====================================================
    FUNCTION for SMOOTH SRCOLLING
==================================================== */
(function($) {
  $.fn.SmoothAnchors = function() {

    function scrollBodyTo(destination, hash) {

      // Change the hash first, then do the scrolling. This retains the standard functionality of the back/forward buttons.
      var scrollmem = $(document).scrollTop();
      window.location.hash = hash;
      $(document).scrollTop(scrollmem);
      $("html,body").animate({
        scrollTop: destination
      }, 1200);

    }

    if (typeof $().on == "function") {
      $(document).on('click', 'a[href^="#"]', function() {

        var href = $(this).attr("href");

        if ($(href).length == 0) {

          var nameSelector = "[name=" + href.replace("#", "") + "]";

          if (href == "#") {
            scrollBodyTo(0, href);
          } else if ($(nameSelector).length != 0) {
            scrollBodyTo($(nameSelector).offset().top, href);
          } else {
            // fine, we'll just follow the original link. gosh.
            window.location = href;
          }
        } else {
          scrollBodyTo($(href).offset().top, href);
        }
        return false;
      });
    } else {
      $('a[href^="#"]').click(function() {
        var href = $(this).attr("href");

        if ($(href).length == 0) {

          var nameSelector = "[name=" + href.replace("#", "") + "]";

          if (href == "#") {
            scrollBodyTo(0, href);
          } else if ($(nameSelector).length != 0) {
            scrollBodyTo($(nameSelector).offset().top, href);
          } else {
            // fine, we'll just follow the original link. gosh.
            window.location = href;
          }
        } else {
          scrollBodyTo($(href).offset().top, href);
        }
        return false;
      });
    }
  };

})(jQuery);

(function($) {
  setInterval(function() {
    $('.text-anim').toggleClass('animate');
  }, 2000);

})(jQuery);

/* ===================================================
    PLUGINS
=================================================== */
(function($) {
  $.fn.disabledInput = function() {
    this.find('input').not('.check-row, :file').attr('disabled', true);
    this.find('select').attr('disabled', true);
    this.find('textarea').attr('disabled', true);
    /* Month Picker */
    $(".inputDateMonthYear1").attr('disabled', true);
    $(".inputDateMonthYear2").attr('disabled', true);
    return this;
  };
}(jQuery));

(function($) {
  $.fn.enabledInput = function() {
    this.find('input').not('.disable').attr('disabled', false);
    this.find('select').not('.disable').attr('disabled', false);
    this.find('textarea').not('.disable').attr('disabled', false);
    /* Month Picker */
    $(".inputDateMonthYear1").attr('disabled', false);
    $(".inputDateMonthYear2").attr('disabled', false);
    return this;
  };
}(jQuery));

(function($) {
  $.fn.setHeight = function() {
    var maxHeight = 0;

    this.each(function(index, el) {
      var h = $(this).height();
      if (maxHeight < h) {
        maxHeight = h;
      }
    });

    return this.each(function(index, el) {
      $(this).height(maxHeight);
    });
  };
}(jQuery));

(function($) {
  $.fn.setFullScreen = function() {
    $(this).css({
      'width': $(window).width(),
      'height': $(window).height()
    });
    return this;
  };
}(jQuery));

(function($) {
  $.fn.positionCenter = function() {
    var wWin = $(window).width();
    var hWin = $(window).height();
    var h = $(this).outerHeight();
    var w = $(this).outerWidth();
    var t = (hWin / 2) - (h / 2);
    var l = (wWin / 2) - (w / 2);
    $(this).css({
      'top': t,
      'left': l
    });
    return this;
  };
}(jQuery));

/* ====================================================
    GENERAL
==================================================== */
var general = {
  clickBtnMenu: function() {
    var wWindow = $(window).width();
    $('.btnMenu').click(function(event) {
      if (!$(this).hasClass('active')) {
        $(this).addClass('active');
        $('.leftMenu').animate({ left: 0 }, 200);
        $('.pageScroller').animate({ left: 172, width: wWindow }, 200);
        $('.topMenu').show();
      } else {
        $('.pageScroller').animate({ left: 0, width: wWindow }, 200);
        $('.leftMenu').animate({ left: -172 }, 200);
        $('.topMenu').hide();
        $(this).removeClass('active');
      }
      return false;
    });
  },
  setBgColor: function() {
    $('input, select, button').bind('focusin focusout', function(e) {
      var t = $(this);
      if (e.type == 'focusin') {
        t.closest('.block-bg').attr('style', 'background: linear-gradient(#d1ddb3, #fff) !important; border: 1px solid #b0c678 !important;');
        t.closest('.block-bg').addClass('active');
      } else if (e.type == 'focusout') {
        t.closest('.block-bg').attr('style', 'background: linear-gradient(#cbcbcb, #fff) !important; border: 1px solid #bbb !important;');
        t.closest('.block-bg').removeClass('active');
      }
    });
  },
  toggleLeftMenu: function() {
    $('.menuLeftMenu > li a').click(function() {
      $(this).next("ul").slideToggle();
//      if (!$(this).next().is(':visible')) {
//        $(this).next().slideDown();
//      }
      return false;
    });
  },
  removeBorder: function() {
    $('.rowspan').prev('tr').find('td').css('borderBottom', '0px');
  }
};


/* ====================================================
    APO-KIN
==================================================== */
var apoKin = {
  fixedHeaderTable: function() {
    $('.table-scroll-v .table').fixedHeaderTable({
      footer: false,
      cloneHeadToFoot: true,
      altClass: 'odd',
      autoShow: true
    });
  }
}




$(document).ready(function() {

  general.toggleLeftMenu();
  general.removeBorder();
  general.clickBtnMenu();
  general.setBgColor();

  apoKin.fixedHeaderTable();


  //$('.callDetailLeft .block-1, .callDetailLeft .block-2').enabledInput();
  //$('.callDetailLeft .block-1, .callDetailLeft .block-2').disabledInput();
  //$('.callSearch .callDetailLeft .block-1, .callSearch .callDetailLeft .block-2').enabledInput();

  // Login - reset pass
  $('.dashboard').setFullScreen();
  $('.dashboard .text-anim').positionCenter();

  $('.login-reset').setFullScreen();
  $('.login').positionCenter();

  $('.input-disable').attr('disabled', 'disabled');

  $('.listMainTableResults').disabledInput();
  $('.block-switch').addClass('select-arrow');
  $('.block-switch').children('.block-body').disabledInput();
  $('.block-body-b').children('.block-b').disabledInput();
  $('.oss-block-1').children('.block-body').disabledInput();
  $('.apoLeft-General .block-1').disabledInput(); // apo hearing
  $('.tab-top-1 ul').disabledInput(); // apo hearing
  $('.tab-apo .tab-general').disabledInput(); // apo hearing
  $('.apo-controls').hide(); // apo hearing
  $('.onoffswitch-checkbox').attr('checked', false);
  $('.btnBack').hide();
  $('.onoffswitch-checkbox').click(function() {
    if ($(this).is(':checked')) {
      $('.listMainTableResults').enabledInput();
      $(this).parents('.block-switch').children('.block-body').enabledInput();
      $(this).parents('.block-body-b').children('.block-b').enabledInput();
      $(this).parents('.oss-block-1').find('.btnOSS').show();
      $(this).parents('.oss-block-1').children('.block-body').enabledInput();
      $(this).closest('.tab-top').find('ul').enabledInput(); // apo hearing
      $(this).closest('.tab-apo').find('.tab-general').enabledInput(); // apo hearing
      $(this).closest('.tab-apo').find('.apo-controls').show(); // apo hearing

      $(this).parents('.block-switch').find('.disable').addClass('disabled');
      $(this).parents('.oss-block-1').find('.disable').addClass('disabled');

      $(this).parents('.block-switch').removeClass('select-arrow');

      $('.claim-detail-w').enabledInput();
      $('.claim-detail-w').removeClass('select-arrow');
      $(this).closest('.onoffswitch').next('.btnBack').show();

    } else {
      $('.listMainTableResults').disabledInput();
      $(this).parents('.block-switch').children('.block-body').disabledInput();
      $(this).parents('.block-body-b').children('.block-b').disabledInput();
      $(this).parents('.oss-block-1').find('.btnOSS').hide();
      $(this).parents('.oss-block-1').children('.block-body').disabledInput();
      $(this).closest('.tab-top').find('ul').disabledInput(); // apo hearing
      $(this).closest('.tab-apo').find('.tab-general').disabledInput(); // apo hearing
      $(this).closest('.tab-apo').find('.apo-controls').hide(); // apo hearing

      $(this).parents('.block-switch').find('.disable').removeClass('disabled');
      $(this).parents('.oss-block-1').find('.disable').removeClass('disabled');

      $(this).parents('.block-switch').addClass('select-arrow');

      $('.claim-detail-w').disabledInput();
      $('.claim-detail-w').addClass('select-arrow');
      $(this).closest('.onoffswitch').next('.btnBack').hide();
    }
  });

  $('.btnBack').click(function() {
    $('.claim-detail-w').enabledInput();
    $(this).prev('.onoffswitch').find('.onoffswitch-checkbox').attr('checked', false);
    $(this).hide();
  });

  // File input
  $(".file-styled").uniform({
    fileButtonClass: 'action btn bg-pink-400'
  });

  // Select2 select
  $('.select').select2();
  $('.mul-select').select2();

  // Custom scroll
  $('.box-input-scroll, .table-block-4, .hearing-table-w1, .hearing-table-w2').mCustomScrollbar({
    theme: "dark-3"
  });

  $('.table-scroll-1, .table-scroll-2, .table-scroll-3, .table-scroll-4, .table-scroll-5, .table-scroll-6').mCustomScrollbar({
    theme: "dark-3"
  });


  $('.block4-table, .tab1-table, .tab2-table, .tab3-table, .tab4-table, .tab5-table, .tab6-table, .tab7-table').mCustomScrollbar({
    axis: "yx",
    theme: "dark-3"
  });

  $('.table-baseline').niceScroll({
    cursorcolor: "#BABABA",
    cursorwidth: "8px",
    autohidemode: false
  });


  // Datepicker
  $('.inputDate').datepicker();

  $('.inputTime').timepicker({ stepMinute: 5 });

    /* .inputDateMonthYear1 Config */
    
    $(".inputDateMonthYear1").keydown(function (e) {
        if(e.keyCode === 13) {
            $('.inputDateMonthYear1').MonthPicker('Close');
        }
    });
    
    /*
     * MonthPicker Initialize.
     */
    $('.inputDateMonthYear1').MonthPicker({
        ShowIcon: false,
        MonthFormat: "yy/mm",
        i18n: {
            year: '年',
            jumpYears: "年選択",
            backTo: "年に戻る",
            months: ["01月","02月","03月","04月","05月","06月","07月","08月","09月","10月","11月","12月"]
        },
        Position: {
            my: "left bottom",
            at: "left top",
            collision: "none"
        }
    });
    
    /*
     * Format Input Method, only number and special character.
     */
    $('.inputDateMonthYear1').bind('keypress', function (event) {
    var regex = new RegExp("^[a-zA-Z]+$");
        var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (regex.test(key)) {
           event.preventDefault();
           return false;
        }
    });
    
    /*
     * Mask Input Date
     */
    $('.inputDateMonthYear1').bind('keyup','keydown', function(event){
        datestr = $(this).val();
        if (event.which !== 8){
            var num = datestr.length;
            if (num == 4){
                var newdatestr = datestr;
                newdatestr += '/';
                $(this).val(newdatestr);
            }
        }
    });
    
    /*
     * Select when focus.
     */
    
    $('.inputDateMonthYear1').focus(function(){
        $(this).select();
    });

    /*
     * Validation date value. Return now.
     */
    
    $('.inputDateMonthYear1').on("blur", function(event){
        datestr = $(this).val();
        if (datestr !== "" || datestr.length > 0){
            year = datestr.substring(0,4);
                month = datestr.substring(datestr.length, 5);
                if (month < 13 && month > 0){
                    if (month.length === 1){
                        $(this).val(year + "/0" + month);
                    }
                } else {
                    $(this).MonthPicker({
                        SelectedMonth: 0
                    });
                    $(this).val(dateformat(new Date(), "yyyy/mm"));
                }
        };
    });
    
    $('.inputDateMonthYear1').on("keyup", function(event){
        datestr = $(this).val();
        if (datestr !== "" || datestr.length > 0){
            if (event.keyCode === 13){
                year = datestr.substring(0,4);
                month = datestr.substring(datestr.length, 5);
                if (month < 13 && month > 0){
                    if (month.length === 1){
                        $(this).val(year + "/0" + month);
                    }
                } else {
                    $(this).MonthPicker({
                        SelectedMonth: 0
                    });
                }
            }
        }
    });
    
    /* End Config */
    
    /* .inputDateMonthYear2 Config */
    
    $(".inputDateMonthYear2").keydown(function (e) {
        if(e.keyCode === 13) {
            $('.inputDateMonthYear2').MonthPicker('Close');
        }
    });
    
    /*
     * MonthPicker Initialize.
     */
    $('.inputDateMonthYear2').MonthPicker({
        ShowIcon: false,
        MonthFormat: "yy/mm",
        i18n: {
            year: '年',
            jumpYears: "年選択",
            backTo: "年に戻る",
            months: ["01月","02月","03月","04月","05月","06月","07月","08月","09月","10月","11月","12月"]
        },
        Position: {
            my: "left bottom",
            at: "left top",
            collision: "none"
        }
    });
    
    /*
     * Format Input Method, only number and special character.
     */
    $('.inputDateMonthYear2').bind('keypress', function (event) {
    var regex = new RegExp("^[a-zA-Z]+$");
        var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (regex.test(key)) {
           event.preventDefault();
           return false;
        }
    });
    
    /*
     * Mask Input Date
     */
    $('.inputDateMonthYear2').bind('keyup','keydown', function(event){
        datestr = $(this).val();
        if (event.which !== 8){
            var num = datestr.length;
            if (num == 4){
                var newdatestr = datestr;
                newdatestr += '/';
                $(this).val(newdatestr);
            }
        }
    });

    /* End Config */
  
  // Slider with fixed minimum
  $("#slider").slider({
    range: "min",
    value: 1,
    min: 1,
    max: 15000,
    slide: function(event, ui) {
      //$("#amount").text(ui.value);
    }
  });

  // $("#slider").slider("pips");
  $("#slider").slider("float", {
    pips: true
  });
  //$("#amount").text($("#slider").slider("value"));

  // Toggle block
  $('.btnToggle').click(function(e) {
    if (!$(this).parents('.block').children('.block-body').is(':visible')) {
      $(this).parents('.block').children('.block-body').slideDown('fast');
      $(this).children('i').removeClass('fa-angle-down');
      $(this).children('i').addClass('fa-angle-up');
    } else {
      $(this).parents('.block').children('.block-body').slideUp('fast');
      $(this).children('i').removeClass('fa-angle-up');
      $(this).children('i').addClass('fa-angle-down');
    }
    return false;
  });




});

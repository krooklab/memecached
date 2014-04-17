var Client = function (options){

  var resizeInt = 0;
  var chosenPhoto = null;

  var init = function (){
    addHandlers();
    initCarousel();
    resize();

  };

  var addHandlers = function () {
    $( window ).resize(function() {
      clearTimeout(resizeInt);
      resizeInt = setTimeout(resize, 150);
    });
    $("#wemeButton").click(function(){
      $("#p1").css("display","none");
      $("#p2").css("display","block");
    });
    $("#selectButton").click(function(){
      initCanvas();
      $("#p1").css("display","none");
      $("#p2").css("display","none");
      $("#p3").css("display","block");
      $("#memeTextTop").focus();
    });
    $("#typeIndicatorTop").click(function(){
        $("#memeTextTop").focus();
    });
    $("#typeIndicatorBottom").click(function(){
        $("#memeTextBottom").focus();
    });
    $("#memeTextTop").focus(function(){
      $("#typeIndicatorTop").attr("src","images/arrow_r.png");
    });
    $("#memeTextTop").blur(function(){
      $("#typeIndicatorTop").attr("src","images/arrow_g.png");
    });
    $("#memeTextBottom").focus(function(){
      $("#typeIndicatorBottom").attr("src","images/arrow_r.png");
    });
    $("#memeTextBottom").blur(function(){
      $("#typeIndicatorBottom").attr("src","images/arrow_g.png");
    });
  };


  var initCarousel = function() {
    $("#owl-results").owlCarousel({

        navigation : false, // Show next and prev buttons
        pagination : false,
        slideSpeed : 300,
        paginationSpeed : 400,
        items: 3,
        itemsDesktop: [1199,2],
        itemsDesktopSmall: [979,2],
        itemsTablet: [768,1],
        itemsTabletSmall: [768,1],
        itemsMobile: [479,1],
        navigationText : ["vorige","volgende"],
        autoplay: 1500,
        stopOnHover: true

    });

    $("#owl-choose").owlCarousel({

        navigation : false, // Show next and prev buttons
        pagination : false,
        slideSpeed : 300,
        paginationSpeed : 400,
        items: 3,
        itemsDesktop: [1199,2],
        itemsDesktopSmall: [979,2],
        itemsTablet: [768,1],
        itemsTabletSmall: [768,1],
        itemsMobile: [479,1],
        navigationText : ["vorige","volgende"],
        autoplay: false,
        afterMove: choosePhoto,
        addClassActive: true

    });
    choosePhoto();
  };

  var choosePhoto = function(){
    // chosenPhoto
    chosenPhotoId = $(".active")[0].children[0].children[0].id;
    log("=> "+chosenPhotoId);
  };

  var initCanvas = function(){
    ctx = document.getElementById("memeCanvas").getContext("2d");
    // get appropriate size
    var i_w = $("#img0").width();
    var i_h = $("#img0").height();

    $("#memeCanvas").attr("width",i_w);
    $("#memeCanvas").attr("height",i_h);
    log(i_w+" - "+i_h)
    // get chosen image (from <img>)
    var img = document.getElementById(chosenPhotoId);
    //draw image
    ctx.drawImage(img,0,0,640,640,0,0,i_w,i_h);

    setTimeout(function(){
      ctx.textAlign = "center";
      ctx.fillStyle = "#fff";
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 6;
      //prepare textfield
      $(".memeText").css("left", $("#memeCanvas").css("margin-left"));
      $(".memeText").css("width", i_w+"px");
      $("#memeTextTop").css("top", 40+"px");
      $("#memeTextBottom").css("top", i_w-90+"px");
      $("#typeIndicatorTop").css("top", 40+"px");
      $("#typeIndicatorBottom").css("top", i_w-90+"px");
      $(".typeIndicator").css("left", parseInt($("#memeCanvas").css("margin-left")) -30);
      // $(".typeIndicator").attr("pos", "top");
      $(".memeText").change(function(){
        ctx.drawImage(document.getElementById(chosenPhotoId),0,0,640,640,0,0,$("#memeCanvas").attr("width"),$("#memeCanvas").attr("height"));
        //if($(this).attr("name")=="top")
          drawText("top", $("#memeTextTop").val().toUpperCase(),i_w,50);
        //if($(this).attr("name")=="bottom")
          drawText("bottom", $("#memeTextBottom").val().toUpperCase(),i_w,50);
      });
      $(".memeText").keyup(function(e){
        //log(e.which);
        ctx.drawImage(document.getElementById(chosenPhotoId),0,0,640,640,0,0,$("#memeCanvas").attr("width"),$("#memeCanvas").attr("height"));
        //if($(this).attr("name")=="top")
          drawText("top", $("#memeTextTop").val().toUpperCase(),i_w,50);
        //if($(this).attr("name")=="bottom")
          drawText("bottom", $("#memeTextBottom").val().toUpperCase(),i_w,50);
        if ( e.which == 13 ) {
          log($(this)[0]);
          if($(this)[0].id == "memeTextBottom"){
            $("#memeTextBottom").blur();
            log("bottom start");
          }else{
            $("#memeTextBottom").focus();
          }
        }
      });
    },100);


  };

  var drawText = function(pos, text, width, height) {
    //ctx.drawImage(document.getElementById("img0"),0,0,640,640,0,0,$("#memeCanvas").attr("width"),$("#memeCanvas").attr("height"));
    log("type: "+text);
      var fontSize = 100;
      ctx.font = "bold " + fontSize + "px Arial";
      while(1) {
          ctx.font = "bold " + fontSize + "px Arial";
          // log(ctx.measureText(text).width);
        if( (ctx.measureText(text).width < (width-15)) /*&& (fontSize < height/10)*/ ) {
              break;
          }
          fontSize-=2;
      }

      var y;
      if(pos == "top")
          y = fontSize + 15;
      else if(pos == "bottom") {
          y = parseInt($("#memeCanvas").attr("height")) - 50;
      }
      ctx.strokeText(text, width/2, y);
      ctx.fillText(text, width/2, y);
  }

  var resize = function(){
    resizeCarousel();
    var windowHeight = $(window).height();
    $("#logo").height(windowHeight*0.12);
    // $("#owl-results-container").height(windowHeight*0.8);
    if(isMobileLandscape()){
      // $("#owl-results-container").toggleClass("splitMobile");
      // $(".wemeButton").toggleClass("splitMobile");
      // log("splitMobile");
    }

  }

  var resizeCarousel = function(){
    var max = Math.max($(window).height(),$(window).width());
    $("#owl-results img").css("width", max);
    $("#owl-results img").css("height", max);
    log("resize to "+max+"x"+max);
    log("Mob Lndsc: "+isMobileLandscape());
    // console.log("resize to "+max+"x"+max);
    // $(".console").html("resize to "+max+"x"+max+" - Mobile Landscape: "+isMobileLandscape());
  };

  var isMobileLandscape = function(){
    var max = Math.max($(window).height(),$(window).width());
    return max < 640 && ($(window).width() > $(window).height());
  };

  var log = function(text){
    $(".console").append(text+"<br />");
    console.log(text);
  };

  return {
    init: init,
    landscape: isMobileLandscape
  };
};


var client;
var ctx;

$(function(){
  client = new Client();
  client.init();
});

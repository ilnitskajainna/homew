$(document).ready(function(){
    $('.slider').bxSlider({
      mode: 'vertical',
      speed: 500,
      responsive: true,
      auto: true,
      pause: 5000,
      minSlides: 1,
      maxSlides: 1,
      controls: false,
      pager: true
    });

    $('.slider2').bxSlider({
      speed: 500,
      responsive: true,
      auto: true,
      pause: 5000,
      slideWidth: 1180,
      minSlides: 1,
      maxSlides: 3,
      pager: true,
      prevText: '<span></span>',
      nextText: '<span></span>',
      slideMargin: 30
    });
///////////////////////////////////////
    lightbox.option({
      'resizeDuration': 200,
      'wrapAround': true

      }); 
/////////////////////////////////////////////
      map = L.map('map').setView([40.656620, -73.903810], 13);

      L.tileLayer.grayscale('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

      let newIcon = new L.Icon ({
        iconUrl: 'assets/plugins/leaflet_map/images/marker-icon3.png',
        iconSize: [106, 106]
      });

      L.marker([40.672114, -73.920072], {icon: newIcon}).addTo(map);

 ///////////////////////////////////////////////////////     
      $(function() {
        menu_top = $('.menu').offset().top;        
        $(window).scroll(function () {             
          if ($(window).scrollTop() > menu_top) { 
            if ($('.menu').css('position') != 'fixed') {
              $('.menu').css('position','fixed'); 
              $('.menu').css('top','0');          
              $('.menu').css('background','linear-gradient(45deg, #56B7FC 0%, #8265FD 100%)');
              $('.menu').css('opacity','.9');
              $('.blok1').css('margin-top','0px'); 
            }
          } else {                               
            if ($('.menu').css('position') == 'fixed') { 
              $('.menu').css('position','');
              $('.menu').css('top','');
              $('.menu').css('background','none');
              $('.blok1').css('margin-top','');
            }
          }
        });
      });
      
      $('.l-mnu ul li a').click(function(){
        if($(this).parent().hasClass('active')){
            return false;
        }
        $('.l-mnu ul li').removeClass('active');
        $(this).parent().addClass('active');
      });
       
        /////////////////////////////////////////
        
          $(".elips").on("click","a", function (event) {
              event.preventDefault();
              let id  = $(this).attr('href'),
                  top = $(id).offset().top;
              $('body,html').animate({scrollTop: top}, 800);
          });
      
    });
    document.addEventListener("DOMContentLoaded", function() {
      var lazyloadImages = document.querySelectorAll("img.lazy");    
      var lazyloadThrottleTimeout;
      
      function lazyload () {
        if(lazyloadThrottleTimeout) {
          clearTimeout(lazyloadThrottleTimeout);
        }    
        
        lazyloadThrottleTimeout = setTimeout(function() {
            var scrollTop = window.pageYOffset;
            lazyloadImages.forEach(function(img) {
                if(img.offsetTop < (window.innerHeight + scrollTop)) {
                  img.src = img.dataset.src;
                  img.classList.remove('lazy');
                }
            });
            if(lazyloadImages.length == 0) { 
              document.removeEventListener("scroll", lazyload);
              window.removeEventListener("resize", lazyload);
              window.removeEventListener("orientationChange", lazyload);
            }
        }, 20);
      }
      
      document.addEventListener("scroll", lazyload);
      window.addEventListener("resize", lazyload);
      window.addEventListener("orientationChange", lazyload);
    });

    ///////////////////////////////////
    document.addEventListener("DOMContentLoaded", function() {
      var lazyloadImages;    
    
      if ("IntersectionObserver" in window) {
        lazyloadImages = document.querySelectorAll(".lazy");
        var imageObserver = new IntersectionObserver(function(entries, observer) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              var image = entry.target;
              image.classList.remove("lazy");
              imageObserver.unobserve(image);
            }
          });
        });
    
        lazyloadImages.forEach(function(image) {
          imageObserver.observe(image);
        });
      } else {  
        var lazyloadThrottleTimeout;
        lazyloadImages = document.querySelectorAll(".lazy");
        
        function lazyload () {
          if(lazyloadThrottleTimeout) {
            clearTimeout(lazyloadThrottleTimeout);
          }    
    
          lazyloadThrottleTimeout = setTimeout(function() {
            var scrollTop = window.pageYOffset;
            lazyloadImages.forEach(function(img) {
                if(img.offsetTop < (window.innerHeight + scrollTop)) {
                  img.src = img.dataset.src;
                  img.classList.remove('lazy');
                }
            });
            if(lazyloadImages.length == 0) { 
              document.removeEventListener("scroll", lazyload);
              window.removeEventListener("resize", lazyload);
              window.removeEventListener("orientationChange", lazyload);
            }
          }, 20);
        }
    
        document.addEventListener("scroll", lazyload);
        window.addEventListener("resize", lazyload);
        window.addEventListener("orientationChange", lazyload);
      }
    });
    
    
    
      


(function($, Drupal, once) {
	'use strict';


  Drupal.behaviors.scrolltoTop = {
    attach: function (context, settings) {
      $.scrollUp({
        scrollClass: 'scroll-up-image',
        scrollText: '',    
        scrollImg: true,  
      });
    }

  };


  
  

  Drupal.behaviors.exposedFilterClearButton = {
    attach: function (context, settings) {
      // Define an array of text field selectors (IDs or classes)
      var textFieldSelectors = ['.views-exposed-form input[type="text"]']; // Add more selectors as needed
      textFieldSelectors.forEach(function (selector) {
        $(selector, context).each(function () {
          var $input = $(this);
          // Ensure the button is only added once per field
          if (once('clear-button', $input).length) {
              var $clearBtn = $('<button type="button" class="clear-btn"> x </button>');
              $input.after($clearBtn);
              // Function to toggle button visibility
              function toggleClearButton() {
                  $clearBtn.toggle($input.val().length > 0);
              }
              toggleClearButton(); // Run on page load
              // Show/hide button when typing
              $input.on('input', toggleClearButton);
              // Clear input when button is clicked
              $clearBtn.on('click', function () {
                  $input.val('');
                  toggleClearButton();
                  $input.trigger('change').focus();
              });
            }
        });
      });
    }
  };

	Drupal.behaviors.globalScript = {
		attach: function(context, settings) {


      var currentLang = $('html').attr('lang'); // e.g., "ar" or "en"
      $('.language-switcher-language-url .links li').each(function () {
        var $li = $(this);
        var liLang = $li.attr('hreflang');

        // Only add if not already set
        if (liLang === currentLang && !$li.hasClass('is-active')) {
          $li.addClass('is-active');
        }
      });



			$('.nav-link').click(function(e) {
				// $('a[href*="#subPagePanel"]').removeClass('fa-arrow-down' );
				$('nav').addClass('scrolled');
			});

			$('.overlay-body').click(function(e) {
				// $('a[href*="#subPagePanel"]').removeClass('fa-arrow-down' );
				$('nav').removeClass('scrolled');
			});

			// Dynamic active class based on url
			var url = window.location.pathname,
				urlRegExp = new RegExp(url.replace(/\/$/, '') + "$");
			$('.dynamic-active-class li a').each(function() {
				// console.log(this.href.replace(/\/$/, ''))
				if (urlRegExp.test(this.href.replace(/\/$/, ''))) {
					$(this).addClass('active');
				}
			});


			$(document).ready(function() {
				$('[data-toggle="tooltip"]').tooltip();
			});

			// color-grade

      // dots-active
   document.addEventListener("DOMContentLoaded", function () {
   let cards = document.querySelectorAll(".custom-attractions-card");
   let dotsContainer = document.querySelector(".dots-container");
   if (!cards.length) return; // Exit if no cards found
   let totalCards = cards.length;
   let currentIndex = 0;
   // Clear existing dots to avoid duplicates
   dotsContainer.innerHTML = "";
   // Create dots dynamically based on total cards
   for (let i = 0; i < totalCards; i++) {
       let dot = document.createElement("span");
       dot.classList.add("dot");
       if (i === 0) dot.classList.add("active");
       dotsContainer.appendChild(dot);
   }
   let dots = document.querySelectorAll(".dot");
   function updateCards() {
       cards.forEach((card, index) => {
           card.style.transform = `translateX(-${currentIndex * 100}%)`;
       });
       dots.forEach((dot, index) => {
           dot.classList.toggle("active", index === currentIndex);
       });
   }
   function autoSlide() {
       currentIndex = (currentIndex + 1) % totalCards;
       updateCards();
   }
   setInterval(autoSlide, 3000); // Change every 3 seconds
});
	

			AOS.init();

			const navbar = document.querySelector("#toto");

			document.addEventListener("scroll", (e) => {
				const scrolled = document.scrollingElement.scrollTop;

				if (scrolled > 80) { //adjust to suit your need of when transition start
					navbar.classList.add("scrolled");
				} else {
					if (!$(".overlay-body").hasClass("show")) {
						navbar.classList.remove("scrolled");
					}

				}

			});

        const video  = document.getElementById('heroVideo');
        const poster = document.getElementById('heroPoster');
        if (video) {
        video.addEventListener('canplay', () => {
          poster?.remove();
          video.style.visibility = 'visible';
          video.play().catch(()=>{});
        }, { once: true });
        video.load();
        }
      
     document.querySelectorAll('li[data-toggle="collapse"]').forEach(item => {
      const icon = item.querySelector('i');
      item.addEventListener('click', () => {
        // Small delay so Bootstrap can toggle the "collapsed" class first
        setTimeout(() => {
          if (item.classList.contains('collapsed')) {
            icon.classList.remove('fa-minus');
            icon.classList.add('fa-plus');
          } else {
            icon.classList.remove('fa-plus');
            icon.classList.add('fa-minus');
          }
        }, 200);
      });
      });


   


      $(function () {
        var $sec = $('.sec-nav');
        $('#collapsibleNavbar')
          .on('show.bs.collapse', function () {
            $sec.addClass('d-none');       // hide blue bar when menu opens
          })
          .on('hidden.bs.collapse', function () {
            $sec.removeClass('d-none');    // show it back when menu closes
          });
        });



    //   setInterval(function(){ 
    //     // toggle the class every five second
    //     $('.scheduled-btn').toggleClass('animate-shine');  
    //     setTimeout(function(){
    //       // toggle back after 1 second
    //       $('.scheduled-btn').toggleClass('animate-shine');  
    //     },1000);
     
    //  },3000);

      
         // ✅ Lang Switch Move Logic
        function moveLangSwitch() {
          const langSwitch = document.querySelector('.lang-switch');
          const stickyHeader = document.querySelector('.hia-sticky-header');
          const navContainer = document.querySelector('.container.sec-nav-flex');
          if (!langSwitch || !stickyHeader || !navContainer) return;

          if (window.innerWidth <= 768) {
            if (!stickyHeader.contains(langSwitch)) {
              stickyHeader.appendChild(langSwitch);
            }
          } else {
            if (!navContainer.contains(langSwitch)) {
              navContainer.appendChild(langSwitch);
            }
          }
        }
        // ✅ Run on load and resize
        moveLangSwitch();
        window.addEventListener('resize', moveLangSwitch);
        
     
    
      const menuIcon = document.getElementById('menu-icon');
      if (menuIcon != null) {        
        menuIcon.addEventListener('click', () => {
          menuIcon.classList.toggle('rotate');
          if (menuIcon.classList.contains('fa-bars')) {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-xmark');
          } else {
            menuIcon.classList.remove('fa-xmark');
            menuIcon.classList.add('fa-bars');
          }
        });
      }
     

    

    
      function startVerticalScroll(selector, delay = 10000) {
        const list = document.querySelector(selector);

        if(list!= null){
        const items = list.querySelectorAll("div");
        const totalItems = items.length;
        // Clone items once for smooth looping
        items.forEach(item => list.appendChild(item.cloneNode(true)));
        let index = 0;
        function scrollNext() {
          index++;
          list.style.transition = "transform 0.5s ease-in-out";
          list.style.transform = `translateY(-${30 * index}px)`;
          if (index >= totalItems) {
            // Reset after transition ends
            setTimeout(() => {
              list.style.transition = "none";
              list.style.transform = "translateY(0)";
              index = 0;
            }, 500);
          }
          setTimeout(scrollNext, delay);
        }
        setTimeout(scrollNext, delay);
        }

      }
      // Call the function on both lists
      startVerticalScroll(".search-english-list", 3000);
      startVerticalScroll(".search-arabic-list", 3000);
    
      function updateClock() {
        // Force Date to Qatar timezone
        const options = {
            timeZone: "Asia/Qatar",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        };
        const nowInQatar = new Date().toLocaleString("en-US", options);
        // Example: "03:45 PM"
        $('.current-time').text(nowInQatar);
      }
      // Update every second
      setInterval(updateClock, 1000);
      updateClock(); // Run once immediately        

			$('.carousel').carousel({
				interval: 3500
			})

			$('.header-banner-text-mirror').html($('.carousel-item.active .header-text-master').html())
			$('#carouselExampleFade').on('slide.bs.carousel', function() {
				$('.header-banner-text-mirror').html($('.carousel-item.active + .carousel-item .header-text-master').html())
			})
			// Live weather
			// var jqxhr = $.getJSON("https://api.open-meteo.com/v1/forecast?latitude=25.2855&longitude=51.531&current=temperature_2m,is_day&forecast_days=1", function(data) {
			// 	$('.live-weather').html("<span class='weather-day-" + data.current.is_day + "'></span>" + data.current.temperature_2m + " °C");
			// });


			var mediaQuery = window.matchMedia("(max-width: 768px)");

			$(mediaQuery).on('change', (e) => {
				// console.log('matches', e.originalEvent.matches);
				if (e.originalEvent.matches) {
					$('#collapsibleNavbar').addClass('animate__animated animate__slideInLeft')
				} else {
					$('#collapsibleNavbar').removeClass('animate__animated animate__slideInLeft')

				}
			});

      // Bootstrap carousel with video starts
      $(window).on('load', function() {
        $('.carousel').carousel({
          interval: 3500
        })
        var elements = document.getElementsByClassName('bt-video');
        var firstVideo = elements[0];
        if (firstVideo) {
          firstVideo.play().catch(error => console.error("Autoplay blocked:", error));
        }
      });
    
      $('.bt-video').on('stop pause ended', function (e) {
        $("#carouselExampleFade").carousel('next');
        $("#carouselExampleFade").carousel('cycle');
      });

      let videos = document.querySelectorAll("video");
      // Function to reset all videos
      function resetVideos() {
        videos.forEach(video => {
            video.pause();
            video.currentTime = 0; // Reset video to start
        });
      }      
      $('#carouselExampleFade').on('slid.bs.carousel', function (event) {
        let nextSlide = event.relatedTarget;
        let video = nextSlide.querySelector("video");
        if (video) {
          video.currentTime = 0;
          video.play();
          $("#carouselExampleFade").carousel('pause');
        }
      }); 

      $('.header-banner-text-mirror').html($('.carousel-item.active .header-text-master').html())
      $('#carouselExampleFade').on('slide.bs.carousel', function (event) {
        resetVideos();
        if (event.to == 0) {
          $('.header-banner-text-mirror').html($('.carousel-item:first-child .header-text-master').html())
        } else {
          $('.header-banner-text-mirror').html($('.carousel-item.active + .carousel-item .header-text-master').html())
        }
      })
      // End - Bootstrap carousel with video
      // Live weather
      // var jqxhr = $.getJSON( "https://api.open-meteo.com/v1/forecast?latitude=25.2855&longitude=51.531&current=temperature_2m,is_day&forecast_days=1", function(data ) {
      //   $('.live-weather').html("<span class='weather-day-"+data.current.is_day+"'></span>"+ data.current.temperature_2m + " °C");
      // });


      var mediaQuery = window.matchMedia( "(max-width: 767px)" );

      mediaQuery.matches

      $(mediaQuery).on('change', (e) => {
        // console.log('matches', e.originalEvent.matches);
        if(e.originalEvent.matches){
          $('#collapsibleNavbar').addClass('animate__animated animate__slideInLeft')
        }
        else {
          $('#collapsibleNavbar').removeClass('animate__animated animate__slideInLeft')

        }
      });

      var amediaQuery = window.matchMedia( "(max-width:576px) and  (orientation: portrait)" );

      // console.log(amediaQuery.matches);
  
      setupattraction(amediaQuery.matches);

      $(amediaQuery).on('change', (e) => {

        setupattraction(e.originalEvent.matches);

      });

  function setupattraction(ismatches){

    // console.log('matches',ismatches);

    if(ismatches == true){

        var attractions = document.getElementsByClassName('bento-grid-mbl-cards');

        var attractionsitems = document.getElementsByClassName('custom-attractions-card');

        // console.log(attractionsitems.length);

        var numChildren = attractionsitems.length;

        for (let i = 0; i < numChildren; i++) {

          var ty = (80 /Math.sin((360/numChildren)) ) + 50;

          attractionsitems[i].style.transformOrigin = "70% "+ (1.5 * ty)+"%";

          var a = (360/numChildren)*i;

          attractionsitems[i].style.transform = "rotate("+a+"deg)";

}
    if (attractions.length) {
      attractions[0].ontouchstart =touchStartHandler;
      attractions[0].ontouchend=touchEndHandler;

      Array.from(attractionsitems).forEach(element => {
        element.ontouchstart =touchStartHandler;
        element.ontouchend=touchEndHandler;
      });
      // ("touchstart", touchStartHandler, false);
    }  
  
}
else{

  var attractions = document.getElementsByClassName('bento-grid-mbl-cards');

  var attractionsitems = document.getElementsByClassName('custom-attractions-card');

  // console.log(attractionsitems.length);

  var numChildren = attractionsitems.length;

  for (let i = 0; i < numChildren; i++) {

    var ty = (80 /Math.sin((360/numChildren)) ) + 50;

    attractionsitems[i].style.transformOrigin = "0";

    // var a = (360/numChildren)*i;

    attractionsitems[i].style.transform = "rotate(0)";

  }
  if (attractions.length) {
    attractions[0].ontouchstart =null;
    attractions[0].ontouchend=null;
  }


  Array.from(attractionsitems).forEach(element => {
    element.ontouchstart =null;
    element.ontouchend=null;

  });
}
  }
      var touchesInAction = {};
      
      function touchStartHandler(event) {
          var touches = event.changedTouches;
          // console.log('touchstart event fired'); 
          for(var j = 0; j < touches.length; j++) {
      
               /* store touch info on touchstart */
               touchesInAction[ "$" + touches[j].identifier ] = {
      
                  identifier : touches[j].identifier,
                  pageX : touches[j].pageX,
                  pageY : touches[j].pageY
               };
          }
      }
      
      function touchEndHandler(event) {
    
          var touches = event.changedTouches;
    
          // console.log('touchEndHandler event fired'); 
          // console.log(event); 
      
          for(var j = 0; j < touches.length; j++) {
      
              /* access stored touch info on touchend */
              var theTouchInfo = touchesInAction[ "$" + touches[j].identifier ];
              theTouchInfo.dx = touches[j].pageX - theTouchInfo.pageX;  /* x-distance moved since touchstart */
              theTouchInfo.dy = touches[j].pageY - theTouchInfo.pageY;  /* y-distance moved since touchstart */
  
              // console.log(theTouchInfo.dx);
  
              var attractionsitems = document.getElementsByClassName('custom-attractions-card');
  
              var numChildren = attractionsitems.length;
  
  
              if(theTouchInfo.dx < 0){
            
                for (let i = 0; i < numChildren; i++) {
  
                  var str = attractionsitems[i].style.transform 
  
                  var an = str.match(/-?\d+/g);[0];
  
                  var numbers = parseInt(an);
  
                  // console.log("left");
  
                  
                  // console.log(numbers);
  
                  // var newangle = (numbers-(360/numChildren)) > 0 ? numbers-(360/numChildren)  : 360- (360/numChildren)
  
                  var newangle =(numbers-(360/numChildren));
  
                  // console.log(newangle);
  
            
                  attractionsitems[i].style.transform = "rotate("+newangle+"deg)";
                 
              }
            
              
  
              }
              else{
                // console.log("right");
  
  
                for (let i = 0; i < numChildren; i++) {
  
                  var str = attractionsitems[i].style.transform 
  
                  var an = str.match(/-?\d+/g);[0];
  
                  var numbers = parseInt(an);
                  
                  // console.log(numbers);
  
                    //  var newangle = (numbers+(360/numChildren)) >= 360 ? ( (numbers+(360/numChildren)) - 360 ) : (numbers+(360/numChildren));
  
                     var newangle =(numbers+(360/numChildren));
  
                    // console.log(newangle);
  
                    // newangle = (newangle == 0) ? 360 : newangle;
            
                     attractionsitems[i].style.transform = "rotate("+newangle+"deg)";
            
                  // attractionsitems[i].style.transform = "rotate("+anglerotate+"deg)";
                 
              }
              }
  
              // $(".custom-attractions-card").animate("prev", "15s","cubic-bezier(0.5, -0.2, 0.5, 1.2)");
          }
      
          /* determine what gesture was performed, based on dx and dy (tap, swipe, one or two fingers etc. */
      
      }

    }
  };

  document.addEventListener("DOMContentLoaded", function () {

    let cardsContainer = document.querySelector(".bento-grid-mbl-cards");

    let attractionsItems = document.querySelectorAll(".custom-attractions-card");

    let dotsContainer = document.querySelector(".dots-container");

    if (!attractionsItems.length) {

        console.error("❌ No cards found.");
        
        return;
    }

    let totalCards = attractionsItems.length;

    let currentIndex = 0;

    // Create dots dynamically

    dotsContainer.innerHTML = "";

    for (let i = 0; i < totalCards; i++) {

        let dot = document.createElement("span");

        dot.classList.add("dot");

        if (i === 0) dot.classList.add("active");

        dotsContainer.appendChild(dot);

    }

    let dots = document.querySelectorAll(".dot");

    function updateDots(index) {

        dots.forEach((dot, i) => {

            dot.classList.toggle("active", i === index);

        });

    }

    // Click event on cards to change active dot

    attractionsItems.forEach((card, index) => {

        card.addEventListener("click", () => {

            currentIndex = index;

            updateDots(currentIndex);

        });

    });

    // Swipe event support

    let touchStartX = 0;

    let touchEndX = 0;

    function touchStartHandler(event) {

        touchStartX = event.touches[0].clientX;

    }

    function touchEndHandler(event) {

        touchEndX = event.changedTouches[0].clientX;

        if (touchEndX < touchStartX) {

            // Swipe left (next card)

            currentIndex = (currentIndex + 1) % totalCards;

        } else if (touchEndX > touchStartX) {

            // Swipe right (previous card)

            currentIndex = (currentIndex - 1 + totalCards) % totalCards;

        }

        updateDots(currentIndex);

    }

    // Add event listeners for swipe gestures

    cardsContainer.addEventListener("touchstart", touchStartHandler);

    cardsContainer.addEventListener("touchend", touchEndHandler);

    updateDots(currentIndex); // Initialize first state

}); 


// Function to force AOS refresh and re-trigger animations for the last section
function refreshAOSForLastSection() {
  setTimeout(() => {
      AOS.refresh();
      let lastSection = document.querySelector('.download-apps-section .mobile-app-img, .download-apps-section h3'); // Replace with actual class or ID
      if (lastSection) {
          lastSection.classList.remove("aos-animate"); // Remove animation class
          void lastSection.offsetWidth; // Trigger reflow (forces browser to repaint)
          lastSection.classList.add("aos-animate"); // Re-add animation class
      }
  }, 200); // Small delay for layout updates
}
// Refresh AOS when the window resizes
window.addEventListener('resize', refreshAOSForLastSection);
// Refresh AOS after the page is fully loaded
window.addEventListener('load', refreshAOSForLastSection);






// smooth-scroll
   
  //   document.addEventListener("DOMContentLoaded", function () {
  //     // Initialize Locomotive Scroll
  //     const locoScroll = new LocomotiveScroll({
  //         el: document.querySelector(".hia-page-wrapper"),
  //         smooth: true
  //     });
  //     // Sync GSAP with Locomotive Scroll
  //     locoScroll.on("scroll", ScrollTrigger.update);
  //     ScrollTrigger.scrollerProxy(".hia-page-wrapper", {
  //         scrollTop(value) {
  //             return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  //         },
  //         getBoundingClientRect() {
  //             return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
  //         },
  //         pinType: document.querySelector(".hia-page-wrapper").style.transform ? "transform" : "fixed"
  //     });
  //     // Refresh ScrollTrigger after Locomotive Scroll loads
  //     ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  //     ScrollTrigger.refresh();
  // });

// smooth-scroll-end

window.onload = function () {
  document.getElementById("edit-global-search").focus();
};


// Ensure the DOM is fully loaded before running the script
jQuery(document).ready(function($) {
  
  // Target the specific container and the first anchor link within it
  var $firstFilterLink = $('.portfolio-filter li:first-child a');

  // Check if the element exists on the page
  if ($firstFilterLink.length) {
    
    // Use a slight delay to ensure all other Isotope JavaScript handlers 
    // have attached their event listeners before we simulate the click.
    setTimeout(function() {
      $firstFilterLink.trigger('click');
    }, 100); // 100 milliseconds delay
    
  }
});






})(jQuery, Drupal, once);
  

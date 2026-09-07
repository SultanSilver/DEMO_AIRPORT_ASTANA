(function ($, Drupal, drupalSettings) {
  'use strict';
  Drupal.behaviors.history = {
    attach: function (context, settings) {

      const years = drupalSettings.history;
      let currentIndex = 0;
      const yearTitle = document.getElementById('year-title');
      const yearDescription = document.getElementById('year-text');
      const yearText = document.getElementById('year-description');
      const yearMeter = document.querySelectorAll('.year');
      const imageSlider = $('.image-slider').not('.slick-initialized');

      function updateSlider(index) {
        const selectedYear = years[index];
        // Apply fade-up animation
        yearTitle.classList.remove('fade-up');
        void yearTitle.offsetWidth; // Trigger reflow
        yearTitle.classList.add('fade-up');
        yearTitle.textContent = selectedYear.year;
        yearDescription.innerHTML = selectedYear.body;
        yearText.textContent = selectedYear.title;
        yearMeter.forEach((year, i) => {
          if (i === index) {
            year.classList.add('active-year');
          } else {
            year.classList.remove('active-year');
          }
        });
      }
      yearMeter.forEach((yearElement, index) => {
        yearElement.addEventListener('click', () => {
          currentIndex = index;
          imageSlider.slick('slickGoTo', index);
          updateSlider(index);
        });
      });
      $(document).ready(function() {
        imageSlider.slick({
          slidesToShow: 1.2,
          slidesToScroll: 1,
          infinite: false,
          arrows: false,
          dots: false,
          centerMode: true,
          centerPadding: '0px',
          focusOnSelect: true,
          autoplay: true,
          autoplaySpeed: 3000,
          speed: 2000,
          responsive: [{
            breakpoint: 766,
            settings: {
              slidesToShow: 1.2,
              centerMode: false,
            }
          }]
        });
        imageSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
          currentIndex = nextSlide;
          updateSlider(nextSlide);
          
        });
        imageSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
              currentIndex = nextSlide;
              updateSlider(nextSlide);
            });
           // Next and Previous Button functionality
            $('#next-slide').on('click', function () {
                $('.image-slider').slick('slickNext');
            });

            $('#prev-slide').on('click', function () {
                $('.image-slider').slick('slickPrev');
            });
      });
    
    }
  };
      
})(jQuery, Drupal, drupalSettings);
  
(function ($, Drupal, drupalSettings) {
  'use strict';
  Drupal.behaviors.weather = {
    attach: function (context, settings) {

      fetch_weather()
      setInterval(function() { 
        fetch_weather()
      }, 30000);

      function fetch_weather() {
        var getTime = $.getJSON("/api/v2/get-data", function(fetched_data) {
          // console.log(fetched_data.current_time)
          // console.log(fetched_data.weather.last_fetched_time)
          // console.log(fetched_data.current_time - fetched_data.weather.last_fetched_time)  
          if (fetched_data.current_time - fetched_data.weather.last_fetched_time > 30) {
            var jqxhr = $.getJSON("https://api.open-meteo.com/v1/forecast?latitude=25.2855&longitude=51.531&current=temperature_2m,is_day&forecast_days=1", function(live_data) {
              $('.live-weather').html("<span class='weather-day-" + live_data.current.is_day + "'></span>" + live_data.current.temperature_2m + " °C");
              $.ajax({
                url: "/receive-weather",
  
                type: "POST",
                data: JSON.stringify(live_data), // Send data as JSON
                contentType: "application/json", // Set content type
                success: function (response) {
                  // console.log("Response from Drupal:", response);                  
                },
                error: function (xhr, status, error) {
                  console.error("Error:", error);
                },
              });
            });            
          } else {
            $('.live-weather').html("<span class='weather-day-" + fetched_data.weather.is_day + "'></span>" + fetched_data.weather.latest + " °C");
          }
  
        });        
      }


    }
  };
      
})(jQuery, Drupal, drupalSettings);
  
// app.js

$("document").ready(() => {

    // load jquery objects from DOM
    const $icon = $("#icon");
    const $tempUnit = $("#tempUnit");
    const $status = $("#status");
    const $location = $("#location");
    const $tempButton = $(".cmn-toggle");
    const $tempIcon = $("#tempIcon"); 
    const _APIkey = "0d00e4ff66989b59245eec9142f1ec29";



    getLocation(showWeather);

 

    // get location using geolocation api
    function getLocation(success){
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                success,
                 err => {
                     alert(err.message);
                 },
                  {"enableHighAccuracy":true});
        }
        else {
            alert("geolocation is not available for your device, sorry.")
        }
    }

    // get and show weather in DOM
    // uses https://api.darksky.net
    function showWeather(position){
        console.log(position);

        $.ajax(
            "https://api.darksky.net/forecast/" + _APIkey + 
            "/" +
            position.coords.latitude +
            "," +
            position.coords.longitude,

            {   
                "method" : "GET",
                "data": "json",
                "dataType" : "jsonp",
                "success" : data => {
                    console.log(data);
                    
                    $tempUnit.text(data.currently.temperature);
                    $tempIcon.html("&deg;F");
                    $status.text(data.currently.summary);
                    $location.text(data.timezone);

                    // create weather icon

                    const skycon = new Skycons({"color":"#0085aa", "resizeClear":true});
                    let iconType = data.currently.icon.replace(/-/g, "_").toUpperCase();
                    console.log(iconType);
                    skycon.add("icon", Skycons[iconType] || Skycons['DEFAULT']);
                    skycon.play();

                    // forgive me for i have sinned,
                    //  i will be back to write better code
                    const tempUnitFahrenheit = $tempUnit.text();
                    const tempUnitCelsius = convertToCelsius($tempUnit.text());

                    $(".switch").show();

                    $tempButton.on("click", () => {
                        if (!$tempButton.is(":checked")) {
                            $tempUnit.text(tempUnitFahrenheit);
                             $tempIcon.html("&deg;F");
                        }
                        else {
                            $tempUnit.text(tempUnitCelsius);
                             $tempIcon.html("&deg;C");
                            
                        } 
    });

                }

            }
        );
    }

    // convert from fahrenheit to Celsius
    function convertToCelsius(fahrenheit){
        let temp =  (Number(fahrenheit)-32) * 5/9;
        return temp.toFixed(2);
    }

});
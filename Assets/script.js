
var API_KEY="9e638e156d122da7536ad49d6d5b1c35";

document.getElementById("cityForm").addEventListener("submit",function(event) {
    event.preventDefault();
    var cityName=document.getElementById("cityNameInput").value;
    if(!cityName) {
        alert("Please enter the name of a city.");
    } else {
        document.getElementById("cityName").innerText=cityName;

        var requestUrl="http://api.openweathermap.org/geo/1.0/direct?q="+cityName+"&limit=1&appid="+API_KEY;

        fetch(requestUrl).then(function(response) {
            if(!response.ok) {
                alert("No information found for "+cityName);
            } 
            return response.json();
            
        }).then(function(data) {
            console.log(data);

            var latitude=data[0].lat;
            var longitude=data[0].lon;

            var forecastRequestUrl="https://api.openweathermap.org/data/2.5/onecall?lat="+latitude+"&lon="+longitude+"&appid="+API_KEY;

            fetch(forecastRequestUrl).then(function(response) {
                if(!response.ok) {
                    alert("No information found for "+cityName);
                } 
                return response.json();
            }).then(function(data) {
                console.log(data);

                document.getElementById("currentTemperature").innerText=data.current.temp;
                document.getElementById("currentHumidity").innerText=data.current.humidity;
                document.getElementById("currentWindSpeed").innerText=data.wind_speed;
                document.getElementById("currentUvi").innerText=data.current.uvi;

                for(var i=0;i<data.Search.length;i++) {
                    var dailyForecast=data.Search[i];
                    
                    var forecast=$("<div>");
                    forecast.addClass("forecast");

                    var dailyTemperature=$("<h1>");
                    dailyTemperature.addClass("temperature");
    
                    var dailyHumidity=$("<h1>");
                    dailyHumidity.addClass("humidity");

                    forecast.append(dailyTemperature);
    
                    forecast.append(dailyHumidity);

                    //Rest of properties
    
                    movieDiv.appendTo("#forecast");
    
    
                }

            });
        })

    }

})


// document.getElementById("cityForm").addEventListener("submit",function(event) {
//     event.preventDefault();
//     var cityName=document.getElementById("cityNameInput").value;
//     if(!cityName) {
//         alert("Please enter the name of a city.");
//     } else {
//         document.getElementById("cityName").innerText=cityName;

//         var requestUrl="http://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+API_KEY;

//         fetch(requestUrl).then(function(response) {
//             if(!response.ok) {
//                 alert("No information found for "+cityName);
//             } 
//             return response.json();
            
//         }).then(function(data) {
//             console.log(data);

//             document.getElementById("currentTemperature").innerText=data.main.temp;
//             document.getElementById("currentHumidity").innerText=data.main.humidity;
//             document.getElementById("currentWindSpeed").innerText=data.wind.speed;
//         })

//     }

// })


//  var today = moment();
//  $("#date").text(today.format("dddd MMMM Do, YYYY"));





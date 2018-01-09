var STORAGE_ID = 'weatherapp';

var saveToLocalStorage = function () {
    localStorage.setItem(STORAGE_ID, JSON.stringify(weather));
}
var getFromLocalStorage = function () {
    return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
};


var weather = [];

var fetch = function () {
    var input = $('.city-name').val();
    $.ajax({
        method: "GET",
        url: 'http://api.apixu.com/v1/current.json?key=8b8e0883a91f4e5d8ce91347180701&q=' + input,
        success: function (data) {

            var cities = {

                city: data.location.name ? data.location.name : "info unavailable",
                tempCelc: data.current.temp_c ? data.current.temp_c : "info unavailable",
                tempFar: data.current.temp_f ? data.current.temp_f : "info unavailable",
                time: data.location.localtime ? data.location.localtime : "info unavailable",
                comments: []
            }

            weather.push(cities);
            saveToLocalStorage();
            renderWeather();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
            $('.display-weather').empty();
            $('.display-weather').append("please enter a valid city name");


        }
    });
};


//function render weather div on page
function renderWeather() {
    $('.display-weather').empty();

    var source = $('#weather-template').html();
    var template = Handlebars.compile(source);
    var weatherData = { "cityWeather": weather };
    var newHTML = template(weatherData);
    $('.display-weather').append(newHTML);


}



//function add comment to array

//function render comment








//CLICK FUNCTIONS 

//click 'get weather' which should invoke adding to array and rendering

$('.get-weather').on('click', function () {
    fetch();
    renderWeather();
    $('.city-name').val("");
});



//click to delete post 

$('.display-weather').on('click', '.trash', function () {
    var index = $(this).closest('.city-listing').index();
    console.log(index);
    weather.splice(index, 1);
    $(this).closest('.city-listing').remove();
 
 });

 //click to make a comment--
 //should be added as second param of handler call back bec its not available on page load
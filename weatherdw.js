
$(function() {

  function updateTable1(){

    event.preventDefault();
    var theUrl = "http://api.worldweatheronline.com/free/v2/weather.ashx?key=b5c474f461014299017e2c088f017&fx=yes&num_of_days=1&format=json&maxtempF=yes&q="
    console.log(theUrl);
    finalUrl = theUrl + $("#zip").val();
    fetchData(finalUrl);
  }

  var fetchData = function(jam){
  $.getJSON(jam, function(json){
    //console.log(json);
    $('#lowTemp').text(json.data.weather[0].mintempF);
    $('#highTemp').text(json.data.weather[0].maxtempF);
    $('#currentTemp').text(json.data.current_condition[0].temp_F);
  }
  )};
  $('#submit').on('click',updateTable1);

  //END DW SCRIPT//
  //BEGIN RON FLOYD'S SCRIPT

  //Put focus in zipcode textbox when page loads
  $("#zip").focus();

  //Caching World Weather Online link
  var baseUrl = "http://api.worldweatheronline.com/free/v2/weather.ashx?key=b5c474f461014299017e2c088f017&q=";

  //On click, display route info on map
  $("#fansbutton").on('click', function() {
    getdirections();
    return false;
  });

  //On click, concatenate zipcode to baseUrl and envoke getData()
  $("#submit").on("click", function() {
    var stopText = $('#zip').val();
    var numDays = "&num_of_days=2&tp=3&format=json";
    var theUrl = baseUrl + stopText + numDays;
    getData(theUrl);
    getWeatherImage();

  //Clear textbox and put focus back in
  $("#zip").val("").focus();
  });

  function getWeatherImage(){

    var wxDesc = $("#wxDesc")[0].innerText;

    function show_image(src) {
      var img = document.createElement("img");
      img.src = src;
      document.getElementById('addimage').appendChild(img);
    }

    if(wxDesc == "partly cloudy"){
      show_image("images/partlycloudy.png")
    }

    if(wxDesc == "cloudy"){
      show_image("images/cloudy.png")
    }

    if(wxDesc == "sunny"){
      show_image("images/sunny.png")
    }
  }//End function getWeatherImage

  //getData takes in concatenated Url and outputs wx info
  var getData = function(url) {
    $.getJSON(url, function(json) {
      var wx = json,
          curWx = json.data.current_condition[0],
          curAstro = json.data.weather[0],
          humidity = curWx.humidity,
          pressure = curWx.pressure,
          visibility = curWx.visibility,
          wxDesc = curWx.weatherDesc[0].value,
          windDir = curWx.winddirDegree,
          windSpeed = curWx.windspeedMiles,
          uvIndex = curAstro.uvIndex;

    //Weather data output
    $('#wxDesc').text(wxDesc.toLowerCase());
    $('#humidity').text(humidity + "%");
    $('#pressure').text(pressure + " mb");
    $('#visibility').text(visibility + " mi");
    $('#windSpeed').text(windSpeed + " mph");
    $('#windDir').html(windDir + '&deg;');
    $('#uvIndex').text(uvIndex);

    }

  )}; //End of function getData

  // Commit last entered zipcode to local storage.
  var zip = document.getElementById('zip');
  zip.value = localStorage.getItem('zip');
  zip.addEventListener('input', function() {
    localStorage.setItem('zip', zip.value);
  }, false);

  //END RON FLOYD'S SCRIPT
  //BEGIN FAN'S SCRIPT
  var geocoder;
  var map;

  function init() {
    geocoder = new google.maps.Geocoder();
        var directions;
        var fmaddr1 = document.getElementById("fromaddress");
        var toaddr1 = document.getElementById("toaddress");
        var zip1 = document.getElementById("zip");
        var options1 = {
        types: ['(regions)'],
        componentRestrictions: {country: "us"}
        };
        var autocomplete1 = new google.maps.places.Autocomplete(fmaddr1);
        var autocomplete2 = new google.maps.places.Autocomplete(toaddr1);
        var autocomplete3 = new google.maps.places.Autocomplete(zip1,options1);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var coords = position.coords;
        var Clatlng = new google.maps.LatLng(coords.latitude, coords.longitude);
        var CmyOptions = {
            zoom: 14,
            center: Clatlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById("mapholder"), CmyOptions);
        var trafficLayer = new google.maps.TrafficLayer;

        trafficLayer.setMap(map);
        var Cmarker = new google.maps.Marker({
            position: Clatlng,
            map: map
        });
        var CinfoWindow = new google.maps.InfoWindow({
         content: "CurrentPosition"

        });
        CinfoWindow.open(map, Cmarker);

      function (error) {
        switch (error.code) {
        case 1:
          console.log("The Current location service to be rejected");
        break;
        case 2:
          console.log("Can't get location information");
        break;
        case 3:
          console.log("Getting the message timeout");
        break;
        default:
          console.log("Your browser doesn't support HTML5 to obtain location information");
        break;
        }
      }
     });
    };
  };//End function init()

  function getdirections() {

var geocoder;
var map;


function updateTable1(){
  event.preventDefault();
  var theUrl = "http://api.worldweatheronline.com/free/v2/weather.ashx?key=b5c474f461014299017e2c088f017&fx=yes&num_of_days=1&format=json&maxtempF=yes&q="
  console.log(theUrl);
  finalUrl = theUrl + $("#zip").val();
  fetchData(finalUrl);
}

function init() {
  geocoder = new google.maps.Geocoder();
  var directions;
  var fmaddr1 = document.getElementById("fromaddress");
  var toaddr1 = document.getElementById("toaddress");
  var zip1 = document.getElementById("zip");
  var options1 = {
    types: ['(regions)'],
    componentRestrictions: {country: "us"}
  };
  var autocomplete1 = new google.maps.places.Autocomplete(fmaddr1);
  var autocomplete2 = new google.maps.places.Autocomplete(toaddr1);
  var autocomplete3 = new google.maps.places.Autocomplete(zip1);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var coords = position.coords;
      var Clatlng = new google.maps.LatLng(coords.latitude, coords.longitude);
      var CmyOptions = {
          zoom: 14,
          center: Clatlng,
          mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      map = new google.maps.Map(document.getElementById("mapholder"), CmyOptions);
      var trafficLayer = new google.maps.TrafficLayer;

      trafficLayer.setMap(map);
      var Cmarker = new google.maps.Marker({
          position: Clatlng,
          map: map
      });
      var CinfoWindow = new google.maps.InfoWindow({
      content: "CurrentPosition"

      });
      CinfoWindow.open(map, Cmarker);
    }, function (error) {
      switch (error.code) {
        case 1:
        console.log("The Current location service to be rejected");
      break;
        case 2:
        console.log("Can't get location information");
      break;
        case 3:
        console.log("Getting the message timeout");
        break;
      default:
        console.log("Unknown error");
        break;
        }
    });
  } else {
    console.log("Your browser doesn't support HTML5 to obtain location information");
  }
  codeAddress();
}

function getdirections() {


    var map = new google.maps.Map(document.getElementById("mapholder"));
    var trafficLayer = new google.maps.TrafficLayer;

    trafficLayer.setMap(map);
    var mode = google.maps.DirectionsTravelMode.DRIVING;
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var directionsService = new google.maps.DirectionsService();
    var directionsVisible = false;
    directionsDisplay.setMap(null);
    directionsDisplay.setMap(map);
    $('#mapholder').append("<td id='directionsPanel'></td>");
    directionsDisplay.setPanel(document.getElementById("directionsPanel"));
    var fmaddr = document.getElementById("fromaddress").value;
    var toaddr = document.getElementById("toaddress").value;
    var request = {origin: fmaddr, destination:toaddr, travelMode: mode, optimizeWaypoints: true, avoidHighways:false, avoidTolls: false};
    directionsService.route
    (
            request,
            function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                }
            }
    );
    directionsVisible = true;
}

function codeAddress() {
  var address = document.getElementById("zip").value;
  geocoder.geocode({
      'address' : address
  }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
          map.setCenter(results[0].geometry.location);
          var Amarker = new google.maps.Marker({
              map : map,
              position : results[0].geometry.location,
              title : address,
              animation : google.maps.Animation.DROP
          });
          var display = " " + results[0].formatted_address;
          var infowindow = new google.maps.InfoWindow({
              content : "<span style='font-size:11px'>"
                       + "<br>" + display + "</span>",
              pixelOffset : 0,
              position : results[0].geometry.location

          });
          infowindow.open(map, Amarker);
          google.maps.event.addListener(Amarker, 'click', function() {
              infowindow.open(map, Amarker);
          });
      } else {
          alert("Geocode was not successful for the following reason: " + status);
      }
  });
}

//getData takes in concatenated Url and outputs wx info
var getData = function(url) {
  $.getJSON(url, function(json) {
    var wx = json,
        curWx = json.data.current_condition[0],
        curAstro = json.data.weather[0],
        humidity = curWx.humidity,
        pressure = curWx.pressure,
        visibility = curWx.visibility,
        wxDesc = curWx.weatherDesc[0].value,
        windDir = curWx.winddirDegree,
        windSpeed = curWx.windspeedMiles,
        uvIndex = curAstro.uvIndex;

  //Weather data output
  $('#wxDesc').text(wxDesc.toLowerCase());
  $('#humidity').text(humidity + "%");
  $('#pressure').text(pressure + " mb");
  $('#visibility').text(visibility + " mi");
  $('#windSpeed').text(windSpeed + " mph");
  $('#windDir').html(windDir + '&deg;');
  $('#uvIndex').text(uvIndex);

  function show_image(src) {
          myChildNode = document.getElementById('addimage');
          // mydiv = document.getElementById('addimage');

          var img = document.createElement("img");
          while ( myChildNode.firstChild ) myChildNode.removeChild( myChildNode.firstChild );
          // myChildNode.parentNode.removeChild(myChildNode);
          img.src = src;
          myChildNode.appendChild(img);
        }

        if(wxDesc == "Partly Cloudy"){
          show_image("images/partlycloudy.png");
        }
        console.log(wxDesc);
        if(wxDesc == "Cloudy"){
          show_image("images/cloudy.png");
        }

        if(wxDesc == "Sunny"){
          show_image("images/sunny.png");
        }

  }
)}; //End of function getData

var fetchData = function(jam){
  $.getJSON(jam, function(json){
    //console.log(json);
    $('#lowTemp').text(json.data.weather[0].mintempF);
    $('#highTemp').text(json.data.weather[0].maxtempF);
    $('#currentTemp').text(json.data.current_condition[0].temp_F);
  }
)};
$('#submit').on('click',updateTable1);

//Put focus in zipcode textbox when page loads
$("#zip").focus();

//Caching World Weather Online link
var baseUrl = "http://api.worldweatheronline.com/free/v2/weather.ashx?key=b5c474f461014299017e2c088f017&q=";

//On click, concatenate zipcode to baseUrl and envoke getData()
$("#fansbutton").on('click', function() {
  getdirections();
  return false;
});
$("#submit").on("click", function() {
  var stopText = $('#zip').val();
  var numDays = "&num_of_days=2&tp=3&format=json";
  var theUrl = baseUrl + stopText + numDays;
  getData(theUrl);
  getWeatherImage();

//Clear textbox and put focus back in
$("#zip").val("").focus();
});

// Commit last entered zipcode to local storage.
var zip = document.getElementById('zip');
zip.value = localStorage.getItem('zip');
zip.addEventListener('input', function() {
  localStorage.setItem('zip', zip.value);
}, false);
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBwAkQcQYM-sXsBY9L4Fe1EsVVGPEHAY_U",
    authDomain: "bierhere-27b59.firebaseapp.com",
    databaseURL: "https://bierhere-27b59.firebaseio.com",
    projectId: "bierhere-27b59",
    storageBucket: "bierhere-27b59.appspot.com",
    messagingSenderId: "220571997378"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
$("#add-search").on("click", function() {
      // Don't refresh the page!
    event.preventDefault();
    var zip = $("#zip-input").val().trim();
    var city = $("#city-input").val().trim();

    
    database.ref().push({
      zip: zip,
      city: city

      //dataAdded: firebase.database.ServerValue.TIMESTAMP
    })

  });
var locLat = 41.34;
var locLng = -80.12;

function initMap() {
// Create a map object and specify the DOM element for display.
//the Latitude and longitude for myCenter should be coppresponding to the zip code used entered
    var mapBier = document.getElementById("map");
 	var mapOptions = {
    center: new google.maps.LatLng(locLat, locLng),
    zoom: 7,
    panControl: true,
    zoomControl: true,
    mapTypeControl: true,
    scaleControl: true,
    streetViewControl: true,
    overviewMapControl: true,
    rotateControl: true   
  };
  var marker = new google.maps.Marker({position:mapOptions.center});
  var map = new google.maps.Map(mapBier, mapOptions);
  marker.setMap(map);
  google.maps.event.addListener(map, 'click', function(event) {
    placeMarker(map, event.latLng);
  });
}

function placeMarker(map, location) {
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
  var infowindow = new google.maps.InfoWindow({
    content: 'Latitude: ' + location.lat() + '<br>Longitude: ' + location.lng()
  });
  infowindow.open(map,marker);
}

 
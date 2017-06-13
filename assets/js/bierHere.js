

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

var locArray = [];
locArray.push([41.34, -80.12]);
locArray.push([41.0, -81.2]);
console.log(locArray);
console.log(locArray[0][0]);
console.log(locArray[0][1]);
console.log(locArray[1][0]);
console.log(locArray[1][1]);

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




// gets a list of all breweries in a given city
// ex. findByCity('New York', 'New York')
// Abbreviated state name sometimes works, but not always so avoid it.
// ex. findByCity('New York', 'NY') -> no
// ex findByCity('Kansas City', 'MO') -> yes
var findByCity = queryAPIBy.bind(undefined, 'city')


// gets a list of all breweries in a given zipcode
// ex. findByZipcode(64108)
var findByZipcode = queryAPIBy.bind(undefined, 'zip')

// please don't use this directly!!!
function queryAPIBy(type, options) {
  var url = '/locations/?key=ef6233841a88d451b69d43089bd4b81a'

  // if queried by  zipcode, we get the second thing from the
  // argument array (type is the first) and set params specifically for
  // that params is used later in the axios get request
  if (type === 'zip') {
    var zipcode = arguments[1]
    var params = {
      postalCode: zipcode
    }
  }

  // if queried by city, we get the second and third thing from the
  // argument array (type is the first),
  if (type === 'city') {
    var city = arguments[1]
    var state = arguments[2]
    var params = {
      locality: city,
      region: state
    }
  }

  var locations = []
  axios.get(url, {
    // we use cors-anywhere here to get around same origin restriction that
    // breweryDB has on their API
    baseURL: 'https://cors-anywhere.herokuapp.com/http://api.brewerydb.com/v2',
    params : params
  })
    .then(function (res) {
      var data = res.data.data
      data.forEach(function (brewery) {
        locations.push({
          name: brewery.brewery.name,
          lat: brewery.latitude,
          lon: brewery.longitude
        })
      })
    })
  return locations
}




 

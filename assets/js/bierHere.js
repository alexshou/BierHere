

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
    var state = $("#state-input").val().trim();
    
    database.ref().push({
      zip: zip,
      city: city,
      state: state

      //dataAdded: firebase.database.ServerValue.TIMESTAMP
    })

  });
var locLat = 41.34;
var locLng = -80.12;

var locArray = [];
locArray.push([41.34, -80.12]);
locArray.push([41.0, -81.2]);
console.log(locArray);
//console.log(locArray[0][0]);
//console.log(locArray[0][1]);
//console.log(locArray[1][0]);
//console.log(locArray[1][1]);

// var locs = findByZipcode(44113);

//console.log(locs[0].lat);
//console.log(locs[0].lon);
//console.log(locs[0].name);
// gets a list of all breweries in a given zipcode

// Multiple Markers, need to be replaced by API results from breweryDB
var markers = [
  ['Nano Brew Cleveland', 41.4860133, -81.7046873],
  ['Great Lakes Brewing Company', 41.484446, -81.704436]

 // ['Nano Brew Cleveland', locs[0].lat, locs[0].lon],
 // ['Great Lakes Brewing Company', locs[1].lat, locs[1].lon]
];

console.log(markers);

function initMap() {


    var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'roadmap'
    };
                    
    // Display a map on the page
    map = new google.maps.Map(document.getElementById("map"), mapOptions);
    map.setTilt(45);
        
                        
    // Info Window Content
    var infoWindowContent = [
        ['<div class="info_content">' +
        '<h3>Nano Brew Cleveland</h3>' +
        '<p> You like it! </p>' + '</div>'],
        ['<div class="info_content">' +
        '<h3>Great Lakes Brewing Company</h3>' +
        '<p>The No.1 beer in Ohio</p>' + '</div>']
    ];
        
    // Display multiple markers on a map
    var infoWindow = new google.maps.InfoWindow(), marker, i;
    
    // Loop through our array of markers & place each one on the map  
    for( i = 0; i < markers.length; i++ ) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0]
        });
        
        // Allow each marker to have an info window    
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(map, marker);
            }
        })(marker, i));

        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
    }


//  google.maps.event.addListener(map, 'click', function(event) {
//    placeMarker(map, event.latLng);
//  });

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


//console.log(locs);
//console.log("locs.length: " + locs.length);


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

// Get beers from a brewery
// usage example:
// getBeerFromBrewery('Unibroue', function (beers) {
//   console.log(beers)
// })
function getBeerFromBrewery(brewery, callback) {
  var url = '/search/?key=ef6233841a88d451b69d43089bd4b81a'

  var params = {
    q: brewery,
    type: 'beer'
  }

  var beers = []

  axios.get(url, {
    // we use cors-anywhere here to get around same origin restriction that
    // breweryDB has on their API
    baseURL: 'https://cors-anywhere.herokuapp.com/http://api.brewerydb.com/v2',
    params : params
  })
    .then(function (res) {
      var beerData = res.data.data
      beerData.forEach(collectBeers)
      callback(beers)
    })

  function collectBeers(beer) {
    beers.push({
      name: beer.name
    })
  }

}

// Query by city: queryAPIBy({city: 'akron', state: 'ohio'}, callbackFunc)
// query by zipcode: queryAPIBy({zip: '44113'}, callbackFunc)
function queryAPIBy(options, callback) {
  var url = '/locations/?key=ef6233841a88d451b69d43089bd4b81a'
  var defaults = {
    zip: null,
    city: null,
    state: null,
  }

  var options = Object.assign(defaults, options)

  if (options.zip) {
    var params = {
      postalCode: options.zip
    }
  }

  if (options.city && options.state) {
    var params = {
      locality: options.city,
      region: options.state
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
      data.forEach(collectLocations)
      callback(locations)
    })

  function collectLocations (brewery) {
    locations.push({
      name: brewery.brewery.name,
      description : brewery.brewery.description,
      lat: brewery.latitude,
      lon: brewery.longitude,
    })
  }

}


// Should be used like this: queryAPIBy({zip: 44113} , plotlocations)
function initMap(locations) {
  // do map plotting here
  // will run after the api call finishes
    var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'roadmap'
    };

    // Display a map on the page
    map = new google.maps.Map(document.getElementById("map"), mapOptions);
    map.setTilt(45);

    // Display multiple markers on a map
    var infoWindow = new google.maps.InfoWindow(), marker, i;
    var infoWindowContent = [];

    // Loop through our array of markers & place each one on the map
    for( i = 0; i < locations.length; i++ ) {

        infoWindowContent.push(
        '<div class="info_content">' +
        '<h3>' + locations[i].name + '</h3>' +
        '<p>' + locations[i].description + '</p>' + '</div>');

        var position = new google.maps.LatLng(locations[i].lat, locations[i].lon);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: locations[i].name
        });

        // Allow each marker to have an info window
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
               // infoWindow.setContent(infoWindowContent[i][0]);
               infoWindow.setContent(infoWindowContent[i]);
               infoWindow.open(map, marker);
            }
        })(marker, i));

        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
    }

    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
        this.setZoom(14);
        google.maps.event.removeListener(boundsListener);
    });
}

queryAPIBy({zip: 44113} , initMap);

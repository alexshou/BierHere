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
      beerData.forEach(function (beer) {
        beers.push({
          name: beer.name
        })
      })
      callback(beers)
    })
}

// Query by city: queryAPIBy({city: 'akron', state: 'ohio'})
// query by zipcode: queryAPIBy({zip: '44113'})
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
      data.forEach(function (brewery) {
        locations.push({
          name: brewery.brewery.name,
          description : brewery.brewery.description,
          lat: brewery.latitude,
          lon: brewery.longitude,
        })
      })
      callback(locations)
    })
}

// Should be used like this: queryAPIBy({zip: 44113} , plotLocations)
function plotLocations(locations) {
  // do map plotting here
  // will run after the api call finishes
  console.log(locations)
}

function initMap() {
  // Create a map object and specify the DOM element for display.
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 41.397, lng: 81.644},
    scrollwheel: false,
    zoom: 8
  });
}

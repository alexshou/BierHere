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

function initMap() {
  // Create a map object and specify the DOM element for display.
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 41.397, lng: 81.644},
    scrollwheel: false,
    zoom: 8
  });
}

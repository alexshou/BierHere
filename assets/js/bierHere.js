// gets a list of all breweries in a given zipcode
function findByZipcode(zipcode) {
  var url = '/locations/?key=ef6233841a88d451b69d43089bd4b81a'
  axios.get(url, {
    baseURL: 'http://api.brewerydb.com/v2/',
    params : {
      postalCode: zipcode
    }
  })
    .then(function (res) {
      var data = res.data.data
      data.forEach(function (brewery) {
        console.log(brewery)
      })
    })
}

// gets a lost of all breweries based on the pased in city and state
function findByCity(city, state) {
  var url = '/locations/?key=ef6233841a88d451b69d43089bd4b81a'
  axios.get(url, {
    baseURL: 'http://api.brewerydb.com/v2/',
    params : {
      locality: city,
      region: state
    }
  })
    .then(function (res) {
      var data = res.data.data
      data.forEach(function (brewery) {
        console.log(brewery)
      })
    })
}

function initMap() {
  // Create a map object and specify the DOM element for display.
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 41.397, lng: 81.644},
    scrollwheel: false,
    zoom: 8
  });
}

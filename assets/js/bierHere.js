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

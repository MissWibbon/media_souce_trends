// "voting_data" : {2008 : {Clinton, Hillary: [democrat, vote_count],Trump, Donald: [republican, vote_count]}
// "election_data" : {2008 : [50,50]}
// Creating Map
var myMap = L.map("map", {
  center: [37.8, -96],
  zoom: 4
});

// Adding a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// Adding state outlines to maps

var statesOutlineWithVotes = "../static/js/voting_methods.geojson"

// Grabbing our GeoJSON data..
d3.json(statesOutlineWithVotes).then(function(votingData) {

  votingData.features.forEach(function(data) {
      var region = data.properties.NAME;
      var inPerson = data.properties.voting_data.voted_in_person;
      var byMail = data.properties.voting_data.voted_by_mail;
      console.log(region, inPerson, byMail)
      //var vote_count = data.properties.voting_data ? data.properties.voting_data[YEAR] : "0";
  });


  function getColor(state) {
      var color = "purple";
      var winner = topCandidate[state];

      switch (true) {
          case winner[2] = "By Mail":
              color = "blue";
              break;
          case winner[2] = "In Person":
              color = "red";
              break;
      };
      return color;
  }

  L.geoJson(votingData, {
    style: function(feature) {
      return {
        color: "white",
        fillColor: getColor(feature.properties.NAME),
        fillOpacity: 0.7,
        weight: 1.5
      };
    },

  // Called on each feature
  onEachFeature: function(feature, layer) {
    // Set mouse events to change map styling
    layer.on({
      // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
      mouseover: function(event) {
        layer = event.target;
        layer.setStyle({
          fillOpacity: 1.0
        });
      },
      // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
      mouseout: function(event) {
        layer = event.target;
        layer.setStyle({
          fillOpacity: 0.7
        });
      },
    });
    // Giving each feature a pop-up with information pertinent to it
    layer.bindPopup("<h1>hi</h1>")
  //   (`<h1>${feature.properties.NAME}</h1> <hr> <h3>CNN Searches: ${feature.properties.election_data ? parseFloat(feature.properties.election_data[YEAR][0]) : "Unknown"}%</h3> <h3>Fox Searches: ${feature.properties.election_data ? parseFloat(feature.properties.election_data[YEAR][1]) : "Unknown"}%</h3>`);

  }
}).addTo(myMap);
});

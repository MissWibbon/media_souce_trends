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

var statesOutlineWithElection = "../static/js/statesOutlineWithElection.geojson"
var YEAR = "2020"
bluePct = {}

// Grabbing our GeoJSON data..

d3.json(statesOutlineWithElection).then(function(electionData) {

  electionData.features.forEach(function(data) {
      var region = data.properties.NAME;
      //console.log(region);
      var pct = parseFloat(data.properties.election_data ? data.properties.election_data[YEAR][0] : 50);
      bluePct[region] = pct;
  });


  function getColor(state) {
      var color = "purple";
      var pct = bluePct[state];

      switch (true) {
          case pct > 50:
              color = "blue";
              break;
          case pct < 50:
              color = "red";
              break;
      };
      return color;
  }

  L.geoJson(electionData, {
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
    layer.bindPopup(`<h3>${feature.properties.NAME}</h3> <hr> <p>CNN Searches: <strong style="color: blue;">${parseFloat(feature.properties.election_data[YEAR][0])}%</strong></p><p>Fox Searches: <strong style="color: red;">${parseFloat(feature.properties.election_data[YEAR][1])}%</strong></p>`);


  }
}).addTo(myMap);
});
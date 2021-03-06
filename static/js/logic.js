

var YEAR = 2020;

function updateYear() {
    $('#year-selected').on('click', function() {
            YEAR = $('#year option:selected').text()
            $('.year-label')[0].innerText = YEAR

    d3.json(statesOutlineWithElection).then(function(electionData) {
        console.log(electionData)
        electionData.features.forEach(function(data) {
            var region = data.properties.NAME;
            //console.log(region);
            var pct = parseFloat(data.properties.election_data ? data.properties.election_data[YEAR][0] : 50);
            bluePct[region] = pct;
        });
      
      
        function getColor(state) {
            var color = "transparent"
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
          console.log(feature.properties)
          // Giving each feature a pop-up with information pertinent to it
          layer.bindPopup(`<h3>${feature.properties.NAME}</h3> <hr> <p>CNN Searches: <strong style="color: blue;">${parseFloat(feature.properties.election_data[YEAR][0])}%</strong></p><p>Fox Searches: <strong style="color: red;">${parseFloat(feature.properties.election_data[YEAR][1])}%</strong></p>`);
      
      
        }
      }).addTo(myMap);
      layer.remove()
      });
    })
}
updateYear()

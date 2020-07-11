
d3.csv("../Resources/cnn_fox-trends.csv").then(function(trends) {
    console.log(trends)
})


var year = 2020;

function updateYear() {
    $('#year-selected').on('click', function() {
            year = $('#year option:selected').text()
            console.log(year)
            $('.year-label')[0].innerText = year

    d3.json(statesOutlineWithElection).then(function(electionData) {

        electionData.features.forEach(function(data) {
            var region = data.properties.NAME;
            //console.log(region);
            var pct = parseFloat(data.properties.election_data ? data.properties.election_data[year][0] : 50);
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
          console.log(feature)
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
          layer.bindPopup(`<h3>${feature.properties.NAME}</h3> <hr> <p>CNN Searches:%</p><p>Fox Searches:%</p>`);
      
      
        }
      }).addTo(myMap);
      });
    })
}
updateYear()

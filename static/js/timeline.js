var TITLE = 'CNN and FOX interest over time'
var X_AXIS = 'Year'  // x-axis label
var Y_AXIS = 'Percentage' // y-axis label 
var BEGIN_AT_ZERO = false;  
var SHOW_GRID = true;
var SHOW_LEGEND = true; 
$(document).ready(function() {
  // Read data file and create a chart
  $.get('../Resources/Timeline.csv', function(csvString) {
    var data = Papa.parse(csvString).data
    var timeLabels = data.slice(1).map(function(row) { return row[0]; })
    var datasets = []
    for (var i = 1; i < data[0].length; i++) {
      datasets.push(
        {
          label: data[0][i], 
          data: data.slice(1).map(function(row) {return row[i]}), 
          fill: false,
          borderColor: "#1E90FF",       
          backgroundColor: "#1E90FF",
          pointBackgroundColor: "#CD5C5C",
          pointBorderColor: "#F5F5DC",
          pointHoverBackgroundColor: "#8A2BE2",
          pointHoverBorderColor: "#6495ED",
          pointRadius: 2
        }
      )
    }
    // Get container for the chart
    var ctx = document.getElementById('chart-container').getContext('2d')
 new Chart(ctx, {
      type: 'line',
      data: {
        labels: timeLabels,
        datasets: datasets,
      },
      options: {
        plugins: {
          colorschemes: {
            scheme: 'brewer.RdBu4'
          }
        },
        title: {
          display: true,
          text: TITLE,
          fontSize: 14,
        },
        legend: {
          display: SHOW_LEGEND,
        },
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            scaleLabel: {
              display: X_AXIS !== '',
              labelString: X_AXIS
            },
            gridLines: {
              display: SHOW_GRID,
            },
            ticks: {
              callback: function(value, index, values) {
                return value.toLocaleString();
              }
            }
          }],
          yAxes: [{
            beginAtZero: true,
            scaleLabel: {
              display: Y_AXIS !== '',
              labelString: Y_AXIS
            },
            gridLines: {
              display: SHOW_GRID,
            },
            ticks: {
              beginAtZero: BEGIN_AT_ZERO,
              callback: function(value, index, values) {
                return value.toLocaleString()
              }
            }
          }]
        },
        // Tooltips
        tooltips: {
          displayColors: true,
          callbacks: {
            label: function(tooltipItem, all) {
              return all.datasets[tooltipItem.datasetIndex].label
                + ': ' + tooltipItem.yLabel.toLocaleString();
            }
          }
        },
      }
    })
  })
})
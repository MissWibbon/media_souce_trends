var year = 2020;

function updateYear() {
    $('#year-selected').on('click', function() {
            year = $('#year option:selected').text()
            console.log(year)
            $('.year-label')[0].innerText = year
    })
}
updateYear()
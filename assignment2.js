const URL = "https://in.bookmyshow.com/serv/getData?cmd=GETTRAILERS&mtype=cs";
let movieData;
let movieList = "";
$(document).ready(function () {
    $.get(URL, function (data, status) {
        movieData = JSON.parse(data)[1];
        // console.log(movieData);
        for (let property in movieData) {
            if (movieData.hasOwnProperty(property)) {
                // console.log(movieData[property]);
                movieList += `
                <div class="movie-box">
                <div class="movie-image">
                <img src="https://in.bmscdn.com/events/moviecard/${movieData[property]["EventCode"]}.jpg" alt="${movieData[property]["EventTitle"]}" height="200" width="160"></img>
                <div class="centered"><i class="fa fa-play-circle-o"></i></div>
                </div>
                <div class="movie-name">${movieData[property]["EventName"]}</div>
                </div>`
            }
        }
        // console.log(movieList);
        $('#bms-list-body').append(movieList);
    });
});
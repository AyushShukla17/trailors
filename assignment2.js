const URL = "https://in.bookmyshow.com/serv/getData?cmd=GETTRAILERS&mtype=cs";
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
let movieData;
let movieList = "";
$(document).ready(function () {
    $.get(URL, function (data, status) {
        movieData = JSON.parse(data)[1];
        for (let property in movieData) {
            if (movieData.hasOwnProperty(property)) {
                let releaseDate = new Date(movieData[property]['DispReleaseDate']); 
                movieList += `<li class="card-container" code="${movieData[property]['EventCode']}">
                <div class="image-container">
                <img src="https://in.bmscdn.com/events/moviecard/${movieData[property]["EventCode"]}.jpg" alt="${movieData[property]["EventTitle"]}" width="100%"></img>
                <i class="fa fa-play-circle-o" aria-hidden="true"></i>
                <i class="fa fa-thumbs-up" aria-hidden="true"><strong>${movieData[property]['wtsPerc']} %</strong></i>
                <div class="votes-container">${movieData[property]['wtsCount']} votes
                </div>
                <div class="release-date"> ${releaseDate.getDate()}
                <div>${monthNames[releaseDate.getMonth()]}
                </div>
                </div>                
                </div>
                <div class="movieName">${movieData[property]['EventName']}</div>
                </li>`
            }
        }
        $('#bms-list-body').append(movieList);
    });

    $('body').on('click','.card-container',function(){
        const EVENTCODE = $(this).attr('code');
        const SELECTEDMOVIE = movieData[EVENTCODE]; 
        const TRAILORURL = SELECTEDMOVIE['TrailerURL'].replace("https://www.youtube.com/watch?v=","https://www.youtube.com/embed/") + "?autoplay=1";
        const TOPPOSITION = ($(this).position().top) - 320; 
        let dateReleased = new Date(SELECTEDMOVIE['DispReleaseDate']);
        let eventType = SELECTEDMOVIE['EventGenre'].split('|');
        let str = "";
        eventType.map( type=>{
            str+= `<div class="event-type">${type}</div>`
        } )
        $( "#player-container" ).remove();
        $(this).before( `<div id="player-container">
        <div class="bms-player">
            <iframe height="400" width="100%"
              src="${TRAILORURL}">
            </iframe>
        </div>
        <div class="bms-movie-detail">
        <h3>${SELECTEDMOVIE['EventName']}</h3>
        <div>${SELECTEDMOVIE['EventLanguage']}</div>
        <div class="event-genere">${str}</div>
        <div class="release-date-container">
        <div class="relaese-date-item">
        <div class="icon-container">
        <i class="fa fa-thumbs-up" aria-hidden="true"></i>        
        </div>
        <div class="icon-details-container">${SELECTEDMOVIE['wtsPerc']}
        <div>${SELECTEDMOVIE['wtsCount']}Votes</div>
        </div>
        </div>
        <div class="relaese-date-item">
        <div class="icon-container">
        <i class="fa fa-calendar" aria-hidden="true"></i>
        </div>
        <div class="icon-details-container">
         ${dateReleased.getDate()},${monthNames[dateReleased.getMonth()]}
        <div>${dateReleased.getFullYear()}</div>   
        </div>
        </div>
        </div>
        <div class="details-footer-container">
        <div class="details-footer-items">
        <i class="fa fa-thumbs-up" aria-hidden="true"></i>
        <div class="viewers-votes-yes">WILL WATCH</div>
        <div class="viewers-votes-yes">(${SELECTEDMOVIE['csCount']})</div>
        </div>
        <div class="details-footer-items">
        <i class="fa fa-question-circle-o" aria-hidden="true"></i>
        <div class="viewers-votes-maybe">MAYBE</div>
        <div class="viewers-votes-maybe">(${SELECTEDMOVIE['maybeCount']})</div>
        </div>
        <div class="details-footer-items">
        <i class="fa fa-thumbs-down" aria-hidden="true"></i>
        <div class="viewers-votes-no">WON'T WATCH</div>
        <div class="viewers-votes-no">(${SELECTEDMOVIE['dwtsCount']})</div>
        </div>
        </div>
        <div>` );
        $('#player-container').position({top:TOPPOSITION,left:50})
    })
});

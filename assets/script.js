var search = document.querySelector("form");
var movieInfo = document.getElementById("movie-info");
var giphyImage = document.getElementById("giphy-image");
var searchHistory = document.getElementById("search-history");
var movieTitle = movieInfo.children[0];
var movieSummary = movieInfo.children[1];
var clearHistory = document.getElementById("clear-history");
/* We should actually make one more div in the html here as a parent to the search history buttons
We should call that in the index.html file: 
<div id="history-container"></div>
Then the variable to select it will be: 
var historyContainer = document.getElementById("history-container");
*/

var requestGiphyUrl =
  "https://api.giphy.com/v1/gifs/search?api_key=ggIqSnV3EyhXc41xShTfcOFcFk9uJlqx&q=";
//the "&t=" is the IMDB parameter, with "tt3896198" being entered in, this searchs IMDB's movie database
//var requestMovieUrl = "http://www.omdbapi.com/?&apikey=347dfc0d&i=tt3896198";
//uncomment the below requestMovieUrl to use with your own search parameters
var requestMovieUrl = "http://www.omdbapi.com/?&apikey=347dfc0d&t=";

//user search parameters, uncomment these as you wish
var userInput = document.querySelector("#movieInput");
var searchBtn = document.querySelector("#searchMovieBtn");

function getMovieData() {
  let searchInput = userInput.value;
  //console.log(userInput.value);
  fetch(requestGiphyUrl + searchInput)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
  fetch(requestMovieUrl + searchInput)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

//this fetch is for the Giphy API
searchBtn.addEventListener("click", getMovieData);

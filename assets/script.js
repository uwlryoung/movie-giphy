//TODO: add variables needed (api-key, selectors for each section). We should either use all jquery or all vanilla javascript (I think maybe vanilla is best for our project)
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

var giphyAPIKey = "ggIqSnV3EyhXc41xShTfcOFcFk9uJlqx";
var omdbAPIKey = "347dfc0d&i=tt3896198";



var requestGiphyUrl =
  "https://api.giphy.com/v1/gifs/search?q=test&api_key=ggIqSnV3EyhXc41xShTfcOFcFk9uJlqx";
//the "&i=" is the IMDB parameter, with "tt3896198" being entered in, this searchs IMDB's movie database
var requestMovieUrl = "http://www.omdbapi.com/?&apikey=347dfc0d&i=tt3896198";
//uncomment the below requestMovieUrl to use with your own search parameters
//var requestMovieUrl = "http://www.omdbapi.com/?&apikey=347dfc0d&i=";

//user search parameters, uncomment these as you wish
//var userGiphyInput = "";
//var userMovieInput = "";

//this fetch is for the Giphy API
fetch(requestGiphyUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });

//this fetch is for the OMDb API
fetch(requestMovieUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });

//TODO: Add an eventListener for the "submit" form to get the search paramaters. Should call other functions. Will call both the OMBD function and GIPHY function simultaneously

//TODO: Function to fetch the movie data from OMBD

//TODO: Function to fetch the giphy data from GIPHY

//TODO: Function to store the local data (just movie names) onto localStorage. This should call the "render buttons" at the end of the function

//TODO: Function to render the search history buttons

//TODO: Function to reset the search history

function appendMovieInfo(title, plot) {
  movieTitle.textContent = title;
  movieSummary.textContent = plot;
}

function appendGIF(gif1, gif2, gif3, gif4){
  var giphy1 = document.createElement("img");
  giphy1.setAttribute(src = gif1);
  giphyImage.appendChild(giphy1);

  var giphy2 = document.createElement("img");
  giphy2.setAttribute(src = gif2);
  giphyImage.appendChild(giphy2);

  var giphy3 = document.createElement("img");
  giphy3.setAttribute(src = gif3);
  giphyImage.appendChild(giphy3);

  var giphy4 = document.createElement("img");
  giphy4.setAttribute(src = gif4);
  giphyImage.appendChild(giphy4);
}
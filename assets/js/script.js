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
var omdbAPIKey = "347dfc0d";

var requestGiphyUrl =
  "https://api.giphy.com/v1/gifs/search?api_key=" + giphyAPIKey + "&q=";
//the "&t=" is the IMDB parameter, with "tt3896198" being entered in, this searchs IMDB's movie database
//var requestMovieUrl = "http://www.omdbapi.com/?&apikey=347dfc0d&i=tt3896198";
//uncomment the below requestMovieUrl to use with your own search parameters
var requestMovieUrl = "http://www.omdbapi.com/?plot=full&apikey=" + omdbAPIKey + "&t=";

//user search parameters, uncomment these as you wish
var userInput = document.querySelector("#movieInput");
var searchBtn = document.querySelector("#searchMovieBtn");

function getMovieData(event) {
  event.preventDefault();

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

    appendMovieInfo(data.Title, data.Plot);
    appendGIF(data.data[0].embed_url, data.data[1].embed_url, data.data[2].embed_url, data.data[3].embed_url)

    userInput.value="";
}

//this fetch is for the Giphy API
searchBtn.addEventListener("click", getMovieData);
//var userGiphyInput = "";
//var userMovieInput = "";
var savedMovieNames = [];

//TODO: Add an eventListener for the "submit" form to get the search paramaters. Should call other functions. Will call both the OMBD function and GIPHY function simultaneously

//TODO: Function to fetch the movie data from OMBD

//TODO: Function to fetch the giphy data from GIPHY

//TODO: Function to store the local data (just movie names) onto localStorage. This should call the "render buttons" at the end of the function

//TODO: Function to render the search history buttons

function searchHistoryList(movieName) {
  // creates search entry with movie name
  var searchHistoryEntry = $("<p>");
  searchHistoryEntry.addClass("movie-list");
  searchHistoryEntry.text(movieName);

  // creates a container to hold search entry
  var entryStorageContainer = $("<div>");
  entryStorageContainer.addClass("previous-search-container");

  // appends search entry to previous search container
  entryStorageContainer.append(searchHistoryEntry);

  // append entry container to search history container
  var searchHistoryEl = $("#search-history-container");
  searchHistoryEl.append(searchEntryContainer);

  if (savedMovieNames.length > 0) {
    // update savedSearches array with previously saved searches
    var previousSavedMovieNames = localStorage.getItem("savedMovieNames");
    savedMovieNames = JSON.parse(previousSavedMovieNames);
  }
  // this add movie name to array of saved movie-names
  savedMovieNames.push(movieName);
  localStorage.setItem("savedMovieName", JSON.stringify(savedMovieNames));
}

// resets search entry input
$("#search-input").val("");

//TODO: Function to reset the search history
//TODO: Function to reset the search history

function appendMovieInfo(title, plot) {
  movieTitle.textContent = title;
  movieSummary.textContent = plot;
}

function appendGIF(gif1, gif2, gif3, gif4) {
  var giphy1 = document.createElement("img");
  giphy1.setAttribute((src = gif1));
  giphyImage.appendChild(giphy1);

  var giphy2 = document.createElement("img");
  giphy2.setAttribute((src = gif2));
  giphyImage.appendChild(giphy2);

  var giphy3 = document.createElement("img");
  giphy3.setAttribute((src = gif3));
  giphyImage.appendChild(giphy3);

  var giphy4 = document.createElement("img");
  giphy4.setAttribute((src = gif4));
  giphyImage.appendChild(giphy4);
}
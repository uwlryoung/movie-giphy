//TODO: add variables needed (api-key, selectors for each section). We should either use all jquery or all vanilla javascript (I think maybe vanilla is best for our project)
var requestGiphyUrl =
  "https://api.giphy.com/v1/gifs/search?q=test&api_key=ggIqSnV3EyhXc41xShTfcOFcFk9uJlqx";
//the "&i=" is the IMDB parameter, with "tt3896198" being entered in, this searchs IMDB's movie database
var requestMovieUrl = "http://www.omdbapi.com/?&apikey=347dfc0d&i=tt3896198";
//uncomment the below requestMovieUrl to use with your own search parameters
//var requestMovieUrl = "http://www.omdbapi.com/?&apikey=347dfc0d&i=";

//user search parameters, uncomment these as you wish
//var userGiphyInput = "";
//var userMovieInput = "";
var savedMovieNames = [];
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

function searchHistoryList (movieName){
    

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

    if (savedMovieNames.length > 0){
        // update savedSearches array with previously saved searches
        var previousSavedMovieNames = localStorage.getItem("savedMovieNames");
        savedMovieNames = JSON.parse(previousSavedMovieNames);
}
// this adds movie name to array of saved movie-names
savedMovieNames.push(movieName);
localStorage.setItem("savedMovieName", JSON.stringify(savedMovieNames));

// resets search entry input
$("#search-input").val("");

//TODO: Function to reset the search history
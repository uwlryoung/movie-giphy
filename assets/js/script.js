//TODO: add variables needed (api-key, selectors for each section). We should either use all jquery or all vanilla javascript (I think maybe vanilla is best for our project)
var search = document.querySelector("form");
var movieInfo = document.getElementById("movie-info");
var giphyImage = document.getElementById("giphy-image");
var giphyImage2 = document.getElementById("giphy-image2");
var actorImage = document.getElementById("actor-giphy");
var searchHistory = document.getElementById("search-history");
var movieTitle = movieInfo.children[0];
var movieSummary = movieInfo.children[1];
var clearHistory = document.getElementById("clear-history");
var error = document.createElement("h2");
var searchHistoryEl = $("#search-history-container");

// Issue with the cookies and an attribute called "SameSite"
// document.cookie = "name=giphy; SameSite=None; Secure";

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
var requestMovieUrl =
  "https://www.omdbapi.com/?plot=full&apikey=" + omdbAPIKey + "&t=";

var userInput = document.querySelector("#movieInput");
var searchBtn = document.querySelector("#searchMovieBtn");

function getMovieData(event) {
  event.preventDefault();

  giphyImage.replaceChildren();
  giphyImage2.replaceChildren();
  actorImage.replaceChildren();
  movieTitle.innerHTML = "";
  movieSummary.innerHTML = "";

  let searchInput = userInput.value;

  fetch(requestMovieUrl + searchInput)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.Response === "False") {
        error = "Movie Title Not Found! Please Enter a Valid Movie Title.";
        movieTitle.innerHTML = error;
        return;
      } else {
        fetch(requestGiphyUrl + searchInput)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            console.log(data);
            appendGIF(
              data.data[0].embed_url,
              data.data[1].embed_url,
              data.data[2].embed_url,
              data.data[3].embed_url,
              data.data[4].embed_url,
              data.data[5].embed_url
            );
          });

        console.log(data);
        appendMovieInfo(data.Title, data.Plot);
        appendActorGIF(data.Actors);
      }
    });

  userInput.value = "";
}

searchBtn.addEventListener("click", getMovieData);

var savedMovieNames = [];

//TODO: Fix the samesite issues with cookies

//TODO: Function to store the local data (just movie names) onto localStorage. This should call the "render buttons" at the end of the function

//TODO: Function to render the search history buttons

function searchHistoryList(userInput) {
  // creates search entry with movie name
  var searchHistoryEntry = $("<p>");
  searchHistoryEntry.addClass("movie-list");
  searchHistoryEntry.text(userInput);

  // creates a container to hold search entry
  var entryStorageContainer = $("<div>");
  entryStorageContainer.addClass("previous-search-container");

  // appends search entry to previous search container
  entryStorageContainer.append(searchHistoryEntry);

  // append entry container to search history container
  
  searchHistoryEl.append(searchEntryContainer);

  if (savedMovieNames.length > 0) {
    // update savedSearches array with previously saved searches
    var previousSavedMovieNames = localStorage.getItem("savedMovieNames");
    savedMovieNames = JSON.parse(previousSavedMovieNames);
  }
 // this adds movie name to array of saved movie-names
savedMovieNames.push(userInput);
localStorage.setItem("savedMovieName", JSON.stringify(savedMovieNames));


};

// this function renders the search history entries onto search histoory container (the html div that is dedicated to hold the search history)

function renderSearchHistory() {

// getting the saved mivie names from local storage and putting them into a variable 
  var savedSearchEntries = localStorage.getItem("savedMovieNames");
  console.log(savedSearchEntries);

if (!savedSearchEntries){
  return false;
}
// this turns the saved search entries content into and array that we'd need to print its elemets in the html
savedSearchEntries=JSON.parse("savedSearchEntries");

// loops through saved movie names array and prints the search entries
for (var i=0; i< savedSearchEntries.length; i++){
  searchHistoryList(savedSearchEntries[i]);
}
};



// resets search entry input
$("#search-input").val("");

//TODO: Function to reset the search history
//TODO: Function to reset the search history

function appendMovieInfo(title, plot) {
  movieTitle.textContent = title;
  movieSummary.textContent = plot;
  //TODO: Add the year of the movie to the title page - needs a new HTML element to be put in the html
}

function appendGIF(gif1, gif2, gif3, gif4, gif5, gif6) {
  var giphy1 = document.createElement("iframe");
  giphy1.setAttribute("src", gif1);
  //TODO: Fix the samesite cookie issue. Possible solutions:
  // giphy1.setAttribute("id", "cookie");
  // giphy1.setAttribute("set-cookie", "none secure")
  giphyImage.appendChild(giphy1);

  var giphy2 = document.createElement("iframe");
  giphy2.setAttribute("src", gif2);
  giphyImage.appendChild(giphy2);

  var giphy3 = document.createElement("iframe");
  giphy3.setAttribute("src", gif3);
  giphyImage.appendChild(giphy3);

  var giphy4 = document.createElement("iframe");
  giphy4.setAttribute("src", gif4);
  giphyImage2.appendChild(giphy4);

  var giphy5 = document.createElement("iframe");
  giphy5.setAttribute("src", gif5);
  giphyImage2.appendChild(giphy5);

  var giphy6 = document.createElement("iframe");
  giphy6.setAttribute("src", gif6);
  giphyImage2.appendChild(giphy6);
}

function appendActorGIF(actors) {
  console.log(actors);

  actorArray = actors.split(", ");

  for (i = 0; i < actorArray.length; i++) {
    console.log(actorArray[i]);

    fetch(requestGiphyUrl + actorArray[i])
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        var actor = document.createElement("iframe");
        actor.setAttribute("src", data.data[0].embed_url);
        actorImage.appendChild(actor);
        console.log(actorArray[i]);
      });
  }
}
renderSearchHistory();
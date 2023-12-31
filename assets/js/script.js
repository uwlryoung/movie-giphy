// all the global variables
var search = document.querySelector("form");
var movieInfo = document.getElementById("movie-info");
var giphyImage = document.getElementById("giphy-image");
var giphyImage2 = document.getElementById("giphy-image2");
var actorImage = document.getElementById("actor-giphy");
var movieTitle = movieInfo.children[0];
var movieYear = movieInfo.children[1];
var movieSummary = movieInfo.children[2];
var clearHistory = document.getElementById("clear-history");
var error = document.createElement("h2");
var searchHistoryEl = document.getElementById("search-history-container");
var giphyAPIKey = "ggIqSnV3EyhXc41xShTfcOFcFk9uJlqx";
var omdbAPIKey = "347dfc0d";
var requestGiphyUrl ="https://api.giphy.com/v1/gifs/search?api_key=" + giphyAPIKey + "&q=";
var requestMovieUrl ="https://www.omdbapi.com/?plot=full&apikey=" + omdbAPIKey + "&t=";
var userInput = document.querySelector("#movieInput");
var searchBtn = document.querySelector("#searchMovieBtn");

//event listners
searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  let searchInput = userInput.value;
  getMovieData(searchInput);
});

$(searchHistoryEl).on("click", "button", function () {
  var movie = $(this).attr("id");
  getMovieData(movie);
});

$(clearHistory).on("click", function () {
  localStorage.clear();
  $(searchHistoryEl).empty();
});
// getMovieData fetches movie data and giphy images based on the user's input. Then it appends the movie info .
function getMovieData(searchInput) {
  giphyImage.replaceChildren();
  giphyImage2.replaceChildren();
  actorImage.replaceChildren();
  movieTitle.innerHTML = "";
  movieSummary.innerHTML = "";
  movieYear.innerHTML = "";

  fetch(requestMovieUrl + searchInput)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
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
            appendGIF(
              data.data[0].embed_url,
              data.data[1].embed_url,
              data.data[2].embed_url,
              data.data[3].embed_url,
              data.data[4].embed_url,
              data.data[5].embed_url
            );
          });

        appendMovieInfo(data.Title, data.Plot, data.Year);
        appendActorGIF(data.Actors);
        saveMovie(data.Title);
      }
    });
  userInput.value = "";
}

//saveMovie function saves the movie title and inputs it into local storage
function saveMovie(title) {
  var movies = JSON.parse(localStorage.getItem("movies"));
  if (movies === null) {
    movies = [];
    movies.push(title);
  } else if (movies.indexOf(title) === -1) {
    movies.push(title);
  }
  localStorage.setItem("movies", JSON.stringify(movies));
  renderPastMovieButton();
}
// displays the searched movies buttons
function renderPastMovieButton() {
  let movieHistory = JSON.parse(localStorage.getItem("movies"));
  if (movieHistory === null) {
    return;
  }
  searchHistoryEl.innerHTML = "";

  movieHistory.forEach((element) => {
    let movieHistoryBtn = document.createElement("button");
    movieHistoryBtn.setAttribute("id", element);
    movieHistoryBtn.setAttribute("class", "button is-normal");
    movieHistoryBtn.textContent = element;
    searchHistoryEl.append(movieHistoryBtn);
  });
}
// Sets the movie Title and Summary on the page
function appendMovieInfo(title, plot, year) {
  movieTitle.innerHTML = title;
  movieSummary.textContent = plot;
  movieYear.textContent = "Year Released: " + year;
}
// diplays the movie name gifs
function appendGIF(gif1, gif2, gif3, gif4, gif5, gif6) {
  var movieGifs = document.createElement("h2");
  movieGifs.textContent = "Movie Gifs";
  giphyImage.appendChild(movieGifs);

  var giphy1 = document.createElement("iframe");
  giphy1.setAttribute("src", gif1);
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
// displays the movie actors gifs
function appendActorGIF(actors) {
  actorArray = actors.split(", ");
  var actorGifs = document.createElement("h2");
  actorGifs.textContent = "Actor Gifs";
  actorImage.appendChild(actorGifs);
  var actorName = document.createElement("p");
  actorName.setAttribute("id", "actor-names");
  actorName.textContent = "Searched Actors: " + actors;
  actorImage.appendChild(actorName);
  for (i = 0; i < actorArray.length; i++) {
    fetch(requestGiphyUrl + actorArray[i])
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var actor = document.createElement("iframe");
        actor.setAttribute("src", data.data[0].embed_url);
        actorImage.appendChild(actor);
      });
  }
}
renderPastMovieButton();

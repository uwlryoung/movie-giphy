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

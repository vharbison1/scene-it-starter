document.addEventListener('DOMContentLoaded', function() 
{   
    function renderMovies(movieArray)
    {
      //mapped to template string literals to generate movie bootstrap data into movie-container id
        var movieHTML = movieArray.map(function (currentMovie) {
            return `
            <div class="card" style="width: 18rem;" width="300" height="300">
            <div class="card-body">
              <img src="${currentMovie.Poster}" class="card-img-top" alt="..." height=300>
              <h5 class="card-title">${currentMovie.Title}</h5>
              <h6 class="card-subtitle mb-2 text-muted">${currentMovie.Year}</h6>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <button onClick="saveToWatchList('${currentMovie.imdbID}',this)" type="submit" class="btn btn-success watchlist">Save to Watchlist</button>
            </div>
          </div>
          `;
        }).join('');

        document.getElementById('movie-container').innerHTML = movieHTML;
    }


    document.getElementById('search-form').addEventListener('submit', function(e){ 
      e.preventDefault(); //Disables the default refresh and renders the movies AFTER user enters items in search bar.


      var searchString = document.getElementById('search-bar').value;
      //console.log(searchString);
      var urlEncodedSearchString = encodeURIComponent(searchString); //Sanitize the users string for non-allowed characters
      var url = "http://www.omdbapi.com/?apikey=3430a78&s=" + urlEncodedSearchString; //call to OMDB API
    
      getData(url);   
    });

    function getData(url)
    {
      axios.get(url)
      .then( function(response) {
        console.log(response);
          if(response.data.Response == "True") //Make sure the response is successful, then render the search results
          {
            renderMovies(response.data.Search);
            movieData = response.data.Search; //Movie Data is Global Variable, so is overriden with search results
          }
          else 
          {
            throw response.data.Error; //If response has results, but is an error, its thrown into catch block.
          }
      })
      .catch( function(error) {     
        console.log(error);
      });
    }
});


function saveToWatchList(imdbID,currentElement)
{
        var movie = movieData.find(function (currentMovie){
        return currentMovie.imdbID == imdbID; //returns the value of the FIRST element found that matches criteria.
        //in this case, it would be the first OBJECT element
      });

        var watchlistJSON = localStorage.getItem('watchlist');
        var watchlist = JSON.parse(watchlistJSON);

        if(watchlist == null)
        {
          watchlist = [];
        }

          watchlist.push(movie);
          watchlistJSON = JSON.stringify(watchlist);
          localStorage.setItem('watchlist', watchlistJSON);
          currentElement.setAttribute('onclick', 'removeOffWatchList("'+imdbID+'", this)');
          currentElement.innerHTML = "Remove From Watchlist";
}

//TODO FIND WATCHLIST ELEMENT IN LOCALSTORAGE AND DELETE IT
function removeOffWatchList(imdbID,currentElement)
{
  var watchlistJSON = localStorage.getItem('watchlist');
  var watchlist = JSON.parse(watchlistJSON);

  //var movie = watchlist.find(function (currentMovie){
    //return currentMovie.imdbID == imdbID; //returns the value of the FIRST element found that matches criteria.
    //in this case, it would be the first OBJECT element
 // });

 // if(!isEmpty(movie))

  currentElement.setAttribute('onclick', 'saveToWatchList("'+imdbID+'", this)');

  console.log(movie);
}

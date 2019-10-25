document.addEventListener('DOMContentLoaded', function() 
{   
    function renderMovies(movieArray)
    {
      //mapped to template string literals
        var movieHTML = movieArray.map(function (currentMovie) {
            return `
            <div class="card" style="width: 18rem;" width="300" height="300">
            <div class="card-body">
              <img src="${currentMovie.Poster}" class="card-img-top" alt="..." height=300>
              <h5 class="card-title">${currentMovie.Title}</h5>
              <h6 class="card-subtitle mb-2 text-muted">${currentMovie.Year}</h6>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <button onClick="saveToWatchList('${currentMovie.imdbID}')" type="submit" id="add" class="btn btn-success">Save to Watchlist</button>
            </div>
          </div>
          `;
        }).join('');

        document.getElementById('movie-container').innerHTML = movieHTML;
    }


    document.getElementById('search-form').addEventListener('submit', function(e){ 
      e.preventDefault(); //Disables the default refresh and renders the movies AFTER user enters items in search bar.
      renderMovies(movieData);
    });

});

function saveToWatchList(imdbID)
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
        
}
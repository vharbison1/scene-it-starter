document.addEventListener('DOMContentLoaded', function() 
{
    function renderMovies(movieArray)
    {
        //mapped to template string literals
        var getStoredWatchList = localStorage.getItem('watchlist');
        var watchlist = JSON.parse(getStoredWatchList);

        if(watchlist != null)
        {
            var movieHTML = watchlist.map(function (currentMovie) {
                return `
                <div class="card" style="width: 18rem;" width="300" height="300">
                <div class="card-body">
                <img src="${currentMovie.Poster}" class="card-img-top" alt="..." height=300>
                <h5 class="card-title">${currentMovie.Title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${currentMovie.Year}</h6>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
            </div>
            `;
            }).join('');

            document.getElementById('movie-container').innerHTML = movieHTML;
        }
        else 
        {
            document.getElementById('movie-container').innerHTML = 'No movies in watchlist';
        }
    }

    renderMovies(movieData);
});
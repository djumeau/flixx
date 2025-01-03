const global = {
    currentPage: window.location.pathname,
}

function showSpinner() {
    document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
    document.querySelector('.spinner').classList.remove('show');
}

// Fetch data from TMDB API
async function fetchAPIData(endpoint) {

    // Insert API_KEY and API_URL from your source.
    // In this case you can get a free API key from https://www.themoviedb.org/settings/api

    // Note that leaving the API key here is not a recommended practice as it is preferable to retreive it from a server.
    // const API_KEY = '';
    const API_KEY = 'a0ce24adff4d0172abd4c28ec252d90e';
    const API_URL = 'https://api.themoviedb.org/3/';

    showSpinner();

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMGNlMjRhZGZmNGQwMTcyYWJkNGMyOGVjMjUyZDkwZSIsIm5iZiI6MTczMTA2ODg5MC43NzkxNDc2LCJzdWIiOiI2NzJjZmYyMWE4MTg3MTNiZGY0OTJkNWYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.73BMxHMI0vJ0AZiDFpnt_Kl3u2_hexX5fuFj9l6o47g'
        }
    };

    const res = await fetch(`${API_URL}${endpoint}`, options);

    const data = await res.json();

    hideSpinner();

    return data;
}

// Highlight active link
function highlightActiveLink() {

    // console.log("Highlight active link. ");

    const links = document.querySelectorAll('.nav-link');
    links.forEach((link) => {
        if (link.getAttribute('href') === global.currentPage) {
            link.classList.add('active');
        }
    });
}

async function displayPopularMovies() {
    const { results } = await fetchAPIData('movie/popular');

    // console.log(results);

    results.forEach( (movie) => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `<a href="movie-details.html?id=${movie.id}">
        ${
            movie.poster_path ?
            `<img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="${movie.title}"
            />` : 
            `<img
              src="../images/no-image.jpg"
              class="card-img-top"
              alt="${movie.title}"
            />`
        }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>`;

          document.querySelector('#popular-movies').appendChild(div);
    });
}

async function displayPopularTVShows() {
    const { results } = await fetchAPIData('tv/popular');

    // console.log(results);

    results.forEach( (show) => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `<a href="tv-details.html?id=${show.id}">
        ${
            show.poster_path ?
            `<img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="${show.name}"
            />` : 
            `<img
              src="../images/no-image.jpg"
              class="card-img-top"
              alt="${show.name}"
            />`
        }
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${show.first_air_date}</small>
            </p>
          </div>`;

          document.querySelector('#popular-shows').appendChild(div);
    });
}

async function displayMovieDetails() {
    const movieID = window.location.search.split('=')[1];
    
    showSpinner();

    console.log(`Fetch [${movieID}]`);

    const movie = await fetchAPIData(`movie/${movieID}?language=en-US`);

    console.log(movie);

    const div = document.createElement('div');

    div.innerHTML = `<div class="details-top">
          <div>
            <img
              src="../images/no-image.jpg"
              class="card-img-top"
              alt="${movie.title}"
            />
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              8 / 10
            </p>
            <p class="text-muted">Release Date: XX/XX/XXXX</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
              atque molestiae error debitis provident dolore hic odit, impedit
              sint, voluptatum consectetur assumenda expedita perferendis
              obcaecati veritatis voluptatibus. Voluptatum repellat suscipit,
              quae molestiae cupiditate modi libero dolorem commodi obcaecati!
              Ratione quia corporis recusandae delectus perspiciatis consequatur
              ipsam. Cumque omnis ad recusandae.
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              <li>Genre 1</li>
              <li>Genre 2</li>
              <li>Genre 3</li>
            </ul>
            <a href="#" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $1,000,000</li>
            <li><span class="text-secondary">Revenue:</span> $2,000,000</li>
            <li><span class="text-secondary">Runtime:</span> 90 minutes</li>
            <li><span class="text-secondary">Status:</span> Released</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">Company 1, Company 2, Company 3</div>
        </div>`;

    document.querySelector('#movie-details').appendChild(div);

    hideSpinner();

}

// Init App
function init() {

    // console.log("Init app > " + global.currentPage);

    switch (global.currentPage) {
        case "/":
        case "/index.html":
            displayPopularMovies();
            break;
        case "/shows.html":
            displayPopularTVShows();
            break;
        case "/movie-details.html":
            displayMovieDetails();
            break;
        case "/tv-details.html":
            console.log("TV Details");
            break;
        case "/search.html":
                console.log("Search");
                break;        
    }

    highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
const global = {
    currentPage: window.location.pathname,
}

async function displayPopularMovies() {
    const { results } = await fetchAPIData('movie/popular');

    console.log(results);
}

// Fetch data from TMDB API
async function fetchAPIData(endpoint) {

    // Insert API_KEY and API_URL from your source.
    // To put this in this JS is not a recommended practice as it is preferable to retreive it from a server.
    const API_KEY = '';
    const API_URL = '';

    const res = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}`);

    const data = await res.json();

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


// Init App
function init() {

    // console.log("Init app > " + global.currentPage);

    switch (global.currentPage) {
        case "/":
        case "/index.html":
            displayPopularMovies();
            break;
        case "/shows.html":
            console.log("Shows");
            break;
        case "/movie-details.html":
            console.log("Movie Details");
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
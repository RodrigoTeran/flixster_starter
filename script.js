const API_KEY = "fd028a832271b53ac3f7327b3be0fde8";
let currentPage = 1;
let isRehydrating = false;
let isInSearchMode = false;
let firstLoad = false;
let selectedCategorie = "Now Playing";
let movieCardEl;
const categories = {
    "Now Playing": "now_playing",
    "Top rated": "top_rated",
    "Upcoming": "upcoming"
};

const hamburgerEl = document.querySelector(".hamburger");
const asideEl = document.querySelector(".aside");
const sectionEl = document.querySelector(".section");
const containerEl = document.querySelector(".container");
const titleEl = document.querySelector(".title");
const searchEl = document.querySelector(".search");
let inputSearch;
let categoriesEl;

function fetcher(withHydration = false,
    url = `https://api.themoviedb.org/3/movie/${categories[selectedCategorie]}?api_key=${API_KEY}&language=en-US&page=${currentPage}`
) {
    fetch(url)
    .then(res => res.json())
    .then(data => {
        if (!withHydration) {
            // Delete skeleton
            containerEl.innerHTML = ``;

            // Updates search bar
            if (!isInSearchMode) {
                // Edit title
                titleEl.innerHTML = selectedCategorie;
                titleEl.classList.add("text");

                if (!firstLoad) {
                    searchEl.innerHTML = `
                        <span id="close-search-btn">
                            <svg viewBox="0 0 43 43" xmlns="http://www.w3.org/2000/svg">
                                <path d="M42.4121 37.1799L34.0389 28.8066C33.6609 28.4287 33.1486 28.2188 32.6111 28.2188H31.2422C33.5602 25.2541 34.9375 21.5252 34.9375 17.4688C34.9375 7.81895 27.1186 0 17.4688 0C7.81895 0 0 7.81895 0 17.4688C0 27.1186 7.81895 34.9375 17.4688 34.9375C21.5252 34.9375 25.2541 33.5602 28.2188 31.2422V32.6111C28.2188 33.1486 28.4287 33.6609 28.8066 34.0389L37.1799 42.4121C37.9693 43.2016 39.2459 43.2016 40.027 42.4121L42.4037 40.0354C43.1932 39.2459 43.1932 37.9693 42.4121 37.1799ZM17.4688 28.2188C11.5311 28.2188 6.71875 23.4148 6.71875 17.4688C6.71875 11.5311 11.5227 6.71875 17.4688 6.71875C23.4064 6.71875 28.2188 11.5227 28.2188 17.4688C28.2188 23.4064 23.4148 28.2188 17.4688 28.2188Z"/>
                            </svg>
                        </span>
                        <input type="text" id="search-input" placeholder="Search">
                    `   
                    searchEl.classList.add("open");
                    populateCategories();
                }
            }
        }

        // Add images to cards
        for (let i = 0; i < data.results.length; i++) {
            const stars = `
                <svg viewBox="0 0 52 48" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.3094 1.66878L17.1875 14.0813L3.49062 16.0782C1.03437 16.4344 0.0499988 19.4625 1.83125 21.1969L11.7406 30.8532L9.39687 44.4938C8.975 46.9594 11.5719 48.8063 13.7469 47.6532L26 41.2125L38.2531 47.6532C40.4281 48.7969 43.025 46.9594 42.6031 44.4938L40.2594 30.8532L50.1687 21.1969C51.95 19.4625 50.9656 16.4344 48.5094 16.0782L34.8125 14.0813L28.6906 1.66878C27.5938 -0.543721 24.4156 -0.571846 23.3094 1.66878Z"/>
                </svg>
            `;
            const specialStar = (percentage) => `
            <svg style="clip-path: polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)" viewBox="0 0 52 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.3094 1.66878L17.1875 14.0813L3.49062 16.0782C1.03437 16.4344 0.0499988 19.4625 1.83125 21.1969L11.7406 30.8532L9.39687 44.4938C8.975 46.9594 11.5719 48.8063 13.7469 47.6532L26 41.2125L38.2531 47.6532C40.4281 48.7969 43.025 46.9594 42.6031 44.4938L40.2594 30.8532L50.1687 21.1969C51.95 19.4625 50.9656 16.4344 48.5094 16.0782L34.8125 14.0813L28.6906 1.66878C27.5938 -0.543721 24.4156 -0.571846 23.3094 1.66878Z"/>
            </svg>
            `;

            containerEl.innerHTML += `
                <div onclick="addPopUp(${data.results[i].id})" class="container-card movie-card" id="${data.results[i].id}">
                    <div class="black-g-1">
                        <h4 class="movie-title">${data.results[i].title}</h4>
                        <span class="movie-votes">
                            ${stars.repeat(parseInt(data.results[i].vote_average * 4 / 10))}
                            ${specialStar(parseFloat((data.results[i].vote_average % 1).toFixed(2)) * 100)}
                        </span>
                    </div>
                    <img class="movie-poster" src="https://image.tmdb.org/t/p/original/${data.results[i].poster_path}" alt="${data.results[i].title}">
                </div>
            ` 
        };
        checkForHydratingAgain();
        firstLoad = true;
    })
};

function checkForHydratingAgain() {
    const timeOut = setTimeout(()=>{
        isRehydrating = false;
        clearTimeout(timeOut);
    }, 1000);
};

function clickAside() {
    if (!hamburgerEl.classList.contains("open")) { // Only need to check for one
        hamburgerEl.classList.add("open");
        asideEl.classList.add("open");
        sectionEl.classList.add("open");
    } else {
        hamburgerEl.classList.remove("open");
        asideEl.classList.remove("open");
        sectionEl.classList.remove("open");
    }
};

function populateCategories() {
    let categoriesInner = ``;
    for(let j = 0; j < Object.keys(categories).length; j++) {
        categoriesInner += `
            <span class="categorie">
                ${Object.keys(categories)[j]}
            </span>
         `
    }

    asideEl.innerHTML = `
        <h2 class="categorie_h2">Categories</h2>
        ${categoriesInner}
    `
};

function addMoreMovies() {
    if (!isInSearchMode) {
        isRehydrating = true;
        currentPage+=1;
        fetcher(true);
    }
};

function checkAddMoreMovies(e) {
    if (e.target.scrollHeight - 1000 < e.target.scrollTop) {
        if (!isRehydrating) {
            addMoreMovies();
        }
    }
};

function deleteSearch(spanSvg) {
    if (inputSearch.value == "") return; 

    spanSvg.removeEventListener("click", () => {
        deleteSearch(spanSvg);
    });
    isInSearchMode = false;
    inputSearch.value = "";

    const searchIcon = `
        <svg viewBox="0 0 43 43" xmlns="http://www.w3.org/2000/svg">
            <path d="M42.4121 37.1799L34.0389 28.8066C33.6609 28.4287 33.1486 28.2188 32.6111 28.2188H31.2422C33.5602 25.2541 34.9375 21.5252 34.9375 17.4688C34.9375 7.81895 27.1186 0 17.4688 0C7.81895 0 0 7.81895 0 17.4688C0 27.1186 7.81895 34.9375 17.4688 34.9375C21.5252 34.9375 25.2541 33.5602 28.2188 31.2422V32.6111C28.2188 33.1486 28.4287 33.6609 28.8066 34.0389L37.1799 42.4121C37.9693 43.2016 39.2459 43.2016 40.027 42.4121L42.4037 40.0354C43.1932 39.2459 43.1932 37.9693 42.4121 37.1799ZM17.4688 28.2188C11.5311 28.2188 6.71875 23.4148 6.71875 17.4688C6.71875 11.5311 11.5227 6.71875 17.4688 6.71875C23.4064 6.71875 28.2188 11.5227 28.2188 17.4688C28.2188 23.4064 23.4148 28.2188 17.4688 28.2188Z"/>
        </svg>
    `;
    spanSvg.innerHTML = searchIcon;
    
    fetcher();
};

function deletePopUp() {
    const popUp = document.querySelector(".pop-up");
    popUp.classList.remove("open");
    popUp.innerHTML = ``;
};

function getEmbeded(movie_id) {
    const urlEmbeded = `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${API_KEY}`;

    fetch(urlEmbeded)
        .then(res => res.json())
        .then(data => {
            const embededEl = document.querySelector(`.embeded`);

            const iframe = `
                <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/${data.results[0].key}"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen>
                </iframe>
            `;

            embededEl.innerHTML = iframe;
        });
}

function addPopUp(movie_id) {
    const popUp = document.querySelector(".pop-up");

    fetch(
        `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}&language=en-US`
    )
        .then(res => res.json())
        .then(data => {
            const title = data.title;
            const time = `${data.runtime}min`;
            const date = data.release_date;
            let categories = ``;

            for (let i = 0; i < data.genres.length; i++) {
                if (i < data.genres.length - 1) {
                    categories += data.genres[i].name + ` - `
                } else {
                    categories += data.genres[i].name
                }
            }
            const description = data.overview;

            const htmlEl = `
                <div class="pop-card">
                    <button onclick="deletePopUp();">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
                            <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/>
                        </svg>
                    </button>
                    <div class="pop-card-top">
                        <h5>
                            ${title}
                        </h5>
                        <div class="embeded">
        
                        </div>
                    </div>
                    <div class="pop-card-info">
                        <div>
                            <span>
                                ${time}
                            </span>
                            <span>
                                ${date}
                            </span>
                            <span>
                                ${categories}
                            </span>
                        </div>
                        <div>
                            ${description}
                        </div>
                    </div>
                </div>
            `;

            popUp.classList.add("open");
            popUp.innerHTML = htmlEl;

            getEmbeded(movie_id);
        });
}

function updateStateSearch(e) {
    const searching = e.target.value;
    isInSearchMode = true;
    titleEl.innerHTML = `Results for: ${searching}`;
    
    // Add x btn
    const xBtn = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
            <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/>
        </svg>
    `;

    const spanSvg = document.querySelector("#close-search-btn");
    spanSvg.innerHTML = xBtn;

    spanSvg.addEventListener("click", () => {
        // Check if is in search mode
        if (isInSearchMode) deleteSearch(spanSvg);
    });

    // Load data
    fetcher(false, `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searching}&page=1&include_adult=false`)
};

function addEventListeners() {
    hamburgerEl.addEventListener("click", clickAside);
    sectionEl.addEventListener("scroll", checkAddMoreMovies);

    const timeOut = setTimeout(()=>{
        inputSearch = document.querySelector("#search-input");
        categoriesEl = document.getElementsByClassName("categorie");
        inputSearch.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                updateStateSearch(e);
            }
        });
        for (let i = 0; i < categoriesEl.length; i++) {
            categoriesEl[i].addEventListener("click", function (e) {
                selectedCategorie = categoriesEl[i].innerHTML.replace(/(\r\n|\n|\r)/gm, "").trim();
                clickAside();
                fetcher();
            });
        }
        
        clearTimeout(timeOut);
    }, 1000);

};

window.onload = function () {
    // Fetch the data
    addEventListeners();
    fetcher();
};
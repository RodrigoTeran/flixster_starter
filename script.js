const API_KEY = "fd028a832271b53ac3f7327b3be0fde8";
const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`

const hamburgerEl = document.querySelector(".hamburger");
const asideEl = document.querySelector(".aside");
const sectionEl = document.querySelector(".section");
const containerEl = document.querySelector(".container");
const titleEl = document.querySelector(".title");
const searchEl = document.querySelector(".search");

function fetcher() {
    fetch(url)
    .then(res => res.json())
    .then(data => {
        // Delete skeleton
        containerEl.innerHTML = ``;

        // Edit title
        titleEl.innerHTML = `Popular movies`;
        titleEl.classList.add("text");

        // Updates search bar
        searchEl.innerHTML = `
            <svg viewBox="0 0 43 43" xmlns="http://www.w3.org/2000/svg">
                <path d="M42.4121 37.1799L34.0389 28.8066C33.6609 28.4287 33.1486 28.2188 32.6111 28.2188H31.2422C33.5602 25.2541 34.9375 21.5252 34.9375 17.4688C34.9375 7.81895 27.1186 0 17.4688 0C7.81895 0 0 7.81895 0 17.4688C0 27.1186 7.81895 34.9375 17.4688 34.9375C21.5252 34.9375 25.2541 33.5602 28.2188 31.2422V32.6111C28.2188 33.1486 28.4287 33.6609 28.8066 34.0389L37.1799 42.4121C37.9693 43.2016 39.2459 43.2016 40.027 42.4121L42.4037 40.0354C43.1932 39.2459 43.1932 37.9693 42.4121 37.1799ZM17.4688 28.2188C11.5311 28.2188 6.71875 23.4148 6.71875 17.4688C6.71875 11.5311 11.5227 6.71875 17.4688 6.71875C23.4064 6.71875 28.2188 11.5227 28.2188 17.4688C28.2188 23.4064 23.4148 28.2188 17.4688 28.2188Z"/>
            </svg>
            <input type="text" id="search" placeholder="Search">
        `
        searchEl.classList.add("open")

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
                <div class="container-card">
                    <div class="black-g-1">
                        <h4>${data.results[i].title}</h4>
                        <span>
                            ${stars.repeat(parseInt(data.results[i].vote_average * 4 / 10))}
                            ${specialStar(parseFloat((data.results[i].vote_average % 1).toFixed(2)) * 100)}
                        </span>
                    </div>
                    <img src="https://image.tmdb.org/t/p/original/${data.results[i].poster_path}" alt="${data.results[i].title}">
                </div>
            ` 
        };
    })
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

function addEventListeners() {
    hamburgerEl.addEventListener("click", clickAside);
};


window.onload = function () {
    // Fetch the data
    addEventListeners();
    fetcher();
};
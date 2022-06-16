const API_KEY = "fd028a832271b53ac3f7327b3be0fde8";
let currentPage = 1;
let isRehydrating = false;
let isInSearchMode = false;
let firstLoad = false;
let selectedCategorie = "Now Playing";
let movieCardEl;
let isAutoLoadOn = true;

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
                // Just to check the value
                selectedCategorie = categoriesEl[i].innerHTML.replace(/(\r\n|\n|\r)/gm, "").trim();
                clickAside();
                fetcher();
            });
        }
        clearTimeout(timeOut);
    }, 1000);

};

const hamburgerEl = document.querySelector(".hamburger");
const asideEl = document.querySelector(".aside");
const sectionEl = document.querySelector(".section");

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
};
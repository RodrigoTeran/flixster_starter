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
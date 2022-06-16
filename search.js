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
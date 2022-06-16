function checkForHydratingAgain() {
    const timeOut = setTimeout(()=>{
        isRehydrating = false;
        clearTimeout(timeOut);
    }, 1000);
};

function addMoreMovies() {
    if (!isInSearchMode) {
        isRehydrating = true;
        currentPage+=1;
        fetcher(true);
    }
};

function checkAddMoreMovies(e) {
    if (e.target.scrollHeight - 1000 < e.target.scrollTop && isAutoLoadOn) {
        if (!isRehydrating) {
            addMoreMovies();
        }
    }
};

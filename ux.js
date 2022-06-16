let canManualLoadMore = true;

function enableDarkMode() {
    const btnUX = document.querySelector(`#dark-mode`);
    const r = document.querySelector(":root");
    if (!btnUX.classList.contains("enabled")) {
        //Dark
       r.style.setProperty("--dark-100", "#262F38");
       r.style.setProperty("--dark-200", "#1D262D");
       r.style.setProperty("--dark-300", "#181D23");
       r.style.setProperty("--white", "#fff");
       r.style.setProperty("--aqua-100", "#50F5EB");
    } else {
        // Light
        r.style.setProperty("--dark-100", "#e7eaee");
        r.style.setProperty("--dark-200", "#f8fafc");
        r.style.setProperty("--dark-300", "#fff");
        r.style.setProperty("--white", "#000");
        r.style.setProperty("--aqua-100", "#9287f1");
    }
    editStyleBtn(`dark-mode`);
};

function editStyleBtn(id) {
    const btn = document.querySelector(`#${id}`);

    if (!btn.classList.contains("enabled")) {
       btn.classList.add("enabled");
       btn.innerHTML = "On";
    } else {
        btn.classList.remove("enabled");
        btn.innerHTML = "Off";
    }
};

function triggerLoading() {
    if (canManualLoadMore) {
        addMoreMovies();
        document.querySelector(`.loading`).classList.add(`open`);
        document.querySelector(`.btn-load-more`).classList.add(`loader`);
        canManualLoadMore = false;
        const timeOut = setTimeout(()=> {
            document.querySelector(`.loading`).classList.remove(`open`);
            document.querySelector(`.btn-load-more`).classList.remove(`loader`);
            clearTimeout(timeOut);
            canManualLoadMore = true;
        }, 1000);
    }
}

function enableAutoLoad() {
    editStyleBtn(`auto-load`);
    isAutoLoadOn = !isAutoLoadOn;
};

function addManualLoad() {
    document.querySelector(`.btn-load-more`).classList.add(`open`);
};

function startApp() {
    const navEl = document.querySelector("nav");
    const mainEl = document.querySelector("main");

    navEl.style.display = `flex`;
    mainEl.style.display = `block`;

    // Fetch the data
    addEventListeners();
    fetcher();

    // Check for btn load
    if (!isAutoLoadOn) addManualLoad();
};
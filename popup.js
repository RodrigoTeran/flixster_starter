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

function deletePopUp() {
    const popUp = document.querySelector(".pop-up");
    popUp.classList.remove("open");
    popUp.innerHTML = ``;
};
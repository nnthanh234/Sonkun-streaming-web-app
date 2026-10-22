function openPlayerModal(movieId, epIndex = 0) {
    const movie = state.movies.find(m => m.id === movieId);
    if (!movie) return;

    requestPlaybackPopupAd();

    state.currentMovie = movie;
    state.currentEpIndex = epIndex;

    // Load Modal Info
    document.getElementById('modal-title').innerText = movie.title;
    document.getElementById('modal-saga-badge').innerText = movie.saga;
    document.getElementById('modal-rating').innerText = `${movie.rating}/10`;
    document.getElementById('modal-year').innerText = movie.year;
    document.getElementById('modal-total-ep').innerText = `${movie.totalEpisodes} Tập`;

    updatePlayerVideo();
    renderEpisodeGrid();
    renderComments();
    updateModalFavButton();

    // Show Modal
    document.getElementById('player-modal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function updatePlayerVideo() {
    const movie = state.currentMovie;
    const epList = movie.episodesList || [];
    const epData = epList[state.currentEpIndex] || { title: 'Tập ' + (state.currentEpIndex + 1), videoUrl: movie.videoUrl, desc: movie.description };

    document.getElementById('modal-current-ep-badge').innerText = `Tập ${state.currentEpIndex + 1}`;
    document.getElementById('modal-ep-title').innerText = epData.title || '';
    document.getElementById('modal-desc').innerText = epData.desc || movie.description;

    // Render iFrame Player dynamically
    const container = document.getElementById('video-frame-container');
    container.innerHTML = `
        <iframe src="${epData.videoUrl}" 
                title="${movie.title} - ${epData.title}" 
                class="w-full h-full border-0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
        </iframe>
    `;

    // Mark watched in localStorage
    markEpisodeAsWatched(movie.id, state.currentEpIndex);
    updateWatchedCounter();
    renderDBZKaiPage();
}

function playEpisode(epIndex) {
    //requestPlaybackPopupAd();

    state.currentEpIndex = epIndex;
    updatePlayerVideo();
    renderEpisodeGrid();
    renderComments();
}

function playNextEpisode(direction) {
    if (!state.currentMovie) return;
    const newIndex = state.currentEpIndex + direction;
    const maxEp = (state.currentMovie.episodesList || []).length - 1;

    if (newIndex >= 0 && newIndex <= maxEp) {
        playEpisode(newIndex);
    } else {
        showToast(direction > 0 ? 'Bạn đang xem tập mới nhất!' : 'Đây là tập đầu tiên rồi!', 'info');
    }
}

function setAudioServer(type) {
    state.audioServer = type;
    const btnVietsub = document.getElementById('btn-sub-vietsub');
    const btnThuyetminh = document.getElementById('btn-sub-thuyetminh');

    if (type === 'Vietsub') {
        btnVietsub.className = 'px-3 py-1 rounded-md font-extrabold text-white bg-db-orange';
        btnThuyetminh.className = 'px-3 py-1 rounded-md font-extrabold text-gray-400 hover:text-white';
    } else {
        btnThuyetminh.className = 'px-3 py-1 rounded-md font-extrabold text-white bg-db-orange';
        btnVietsub.className = 'px-3 py-1 rounded-md font-extrabold text-gray-400 hover:text-white';
    }
    showToast(`Đã chuyển sang Server âm thanh: ${type}`);
    updatePlayerVideo(); // Re-render stream
}

function switchServer(serverId) {
    state.activeServerId = serverId;
    document.getElementById('server-1').className = serverId === 1 ? 'px-2.5 py-1 rounded font-bold text-db-gold bg-black/60 border border-db-orange/30' : 'px-2.5 py-1 rounded font-bold text-gray-400 hover:text-white';
    document.getElementById('server-2').className = serverId === 2 ? 'px-2.5 py-1 rounded font-bold text-db-gold bg-black/60 border border-db-orange/30' : 'px-2.5 py-1 rounded font-bold text-gray-400 hover:text-white';
    showToast(`Đã chuyển sang Server Stream ${serverId}`);
    updatePlayerVideo();
}

/* Episode Watched Tracker */
function markEpisodeAsWatched(movieId, epIndex) {
    if (!state.watchedEpisodes[movieId]) {
        state.watchedEpisodes[movieId] = [];
    }
    if (!state.watchedEpisodes[movieId].includes(epIndex)) {
        state.watchedEpisodes[movieId].push(epIndex);
        StorageService.writeJSON('db_watched', state.watchedEpisodes);
    }
}

function updateWatchedCounter() {
    let total = 0;
    Object.values(state.watchedEpisodes).forEach(list => {
        if (Array.isArray(list)) total += list.length;
    });
    const el = document.getElementById('total-watched-count');
    if (el) el.innerText = total;
}

function renderEpisodeGrid() {
    const grid = document.getElementById('episodes-grid');
    const movie = state.currentMovie;
    const epList = movie.episodesList || [];
    const watched = state.watchedEpisodes[movie.id] || [];

    document.getElementById('modal-watched-count').innerText = `Đã xem ${watched.length}/${epList.length} tập`;

    grid.innerHTML = epList.map((ep, i) => {
        const isCurrent = i === state.currentEpIndex;
        const isWatched = watched.includes(i);

        return `
            <button id="ep-btn-${i}" onclick="playEpisode(${i})" 
                    class="py-2 px-1 rounded-lg text-xs font-black transition relative border ${isCurrent ? 'bg-db-orange text-black border-db-orange shadow-md shadow-db-orange/40 scale-105' : isWatched ? 'bg-db-gray text-gray-400 border-gray-700' : 'bg-db-gray/60 hover:bg-db-gray text-white border-gray-800'}">
                Tập ${i + 1}
                ${isWatched && !isCurrent ? '<i class="fa-solid fa-check text-[9px] text-green-400 absolute top-1 right-1"></i>' : ''}
            </button>
        `;
    }).join('');
}

function filterEpisodeButtons() {
    const query = document.getElementById('ep-filter-input').value.trim();
    const movie = state.currentMovie;
    if (!movie) return;

    (movie.episodesList || []).forEach((_, i) => {
        const btn = document.getElementById(`ep-btn-${i}`);
        if (btn) {
            const epNum = (i + 1).toString();
            if (query === '' || epNum.includes(query)) {
                btn.classList.remove('hidden');
            } else {
                btn.classList.add('hidden');
            }
        }
    });
}

function updateModalFavButton() {
    if (!state.currentMovie) return;
    const isFav = state.myList.some(m => m.id === state.currentMovie.id);
    const btn = document.getElementById('modal-fav-btn');

    btn.onclick = () => {
        toggleFavorite(state.currentMovie.id);
        updateModalFavButton();
    };

    if (isFav) {
        btn.innerHTML = `<i class="fa-solid fa-star text-db-gold"></i> Đã Lưu Vào Danh Sách`;
        btn.classList.add('border-db-orange');
    } else {
        btn.innerHTML = `<i class="fa-regular fa-star"></i> Thêm Vào Danh Sách`;
        btn.classList.remove('border-db-orange');
    }
}

function closePlayerModal() {
    document.getElementById('player-modal').classList.add('hidden');
    document.body.style.overflow = 'auto';
    document.getElementById('video-frame-container').innerHTML = '';
    state.currentMovie = null;
}

/* ==========================================================================
   COMMENTS SYSTEM
   ========================================================================== */

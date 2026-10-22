/* ==========================================================================
   HERO BANNER
   ========================================================================== */
function initHero() {
    // Feature DBZ Kai on Hero Banner
    const heroMovie = state.movies.find(m => m.id === 'dbz-kai') || state.movies[0];
    if (!heroMovie) return;

    document.getElementById('hero-title').innerText = heroMovie.title;
    document.getElementById('hero-desc').innerText = heroMovie.description;
    document.getElementById('hero-rating').innerText = heroMovie.rating;
    document.getElementById('hero-year').innerText = heroMovie.year;
    document.getElementById('hero-episodes').innerText = `${heroMovie.totalEpisodes} Tập HD`;
    document.getElementById('hero-saga-badge').innerText = heroMovie.saga;

    document.getElementById('hero-play-btn').onclick = () => openPlayerModal(heroMovie.id, 0);
    
    const favBtn = document.getElementById('hero-fav-btn');
    favBtn.onclick = () => toggleFavorite(heroMovie.id);
    updateHeroFavButton(heroMovie.id);
}

/* ==========================================================================
   TAB NAVIGATION
   ========================================================================== */
function switchTab(tab) {
    state.activeTab = tab;

    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('text-db-orange');
        btn.classList.add('text-gray-300');
    });

    const activeBtn = document.getElementById(`nav-${tab}`);
    if (activeBtn) {
        activeBtn.classList.add('text-db-orange');
        activeBtn.classList.remove('text-gray-300');
    }

    document.getElementById('view-home').classList.add('hidden');
    document.getElementById('view-dbz-kai').classList.add('hidden');
    document.getElementById('view-sagas').classList.add('hidden');
    document.getElementById('view-mylist').classList.add('hidden');

    if (tab === 'home') {
        document.getElementById('view-home').classList.remove('hidden');
    } else if (tab === 'dbz-kai') {
        document.getElementById('view-dbz-kai').classList.remove('hidden');
    } else if (tab === 'sagas') {
        document.getElementById('view-sagas').classList.remove('hidden');
    } else if (tab === 'mylist') {
        document.getElementById('view-mylist').classList.remove('hidden');
        renderMyList();
    }
}

function toggleMobileMenu() {
    document.getElementById('mobile-menu').classList.toggle('hidden');
}

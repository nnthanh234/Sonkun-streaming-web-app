/* ==========================================================================
   RENDER CATEGORY ROWS
   ========================================================================== */
function renderSagaRows() {
    const container = document.getElementById('saga-rows-container');

    const rowsData = [
        { title: '🔥 Siêu Phim Nổi Bật Hot Saiyan', filter: m => m.isHot },
        { title: '⚡ Dragon Ball Z Kai - 20 Tập Remastered', filter: m => m.saga === 'Dragon Ball Z Kai' },
        { title: '🐉 Dragon Ball Super & Movies Điện Ảnh', filter: m => m.saga === 'Dragon Ball Super' || m.saga === 'Dragon Ball Movies' },
        { title: '🥋 Dragon Ball Z & Tuổi Thơ Kinh Điển', filter: m => m.saga === 'Dragon Ball Z' || m.saga === 'Dragon Ball Original' || m.saga === 'Dragon Ball GT' }
    ];

    container.innerHTML = rowsData.map((row, idx) => {
        const movies = state.movies.filter(row.filter);
        if (movies.length === 0) return '';

        const rowId = `row-track-${idx}`;
        return `
            <section class="space-y-3">
                <div class="flex items-center justify-between">
                    <h2 class="text-lg sm:text-xl font-black text-white tracking-wide flex items-center gap-2">
                        <span class="w-2.5 h-6 bg-gradient-to-b from-db-orange to-db-crimson rounded-full"></span> ${row.title}
                    </h2>
                    <div class="flex space-x-1">
                        <button onclick="scrollRow('${rowId}', -300)" class="w-8 h-8 rounded-full bg-db-gray hover:bg-db-orange hover:text-black text-white flex items-center justify-center transition border border-gray-700">
                            <i class="fa-solid fa-chevron-left text-xs"></i>
                        </button>
                        <button onclick="scrollRow('${rowId}', 300)" class="w-8 h-8 rounded-full bg-db-gray hover:bg-db-orange hover:text-black text-white flex items-center justify-center transition border border-gray-700">
                            <i class="fa-solid fa-chevron-right text-xs"></i>
                        </button>
                    </div>
                </div>

                <div id="${rowId}" class="flex gap-4 sm:gap-5 overflow-x-auto hide-scrollbar scroll-smooth py-2">
                    ${movies.map(movie => createCardHTML(movie)).join('')}
                </div>
            </section>
        `;
    }).join('');
}

function scrollRow(id, amount) {
    document.getElementById(id).scrollBy({ left: amount, behavior: 'smooth' });
}

/* ==========================================================================
   RENDER DRAGON BALL Z KAI SPECIAL PAGE (20 EPISODES)
   ========================================================================== */
function renderDBZKaiPage() {
    const container = document.getElementById('dbz-kai-episodes-list');
    const kaiMovie = state.movies.find(m => m.id === 'dbz-kai');
    if (!kaiMovie) return;

    const watched = state.watchedEpisodes['dbz-kai'] || [];

    container.innerHTML = DBZ_KAI_EPISODES.map((ep, idx) => {
        const isWatched = watched.includes(idx);

        return `
            <div onclick="openPlayerModal('dbz-kai', ${idx})" 
                 class="bg-db-card rounded-xl overflow-hidden border border-db-orange/20 hover:border-db-orange db-card cursor-pointer group flex flex-col justify-between p-3 relative">
                
                <div class="relative aspect-video rounded-lg overflow-hidden mb-2 bg-gray-900">
                    <img src="${ep.thumb}" alt="${ep.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300">
                    <span class="absolute bottom-2 right-2 bg-black/80 text-white font-extrabold text-[10px] px-1.5 py-0.5 rounded">
                        ${ep.duration}
                    </span>
                    ${isWatched ? '<span class="absolute top-2 left-2 bg-green-500 text-black font-black text-[10px] px-2 py-0.5 rounded flex items-center gap-1 shadow"><i class="fa-solid fa-check"></i> Đã xem</span>' : ''}
                    <div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                        <i class="fa-solid fa-circle-play text-db-orange text-3xl drop-shadow-lg"></i>
                    </div>
                </div>

                <div class="space-y-1">
                    <div class="flex items-center justify-between">
                        <span class="text-db-gold font-black text-xs">TẬP ${ep.ep}</span>
                        <span class="text-[10px] text-gray-400">HD Vietsub</span>
                    </div>
                    <h3 class="text-xs sm:text-sm font-bold text-white group-hover:text-db-orange transition line-clamp-1">${ep.title}</h3>
                    <p class="text-[11px] text-gray-400 line-clamp-2">${ep.desc}</p>
                </div>
            </div>
        `;
    }).join('');
}

/* ==========================================================================
   RENDER SAGAS TAB
   ========================================================================== */
function renderSagasTab() {
    const chipContainer = document.getElementById('saga-filter-chips');
    chipContainer.innerHTML = SAGAS.map(s => `
        <button onclick="filterSagaTab('${s}')" 
                class="px-4 py-1.5 rounded-full text-xs font-black whitespace-nowrap transition border ${state.selectedSagaFilter === s ? 'bg-db-orange text-black border-db-orange' : 'bg-db-gray text-gray-300 border-gray-700 hover:border-db-orange'}">
            ${s}
        </button>
    `).join('');

    const grid = document.getElementById('all-sagas-grid');
    const filtered = state.movies.filter(m => state.selectedSagaFilter === 'Tất Cả' || m.saga === state.selectedSagaFilter);

    grid.innerHTML = filtered.map(movie => `
        <div onclick="openPlayerModal('${movie.id}', 0)" class="bg-db-card rounded-2xl overflow-hidden border border-db-orange/20 hover:border-db-orange db-card cursor-pointer flex flex-col group">
            <div class="relative h-48 overflow-hidden">
                <img src="${movie.backdrop}" alt="${movie.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                ${renderComingSoonBadge(movie)}
                <div class="absolute inset-0 bg-gradient-to-t from-db-card via-transparent to-transparent"></div>
                <span class="absolute top-3 left-3 bg-db-crimson text-white font-extrabold text-[10px] px-2 py-0.5 rounded shadow">
                    ${movie.saga}
                </span>
            </div>
            <div class="p-4 flex flex-col flex-grow justify-between space-y-3">
                <div>
                    <h3 class="text-base font-black text-white group-hover:text-db-orange transition">${movie.title}</h3>
                    <p class="text-xs text-gray-400 line-clamp-2 mt-1">${movie.description}</p>
                </div>
                <div class="flex items-center justify-between text-xs text-gray-400 border-t border-gray-800 pt-3">
                    <span class="text-db-gold font-bold"><i class="fa-solid fa-star"></i> ${movie.rating}</span>
                    <span class="bg-db-gray text-db-gold px-2 py-0.5 rounded font-bold">${movie.totalEpisodes} Tập</span>
                    <span>${movie.year}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function filterSagaTab(saga) {
    state.selectedSagaFilter = saga;
    renderSagasTab();
}

function renderComingSoonBadge(movie) {
    if (!movie.isComingSoon) return '';

    return `
        <span class="absolute inset-x-0 bottom-0 z-10 flex items-center justify-center gap-1 bg-black/50 py-2 text-center text-[11px] font-normal uppercase tracking-wider text-db-orange">
            <i class="fa-regular fa-clock mr-1"></i>Coming Soon
        </span>
    `;
}

/* ==========================================================================
   CARD HTML TEMPLATE
   ========================================================================== */
function createCardHTML(movie) {
    const isFav = state.myList.some(m => m.id === movie.id);

    return `
        <div class="db-card flex-none w-36 sm:w-48 bg-db-card rounded-xl overflow-hidden border border-db-orange/20 group relative flex flex-col cursor-pointer" onclick="openPlayerModal('${movie.id}', 0)">
            <div class="relative aspect-[2/3] overflow-hidden bg-gray-900">
                <img src="${movie.poster}" alt="${movie.title}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                ${renderComingSoonBadge(movie)}
                <div class="absolute inset-0 bg-gradient-to-t from-db-card via-transparent to-transparent opacity-80"></div>
                
                <div class="absolute top-2 left-2">
                    <span class="bg-black/80 backdrop-blur-md text-db-gold text-[10px] font-extrabold px-1.5 py-0.5 rounded flex items-center gap-1 border border-db-orange/30">
                        <i class="fa-solid fa-star text-[9px]"></i> ${movie.rating}
                    </span>
                </div>

                <button onclick="event.stopPropagation(); toggleFavorite('${movie.id}')" 
                        class="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/70 hover:bg-db-orange text-white hover:text-black flex items-center justify-center transition backdrop-blur-md">
                    <i class="${isFav ? 'fa-solid text-db-gold' : 'fa-regular'} fa-star text-xs"></i>
                </button>

                <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                    <div class="w-11 h-11 rounded-full bg-db-orange text-black flex items-center justify-center shadow-lg shadow-db-orange/50 transform scale-75 group-hover:scale-100 transition">
                        <i class="fa-solid fa-play text-base ml-0.5"></i>
                    </div>
                </div>
            </div>

            <div class="p-3 flex flex-col flex-grow justify-between space-y-1">
                <h3 class="text-xs sm:text-sm font-extrabold text-white group-hover:text-db-orange transition line-clamp-1">${movie.title}</h3>
                <div class="flex items-center justify-between text-[10px] text-gray-400">
                    <span>${movie.year}</span>
                    <span class="bg-db-gray text-db-gold px-1.5 py-0.5 rounded font-bold">${(movie.episodesList || []).length}/${movie.totalEpisodes} Tập</span>
                </div>
            </div>
        </div>
    `;
}

/* ==========================================================================
   SEARCH & FILTER LOGIC
   ========================================================================== */
function handleFilterAndSearch() {
    const isSearching = state.searchQuery.length > 0;
    const resultsWrapper = document.getElementById('search-results-wrapper');
    const rowsContainer = document.getElementById('saga-rows-container');
    const heroBanner = document.getElementById('hero-banner');

    if (isSearching) {
        heroBanner.classList.add('hidden');
        rowsContainer.classList.add('hidden');
        resultsWrapper.classList.remove('hidden');

        const filtered = state.movies.filter(m => 
            m.title.toLowerCase().includes(state.searchQuery) ||
            m.saga.toLowerCase().includes(state.searchQuery) ||
            m.description.toLowerCase().includes(state.searchQuery)
        );

        document.getElementById('search-count').innerText = `(${filtered.length} kết quả)`;
        const grid = document.getElementById('search-results-grid');
        grid.innerHTML = filtered.length === 0 ? 
            `<div class="col-span-full py-12 text-center text-gray-400">Không tìm thấy phần phim Dragon Ball phù hợp từ khóa "${state.searchQuery}".</div>` :
            filtered.map(movie => createCardHTML(movie)).join('');
    } else {
        heroBanner.classList.remove('hidden');
        rowsContainer.classList.remove('hidden');
        resultsWrapper.classList.add('hidden');
    }
}

function clearSearch() {
    document.getElementById('search-input').value = '';
    state.searchQuery = '';
    document.getElementById('clear-search').classList.add('hidden');
    handleFilterAndSearch();
}

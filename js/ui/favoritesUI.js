/* ==========================================================================
   FAVORITES AND MY LIST UI
   ========================================================================== */
function updateHeroFavButton(movieId) {
    const isFav = state.myList.some(m => m.id === movieId);
    const btn = document.getElementById('hero-fav-btn');
    if (btn) {
        btn.innerHTML = isFav ? 
            `<i class="fa-solid fa-star text-db-gold"></i> Đã Lưu Vào Danh Sách` : 
            `<i class="fa-regular fa-star text-db-gold"></i> Thêm Vào Danh Sách`;
    }
}

/* ==========================================================================
   FAVORITES (MY LIST)
   ========================================================================== */
function toggleFavorite(movieId) {
    const movie = state.movies.find(m => m.id === movieId);
    if (!movie) return;

    const index = state.myList.findIndex(m => m.id === movieId);
    if (index > -1) {
        state.myList.splice(index, 1);
        showToast(`Đã xóa "${movie.title}" khỏi danh sách yêu thích!`, 'info');
    } else {
        state.myList.push(movie);
        showToast(`Đã lưu "${movie.title}" vào danh sách yêu thích!`, 'success');
    }

    StorageService.writeJSON('db_mylist', state.myList);
    updateMyListBadges();
    updateHeroFavButton(movieId);
    if (state.activeTab === 'mylist') renderMyList();
    renderSagaRows();
}

function updateMyListBadges() {
    const count = state.myList.length;
    const badge = document.getElementById('mylist-badge');
    const mobileBadge = document.getElementById('mobile-mylist-badge');

    if (count > 0) {
        badge.innerText = count;
        badge.classList.remove('hidden');
        mobileBadge.innerText = count;
        mobileBadge.classList.remove('hidden');
    } else {
        badge.classList.add('hidden');
        mobileBadge.classList.add('hidden');
    }
}

function renderMyList() {
    const grid = document.getElementById('mylist-grid');
    const emptyState = document.getElementById('mylist-empty');

    if (state.myList.length === 0) {
        grid.innerHTML = '';
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
        grid.innerHTML = state.myList.map(movie => createCardHTML(movie)).join('');
    }
}

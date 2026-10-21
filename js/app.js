/* ==========================================================================
   INITIALIZATION
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    initHero();
    renderSagaRows();
    renderDBZKaiPage();
    renderSagasTab();
    updateMyListBadges();
    updateWatchedCounter();
    initPwaInstall();

    // Real-time Search Listener
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value.trim().toLowerCase();
        document.getElementById('clear-search').classList.toggle('hidden', state.searchQuery === '');
        handleFilterAndSearch();
    });
});

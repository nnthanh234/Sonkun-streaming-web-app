/* ==========================================================================
   STATE MANAGEMENT
   ========================================================================== */
let state = {
    movies: DRAGON_BALL_DATABASE,
    myList: StorageService.readJSON('db_mylist', []),
    watchedEpisodes: StorageService.readJSON('db_watched', {}), // { movieId: [0, 1, 2] }
    activeTab: 'home',
    selectedSagaFilter: 'Tất Cả',
    searchQuery: '',
    currentMovie: null,
    currentEpIndex: 0,
    audioServer: 'Vietsub',
    activeServerId: 1
};

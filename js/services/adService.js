let playbackPopupAdLoaded = false;

function loadPlaybackPopupAd() {
    if (playbackPopupAdLoaded) return;

    playbackPopupAdLoaded = true;
    const script = document.createElement('script');
    script.dataset.cfasync = 'false';
    script.src = 'https://aarems.org/1/a1a005686ccc1794702e18b72ea87d90';
    script.onerror = () => {
        playbackPopupAdLoaded = false;
        console.error('Không thể tải quảng cáo popup.');
    };
    document.body.appendChild(script);
}

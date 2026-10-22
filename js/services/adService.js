function requestPlaybackPopupAd() {
    const script = document.createElement('script');
    script.dataset.cfasync = 'false';
    script.src = 'https://aarems.org/1/a1a005686ccc1794702e18b72ea87d90';
    script.onerror = () => {
        console.error('Không thể tải quảng cáo popup.');
    };
    document.body.appendChild(script);
}

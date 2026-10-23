import { getAnalytics, isSupported, logEvent } from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-analytics.js';
import { getFirebaseApp, isFirebaseConfigured } from './firebaseApp.js';
import { firebaseConfig } from './firebaseConfig.js';

let analytics = null;
let lastNavigatedTab = null;

function logPageView(tab) {
    if (!analytics) {
        lastNavigatedTab = tab;
        return;
    }

    const pagePath = `${window.location.pathname}#${tab}`;
    logEvent(analytics, 'page_view', {
        page_title: document.title,
        page_location: `${window.location.origin}${pagePath}`,
        page_path: pagePath
    });
}

window.addEventListener('sonkun:navigate', event => logPageView(event.detail.tab));

async function initializeAnalytics() {
    if (!isFirebaseConfigured || !firebaseConfig.measurementId) {
        console.info('Firebase Analytics chưa bật. Hãy thêm measurementId GA4 trong js/services/firebaseConfig.js.');
        return;
    }

    try {
        if (!await isSupported()) {
            console.warn('Firebase Analytics không được hỗ trợ trong trình duyệt này.');
            return;
        }

        analytics = getAnalytics(getFirebaseApp());
        if (lastNavigatedTab) logPageView(lastNavigatedTab);
    } catch (error) {
        console.error('Không thể khởi tạo Firebase Analytics:', error);
    }
}

initializeAnalytics();

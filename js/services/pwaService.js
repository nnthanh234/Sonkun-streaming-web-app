let deferredInstallPrompt = null;

function initPwaInstall() {
    const installButton = document.getElementById('install-app-button');
    const isInstalled = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;

    if ('serviceWorker' in navigator && window.isSecureContext) {
        navigator.serviceWorker.register('./service-worker.js').catch(error => {
            console.error('Không thể đăng ký service worker:', error);
        });
    }

    if (isInstalled) {
        installButton.classList.add('hidden');
        return;
    }

    window.addEventListener('beforeinstallprompt', event => {
        event.preventDefault();
        deferredInstallPrompt = event;
    });

    window.addEventListener('appinstalled', () => {
        deferredInstallPrompt = null;
        installButton.classList.add('hidden');
        showToast('Đã cài ứng dụng Son Kun!');
    });

}

async function installApp() {
    if (!deferredInstallPrompt) {
        const helpModal = document.getElementById('install-help-modal');
        helpModal.classList.remove('hidden');
        helpModal.classList.add('flex');
        return;
    }

    const installPrompt = deferredInstallPrompt;
    deferredInstallPrompt = null;

    try {
        await installPrompt.prompt();
        const choice = await installPrompt.userChoice;
        if (choice.outcome === 'accepted') {
            showToast('Đang cài ứng dụng Son Kun!');
        }
    } catch (error) {
        console.error('Không thể mở lời nhắc cài ứng dụng:', error);
        showToast('Không thể mở cài đặt ứng dụng. Hãy thử menu trình duyệt.', 'error');
    }
}

function closeInstallHelp() {
    const helpModal = document.getElementById('install-help-modal');
    helpModal.classList.add('hidden');
    helpModal.classList.remove('flex');
}

let deferredInstallPrompt = null;

function isIosDevice() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent)
        || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

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
    if (deferredInstallPrompt) {
        const installPrompt = deferredInstallPrompt;
        deferredInstallPrompt = null;

        try {
            await installPrompt.prompt();
            const choice = await installPrompt.userChoice;
            if (choice.outcome === 'accepted') {
                showToast('Đang cài ứng dụng Son Kun!');
            }
            return;
        } catch (error) {
            console.error('Không thể mở lời nhắc cài ứng dụng:', error);
            showToast('Không thể mở lời nhắc cài đặt. Hãy dùng hướng dẫn cài đặt.', 'error');
        }
    }

    const iosInstructions = document.getElementById('install-help-ios');
    const androidInstructions = document.getElementById('install-help-android');
    const otherInstructions = document.getElementById('install-help-other');
    iosInstructions.classList.toggle('hidden', !isIosDevice());
    androidInstructions.classList.toggle('hidden', isIosDevice() || !/Android/i.test(navigator.userAgent));
    otherInstructions.classList.toggle('hidden', isIosDevice() || /Android/i.test(navigator.userAgent));

    const helpModal = document.getElementById('install-help-modal');
    helpModal.classList.remove('hidden');
    helpModal.classList.add('flex');
}

function closeInstallHelp() {
    const helpModal = document.getElementById('install-help-modal');
    helpModal.classList.add('hidden');
    helpModal.classList.remove('flex');
}

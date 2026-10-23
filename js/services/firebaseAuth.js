import {
    GoogleAuthProvider,
    getAdditionalUserInfo,
    getAuth,
    onAuthStateChanged,
    signInWithPopup,
    signOut
} from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js';
import { getFirebaseApp, isFirebaseConfigured } from './firebaseApp.js';

let auth = null;
let currentUser = null;

function updateAuthButtons(user) {
    const label = user?.displayName || user?.email || 'Tài khoản';
    document.getElementById('auth-button-label').textContent = user ? label : 'Đăng nhập';
    document.getElementById('auth-mobile-button-label').textContent = user ? label : 'Đăng nhập';
}

function updateAccountPanel(user) {
    const providers = document.getElementById('auth-provider-actions');
    const account = document.getElementById('auth-account-panel');
    providers.classList.toggle('hidden', Boolean(user));
    account.classList.toggle('hidden', !user);

    if (!user) return;

    document.getElementById('auth-user-name').textContent = user.displayName || 'Tài khoản Son Kun';
    document.getElementById('auth-user-email').textContent = user.email || '';

    const photo = document.getElementById('auth-user-photo');
    const icon = document.getElementById('auth-user-icon');
    if (user.photoURL) {
        photo.src = user.photoURL;
        photo.alt = `Ảnh đại diện ${user.displayName || ''}`.trim();
        photo.classList.remove('hidden');
        icon.classList.add('hidden');
    } else {
        photo.removeAttribute('src');
        photo.classList.add('hidden');
        icon.classList.remove('hidden');
    }
}

function ensureAuthConfigured() {
    if (auth) return auth;
    if (!isFirebaseConfigured) {
        showToast('Chưa cấu hình Firebase. Hãy điền Web App config trong js/services/firebaseConfig.js.', 'error');
        return null;
    }

    try {
        const app = getFirebaseApp();
        if (!app) return null;
        auth = getAuth(app);
        onAuthStateChanged(auth, user => {
            currentUser = user;
            window.getCurrentAuthUser = () => currentUser;
            document.getElementById('comment-input').placeholder = user
                ? 'Nhập cảm nghĩ của bạn về tập phim này...'
                : 'Đăng nhập Google để bình luận...';
            updateAuthButtons(user);
            updateAccountPanel(user);
        });
        return auth;
    } catch (error) {
        console.error('Không thể khởi tạo Firebase Authentication:', error);
        showToast('Không thể khởi tạo Firebase. Hãy kiểm tra Web App config.', 'error');
        return null;
    }
}

function describeAuthError(error) {
    switch (error.code) {
        case 'auth/popup-closed-by-user':
            return 'Bạn đã đóng cửa sổ xác thực trước khi hoàn tất.';
        case 'auth/popup-blocked':
            return 'Trình duyệt đã chặn cửa sổ đăng nhập. Hãy cho phép popup rồi thử lại.';
        case 'auth/unauthorized-domain':
            return 'Tên miền hiện tại chưa được thêm vào Authorized domains trong Firebase.';
        case 'auth/operation-not-allowed':
            return 'Nhà cung cấp đăng nhập này chưa được bật trong Firebase Authentication.';
        case 'auth/account-exists-with-different-credential':
            return 'Email này đã đăng ký bằng phương thức khác. Hãy đăng nhập bằng phương thức ban đầu.';
        case 'auth/network-request-failed':
            return 'Không thể kết nối dịch vụ xác thực. Kiểm tra mạng rồi thử lại.';
        default:
            console.error('Đăng nhập Firebase thất bại:', error);
            return 'Đăng nhập thất bại. Vui lòng thử lại sau.';
    }
}

async function signInWithProvider(provider) {
    const configuredAuth = ensureAuthConfigured();
    if (!configuredAuth) return;

    try {
        const result = await signInWithPopup(configuredAuth, provider);
        const additionalInfo = getAdditionalUserInfo(result);
        showToast(additionalInfo?.isNewUser ? 'Đăng ký thành công!' : 'Đăng nhập thành công!');
        closeAuthModal();
        switchTab('home');
    } catch (error) {
        showToast(describeAuthError(error), 'error');
    }
}

window.openAuthModal = () => {
    const modal = document.getElementById('auth-modal');
    updateAccountPanel(currentUser);
    modal.classList.remove('hidden');
    modal.classList.add('flex');
};

window.closeAuthModal = () => {
    const modal = document.getElementById('auth-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
};

window.signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    return signInWithProvider(provider);
};

window.signOutUser = async () => {
    const configuredAuth = ensureAuthConfigured();
    if (!configuredAuth) return;

    try {
        await signOut(configuredAuth);
        closeAuthModal();
        showToast('Đã đăng xuất.');
    } catch (error) {
        console.error('Đăng xuất Firebase thất bại:', error);
        showToast('Không thể đăng xuất. Vui lòng thử lại.', 'error');
    }
};

document.getElementById('auth-modal').addEventListener('click', event => {
    if (event.target === event.currentTarget) window.closeAuthModal();
});

document.addEventListener('keydown', event => {
    if (event.key === 'Escape') window.closeAuthModal();
});

updateAuthButtons(null);
updateAccountPanel(null);
window.getCurrentAuthUser = () => currentUser;
if (isFirebaseConfigured) ensureAuthConfigured();

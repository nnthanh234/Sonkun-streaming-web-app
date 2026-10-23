import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js';
import {
    FacebookAuthProvider,
    GoogleAuthProvider,
    getAdditionalUserInfo,
    getAuth,
    linkWithPopup,
    onAuthStateChanged,
    signInWithPopup,
    signOut
} from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js';
import { firebaseConfig } from './firebaseConfig.js';

const requiredConfigKeys = ['apiKey', 'authDomain', 'projectId', 'appId'];
const isFirebaseConfigured = requiredConfigKeys.every(key => Boolean(firebaseConfig[key]));

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

    const hasFacebookProvider = user.providerData.some(provider => provider.providerId === 'facebook.com');
    document.getElementById('auth-link-facebook-button').classList.toggle('hidden', hasFacebookProvider);
    document.getElementById('auth-facebook-linked').classList.toggle('hidden', !hasFacebookProvider);

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
        auth = getAuth(initializeApp(firebaseConfig));
        onAuthStateChanged(auth, user => {
            currentUser = user;
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

function describeLinkError(error) {
    switch (error.code) {
        case 'auth/credential-already-in-use':
            return 'Tài khoản Facebook này đã được liên kết với một tài khoản Son Kun khác.';
        case 'auth/provider-already-linked':
            return 'Tài khoản Facebook đã được liên kết với tài khoản Son Kun này.';
        case 'auth/requires-recent-login':
            return 'Phiên đăng nhập đã cũ. Hãy đăng nhập lại rồi thử liên kết Facebook.';
        case 'auth/popup-closed-by-user':
            return 'Bạn đã đóng cửa sổ Facebook trước khi hoàn tất liên kết.';
        case 'auth/popup-blocked':
            return 'Trình duyệt đã chặn cửa sổ Facebook. Hãy cho phép popup rồi thử lại.';
        case 'auth/unauthorized-domain':
            return 'Tên miền hiện tại chưa được thêm vào Authorized domains trong Firebase.';
        case 'auth/operation-not-allowed':
            return 'Facebook chưa được bật trong Firebase Authentication.';
        case 'auth/network-request-failed':
            return 'Không thể kết nối dịch vụ xác thực. Kiểm tra mạng rồi thử lại.';
        default:
            return 'Không thể liên kết Facebook. Vui lòng thử lại sau.';
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
window.signInWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    return signInWithProvider(provider);
};

window.linkFacebookAccount = async () => {
    const configuredAuth = ensureAuthConfigured();
    if (!configuredAuth) return;
    if (!configuredAuth.currentUser) {
        showToast('Hãy đăng nhập bằng phương thức đang dùng trước khi liên kết Facebook.', 'error');
        return;
    }

    try {
        const result = await linkWithPopup(configuredAuth.currentUser, new FacebookAuthProvider());
        currentUser = result.user;
        updateAuthButtons(currentUser);
        updateAccountPanel(currentUser);
        showToast('Đã liên kết Facebook với tài khoản Son Kun.');
    } catch (error) {
        console.error('Liên kết Facebook thất bại:', error);
        showToast(describeLinkError(error), 'error');
    }
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
if (isFirebaseConfigured) ensureAuthConfigured();

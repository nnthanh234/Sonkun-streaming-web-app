import { getApp, getApps, initializeApp } from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js';
import { firebaseConfig } from './firebaseConfig.js';

const requiredConfigKeys = ['apiKey', 'authDomain', 'projectId', 'appId'];
export const isFirebaseConfigured = requiredConfigKeys.every(key => Boolean(firebaseConfig[key]));

export function getFirebaseApp() {
    if (!isFirebaseConfigured) return null;
    return getApps().length ? getApp() : initializeApp(firebaseConfig);
}

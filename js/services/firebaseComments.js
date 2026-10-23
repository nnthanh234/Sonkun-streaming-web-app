import {
    addDoc,
    collection,
    getFirestore,
    limit,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp
} from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js';
import { getFirebaseApp } from './firebaseApp.js';

let firestore = null;

function getCommentsDatabase() {
    if (firestore) return firestore;

    const app = getFirebaseApp();
    if (!app) throw new Error('Firebase chưa được cấu hình.');

    firestore = getFirestore(app);
    return firestore;
}

function getEpisodeCommentsCollection(movieId, episodeIndex) {
    if (typeof movieId !== 'string' || !/^[a-z0-9-]+$/i.test(movieId)) {
        throw new TypeError('Mã phim không hợp lệ.');
    }
    if (!Number.isInteger(episodeIndex) || episodeIndex < 0) {
        throw new TypeError('Số tập không hợp lệ.');
    }

    return collection(
        getCommentsDatabase(),
        'movieComments',
        movieId,
        'episodes',
        String(episodeIndex),
        'comments'
    );
}

window.subscribeToEpisodeComments = (movieId, episodeIndex, onComments, onError) => {
    try {
        const commentsQuery = query(
            getEpisodeCommentsCollection(movieId, episodeIndex),
            orderBy('createdAt', 'desc'),
            limit(100)
        );

        return onSnapshot(
            commentsQuery,
            snapshot => {
                const comments = snapshot.docs.map(commentDocument => {
                    const data = commentDocument.data();
                    return {
                        id: commentDocument.id,
                        authorName: data.authorName,
                        text: data.text,
                        createdAt: data.createdAt?.toDate() || null
                    };
                });
                onComments(comments);
            },
            onError
        );
    } catch (error) {
        onError(error);
        return null;
    }
};

window.saveEpisodeComment = async (movieId, episodeIndex, comment) => {
    if (!comment.authorUid || typeof comment.text !== 'string' || !comment.text.trim()) {
        throw new TypeError('Nội dung hoặc tài khoản bình luận không hợp lệ.');
    }

    await addDoc(getEpisodeCommentsCollection(movieId, episodeIndex), {
        authorUid: comment.authorUid,
        authorName: String(comment.authorName || 'Người dùng').slice(0, 60),
        text: comment.text.trim().slice(0, 1000),
        createdAt: serverTimestamp()
    });
};

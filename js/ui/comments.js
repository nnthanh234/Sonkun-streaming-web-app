/* ==========================================================================
   COMMENT SYSTEM
   ========================================================================== */
let unsubscribeFromComments = null;
let activeCommentKey = null;

function formatCommentTime(timestamp) {
    if (!timestamp) return 'Vừa gửi';

    return new Intl.DateTimeFormat('vi-VN', {
        dateStyle: 'short',
        timeStyle: 'short'
    }).format(timestamp);
}

function renderCommentList(list, comments) {
    list.replaceChildren();

    if (comments.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.className = 'text-center text-xs text-gray-500 py-3';
        emptyMessage.textContent = 'Chưa có bình luận nào cho tập này.';
        list.appendChild(emptyMessage);
        return;
    }

    for (const comment of comments) {
        const card = document.createElement('div');
        card.className = 'bg-db-gray/80 p-2.5 rounded-xl text-xs space-y-1 border border-gray-800';

        const header = document.createElement('div');
        header.className = 'flex justify-between gap-3 font-bold';

        const author = document.createElement('span');
        author.className = 'text-db-gold break-all';
        author.textContent = comment.authorName || 'Người dùng';

        const time = document.createElement('span');
        time.className = 'text-gray-500 text-[10px] shrink-0';
        time.textContent = formatCommentTime(comment.createdAt);

        const text = document.createElement('p');
        text.className = 'text-gray-300 whitespace-pre-wrap break-words';
        text.textContent = comment.text;

        header.append(author, time);
        card.append(header, text);
        list.appendChild(card);
    }
}

function renderComments() {
    const list = document.getElementById('comment-list');
    if (!state.currentMovie) return;

    const movieId = state.currentMovie.id;
    const episodeIndex = state.currentEpIndex;
    const key = `${movieId}_ep_${episodeIndex}`;
    activeCommentKey = key;

    if (unsubscribeFromComments) {
        unsubscribeFromComments();
        unsubscribeFromComments = null;
    }

    list.textContent = 'Đang tải bình luận...';

    if (typeof window.subscribeToEpisodeComments !== 'function') {
        list.textContent = 'Không thể kết nối dịch vụ bình luận. Hãy tải lại trang.';
        return;
    }

    unsubscribeFromComments = window.subscribeToEpisodeComments(
        movieId,
        episodeIndex,
        comments => {
            if (activeCommentKey !== key) return;
            renderCommentList(list, comments);
        },
        error => {
            if (activeCommentKey !== key) return;
            console.error('Không thể tải bình luận Firestore:', error);
            list.textContent = 'Không thể tải bình luận. Vui lòng thử lại sau.';
        }
    );
}

window.stopCommentsSubscription = () => {
    activeCommentKey = null;
    if (unsubscribeFromComments) {
        unsubscribeFromComments();
        unsubscribeFromComments = null;
    }
};

async function addComment() {
    const input = document.getElementById('comment-input');
    const text = input.value.trim();
    if (!text || !state.currentMovie) return;

    if (text.length > 1000) {
        showToast('Bình luận không được dài quá 1000 ký tự.', 'error');
        return;
    }

    const user = window.getCurrentAuthUser?.();
    if (!user) {
        showToast('Hãy đăng nhập Google để gửi bình luận.', 'error');
        window.openAuthModal();
        return;
    }

    const button = input.parentElement.querySelector('button');
    button.disabled = true;

    try {
        await window.saveEpisodeComment(state.currentMovie.id, state.currentEpIndex, {
            text,
            authorUid: user.uid,
            authorName: user.displayName || user.email?.split('@')[0] || 'Người dùng'
        });
        input.value = '';
        showToast('Đã gửi bình luận của bạn!');
    } catch (error) {
        console.error('Không thể lưu bình luận Firestore:', error);
        showToast('Không thể gửi bình luận. Hãy kiểm tra kết nối và thử lại.', 'error');
    } finally {
        button.disabled = false;
    }
}

window.addEventListener('beforeunload', () => {
    window.stopCommentsSubscription();
});

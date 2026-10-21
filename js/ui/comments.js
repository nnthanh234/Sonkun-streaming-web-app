/* ==========================================================================
   COMMENT SYSTEM
   ========================================================================== */
function renderComments() {
    const list = document.getElementById('comment-list');
    if (!state.currentMovie) return;

    const key = `${state.currentMovie.id}_ep_${state.currentEpIndex}`;
    const comments = state.comments[key] || [
        { user: 'Goku_Saiyan_God', text: 'Tập Dragon Ball Z Kai này xem mượt thực sự, âm thanh remastered đỉnh cao!', time: '5 phút trước' },
        { user: 'Vegeta_Prince', text: 'Kakarot hãy đợi đấy, tập sau ta sẽ vượt qua ngươi!', time: '18 phút trước' }
    ];

    list.innerHTML = comments.map(c => `
        <div class="bg-db-gray/80 p-2.5 rounded-xl text-xs space-y-1 border border-gray-800">
            <div class="flex justify-between font-bold">
                <span class="text-db-gold"><i class="fa-solid fa-user-ninja mr-1"></i> ${c.user}</span>
                <span class="text-gray-500 text-[10px]">${c.time}</span>
            </div>
            <p class="text-gray-300">${c.text}</p>
        </div>
    `).join('');
}

function addComment() {
    const input = document.getElementById('comment-input');
    const text = input.value.trim();
    if (!text || !state.currentMovie) return;

    const key = `${state.currentMovie.id}_ep_${state.currentEpIndex}`;
    if (!state.comments[key]) state.comments[key] = [];

    state.comments[key].unshift({
        user: 'Ki_Fan_DragonBall',
        text: text,
        time: 'Vừa xong'
    });

    StorageService.writeJSON('db_comments', state.comments);
    input.value = '';
    renderComments();
    showToast('Đã gửi bình luận của bạn!');
}

/* ==========================================================================
   TOAST NOTIFICATION
   ========================================================================== */
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');

    const bgClass = type === 'success' ? 'bg-db-orange text-black' : 'bg-gray-800 text-white border border-gray-700';

    toast.className = `${bgClass} px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-xs sm:text-sm font-black transition-all duration-300 transform translate-y-5 opacity-0 z-50`;
    toast.innerHTML = `
        <i class="fa-solid fa-dragon text-base"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove('translate-y-5', 'opacity-0');
    }, 10);

    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-5');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

const StorageService = {
    readJSON(key, fallback) {
        const value = localStorage.getItem(key);
        if (value === null) return fallback;

        try {
            return JSON.parse(value) ?? fallback;
        } catch (error) {
            console.error(`Không thể đọc dữ liệu "${key}" từ bộ nhớ cục bộ:`, error);
            return fallback;
        }
    },

    writeJSON(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

/* ==========================================================================
   20 EPISODES OF DRAGON BALL Z KAI DATASET
   ========================================================================== */
const DBZ_KAI_EPISODES = [
    { ep: 1, title: 'Màn Mở Đầu Trận Chiến! Goku Trở Lại Cùng Raditz', duration: '23 phút', thumb: 'https://cdncloudsw.com/wp-content/uploads/2026/01/6cd34d8531db34f1561c0b5c6622ec7f.jpg', videoUrl: 'https://player.mediadelivery.net/embed/785756/1a473a02-9553-40cf-a354-4f08a4483323?autoplay=false', desc: 'Raditz - anh trai của Goku giọt máu Saiyan cập bến Trái Đất và hé lộ thân thế thực sự của Songoku!' },
    { ep: 2, title: 'Kẻ Thù Chung! Goku Và Piccolo Hợp Lực', duration: '24 phút', thumb: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80', videoUrl: 'https://player.mediadelivery.net/embed/785756/4e05f5f4-92b1-4edf-89f1-ab29ef07cd47?autoplay=false', desc: 'Goku và Đại Ma Vương Piccolo gạt bỏ tư thù hợp sức tiêu diệt mối hiểm họa Raditz.' },
    { ep: 3, title: 'Tuyệt Chiêu Ma Khuẫn Cung! Sự Hy Sinh Của Goku', duration: '22 phút', thumb: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=400&q=80', videoUrl: 'https://player.mediadelivery.net/embed/785756/7fe6913f-d54d-4eac-bf5a-2eb090205db0?autoplay=false', desc: 'Piccolo tung chiêu Ma Khuẫn Cung xuyên phá raditz và Goku chấp nhận hy sinh giữ chân kẻ thù.' },
    { ep: 4, title: 'Chạy Trên Con Đường Rồng! Luyện Tập Ở Âm Phủ', duration: '23 phút', thumb: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=400&q=80', videoUrl: 'https://player.mediadelivery.net/embed/785756/40205955-c79e-4d5b-ad95-a5e68dfe63a5?autoplay=false', desc: 'Goku bắt đầu cuộc chạy đua trên con đường rồng dài 1 triệu km để bái sư Thần Kaio.' },
    { ep: 5, title: 'Piccolo Huấn Luyện Gohan! Khai Phá Sức Mạnh Sơ Sinh', duration: '24 phút', thumb: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=400&q=80', videoUrl: 'https://player.mediadelivery.net/embed/785756/b0f707f4-0df1-4f6c-a941-5288329710fd?autoplay=false', desc: 'Piccolo nhận Gohan làm đệ tử và rèn luyện cậu bé trong hoang mạc khắc nghiệt.' },
    { ep: 6, title: 'Hạn Định 1 Năm! Hai Chiến Binh Saiyan Đáp Xuống', duration: '23 phút', thumb: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80', videoUrl: 'https://player.mediadelivery.net/embed/785756/0c93927f-51d1-4ab0-a368-c3762a893e36?autoplay=false', desc: 'Vegeta và Nappa đáp xuống Trái Đất, gieo rắc nỗi kinh hoàng cho các chiến binh Z.' },
    { ep: 7, title: 'Quái Vật Saibaman! Trận Chiến Khốc Liệt', duration: '22 phút', thumb: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=400&q=80', videoUrl: 'https://player.mediadelivery.net/embed/785756/fdacb934-2a8a-47be-acd7-e1a253f52df9?autoplay=false', desc: 'Nappa gieo hạt giống quái vật Saibaman thách thức Yamcha, Krillin, Tien và Chaozu.' },
    { ep: 8, title: 'Cơn Giận Của Nappa! Sự Hy Sinh Của Các Bạn Bè', duration: '24 phút', thumb: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80', videoUrl: 'https://player.mediadelivery.net/embed/785756/1288ee3f-9d31-49df-8bf8-a0c700380bbb?autoplay=false', desc: 'Sức mạnh áp đảo của Nappa khiến từng chiến binh Z ngã xuống bảo vệTrái Đất.' },
    { ep: 9, title: 'Goku Hồi Sinh! Tuyệt Kỹ Kaio-ken Xuất Trận', duration: '23 phút', thumb: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=400&q=80', videoUrl: 'https://player.mediadelivery.net/embed/785756/6eb9d22d-215b-4c61-bde4-06d24103a245?autoplay=false', desc: 'Goku hoàn tất con đường rồng trở lại Trái Đất thi triển Kaio-ken đánh gục Nappa.' },
    { ep: 10, title: 'Đại Chiến Hoàng Gia! Goku VS Hoàng Tử Vegeta', duration: '25 phút', thumb: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=400&q=80', videoUrl: 'https://player.mediadelivery.net/embed/785756/31e81331-66fa-4223-a557-3f0653a8b8d6?autoplay=false', desc: 'Trận so tài kinh điển giữa hai chiến binh Saiyan thuần chủng rung chuyển mặt đất.' },
    { ep: 11, title: 'Kaio-ken Gấp 4 Lần! Trận Đấu Kamehameha Và Galick Gun', duration: '23 phút', thumb: 'https://cdncloudsw.com/wp-content/uploads/2026/01/6cd34d8531db34f1561c0b5c6622ec7f.jpg', videoUrl: 'https://player.mediadelivery.net/embed/785756/80c77328-e1f0-4e51-a2c1-3c97bbd29489?autoplay=false', desc: 'Raditz - anh trai của Goku giọt máu Saiyan cập bến Trái Đất và hé lộ thân thế thực sự của Songoku!' },
    { ep: 12, title: 'Biến Hình Đại Hầu! Vegeta Hóa Rồng Khổng Lồ', duration: '24 phút', thumb: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80', videoUrl: 'https://player.mediadelivery.net/embed/785756/a5d2cda5-de81-462a-9c71-baa4ce84b4cb?autoplay=false', desc: 'Goku bộc phát Kaio-ken x4 đấu chưởng cùng đòn Galick Gun hủy diệt của Vegeta.' },
    { ep: 13, title: 'Quả Cầu Kinh Khi Quả! Hy Vọng Cuối Cùng Của Trái Đất', duration: '23 phút', thumb: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=400&q=80', videoUrl: 'https://player.mediadelivery.net/embed/785756/dfbcb75b-ef1c-47eb-afdb-ae13510a850d?autoplay=false', desc: 'Vegeta tạo Mặt Trăng nhân tạo biến thành Khỉ Đột khổng lồ đè bẹp Goku.' },
    { ep: 14, title: 'Hành Trình Đến Namek! Khát Vọng Hồi Sinh Bạn Bè', duration: '24 phút', thumb: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80', videoUrl: 'https://player.mediadelivery.net/embed/785756/4a1440b2-9666-4020-a3ae-6f984be0efb2?autoplay=false', desc: 'Goku truyền Quả Cầu Genki cho Krillin để giáng đòn quyết định vào Vegeta.' },
    { ep: 15, title: 'Bạo Chúa Frieza Xuất Hiện! Cuộc Săn Tìm Ngọc Rồng Namek', duration: '22 phút', thumb: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=400&q=80', videoUrl: 'https://player.mediadelivery.net/embed/785756/7bdf2461-8f40-4762-8b78-d76320f4382e?autoplay=false', desc: 'Gohan, Krillin và Bulma cất cánh tàu vũ trụ đến hành tinh Namek tìm Ngọc Rồng gốc.' },
    { ep: 16, title: 'Đội Sát Thủ Ginyu! Lực Lượng Đặc Nhiệm Vũ Trụ', duration: '23 phút', thumb: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=400&q=80', videoUrl: 'https://player.mediadelivery.net/embed/785756/a24cec6c-5438-41f3-a54a-f2542bd95887?autoplay=false', desc: 'Kẻ độc tài vũ trụ Frieza cùng quân đoàn tàn sát làng mạc Namek để đạt sự bất tử.' },
    { ep: 17, title: 'Goku Đáp Xuống Namek! Sức Mạnh Siêu Mức Lực Chiến', duration: '24 phút', thumb: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=400&q=80', videoUrl: 'https://player.mediadelivery.net/embed/785756/c4c5737c-1661-4f28-aeca-d92591deca5c?autoplay=false', desc: 'Frieza triệu tập Đội Sát Thủ Ginyu tinh nhuệ nhất tới Namek thu hồi 7 Viên Ngọc Rồng.' },
    { ep: 18, title: 'Thần Rồng Porunga! Lời Ước Trên Hành Tinh Namek', duration: '23 phút', thumb: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80', videoUrl: 'https://player.mediadelivery.net/embed/785756/1fe12263-4d59-48a7-8215-ea8950b47bd9?autoplay=false', desc: 'Goku luyện tập trong trọng lực x100 đáp xuống Namek hạ gục dễ dàng Recoom và Burter.' },
    { ep: 19, title: 'Frieza Biến Hình 100%! Trận Chiến Sinh Tử Với Goku', duration: '24 phút', thumb: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=400&q=80', videoUrl: 'https://player.mediadelivery.net/embed/785756/69d6bc91-a691-4f65-8093-978d52304940?autoplay=false', desc: 'Triệu hồi Rồng Thần Porunga của Namek với 3 điều ước hồi sinh Piccolo.' },
    { ep: 20, title: 'Super Saiyan Huyền Thoại Thức Tỉnh! Goku Vượt Giới Hạn', duration: '25 phút', thumb: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80', videoUrl: 'https://player.mediadelivery.net/embed/785756/aa0fde50-b576-49f5-b8f8-053a201a659a?autoplay=false', desc: 'Frieza bộc phát 100% sức mạnh tối đa giao đấu giáp lá lá cùng Songoku.' },
];

/* ==========================================================================
   DRAGON BALL DATABASE
   ========================================================================== */
const DRAGON_BALL_DATABASE = [
    {
        id: 'dbz-kai',
        title: 'Dragon Ball Z Kai (Bảy Viên Ngọc Rồng Z Kai)',
        saga: 'Dragon Ball Z Kai',
        rating: 9.8,
        year: 2009,
        totalEpisodes: 20,
        poster: 'https://dbPoster.b-cdn.net/zk.png',
        backdrop: 'https://dbPoster.b-cdn.net/zk.png',
        videoUrl: 'https://www.youtube.com/embed/L3oOldwaOXE?autoplay=1',
        description: 'Bản nâng cấp remastered HD đặc biệt cắt gọt mạch phim dồn dập hấp dẫn, tập trung trọn vẹn vào các cuộc đọ sức kinh điển giữa Goku và dàn đối thủ huyền thoại Raditz, Nappa, Vegeta & Frieza!',
        isHot: true,
        episodesList: DBZ_KAI_EPISODES
    },
    {
        id: 'db-super-hero',
        isComingSoon: true,
        title: 'Dragon Ball Super: Super Hero',
        saga: 'Dragon Ball Movies',
        rating: 9.6,
        year: 2022,
        totalEpisodes: 1,
        poster: 'https://dbPoster.b-cdn.net/hero.png',
        backdrop: 'https://dbPoster.b-cdn.net/hero.png',
        videoUrl: 'https://www.youtube.com/embed/JtqIas3bYhg?autoplay=1',
        description: 'Băng Đảng Ruy Băng Đỏ tái sinh tạo ra Gamma 1 & Gamma 2. Gohan và Piccolo phải thức tỉnh trạng thái Beast mới để bảo vệ Trái Đất!',
        isHot: true,
        episodesList: [
            { ep: 1, title: 'Full Movie HD - Siêu Anh Hùng Beast Gohan', duration: '99 phút', videoUrl: 'https://www.youtube.com/embed/JtqIas3bYhg?autoplay=1', desc: 'Full Phim Điện Ảnh Dragon Ball Super: Super Hero HD Vietsub' }
        ]
    },
    {
        id: 'dbs-broly',
        isComingSoon: true,
        title: 'Dragon Ball Super: Broly',
        saga: 'Dragon Ball Movies',
        rating: 9.9,
        year: 2018,
        totalEpisodes: 1,
        poster: 'https://dbPoster.b-cdn.net/bro.png',
        backdrop: 'https://dbPoster.b-cdn.net/bro.png',
        videoUrl: 'https://www.youtube.com/embed/FHgm89h-_Bw?autoplay=1',
        description: 'Trận chiến nghẹt thở giữa Goku, Vegeta và Siêu Saiyan huyền thoại Broly với hiệu ứng hình ảnh hoành tráng hàng đầu anime!',
        isHot: true,
        episodesList: [
            { ep: 1, title: 'Full Movie HD - Broly Siêu Saiyan Huyền Thoại', duration: '100 phút', videoUrl: 'https://www.youtube.com/embed/FHgm89h-_Bw?autoplay=1', desc: 'Full Phim Điện Ảnh Dragon Ball Super Broly HD' }
        ]
    },
    {
        id: 'dbz-original',
        isComingSoon: true,
        title: 'Dragon Ball Z (Gốc 1989)',
        saga: 'Dragon Ball Z',
        rating: 9.7,
        year: 1989,
        totalEpisodes: 291,
        poster: 'https://dbPoster.b-cdn.net/z.png',
        backdrop: 'https://dbPoster.b-cdn.net/z.png',
        videoUrl: 'https://www.youtube.com/embed/L3oOldwaOXE?autoplay=1',
        description: 'Series kinh điển trải dài qua Saiyan Saga, Frieza Namek, Cell Game, và Ma Nhân Buu!',
        isHot: false,
        episodesList: Array.from({ length: 10 }, (_, i) => ({
            ep: i + 1,
            title: `Tập ${i + 1}: ${['Anh Trai Raditz', 'Đại Chiến Vegeta', 'Hành Trình Namek', 'Goku Super Saiyan 1', 'Cell Game Bắt Đầu', 'Gohan SSJ2'][i % 6]}`,
            duration: '24 phút',
            videoUrl: 'https://www.youtube.com/embed/L3oOldwaOXE?autoplay=1',
            desc: `Tập ${i + 1} thuộc bản truyền hình Dragon Ball Z gốc.`
        }))
    },
    {
        id: 'db-classic',
        isComingSoon: true,
        title: 'Dragon Ball (Tuổi Thơ Goku)',
        saga: 'Dragon Ball Original',
        rating: 9.3,
        year: 1986,
        totalEpisodes: 153,
        poster: 'https://dbPoster.b-cdn.net/db.png',
        backdrop: 'https://dbPoster.b-cdn.net/hero.png',
        videoUrl: 'https://www.youtube.com/embed/NLOp_6uPccI?autoplay=1',
        description: 'Hành trình tầm nã 7 Viên Ngọc Rồng thời niên thiếu của Goku, Bulma, Quy Lão Kame và Đại Hội Võ Thuật!',
        isHot: false,
        episodesList: Array.from({ length: 8 }, (_, i) => ({
            ep: i + 1,
            title: `Tập ${i + 1}: ${['Goku & Bulma', 'Bái Sư Quy Lão', 'Đại Hội Võ Thuật 21', 'Ruy Băng Đỏ', 'Đại Ma Vương Piccolo'][i % 5]}`,
            duration: '22 phút',
            videoUrl: 'https://www.youtube.com/embed/NLOp_6uPccI?autoplay=1',
            desc: `Cùng xem lại hành trình tuổi thơ trong tập ${i + 1}.`
        }))
    },
    {
        id: 'db-gt',
        isComingSoon: true,
        title: 'Dragon Ball GT (Ngọc Rồng Đen)',
        saga: 'Dragon Ball GT',
        rating: 8.6,
        year: 1996,
        totalEpisodes: 64,
        poster: 'https://dbPoster.b-cdn.net/gt.png',
        backdrop: 'https://dbPoster.b-cdn.net/gt.png',
        videoUrl: 'https://www.youtube.com/embed/s0wNd9e_S0A?autoplay=1',
        description: 'Chuyến du hành vũ trụ thu thập Ngọc Rồng Đen và sự xuất hiện của trạng thái Super Saiyan 4 ngầu nhất lịch sử!',
        isHot: false,
        episodesList: Array.from({ length: 6 }, (_, i) => ({
            ep: i + 1,
            title: `Tập ${i + 1}: ${['Goku Biến Thành Trẻ Con', 'Phi Thuyền Du Hành', 'Thảm Họa Baby', 'Super Saiyan 4 Khai Phá'][i % 4]}`,
            duration: '23 phút',
            videoUrl: 'https://www.youtube.com/embed/s0wNd9e_S0A?autoplay=1',
            desc: `Tập ${i + 1} của phần Dragon Ball GT.`
        }))
    }
];

const SAGAS = ['Tất Cả', 'Dragon Ball Z Kai', 'Dragon Ball Z', 'Dragon Ball Original', 'Dragon Ball GT', 'Dragon Ball Movies'];

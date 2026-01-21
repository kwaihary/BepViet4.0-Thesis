import React, { useState, useEffect } from 'react'; // 1. Import Hooks
import { useNavigate } from "react-router-dom";
import BaiViet from './BaiViet';
import { CallAPI } from '../../JS/API/API'; // 2. Import hàm gọi API (đường dẫn tùy cấu trúc folder của bạn)

function ThongTinBaiViet() {
    const navigate = useNavigate();
    
    // 3. Khởi tạo State để lưu trữ dữ liệu
    const [posts, setPosts] = useState([]); // Lưu danh sách bài viết
    const [isLoading, setIsLoading] = useState(true); // Trạng thái đang tải

    // 4. Gọi API khi component được mount (tải lần đầu)
   useEffect(() => {
    const fetchData = async () => {
        try {
            const res = await CallAPI(null, { url: 'recipes', PhuongThuc: 2 });
            
            // --- THÊM DÒNG NÀY ĐỂ DEBUG ---
            console.log("Dữ liệu API trả về:", res); 
            // -----------------------------

            if (res.status) {
                // Kiểm tra xem dữ liệu nằm ở 'data' hay 'data.data' (do phân trang)
                const realData = res.data.data ? res.data.data : res.data;
                console.log("Dữ liệu sau khi xử lý:", realData);
                setPosts(realData);
            }
        } catch (error) {
            console.error("Lỗi:", error);
        } finally {
            setIsLoading(false);
        }
    };
    fetchData();
}, []);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* --- CỘT TRÁI: DANH SÁCH BÀI VIẾT --- */}
            <div className="lg:col-span-2 space-y-4">
                
                {/* Khu vực đăng bài */}
                <div className="bg-white rounded-xl shadow-sm p-4">
                    <div className="flex gap-3 mb-3">
                        {/* Avatar người dùng đang đăng nhập (tạm thời để cứng hoặc lấy từ LocalStorage) */}
                        <img src="https://ui-avatars.com/api/?name=Me" className="w-10 h-10 rounded-full border border-gray-200" alt="Avatar" />
                        <button 
                            onClick={() => navigate('/dang-bai')}
                            className="flex-1 bg-gray-100 rounded-full px-4 text-left text-gray-500 hover:bg-gray-200 transition text-sm"
                        >
                            Bạn vừa nấu món gì ngon thế?
                        </button>
                    </div>
                    <div className="flex justify-between border-t pt-3 px-2">
                        <button onClick={() => navigate('/dang-bai')} className="flex items-center gap-2 text-gray-500 text-sm hover:bg-gray-50 px-3 py-1 rounded-lg transition">
                            <i className="fa-solid fa-image text-green-500"></i> Ảnh/Video
                        </button>
                        <button className="flex items-center gap-2 text-gray-500 text-sm hover:bg-gray-50 px-3 py-1 rounded-lg transition">
                            <i className="fa-solid fa-face-smile text-yellow-500"></i> Cảm xúc
                        </button>
                    </div>
                </div>

                {/* HIỂN THỊ DANH SÁCH BÀI VIẾT HOẶC LOADING */}
                {isLoading ? (
                    // Skeleton Loading (Hiệu ứng khi đang tải)
                    <div className="space-y-4">
                        {[1, 2].map((i) => (
                            <div key={i} className="bg-white rounded-xl p-4 shadow-sm animate-pulse">
                                <div className="flex gap-3 mb-4">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                        <div className="h-3 bg-gray-200 rounded w-1/6"></div>
                                    </div>
                                </div>
                                <div className="h-40 bg-gray-200 rounded-xl mb-4"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    // Component hiển thị bài viết đã viết xong logic
                    <BaiViet data={posts}/>
                )}
            </div>

            {/* --- CỘT PHẢI: GỢI Ý --- */}
            <aside className="hidden lg:block lg:col-span-1">
                <div className="sticky top-24">
                    <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
                        <h3 className="font-bold text-gray-800 mb-3">Gợi ý hôm nay</h3>
                        <div className="flex gap-3 mb-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition">
                            <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836" alt="Suggestion" className="w-16 h-16 rounded-lg object-cover" />
                            <div>
                                <h4 className="text-sm font-bold line-clamp-2 text-gray-700">Sườn xào chua ngọt</h4>
                                <span className="text-xs text-orange-500 font-semibold"><i className="fa-solid fa-fire"></i> 450 Kcal</span>
                            </div>
                        </div>
                        <button onClick={() => navigate('/AI')} className="w-full py-2.5 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition transform active:scale-95">
                            <i className="fa-solid fa-robot mr-2"></i> Hỏi AI xem ăn gì?
                        </button>
                    </div>
                </div>
            </aside>
        </div>
    );
};

export default ThongTinBaiViet;
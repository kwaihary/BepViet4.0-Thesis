import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import BaiViet from './BaiViet';
import * as API from '../../JS/API/API';

function ThongTinBaiViet() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // 1. Hàm gọi API lấy danh sách bài viết
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                // Phương thức 2 thường là GET trong cấu trúc của bạn
                const res = await API.CallAPI(null, { url: 'recipes', PhuongThuc: 2 });
                
                if (res && res.status !== false) {
                    // Xử lý trường hợp có phân trang (res.data.data) hoặc mảng thuần (res.data)
                    const rawData = res.data?.data || res.data || res;
                    
                    // Chuẩn hóa dữ liệu (Fix đường dẫn ảnh nếu cần)
                    const fixedData = Array.isArray(rawData) ? rawData.map(post => ({
                        ...post,
                        image: post.image_url 
                            ? (post.image_url.startsWith('http') ? post.image_url : `http://127.0.0.1:8000/storage/${post.image_url}`)
                            : post.image // Fallback nếu field tên là image
                    })) : [];

                    setPosts(fixedData);
                }
            } catch (error) {
                console.error("Lỗi thực thi API:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 max-w-7xl mx-auto">
            {/* --- CỘT TRÁI & GIỮA (NỘI DUNG CHÍNH) --- */}
            <div className="lg:col-span-2 space-y-6">
                
                {/* Khu vực đăng bài nhanh */}
                <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                    <div className="flex gap-3 mb-3">
                        <img src="https://ui-avatars.com/api/?name=Me&background=random" className="w-10 h-10 rounded-full border border-gray-200" alt="Avatar" />
                        <button 
                            onClick={() => navigate('/dang-bai')}
                            className="flex-1 bg-gray-100 rounded-full px-4 text-left text-gray-500 hover:bg-gray-200 transition text-sm"
                        >
                            Bạn vừa nấu món gì ngon thế?
                        </button>
                    </div>
                    <div className="flex justify-between border-t pt-3">
                        <button onClick={() => navigate('/dang-bai')} className="flex items-center gap-2 text-gray-500 text-sm hover:bg-gray-50 px-4 py-2 rounded-lg transition">
                            <i className="fa-solid fa-image text-green-500"></i> <span className="font-medium">Ảnh/Video</span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-500 text-sm hover:bg-gray-50 px-4 py-2 rounded-lg transition">
                            <i className="fa-solid fa-face-smile text-yellow-500"></i> <span className="font-medium">Cảm xúc</span>
                        </button>
                    </div>
                </div>

                {/* Danh sách bài viết */}
                {isLoading ? (
                    // Skeleton Loading Effect
                    <div className="space-y-6">
                        {[1, 2].map((i) => (
                            <div key={i} className="bg-white rounded-xl p-4 shadow-sm animate-pulse border border-gray-100">
                                <div className="flex gap-3 mb-4">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                        <div className="h-3 bg-gray-200 rounded w-1/6"></div>
                                    </div>
                                </div>
                                <div className="h-64 bg-gray-100 rounded-xl mb-4"></div>
                                <div className="space-y-2">
                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <BaiViet data={posts} />
                )}
            </div>

            {/* --- CỘT PHẢI (GỢI Ý & TIỆN ÍCH) --- */}
            <aside className="hidden lg:block lg:col-span-1">
                <div className="sticky top-24 space-y-4">
                    <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <i className="fa-solid fa-wand-magic-sparkles text-orange-500"></i>
                            Gợi ý hôm nay
                        </h3>
                        
                        <div className="flex gap-3 mb-4 cursor-pointer hover:bg-orange-50 p-2 rounded-xl transition group">
                            <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836" alt="Suggestion" className="w-20 h-20 rounded-lg object-cover shadow-sm" />
                            <div>
                                <h4 className="text-sm font-bold line-clamp-2 text-gray-700 group-hover:text-orange-600 transition">Sườn xào chua ngọt chuẩn vị</h4>
                                <span className="text-xs text-orange-500 font-semibold mt-1 block">
                                    <i className="fa-solid fa-fire"></i> 450 Kcal
                                </span>
                            </div>
                        </div>

                        <button 
                            onClick={() => navigate('/AI')} 
                            className="w-full py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold text-sm shadow-md hover:shadow-orange-200 hover:scale-[1.02] transition transform active:scale-95 flex items-center justify-center gap-2"
                        >
                            <i className="fa-solid fa-robot"></i> Hỏi AI xem ăn gì?
                        </button>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 text-center">
                        <p className="text-xs text-gray-400">Chính sách • Quyền riêng tư • Cookpad © 2024</p>
                    </div>
                </div>
            </aside>
        </div>
    );
}

export default ThongTinBaiViet;
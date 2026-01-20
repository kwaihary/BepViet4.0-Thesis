import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 1. Phải import
import axios from "axios";
import BaiViet from './BaiViet';

function ThongTinBaiViet() {
    const navigate = useNavigate(); // 2. Phải khai báo biến navigate ở đây
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Hàm lấy dữ liệu từ DB (thông qua API)
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/get-all-posts");
                
                // Log ra để xem cấu trúc thực tế là gì
                console.log("Response từ Laravel:", response.data);

                // Nếu bạn trả về return response()->json(['status'=>true, 'data'=>$recipes])
                // Thì dữ liệu nằm ở response.data.data
                if (response.data && response.data.data) {
                    setPosts(response.data.data);
                } else {
                    // Trường hợp trả về thẳng mảng
                    setPosts(response.data);
                }
                
                setLoading(false);
            } catch (error) {
                console.error("Lỗi kết nối:", error);
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* --- CỘT TRÁI: DANH SÁCH BÀI VIẾT --- */}
            <div className="lg:col-span-2 space-y-4">
                
                {/* Khu vực đăng bài */}
                <div className="bg-white rounded-xl shadow-sm p-4">
                    <div className="flex gap-3 mb-3">
                        <img src="https://i.pravatar.cc/150?img=32" className="w-10 h-10 rounded-full" alt="Avatar" />
                        <button 
                            onClick={() => navigate('/dang-bai')} // Lỗi Line 51 đã được sửa
                            className="flex-1 bg-gray-100 rounded-full px-4 text-left text-gray-500 hover:bg-gray-200 transition"
                        >
                            Bạn vừa nấu món gì ngon thế?
                        </button>
                    </div>
                    <div className="flex justify-between border-t pt-3 px-2">
                        <button className="flex items-center gap-2 text-gray-500 text-sm hover:bg-gray-50 px-3 py-1 rounded-lg">
                            <i className="fa-solid fa-image text-green-500"></i> Ảnh/Video
                        </button>
                        <button className="flex items-center gap-2 text-gray-500 text-sm hover:bg-gray-50 px-3 py-1 rounded-lg">
                            <i className="fa-solid fa-face-smile text-yellow-500"></i> Cảm xúc
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-10">Đang tải bài viết...</div>
                ) : (
                    <BaiViet data={posts}/>
                )}
            </div>

            {/* --- CỘT PHẢI: GỢI Ý --- */}
            <aside className="hidden lg:block lg:col-span-1">
                <div className="sticky top-24">
                    <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
                        <h3 className="font-bold text-gray-800 mb-3">Gợi ý hôm nay</h3>
                        <div className="flex gap-3 mb-3">
                            <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836" alt="Suggestion" className="w-16 h-16 rounded-lg object-cover" />
                            <div>
                                <h4 className="text-sm font-bold line-clamp-2">Sườn xào chua ngọt</h4>
                                <span className="text-xs text-gray-500">450 Kcal</span>
                            </div>
                        </div>
                        <button 
                            onClick={() => navigate('/AI')} // Lỗi Line 83 đã được sửa
                            className="w-full py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg font-bold text-sm shadow-md hover:opacity-90"
                        >
                            <i className="fa-solid fa-robot"></i> Hỏi AI xem ăn gì?
                        </button>
                    </div>
                </div>
            </aside>
        </div>
    );
}

export default ThongTinBaiViet;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BaiViet from './BaiViet';
import * as API from '../../JS/API/API';
import { BACKEND_URL } from '../../JS/API/API';
function ThongTinBaiViet() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const res = await API.CallAPI(undefined, { 
                    PhuongThuc: 2, 
                    url: 'recipes' 
                });

                if (res.status !== false) {
                    const rawData = res.data || res;
                    const fixedData = rawData.map(post => ({
                        ...post,
                        image: post.image?.startsWith('http') 
                            ? post.image 
                            : `http://127.0.0.1:8000/storage/${post.image}`
                    }));
                    setPosts(fixedData);
                } else {
                    console.error("Lỗi từ Server:", res.message);
                }
            } catch (error) {
                console.error("Lỗi thực thi API:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center p-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            <span className="ml-3 font-bold text-orange-500">Đang tải bài viết...</span>
        </div>
    );

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
                {/* Khu vực đăng bài */}
                <div className="bg-white rounded-xl shadow-sm p-4">
                    <div className="flex gap-3 mb-3">
                        <img src="https://i.pravatar.cc/150?img=32" className="w-10 h-10 rounded-full" alt="Avatar" />
                        <button 
                            onClick={() => navigate('/dang-bai')}
                            className="flex-1 bg-gray-100 rounded-full px-4 text-left text-gray-500 hover:bg-gray-200 transition"
                        >
                            Bạn vừa nấu món gì ngon thế?
                        </button>
                    </div>
                </div>

                {/* Danh sách bài viết */}
                <BaiViet data={posts}/>
            </div>

            {/* Cột phải gợi ý */}
            <aside className="hidden lg:block lg:col-span-1">
                <div className="sticky top-24">
                    <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
                        <h3 className="font-bold text-gray-800 mb-3">Gợi ý hôm nay</h3>
                        <button onClick={() => navigate('/AI')} className="w-full py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg font-bold text-sm">
                            <i className="fa-solid fa-robot"></i> Hỏi AI xem ăn gì?
                        </button>
                    </div>
                </div>
            </aside>
        </div>
    );
}

export default ThongTinBaiViet;
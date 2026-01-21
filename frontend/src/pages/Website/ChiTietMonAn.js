import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Dùng useNavigate để quay lại
import { CallAPI } from '../..//JS/API/API'; // Import từ file API.js bạn đã gửi

function ChiTietMonAn() {
    const { id } = useParams(); // Lấy ID từ URL
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);

    // Đường dẫn ảnh từ Laravel (Lưu ý: chỉnh đúng port server của bạn)
    const STORAGE_URL = "http://127.0.0.1:8000/storage/";

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return; // Nếu không có ID thì không gọi API
            
            try {
                // Gọi API lấy chi tiết: GET /api/recipes/{id}
                const res = await CallAPI(null, { 
                    url: `recipes/${id}`, 
                    PhuongThuc: 2 
                });
                
                if (res.status && res.data) {
                    setRecipe(res.data);
                }
            } catch (error) {
                console.error("Lỗi lấy dữ liệu:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    // Xử lý khi đang tải
    if (loading) return (
        <div className="flex justify-center items-center h-full min-h-[500px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
    );

    // Xử lý khi không tìm thấy
    if (!recipe) return (
        <div className="text-white text-center p-10">
            <h2 className="text-xl">Không tìm thấy món ăn này!</h2>
            <button onClick={() => navigate(-1)} className="text-orange-500 mt-2 underline">Quay lại</button>
        </div>
    );

    return (
        // Wrapper chính: Padding để cách Sidebar và Header ra
        <div className="w-full p-6 text-gray-800"> 
            
            {/* Nút Quay lại (Thiết kế phù hợp với Dashboard) */}
            <div className="mb-6">
                <button 
                    onClick={() => navigate(-1)} 
                    className="flex items-center gap-2 text-white hover:text-orange-500 transition"
                >
                    <div className="bg-gray-700 p-2 rounded-lg hover:bg-gray-600">
                        <i className="fa-solid fa-chevron-left"></i>
                    </div>
                    <span className="font-bold">Quay lại danh sách</span>
                </button>
            </div>

            {/* PHẦN NỘI DUNG CHÍNH (Giao diện trắng nổi bật trên nền tối) */}
            <div className="bg-gray-50 rounded-3xl p-6 md:p-10 shadow-2xl max-w-6xl mx-auto">
                
                {/* Header Món Ăn */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                    <div className="rounded-2xl overflow-hidden shadow-lg h-[350px] group relative">
                         <img 
                            src={recipe.image_url ? STORAGE_URL + recipe.image_url : "https://via.placeholder.com/600x400"}
                            alt={recipe.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase shadow-lg">
                            {recipe.difficulty === 'easy' ? 'Dễ' : recipe.difficulty === 'medium' ? 'Trung bình' : 'Khó'}
                        </div>
                    </div>

                    <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-yellow-500 text-sm font-bold bg-yellow-50 px-2 py-1 rounded-md border border-yellow-200">
                                <i className="fa-solid fa-star mr-1"></i> 4.9
                            </span>
                            <span className="text-gray-400 text-xs">({recipe.view_count} lượt xem)</span>
                        </div>
                        
                        <h1 className="text-4xl font-extrabold mb-4 text-gray-900 leading-tight">{recipe.title}</h1>
                        <p className="text-gray-500 mb-6 text-lg line-clamp-3">{recipe.description}</p>
                        
                        {/* Thông số */}
                        <div className="flex gap-4 mb-8">
                            <InfoBox icon="fa-regular fa-clock" color="text-red-500" value={`${recipe.cook_time}p`} label="Thời gian" />
                            <InfoBox icon="fa-solid fa-fire" color="text-orange-500" value="600" label="Kcal" />
                            <InfoBox icon="fa-solid fa-user-pen" color="text-blue-500" value={recipe.author?.name} label="Tác giả" />
                        </div>

                        <div className="flex gap-3">
                            <button className="flex-1 bg-gradient-to-r from-red-600 to-orange-600 text-white py-3 rounded-xl font-bold hover:shadow-lg hover:from-red-700 hover:to-orange-700 transition transform hover:-translate-y-1">
                                <i className="fa-solid fa-heart mr-2"></i> Yêu thích
                            </button>
                            <button className="flex-1 bg-white text-gray-700 border-2 border-gray-100 py-3 rounded-xl font-bold hover:bg-gray-50 hover:border-gray-300 transition">
                                <i className="fa-solid fa-share-nodes mr-2"></i> Chia sẻ
                            </button>
                        </div>
                    </div>
                </div>

                {/* Nội dung chi tiết */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Cột Nguyên liệu */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-4">
                            <h3 className="font-bold text-xl mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                                <i className="fa-solid fa-basket-shopping text-green-600"></i> Nguyên liệu
                            </h3>
                            <ul className="space-y-4">
                                {recipe.ingredients && recipe.ingredients.map((ing, idx) => (
                                    <li key={idx} className="flex items-center gap-3 group">
                                        <div className="w-2 h-2 rounded-full bg-orange-400 group-hover:bg-orange-600 transition"></div>
                                        <div className="flex-1 border-b border-dashed border-gray-200 pb-1 flex justify-between items-end">
                                            <span className="font-medium text-gray-700">{ing.name}</span>
                                            <b className="text-gray-900 text-sm">{ing.pivot?.quantity}</b>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Cột Cách làm */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                                <i className="fa-solid fa-fire-burner text-red-600"></i> Cách thực hiện
                            </h3>
                            
                            <div className="space-y-8">
                                {recipe.steps && recipe.steps.map((step, idx) => (
                                    <div key={idx} className="relative pl-10 border-l-2 border-gray-100 last:border-0 pb-2">
                                        <div className="absolute -left-[17px] top-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold shadow-md border-4 border-white">
                                            {step.step_order}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg mb-2 text-gray-800">Bước {step.step_order}</h4>
                                            <p className="text-gray-600 mb-4 leading-relaxed">{step.content}</p>
                                            {step.image_url && (
                                                <img 
                                                    src={STORAGE_URL + step.image_url} 
                                                    className="rounded-xl w-full h-64 object-cover shadow-sm hover:shadow-md transition" 
                                                    alt={`Bước ${step.step_order}`}
                                                />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Component con hiển thị thông tin nhỏ
function InfoBox({ icon, color, value, label }) {
    return (
        <div className="text-center bg-white p-3 rounded-xl shadow-sm border border-gray-100 min-w-[90px]">
            <i className={`${icon} ${color} text-xl mb-1 block`}></i>
            <p className="font-bold text-gray-800 text-sm">{value}</p>
            <p className="text-xs text-gray-400">{label}</p>
        </div>
    );
}

export default ChiTietMonAn;
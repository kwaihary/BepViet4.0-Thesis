import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import * as ThongBao from '../../JS/FUNCTION/ThongBao'; // Import bộ thông báo của bạn

function ChiTiet() {
    const { id } = useParams(); 
    const [currentCB, setCurrentCB] = useState(null);

    // Hàm tải dữ liệu (tách ra để gọi lại khi xóa xong)
    const loadData = () => {
        const allCookbooks = JSON.parse(localStorage.getItem('my_cookbooks')) || [];
        const found = allCookbooks.find(item => item.id === id);
        setCurrentCB(found);
    };

    useEffect(() => {
        loadData();
    }, [id]);

    // --- CHỨC NĂNG XÓA MÓN KHỎI COOKBOOK ---
    const handleRemoveRecipe = async (e, recipeId, recipeTitle) => {
        e.preventDefault();
        e.stopPropagation();

        const xacNhan = await ThongBao.ThongBao_XacNhanTT(`Bạn có chắc muốn xóa món "${recipeTitle}" khỏi bộ sưu tập này?`);
        
        if (xacNhan) {
            const allCookbooks = JSON.parse(localStorage.getItem('my_cookbooks')) || [];
            
            // Tìm và cập nhật lại bộ sưu tập
            const updatedCookbooks = allCookbooks.map(cb => {
                if (cb.id === id) {
                    const newRecipes = cb.recipes.filter(r => r.id !== recipeId);
                    return { ...cb, recipes: newRecipes };
                }
                return cb;
            });

            // Lưu vào LocalStorage
            localStorage.setItem('my_cookbooks', JSON.stringify(updatedCookbooks));

            // Hiển thị thông báo thành công theo style của bạn
            ThongBao.ThongBao_ThanhCong('Đã xóa món ăn thành công');

            // Cập nhật lại giao diện ngay lập tức
            loadData();
        }
    };

    if (!currentCB) return <div className="p-10 text-center text-gray-400 italic">Không tìm thấy bộ sưu tập...</div>;

    return (
        <>
            <header className="bg-white border-b border-gray-100 shadow-sm z-10 relative">
                <div className="container mx-auto px-4 max-w-6xl py-6">
                    <div className="mb-6">
                        <Link to='/CookbookCuaToi' className="group flex items-center gap-2 text-gray-500 hover:text-red-600 transition-colors w-fit">
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-red-50">
                                <i className="fa-solid fa-arrow-left text-sm"></i>
                            </div>
                            <span className="font-bold text-sm">Quay lại danh sách</span>
                        </Link>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                        <div className="flex items-start gap-5">
                            <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-red-500 to-orange-400 rounded-2xl flex items-center justify-center text-white text-4xl shadow-lg transform rotate-[-2deg]">
                                <i className="fa-solid fa-book-open"></i>
                            </div>
                            <div>
                                <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
                                    {currentCB.name}
                                    <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full font-medium border border-gray-200">
                                        <i className="fa-solid fa-lock text-[10px]"></i> Riêng tư
                                    </span>
                                </h1>
                                <div className="flex items-center gap-x-4 text-sm text-gray-500 mt-2">
                                    <span className="flex items-center gap-1"><i className="fa-solid fa-layer-group"></i> {currentCB.recipes?.length || 0} công thức</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 max-w-6xl py-8 min-h-screen">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {currentCB.recipes?.map((recipe) => (
                        <div key={recipe.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-lg transition relative">
                            {/* NÚT XÓA - ĐÃ ĐƯỢC GÁN HÀM XỬ LÝ */}
                            <button 
                                onClick={(e) => handleRemoveRecipe(e, recipe.id, recipe.title)}
                                className="absolute top-2 right-2 z-10 bg-white/90 text-gray-400 hover:text-red-600 w-8 h-8 rounded-full flex items-center justify-center shadow-sm opacity-100 md:opacity-0 group-hover:opacity-100 transition border border-transparent hover:border-red-100"
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </button>

                            <div className="relative h-40 overflow-hidden">
                                <img src={recipe.image} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" alt={recipe.title} />
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-gray-800 mb-1 line-clamp-1 group-hover:text-red-600 transition text-left">{recipe.title}</h3>
                                <p className="text-xs text-gray-500 mb-3 text-left">Đăng bởi: {recipe.author}</p>
                                <div className="flex items-center justify-between">
                                    <span className="bg-orange-50 text-orange-600 px-2 py-1 rounded text-xs font-bold">{recipe.calories || '600 Kcal'}</span>
                                    <Link to={`/ChiTietMonAn/${recipe.id}`} className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-red-600 hover:text-white transition">
                                        <i className="fa-solid fa-arrow-right text-xs"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {/* Nút thêm món */}
                    <Link to="/cong-thuc" className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center h-full min-h-[250px] text-gray-400 hover:border-red-400 hover:text-red-500 hover:bg-red-50 transition group">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition">
                            <i className="fa-solid fa-plus text-xl"></i>
                        </div>
                        <span className="font-bold text-sm">Thêm món vào đây</span>
                    </Link>
                </div>
            </main>
        </>
    );
}

export default ChiTiet;
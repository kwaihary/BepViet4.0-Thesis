import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ModalLuuVaoCookbook from "./ModalLuuVaoCookbook";

function CongThuc() {
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filterCategory, setFilterCategory] = useState("Tất cả");

    // 1. Lấy dữ liệu từ "Món đã lưu" khi load trang
    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem('mon_da_luu')) || [];
        setRecipes(savedData);
    }, []);

    // 2. Mở Modal để chọn Cookbook cho món ăn cụ thể
    const handleOpenModal = (recipe) => {
        setSelectedRecipe(recipe);
        setIsModalOpen(true);
    };

    // 3. Lọc món ăn theo danh mục (nếu dữ liệu có category)
    const filteredRecipes = recipes.filter(r => 
        filterCategory === "Tất cả" || r.category === filterCategory
    );

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header Trang */}
            <header className="bg-white border-b border-gray-100 mb-8">
                <div className="container mx-auto px-4 max-w-7xl py-12">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Công thức của tôi</h1>
                    <p className="text-gray-500">Quản lý và phân loại {recipes.length} món ăn bạn đã lưu vào các bộ sưu tập.</p>
                </div>
            </header>

            <main className="container mx-auto px-4 max-w-7xl">
                {/* Bộ lọc nhanh */}
                <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2 no-scrollbar">
                    {["Tất cả", "Món chính", "Ăn sáng", "Món canh", "Đồ chay"].map(cat => (
                        <button 
                            key={cat}
                            onClick={() => setFilterCategory(cat)}
                            className={`px-5 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                                filterCategory === cat 
                                ? "bg-red-600 text-white shadow-lg shadow-red-200" 
                                : "bg-white text-gray-600 border border-gray-200 hover:border-red-300"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Danh sách bài viết */}
                {filteredRecipes.length === 0 ? (
                    <div className="bg-white rounded-3xl border-2 border-dashed border-gray-200 py-20 text-center">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i className="fa-solid fa-utensils text-3xl text-gray-300"></i>
                        </div>
                        <p className="text-gray-500 font-medium">Chưa có công thức nào trong danh sách này.</p>
                        <Link to="/" className="text-red-600 font-bold hover:underline mt-2 inline-block">Khám phá thêm món mới</Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {filteredRecipes.map((item) => (
                            <div key={item.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full group overflow-hidden">
                                {/* Ảnh món ăn */}
                                <div className="relative h-48 overflow-hidden">
                                    <img 
                                        src={item.image} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition duration-700" 
                                        alt={item.title}
                                    />
                                    
                                    {/* Nút THÊM VÀO COOKBOOK */}
                                    <button 
                                        onClick={() => handleOpenModal(item)}
                                        className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-red-600 hover:bg-red-600 hover:text-white transition-all shadow-lg group/btn"
                                        title="Lưu vào bộ sưu tập riêng"
                                    >
                                        <i className="fa-solid fa-folder-plus text-lg"></i>
                                        <span className="absolute right-12 bg-gray-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 whitespace-nowrap transition">Lưu vào Cookbook</span>
                                    </button>

                                    <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded">
                                        <i className="fa-regular fa-clock mr-1"></i> {item.time || "30p"}
                                    </div>
                                </div>
                                
                                {/* Nội dung */}
                                <div className="p-5 flex flex-col flex-1">
                                    <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider mb-2">{item.category || "Công thức"}</span>
                                    <h3 className="font-bold text-gray-900 leading-tight line-clamp-2 group-hover:text-red-600 transition mb-4">
                                        {item.title}
                                    </h3>
                                    
                                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                                        <div className="flex items-center gap-2">
                                            <img src={item.authorAvatar || "https://i.pravatar.cc/150"} className="w-6 h-6 rounded-full object-cover" alt=""/>
                                            <span className="text-xs text-gray-500 font-medium truncate max-w-[80px]">{item.author}</span>
                                        </div>
                                        <Link to={`/ChiTietMonAn/${item.id}`} className="flex items-center gap-1 text-xs font-bold text-gray-400 hover:text-red-600 transition">
                                            Chi tiết <i className="fa-solid fa-arrow-right-long"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Modal xử lý chọn Cookbook */}
            <ModalLuuVaoCookbook 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                recipe={selectedRecipe} 
            />
        </div>
    );
}

export default CongThuc;
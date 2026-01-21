import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function MonDaLuu({ data, onRefresh }) {
    // Ưu tiên lấy data từ props (HoSo truyền xuống), nếu chưa có mới dùng mẫu
    const [savedRecipes, setSavedRecipes] = useState(data);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('Tất cả');

    // Cập nhật state nội bộ khi props data thay đổi
    useEffect(() => {
        setSavedRecipes(data);
    }, [data]);

    const categories = ['Tất cả', 'Món chính', 'Ăn sáng', 'Canh', 'Salad', 'Món ngọt'];

    const handleUnsave = async (e, id) => {
        e.stopPropagation();
        if (window.confirm('Bạn có chắc muốn bỏ lưu món này không?')) {
            try {
                // GỌI API XÓA TẠI ĐÂY
                // await API.delete(`/unsave/${id}`);
                
                // Sau đó báo cho Cha cập nhật lại
                if(onRefresh) onRefresh();
                
                // Hoặc update tạm thời tại local
                setSavedRecipes(prev => prev.filter(item => item.id !== id));
            } catch (err) {
                console.error("Lỗi khi bỏ lưu");
            }
        }
    };

    const filteredRecipes = (savedRecipes || []).filter(recipe => {
        const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === 'Tất cả' || recipe.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-gray-50 pt-10 pb-12"> {/* Giữ nguyên class gốc */}
            <div className="container mx-auto max-w-7xl px-4">
                {/* ================= HEADER ================= */}
                <div className="mb-10">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
                        <div>
                            <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 flex items-center gap-3 whitespace-nowrap">
                                Bộ sưu tập
                                <span className="text-red-600 relative">
                                    Món Ngon
                                    <svg className="absolute w-full h-3 -bottom-1 left-0 text-red-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                        <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                                    </svg>
                                </span>
                            </h1>
                            <p className="text-gray-500 mt-2 text-lg">
                                Bạn đang lưu giữ <span className="font-bold text-gray-800"> {filteredRecipes.length} </span> công thức
                            </p>
                        </div>

                        {/* Search */}
                        <div className="relative w-full lg:w-[360px] flex-shrink-0">
                            <input
                                type="text"
                                placeholder="Tìm kiếm món đã lưu..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-full focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100 shadow-sm"
                            />
                            <i className="fa-solid fa-search absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"></i>
                        </div>
                    </div>

                    {/* ================= CATEGORY ================= */}
                    <div className="flex gap-2 overflow-x-auto no-scrollbar whitespace-nowrap pb-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap flex-shrink-0 transition
                                    ${activeCategory === cat
                                        ? 'bg-red-600 text-white shadow-lg shadow-red-200'
                                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ================= CONTENT ================= */}
                {filteredRecipes.length === 0 ? (
                    <div className="bg-white rounded-3xl border border-dashed border-gray-300 py-24 flex flex-col items-center">
                        <div className="w-32 h-32 bg-red-50 rounded-full flex items-center justify-center mb-6">
                            <i className="fa-solid fa-bookmark text-5xl text-red-400"></i>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800">Chưa có món nào</h3>
                        <Link to="/" className="bg-red-600 text-white px-8 py-3 rounded-full font-bold hover:bg-red-700 mt-8 transition shadow-lg shadow-red-200">
                            Khám phá ngay
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredRecipes.map(recipe => (
                            <div key={recipe.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col h-full">
                                {/* Image */}
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover hover:scale-110 transition duration-700" />
                                    <button onClick={(e) => handleUnsave(e, recipe.id)} className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full text-red-500 flex items-center justify-center shadow hover:bg-red-500 hover:text-white transition">
                                        <i className="fa-solid fa-bookmark"></i>
                                    </button>
                                    <div className="absolute top-3 left-3 flex gap-1 whitespace-nowrap">
                                        <span className="bg-black/60 text-white text-xs font-bold px-2 py-1 rounded-md">⏱ {recipe.time}</span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5 flex flex-col flex-1">
                                    <span className="text-xs font-bold text-red-500 uppercase mb-2">{recipe.category}</span>
                                    <h3 className="font-bold text-gray-900 text-lg leading-snug line-clamp-2 mb-3 hover:text-red-600 transition">{recipe.title}</h3>
                                    <div className="flex-1"></div>
                                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <img src={recipe.authorAvatar} alt="" className="w-7 h-7 rounded-full object-cover" />
                                            <span className="text-sm text-gray-600 font-medium truncate max-w-[110px] whitespace-nowrap">{recipe.author}</span>
                                        </div>
                                        <i className="fa-solid fa-arrow-right-long text-gray-400"></i>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default MonDaLuu;
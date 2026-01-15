import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Cookbook() {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false); // State quản lý Modal

    return (
        <div className="min-h-screen bg-gray-50">
        
            {/* --- MAIN CONTENT --- */}
            <main className="container mx-auto px-4 max-w-6xl">
                
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Thư viện của tôi</h1>
                        <p className="text-gray-500 text-sm mt-1">Lưu giữ những công thức yêu thích của bạn</p>
                    </div>
                    <button 
                        onClick={() => setShowModal(true)}
                        className="bg-red-600 text-white px-5 py-2.5 rounded-full font-bold hover:bg-red-700 hover:shadow-lg transition flex items-center gap-2 transform active:scale-95"
                    >
                        <i className="fa-solid fa-plus"></i> Tạo Cookbook mới
                    </button>
                </div>

                {/* Grid List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    
                    {/* Item 1: Món Ngon Ngày Tết */}
                    <Link to={`/ChiTietCookBook/${'1234'}`} className="group">
                        <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition duration-300 h-full flex flex-col">
                            {/* Image Grid */}
                            <div className="grid grid-cols-2 gap-1 mb-3 h-40 rounded-xl overflow-hidden relative bg-gray-100">
                                <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c" alt="Food 1" className="w-full h-full object-cover" />
                                <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38" alt="Food 2" className="w-full h-full object-cover" />
                                {/* Overlay effect */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-300"></div>
                            </div>
                            
                            {/* Content */}
                            <div className="flex justify-between items-start px-1">
                                <div>
                                    <h3 className="font-bold text-gray-800 group-hover:text-red-600 transition">Món Ngon Ngày Tết</h3>
                                    <p className="text-xs text-gray-500 mt-1 font-medium bg-gray-100 inline-block px-2 py-1 rounded-md">12 công thức</p>
                                </div>
                                <button className="text-gray-400 hover:text-red-500 transition p-1">
                                    <i className="fa-solid fa-pen-to-square"></i>
                                </button>
                            </div>
                        </div>
                    </Link>

                    {/* Item 2: Eat Clean */}
                    <Link to={`/ChiTietCookBook/${'1234'}`} className="group">
                        <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition duration-300 h-full flex flex-col">
                            <div className="grid grid-cols-2 gap-1 mb-3 h-40 rounded-xl overflow-hidden relative bg-gray-100">
                                <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd" alt="Healthy Food" className="w-full h-full object-cover" />
                                <div className="bg-gray-100 flex flex-col items-center justify-center text-gray-400 font-bold w-full h-full border-l border-white">
                                    <span className="text-xl">+4</span>
                                </div>
                            </div>
                            <div className="px-1">
                                <h3 className="font-bold text-gray-800 group-hover:text-red-600 transition">Eat Clean / Diet</h3>
                                <p className="text-xs text-gray-500 mt-1 font-medium bg-gray-100 inline-block px-2 py-1 rounded-md">5 công thức</p>
                            </div>
                        </div>
                    </Link>

                    {/* Item 3: Empty State (Món Chay) */}
                    <Link to="/chi-tiet-cookbook" className="group">
                        <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition duration-300 h-full flex flex-col">
                            <div className="h-40 rounded-xl overflow-hidden mb-3 bg-orange-50 flex items-center justify-center border-2 border-dashed border-orange-100 group-hover:border-orange-200 transition">
                                <i className="fa-solid fa-bowl-rice text-4xl text-orange-200 group-hover:scale-110 transition duration-300"></i>
                            </div>
                            <div className="px-1">
                                <h3 className="font-bold text-gray-800 group-hover:text-red-600 transition">Món Chay</h3>
                                <p className="text-xs text-gray-400 mt-1 italic">Chưa có công thức</p>
                            </div>
                        </div>
                    </Link>

                </div>
            </main>

            {/* --- MODAL (POPUP) --- */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop: Click ra ngoài để tắt */}
                    <div 
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                        onClick={() => setShowModal(false)}
                    ></div>

                    {/* Modal Content */}
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl relative z-10 animate-fade-in scale-100 transform transition-all">
                        <div className="flex justify-between items-center mb-5">
                            <h3 className="text-xl font-bold text-gray-800">Tạo bộ sưu tập mới</h3>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                                <i className="fa-solid fa-xmark text-xl"></i>
                            </button>
                        </div>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tên bộ sưu tập</label>
                                <input 
                                    type="text" 
                                    placeholder="Vd: Món nhậu cuối tuần..." 
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
                                    autoFocus
                                />
                            </div>
                            
                            <div className="flex gap-3 justify-end pt-2">
                                <button 
                                    onClick={() => setShowModal(false)}
                                    className="px-5 py-2 text-gray-600 font-bold hover:bg-gray-100 rounded-lg transition"
                                >
                                    Hủy
                                </button>
                                <button className="px-5 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 shadow-md hover:shadow-lg transition">
                                    Tạo mới
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cookbook;
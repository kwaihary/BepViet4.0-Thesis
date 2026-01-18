import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from "react-router-dom";
import XuLiViPham from "../../component/admin/XuLiViPham";
import QuanLiNguoiDung from "../../component/admin/QuanLiNguoiDung";
import DuLieuBaiDang from "../../component/admin/DuLieuBaiDang";
import TongQuan from "../../component/admin/TongQuan";
import HoSoAdmin from '../../component/admin/HoSoAdmin';

function TrangChuAD() {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };

    const location = useLocation();
    const isActive = (path) => location.pathname === path ? "bg-slate-800 border-l-4 border-red-500 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800 border-l-4 border-transparent";

    return (
        <>
            <div className="bg-gray-100 font-sans text-gray-800 flex h-screen">

                {/* --- SIDEBAR --- */}
                <aside className="w-64 bg-slate-900 text-white flex flex-col shrink-0">
                    <div className="h-16 flex items-center px-6 border-b border-slate-800">
                        <i className="fa-solid fa-utensils text-red-500 text-xl mr-3"></i>
                        <span className="font-bold text-lg">Bếp Việt Admin</span>
                    </div>
                    
                    {/* Thêm no-scrollbar vào sidebar để dự phòng menu quá dài */}
                    <nav className="flex-1 py-6 space-y-1 overflow-y-auto no-scrollbar">
                        <Link to="/admin" className={`flex items-center gap-3 px-6 py-3 transition ${isActive('/admin')}`}>
                            <i className="fas fa-tachometer-alt w-5"></i> Tổng Quan
                        </Link>
                        <Link to="/admin/xulivipham" className={`flex items-center gap-3 px-6 py-3 transition ${isActive('/admin/xulivipham')}`}>
                            <i className="fa-solid fa-triangle-exclamation w-5"></i> Xử lý vi phạm
                        </Link>
                        <Link to='/admin/QuanLiNguoiDung' className={`flex items-center gap-3 px-6 py-3 transition ${isActive('/admin/QuanLiNguoiDung')}`}>
                            <i className="fa-solid fa-users w-5"></i> Quản lý người dùng
                        </Link>
                        <Link to="/admin/DuLieuBaiViet" className={`flex items-center gap-3 px-6 py-3 transition ${isActive('/admin/DuLieuBaiViet')}`}>
                            <i className="fa-solid fa-database w-5"></i> Dữ liệu bài đăng
                        </Link>
                    </nav>

                    <div className="p-4 border-t border-slate-800">
                        <Link to='/DangNhap_AD' className="flex items-center gap-2 text-sm text-slate-400 hover:text-red-500 transition">
                            <i className="fa-solid fa-right-from-bracket"></i> Đăng xuất
                        </Link>
                    </div>
                </aside>

                {/* --- MAIN CONTENT --- */}
                <main className="flex-1 flex flex-col overflow-hidden">
                    
                    {/* --- HEADER --- */}
                    <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6 z-20 relative">
                        <h2 className="font-bold text-gray-700 text-xl">Trung tâm kiểm duyệt</h2>
                        
                        <div className="flex items-center gap-6">
                            {/* Notification */}
                            <span className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-bold animate-pulse cursor-pointer hover:bg-red-100 transition">
                                <i className="fa-solid fa-bell mr-1"></i> 5 báo cáo mới
                            </span>

                            {/* --- USER DROPDOWN AREA --- */}
                            <div className="relative">
                                {/* Avatar Button */}
                                <button 
                                    onClick={toggleUserMenu}
                                    className="flex items-center gap-2 focus:outline-none group"
                                >
                                    <div className="text-right hidden md:block">
                                        <div className="text-sm font-bold text-gray-700 group-hover:text-red-600">Admin System</div>
                                        <div className="text-xs text-gray-400">Super Admin</div>
                                    </div>
                                    <img 
                                        src="https://ui-avatars.com/api/?name=Admin&background=ef4444&color=fff" 
                                        className={`w-10 h-10 rounded-full border-2 transition ${isUserMenuOpen ? 'border-red-500 shadow-md' : 'border-gray-200'}`}
                                        alt="Admin Avatar"
                                    />
                                    <i className={`fa-solid fa-chevron-down text-xs text-gray-400 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`}></i>
                                </button>

                                {/* Dropdown Menu Content */}
                                {isUserMenuOpen && (
                                    <div className="absolute right-0 top-full mt-3 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 animate-fade-in-down origin-top-right">
                                        <div className="absolute -top-2 right-4 w-4 h-4 bg-white border-t border-l border-gray-100 transform rotate-45"></div>

                                        <div className="px-4 py-3 border-b border-gray-100">
                                            <p className="text-sm font-bold text-gray-800">Administrator</p>
                                            <p className="text-xs text-gray-500">admin@bepviet.com</p>
                                        </div>

                                        <div className="flex flex-col py-1">
                                            <Link to="/admin/HSAD" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600 flex items-center gap-3 transition">
                                                <i className="fa-regular fa-id-card w-4"></i> Hồ sơ cá nhân
                                            </Link>
                                        </div>

                                        <div className="border-t border-gray-100 mt-1 pt-1">
                                            <Link to="/DangNhap_AD" className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-semibold flex items-center gap-3 transition w-full">
                                                <i className="fa-solid fa-right-from-bracket w-4"></i> Đăng xuất
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </header>

                    {/* --- PAGE CONTENT --- */}
                    {/* CẬP NHẬT: Thêm class no-scrollbar tại đây */}
                    <div className="flex-1 overflow-auto p-6 bg-gray-50 no-scrollbar">
                        <Routes>
                            <Route path='/xulivipham' element={<XuLiViPham />} />
                            <Route path='/QuanLiNguoiDung' element={<QuanLiNguoiDung />} />
                            <Route path='/DuLieuBaiViet' element={<DuLieuBaiDang />} />
                            <Route path='/' index element={<TongQuan />} />
                            <Route path='/HSAD' element={<HoSoAdmin/>} />
                        </Routes>
                    </div>
                </main>
            </div>
        </>
    )
};

export default TrangChuAD;
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as API from '../../JS/API/API';

function Menu() {
    const navigate = useNavigate();
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    
    // State lưu thông tin user từ localStorage
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Lấy dữ liệu user khi component mount
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
        if (isUserMenuOpen) setIsUserMenuOpen(false);
    };

    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
        if (isFilterOpen) setIsFilterOpen(false);
    };

    // --- HÀM ĐĂNG XUẤT ---
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setIsUserMenuOpen(false);
        navigate('/DangNhap');
    };

    return (
        <>
            <nav className="bg-white shadow-sm fixed w-full z-50 top-0 h-16 border-b border-gray-200">
                <div className="container mx-auto px-4 h-full flex justify-between items-center max-w-7xl">
                    
                    {/* --- Logo --- */}
                    <Link to='/' className="flex items-center gap-2">
                        <div className="bg-red-600 text-white p-2 rounded-lg">
                            <i className="fa-solid fa-utensils"></i>
                        </div>
                        <span className="text-xl font-bold text-red-600 hidden md:block">Bếp Việt 4.0</span>
                    </Link>

                    {/* --- Search Area (Giữ nguyên của bạn) --- */}
                    <div className="flex-1 max-w-xl mx-4 relative group z-50">
                        {/* ... Phần input search giữ nguyên ... */}
                    </div>

                    {/* --- Right Side Actions --- */}
                    <div className="flex items-center gap-4">
                        <Link to='/AI' className="hidden md:flex items-center gap-1 text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-80">
                            <i className="fa-solid fa-wand-magic-sparkles"></i> AI Gợi ý
                        </Link>

                        {/* --- USER DROPDOWN MENU --- */}
                        <div className="relative">
                            <button onClick={toggleUserMenu} className="flex items-center focus:outline-none transition-transform active:scale-95">
                                <img 
                                    src={user?.avatar || "https://i.pravatar.cc/150?img=32"} 
                                    alt="User Avatar" 
                                    className={`w-9 h-9 rounded-full border-2 ${isUserMenuOpen ? 'border-red-500 shadow-md' : 'border-gray-200'} transition-all`} 
                                />
                            </button>

                            {isUserMenuOpen && (
                                <div className="absolute right-0 top-full mt-3 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 animate-fade-in-down origin-top-right">
                                    <div className="absolute -top-2 right-3 w-4 h-4 bg-white border-t border-l border-gray-100 transform rotate-45"></div>

                                    {/* Hiển thị Tên và Phone/Email thật của User */}
                                    <div className="px-4 py-3 border-b border-gray-100 mb-2">
                                        <p className="text-sm font-bold text-gray-900">{user?.name || "Khách"}</p>
                                        <p className="text-xs text-gray-500 truncate">{user?.phone || "Chưa cập nhật"}</p>
                                    </div>

                                    <div className="flex flex-col">
                                        <Link to="/HoSo-NguoiDung" className="px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 flex items-center gap-3 transition">
                                            <i className="fa-regular fa-id-badge w-5"></i> Hồ sơ cá nhân
                                        </Link>
                                    </div>

                                    <div className="border-t border-gray-100 mt-2 pt-2">
                                        {/* Gắn hàm handleLogout vào đây */}
                                        <button 
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-semibold flex items-center gap-3 transition"
                                        >
                                            <i className="fa-solid fa-arrow-right-from-bracket w-5"></i> Đăng xuất
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Menu;
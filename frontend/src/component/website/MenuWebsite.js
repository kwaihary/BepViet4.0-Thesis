import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as tb from '../../JS/FUNCTION/ThongBao';
import * as API from '../../JS/API/API';
function Menu() {
    const navigate = useNavigate();

    // Lấy thông tin User từ LocalStorage
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
        if (isUserMenuOpen) setIsUserMenuOpen(false);
    };

    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
        if (isFilterOpen) setIsFilterOpen(false);
    };

    // --- HÀM ĐĂNG XUẤT ---
    const handleLogout = async () => {
        const logout = await tb.ThongBao_XacNhanTT("Bạn có chắc muốn đăng xuất không?");
        if (!logout) return;
        try {
            // Gọi API đăng xuất (dùng file API.js có sẵn)
            await API.CallAPI(null, {
                url: 'user/logout',
                PhuongThuc: 1 // POST
            });
           tb.ThongBao_ThanhCong("Đăng xuất thành công!");
        } catch (error) {
            console.error("Lỗi logout:", error);
        } finally {
            // Xóa dữ liệu client và chuyển hướng
            localStorage.removeItem('user');
            localStorage.removeItem('token'); 
            setUser(null);
            setIsUserMenuOpen(false);
            navigate('/DangNhap');
        }
    };

    return (
        <nav className="bg-white shadow-sm fixed w-full z-50 top-0 h-16 border-b border-gray-200">
            <div className="container mx-auto px-4 h-full flex justify-between items-center max-w-7xl">
                
                {/* Logo */}
                <Link to='/' className="flex items-center gap-2">
                    <div className="bg-red-600 text-white p-2 rounded-lg">
                        <i className="fa-solid fa-utensils"></i>
                    </div>
                    <span className="text-xl font-bold text-red-600 hidden md:block">Bếp Việt 4.0</span>
                </Link>

                {/* Search & Filter */}
                <div className="flex-1 max-w-xl mx-4 relative group z-50">
                    <div className="relative flex items-center">
                        <i className="fa-solid fa-magnifying-glass absolute left-4 text-gray-400"></i>
                        <input 
                            type="text" 
                            placeholder="Tìm món ăn..."
                            className="w-full bg-gray-100 text-gray-700 rounded-full py-2.5 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-red-200 focus:bg-white transition-all border border-transparent focus:border-red-100"
                        />
                        <button onClick={toggleFilter} className="absolute right-2 p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition">
                            <i className="fa-solid fa-sliders"></i>
                        </button>
                    </div>
                    {/* Filter Panel */}
                    {isFilterOpen && (
                        <div className="absolute top-full left-0 mt-3 w-full bg-white rounded-xl shadow-2xl border border-gray-100 p-5 animate-fade-in-down">
                            <p className="text-gray-500 text-center text-sm">Nội dung bộ lọc...</p>
                        </div>
                    )}
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-4">
                    <Link to='/AI' className="hidden md:flex items-center gap-1 text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-80">
                        <i className="fa-solid fa-wand-magic-sparkles"></i> AI Gợi ý
                    </Link>

                    {/* --- LOGIC HIỂN THỊ MENU USER HOẶC NÚT ĐĂNG NHẬP --- */}
                    {user ? (
                        <div className="relative">
                            <button onClick={toggleUserMenu} className="flex items-center focus:outline-none transition-transform active:scale-95">
                                <img 
                                    // Xử lý hiển thị ảnh avatar: Nếu có http thì dùng luôn, không thì nối host
                                    src={user.avatar && user.avatar.includes('http') ? user.avatar : `http://localhost:8000/storage/${user.avatar || 'default.jpg'}`}
                                    alt="Avatar" 
                                    className={`w-9 h-9 rounded-full border-2 ${isUserMenuOpen ? 'border-red-500 shadow-md' : 'border-gray-200'} object-cover`}
                                    onError={(e) => {e.target.src = "https://i.pravatar.cc/150?img=32"}} // Ảnh fallback
                                />
                            </button>

                            {isUserMenuOpen && (
                                <div className="absolute right-0 top-full mt-3 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 animate-fade-in-down origin-top-right">
                                    <div className="px-4 py-3 border-b border-gray-100 mb-2">
                                        <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                                        <p className="text-xs text-gray-500 truncate">{user.phone}</p>
                                    </div>
                                    <div className="flex flex-col">
                                        <Link to="/HoSo-NguoiDung" className="px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 flex items-center gap-3 transition">
                                            <i className="fa-regular fa-id-badge w-5"></i> Hồ sơ cá nhân
                                        </Link>
                                        <Link to="/CookbookCuaToi" className="px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 flex items-center gap-3 transition">
                                            <i className="fa-solid fa-book-open w-5"></i> Cookbook
                                        </Link>
                                    </div>
                                    <div className="border-t border-gray-100 mt-2 pt-2">
                                        <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-semibold flex items-center gap-3 transition">
                                            <i className="fa-solid fa-arrow-right-from-bracket w-5"></i> Đăng xuất
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        // NẾU CHƯA ĐĂNG NHẬP -> HIỆN NÚT ĐĂNG NHẬP
                        <Link 
                            to="/DangNhap"
                            className="bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-md shadow-red-200 transition-all flex items-center gap-2"
                        >
                            <i className="fa-regular fa-user"></i> 
                            <span className="hidden sm:inline">Đăng nhập</span>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Menu;
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as API from '../../JS/API/API';

function Menu() {
    const navigate = useNavigate();
    // --- State quản lý User ---
    // Khởi tạo state user từ localStorage
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // --- State quản lý Filter ---
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
        if (isUserMenuOpen) setIsUserMenuOpen(false); // Đóng menu user nếu mở filter
    };

    // --- State quản lý User Menu (MỚI) ---
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
        if (isFilterOpen) setIsFilterOpen(false); // Đóng filter nếu mở menu user
    };

    const handleLogout = async () => {
        try {
            // 1. Gọi API để backend xóa cookie (token_bepviet)
            await API.CallAPI(null, { url: 'user/logout', PhuongThuc: 1 });
        } catch (error) {
            console.error("Lỗi khi gọi API logout:", error);
        } finally {
            localStorage.removeItem('user'); // Xóa thông tin user
            setUser(null); // Reset state
            setIsUserMenuOpen(false); // Đóng menu
            // 3. Chuyển hướng về trang đăng nhập hoặc trang chủ
            navigate('/DangNhap'); 
        }
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

                    {/* --- Search & Filter Area (Giữ nguyên) --- */}
                    <div className="flex-1 max-w-xl mx-4 relative group z-50">
                        <div className="relative flex items-center">
                            <i className="fa-solid fa-magnifying-glass absolute left-4 text-gray-400"></i>
                            <input 
                                type="text" 
                                placeholder="Tìm món ăn, nguyên liệu, đầu bếp..."
                                className="w-full bg-gray-100 text-gray-700 rounded-full py-2.5 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-red-200 focus:bg-white transition-all border border-transparent focus:border-red-100"
                            />
                            <button onClick={toggleFilter} className="absolute right-2 p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition" title="Bộ lọc nâng cao">
                                <i className="fa-solid fa-sliders"></i>
                            </button>
                        </div>

                        {/* Filter Panel (Giữ nguyên nội dung bên trong) */}
                        <div id="filterPanel" className={`${isFilterOpen ? 'block' : 'hidden'} absolute top-full left-0 mt-3 w-full bg-white rounded-xl shadow-2xl border border-gray-100 p-5 animate-fade-in-down`}>
                            {/* ... (Nội dung Filter giữ nguyên như code cũ của bạn) ... */}
                             <div className="absolute -top-2 right-6 w-4 h-4 bg-white border-t border-l border-gray-100 transform rotate-45"></div>
                                      <div className="absolute -top-2 right-6 w-4 h-4 bg-white border-t border-l border-gray-100 transform rotate-45"></div>

                            <div className="grid grid-cols-2 gap-6">
                                {/* Column 1: Region & Ingredients */}
                                <div>
                                    <h4 className="font-bold text-sm text-gray-800 mb-3 flex items-center gap-2">
                                        <i className="fa-solid fa-map-location-dot text-red-500"></i> Vùng miền
                                    </h4>
                                    <div className="space-y-2">
                                        {['Miền Bắc', 'Miền Trung', 'Miền Nam'].map((region) => (
                                            <label key={region} className="flex items-center gap-2 cursor-pointer hover:text-red-600 transition">
                                                <input type="checkbox" className="w-4 h-4 accent-red-600 rounded border-gray-300" />
                                                <span className="text-sm text-gray-600">{region}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-bold text-sm text-gray-800 mb-3 flex items-center gap-2">
                                        <i className="fa-solid fa-drumstick-bite text-red-500"></i> Nguyên liệu chính
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {['Thịt heo', 'Thịt bò', 'Gà / Vịt', 'Hải sản', 'Trứng / Đậu', 'Hành lá', 'Tỏi', 'Gừng'].map((item) => (
                                            <label key={item} className="cursor-pointer">
                                                <input type="checkbox" className="peer sr-only" />
                                                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full peer-checked:bg-red-100 peer-checked:text-red-700 peer-checked:font-bold hover:bg-gray-200 transition">
                                                    {item}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* Column 2: Cooking Method & Difficulty */}
                                <div>
                                    <h4 className="font-bold text-sm text-gray-800 mb-3 flex items-center gap-2">
                                        <i className="fa-solid fa-utensils text-orange-500"></i> Cách nấu
                                    </h4>
                                    <div className="space-y-2">
                                        {['Kho / Rim', 'Chiên / Xào', 'Canh / Hầm', 'Nướng / Quay'].map((method) => (
                                            <label key={method} className="flex items-center gap-2 cursor-pointer hover:text-orange-600 transition">
                                                <input type="checkbox" className="w-4 h-4 accent-orange-500 rounded border-gray-300" />
                                                <span className="text-sm text-gray-600">{method}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-bold text-sm text-gray-800 mb-3 flex items-center gap-2">
                                        <i className="fa-solid fa-fire-burner text-orange-500"></i> Độ khó
                                    </h4>
                                    <div className="space-y-2">
                                        {['Dễ (Dưới 30p)', 'Trung bình', 'Khó (Masterchef)'].map((level) => (
                                            <label key={level} className="flex items-center gap-2 cursor-pointer hover:text-orange-600 transition">
                                                <input type="checkbox" className="w-4 h-4 accent-orange-500 rounded border-gray-300" />
                                                <span className="text-sm text-gray-600">{level}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Diet Section */}
                            <div className="border-t border-gray-100 my-4 pt-4">
                                <h4 className="font-bold text-sm text-gray-800 mb-3 flex items-center gap-2">
                                    <i className="fa-solid fa-leaf text-green-500"></i> Chế độ ăn
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {['Ăn chay', 'Eat Clean', 'Low Carb', 'Món nhậu'].map((diet) => (
                                        <label key={diet} className="cursor-pointer">
                                            <input type="checkbox" className="peer sr-only" />
                                            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full peer-checked:bg-green-100 peer-checked:text-green-700 peer-checked:font-bold hover:bg-gray-200 transition">
                                                {diet}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-between items-center mt-4 pt-2">
                                <button onClick={toggleFilter} className="text-xs text-gray-500 hover:text-gray-800 underline">
                                    Xóa bộ lọc
                                </button>
                                <button 
                                    onClick={toggleFilter}
                                    className="bg-red-600 text-white text-sm font-bold px-6 py-2 rounded-lg hover:bg-red-700 shadow-lg shadow-red-200 transition"
                                >
                                    Áp dụng
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* --- Right Side Actions --- */}
                    <div className="flex items-center gap-4">
                        <Link to='/AI' className="hidden md:flex items-center gap-1 text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-80">
                            <i className="fa-solid fa-wand-magic-sparkles"></i> AI Gợi ý
                        </Link>
                        <Link to='/KeHoachAnUong' className="p-2 text-gray-500 hover:bg-gray-100 rounded-full" title="Kế hoạch ăn">
                            <i className="fa-regular fa-calendar-days text-xl"></i>
                        </Link>

                        {/* --- USER DROPDOWN MENU (MỚI) --- */}
                        <div className="relative">
                            {/* Nút kích hoạt Menu (Avatar) */}
                            <button 
                                onClick={toggleUserMenu}
                                className="flex items-center focus:outline-none transition-transform active:scale-95"
                            >
                                <img 
                                    src="https://i.pravatar.cc/150?img=32" 
                                    alt="User Avatar" 
                                    className={`w-9 h-9 rounded-full border-2 ${isUserMenuOpen ? 'border-red-500 shadow-md' : 'border-gray-200'} transition-all`} 
                                />
                            </button>

                            {/* Nội dung Menu thả xuống */}
                            {isUserMenuOpen && (
                                <div className="absolute right-0 top-full mt-3 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 animate-fade-in-down origin-top-right">
                                    {/* Mũi tên trỏ lên */}
                                    <div className="absolute -top-2 right-3 w-4 h-4 bg-white border-t border-l border-gray-100 transform rotate-45"></div>

                                    {/* Header: Thông tin vắn tắt */}
                                    <div className="px-4 py-3 border-b border-gray-100 mb-2">
                                        <p className="text-sm font-bold text-gray-900">Mẹ Bắp 🌽</p>
                                        <p className="text-xs text-gray-500 truncate">mebap@gmail.com</p>
                                    </div>

                                    {/* Các Links điều hướng */}
                                    <div className="flex flex-col">
                                        <Link to="/HoSo" className="px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 flex items-center gap-3 transition">
                                            <i className="fa-regular fa-id-badge w-5"></i> Hồ sơ cá nhân
                                        </Link>
                                        <Link to="/Cookbook" className="px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 flex items-center gap-3 transition">
                                            <i className="fa-solid fa-book-open w-5"></i> Cookbook của tôi
                                        </Link>
                                        <Link to="/MonDaLuu" className="px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 flex items-center gap-3 transition">
                                            <i className="fa-regular fa-bookmark w-5"></i> Món đã lưu
                                        </Link>
                                         <Link to="/CaiDat" className="px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 flex items-center gap-3 transition">
                                            <i className="fa-solid fa-gear w-5"></i> Cài đặt tài khoản
                                        </Link>
                                    </div>

                                    {/* Footer: Đăng xuất */}
                                    <div className="border-t border-gray-100 mt-2 pt-2">
                                        <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-semibold flex items-center gap-3 transition">
                                            <i className="fa-solid fa-arrow-right-from-bracket w-5"></i> Đăng xuất
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* --- HẾT PHẦN USER MENU --- */}

                    </div>
                </div>
            </nav>
        </>
    );
}

export default Menu;
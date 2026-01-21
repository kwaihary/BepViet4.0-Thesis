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

                {/* Right Actions */}
                <div className="flex items-center gap-4">
                    <Link to='/AI' className="hidden md:flex items-center gap-1 text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-80">
                        <i className="fa-solid fa-wand-magic-sparkles"></i> AI Gợi ý
                    </Link>

                    <Link to='/KeHoachAnUong' className="p-2 text-gray-500 hover:bg-gray-100 rounded-full" title="Kế hoạch ăn">
                            <i className="fa-regular fa-calendar-days text-xl"></i>
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
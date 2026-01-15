import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Menu from "../../component/website/MenuWebsite";
import ThongTinBaiViet from "../../component/website/ThongTinBaiViet";
import HoSo from "./HoSoNguoiDung";
import Cookbook from '../../component/website/CookbookCuaToi';
import ChiTiet from './ChiTietCookbook';
import ChiTietMonAn from './ChiTietMonAn';
import CongThuc from './CongThucNauAn';
import AI from './GoiY_AI';
import DangBai from '../../component/website/DangBai';


function TrangChu() {
    const location = useLocation();

    // Style cho từng mục menu
    const getLinkClass = (path) => {
        const isActive = location.pathname === path;
        const baseClass = "group flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 font-medium text-base";
        
        return isActive 
            ? `${baseClass} bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30 transform scale-[1.02]`
            : `${baseClass} text-gray-600 hover:bg-orange-50 hover:text-orange-600 hover:pl-6 bg-white hover:shadow-sm`;
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7]  font-sans">
             <Menu />
            {/* Layout Chính */}
            <div className="container mx-auto px-4 pt-20 pb-10 grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl relative z-10">
                
                {/* --- SIDEBAR TRÁI (3 Cột) --- */}
                <aside className="hidden lg:block lg:col-span-3">
                    <div className="sticky top-28 space-y-6">
                        
                        {/* Chỉ giữ lại Menu điều hướng */}
                        <nav className="flex flex-col gap-3">
                            <p className="px-5 text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Khám phá</p>
                            
                            <Link to="/" className={getLinkClass('/')}>
                                <i className={`fa-solid fa-house w-6 text-center text-lg ${location.pathname === '/' ? 'text-white' : 'text-gray-400 group-hover:text-orange-500'}`}></i> 
                                <span>Bảng tin</span>
                            </Link>

                            <Link to="/HoSo-NguoiDung" className={getLinkClass('/HoSo-NguoiDung')}>
                                <i className={`fa-solid fa-user w-6 text-center text-lg ${location.pathname === '/HoSo-NguoiDung' ? 'text-white' : 'text-gray-400 group-hover:text-orange-500'}`}></i> 
                                <span>Trang cá nhân</span>
                            </Link>

                            <Link to="/CookbookCuaToi" className={getLinkClass('/CookbookCuaToi')}>
                                <i className={`fa-solid fa-book-open w-6 text-center text-lg ${location.pathname === '/CookbookCuaToi' ? 'text-white' : 'text-gray-400 group-hover:text-orange-500'}`}></i> 
                                <span>Cookbook của tôi</span>
                            </Link>
                        </nav>

                        {/* Phần tính năng AI tách biệt */}
                        <div className="pt-2">
                             <p className="px-5 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Tiện ích</p>
                             <Link to="/AI" className={`group flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 font-medium text-base ${location.pathname === '/AI' ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/30' : 'bg-gradient-to-br from-violet-50 to-purple-50 text-violet-700 hover:shadow-md border border-violet-100'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${location.pathname === '/AI' ? 'bg-white/20' : 'bg-white shadow-sm'}`}>
                                    <i className="fa-solid fa-wand-magic-sparkles"></i>
                                </div>
                                <div className="flex flex-col">
                                    <span>Gợi ý AI</span>
                                    {!location.pathname.includes('AI') && <span className="text-[10px] opacity-70 font-normal">Trợ lý nấu ăn</span>}
                                </div>
                            </Link>
                        </div>

                        {/* Banner quảng cáo hoặc trang trí nhỏ (Optional - để sidebar đỡ trống) */}
                        <div className="bg-orange-100 rounded-3xl p-5 mt-6 relative overflow-hidden group cursor-pointer">
                            <div className="absolute -right-4 -bottom-4 text-orange-200 text-6xl group-hover:scale-110 transition duration-500">
                                <i className="fa-solid fa-burger"></i>
                            </div>
                            <h4 className="text-orange-800 font-bold relative z-10">Món ngon mỗi ngày</h4>
                            <p className="text-orange-600 text-sm mt-1 relative z-10 mb-3">Khám phá ngay!</p>
                            <button className="bg-white text-orange-600 text-xs font-bold py-2 px-4 rounded-full shadow-sm relative z-10">Xem ngay</button>
                        </div>

                    </div>
                </aside>

                {/* --- MAIN CONTENT (9 Cột) --- */}
                <main className="lg:col-span-9 w-full">
                    <div className="min-h-[80vh]">
                        <Routes>
                            <Route index element={<ThongTinBaiViet />} />
                            <Route path="HoSo-NguoiDung" element={<HoSo />} />
                            <Route path='CookbookCuaToi' element={<Cookbook/>} />
                            <Route path='ChiTietCookBook/:id' element={<ChiTiet/>} />
                            <Route path='ChiTietMonAn/:id' element={<ChiTietMonAn/>} />
                            <Route path='cong-thuc' element={<CongThuc/>} />
                            <Route path='AI' element={<AI/>} />
                            <Route path='dang-bai' element={<DangBai/>} />
                        </Routes>
                    </div>
                </main>

            </div>
        </div>
    );
};

export default TrangChu;
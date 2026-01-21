
import React from 'react';

function TongQuan() {
    return (
        <div className="flex-1 p-6 bg-gray-50 h-screen overflow-y-auto">

            {/* --- HEADER --- */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Tổng quan hệ thống</h2>
                <p className="text-gray-500">Thống kê hiệu suất nền tảng Bếp Việt 4.0</p>
            </div>

            {/* --- PHẦN 1: KPI CARDS (Thống kê số liệu) --- */}
            {/* Dựa trên các tính năng: Người dùng, Đóng góp, Tương tác, AI [cite: 25, 39, 48] */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                
                {/* Card 1: Thành viên */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Tổng thành viên</p>
                            <h3 className="text-3xl font-bold text-gray-800 mt-2">1,245</h3>
                        </div>
                        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                        </div>

import React, { useEffect, useState } from 'react';
import * as API from '../../JS/API/API';
import * as fun from '../../JS/FUNCTION/function';
import BieuDoCot from './BieuDoCot';
import BieuDoTron from './BieuDoTron';

function TongQuan() {
    const [ThongKe, setThongKe] = useState({});
    const [loading, setloading] = useState(false);
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        const date = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        setCurrentDate(date.toLocaleDateString('vi-VN', options));

        const fetchData = async () => {
            setloading(true);
            try {
                const kq = await API.CallAPI(undefined, { PhuongThuc: 2, url: 'admin/lay_thongke' });
                if (kq.status) {
                    setThongKe(kq.data);
                }
            } catch (error) {
                console.error('Lỗi xảy ra:', error);
            } finally {
                setloading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="fixed inset-0 bg-slate-50/80 backdrop-blur-md z-[99] flex flex-col items-center justify-center">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>

                    </div>
                </div>
                <span className="mt-4 text-indigo-700 font-semibold tracking-wide animate-pulse">Đang tải dữ liệu...</span>
            </div>
        )
    }


                {/* Card 2: Công thức (Contribution) */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Tổng công thức</p>
                            <h3 className="text-3xl font-bold text-gray-800 mt-2">856</h3>
                        </div>
                        <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                        <span className="text-green-500 flex items-center font-medium">+5 bài viết</span>
                        <span className="text-gray-400 ml-2">hôm nay</span>
                    </div>
                </div>

                {/* Card 3: Tương tác (Rating/Review) */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Đánh giá & Bình luận</p>
                            <h3 className="text-3xl font-bold text-gray-800 mt-2">3.2k</h3>
                        </div>
                        <div className="p-2 bg-red-50 rounded-lg text-red-600">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                        <span className="text-gray-400">Độ sôi nổi cộng đồng cao</span>
                    </div>
                </div>
            </div>

            {/* --- PHẦN 2: BIỂU ĐỒ (CHARTS) --- */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
                
                {/* 2.1 Bar Chart: Truy cập */}
                <div className="xl:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-gray-800 text-lg">Lượt truy cập tuần qua</h3>
                        <select className="border border-gray-200 rounded-lg text-sm px-3 py-1 text-gray-500 focus:outline-none focus:border-orange-500">
                            <option>7 ngày qua</option>
                            <option>30 ngày</option>
                        </select>
                    </div>
                    {/* CSS Bar Chart đơn giản */}
                    <div className="h-64 flex items-end gap-3 sm:gap-6">
                        {[40, 55, 45, 70, 85, 95, 80].map((h, i) => (
                            <div key={i} className="flex-1 flex flex-col justify-end group cursor-pointer">
                                <div 
                                    className={`w-full rounded-t-xl transition-all duration-300 ${
                                        i === 5 ? 'bg-orange-500 shadow-lg shadow-orange-200' : 'bg-orange-100 group-hover:bg-orange-300'
                                    }`} 
                                    style={{ height: `${h}%` }}
                                ></div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-3 px-1">
                        <span>T2</span><span>T3</span><span>T4</span><span>T5</span><span>T6</span><span className="font-bold text-orange-600">T7</span><span>CN</span>
                    </div>
                </div>

                {/* 2.2 Pie Chart: Phân loại món  */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-800 text-lg mb-6">Phân loại món ăn</h3>
                    
                    <div className="flex flex-col items-center">
                        {/* CSS Pie Chart Trick using borders */}
                        <div className="w-40 h-40 rounded-full border-[18px] 
                            border-l-orange-500 
                            border-t-yellow-400 
                            border-r-green-500 
                            border-b-blue-400 
                            mb-6 relative flex items-center justify-center box-border">
                            <div className="text-center">
                                <span className="block text-2xl font-bold text-gray-800">856</span>
                                <span className="text-xs text-gray-400">Công thức</span>

    return (
        <div className="flex-1 bg-slate-50/50 min-h-screen font-sans pb-10">
            
            {/* --- 1. HERO BANNER --- */}
            <div className="bg-white p-6 lg:p-10 border-b border-slate-200">
                <div className="relative bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl p-8 lg:p-10 text-white shadow-xl shadow-indigo-200 overflow-hidden">
                    {/* Decorative circles */}
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-indigo-500/30 rounded-full blur-2xl"></div>

                    <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-2 text-indigo-100 text-sm font-medium mb-2 uppercase tracking-wider">
                                <span className="bg-white/20 px-2 py-0.5 rounded text-xs">Admin Dashboard</span>
                                <span>•</span>
                                <span className="capitalize">{currentDate}</span>
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-2">
                                Xin chào, Quản trị viên! 👋
                            </h2>
                            <p className="text-indigo-100 text-lg max-w-xl">
                                Chào mừng quay trở lại hệ thống Bếp Việt. Dưới đây là báo cáo tổng quan tình hình hoạt động hôm nay.
                            </p>
                        </div>
                        
                        {/* Status Badge */}
                        <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-3 rounded-2xl flex items-center gap-3 min-w-[180px]">
                            <div className="relative">
                                <span className="w-3 h-3 bg-green-400 rounded-full block animate-ping absolute inset-0"></span>
                                <span className="w-3 h-3 bg-green-400 rounded-full block relative border-2 border-indigo-600"></span>
                            </div>
                            <div>
                                <p className="text-xs text-indigo-200">Trạng thái Server</p>
                                <p className="font-bold text-sm">Hoạt động tốt</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6 lg:p-10 -mt-6">
                
                {/* --- 2. STATS GRID (KPIs) --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                    
                    {/* Card: Thành viên */}
                    <StatCard 
                        title="Tổng Thành Viên"
                        value={ThongKe.TongND || 0}
                        icon="fa-users"
                        colorClass="text-blue-600"
                        bgIconClass="bg-blue-50"
                        trendLabel="Người dùng thật"
                    />

                    {/* Card: Công thức */}
                    <StatCard 
                        title="Tổng Công Thức"
                        value={ThongKe.TongBaiViet || 0}
                        icon="fa-utensils"
                        colorClass="text-orange-600"
                        bgIconClass="bg-orange-50"
                        trendValue={`+${ThongKe.BaiViet_HN || 0}`}
                        trendText="mới hôm nay"
                        isTrendPositive={true}
                    />

                    {/* Card: Tương tác */}
                    <StatCard 
                        title="Lượt Tương Tác"
                        value={ThongKe.Tong_BL || 0}
                        icon="fa-comments"
                        colorClass="text-rose-600"
                        bgIconClass="bg-rose-50"
                        trendLabel="Bình luận & Đánh giá"
                    />

                    {/* Card: Phiên bản (Giữ lại nhưng làm đẹp hơn) */}
                    <div className="relative bg-white rounded-2xl p-6 shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-all">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                        <div className="flex flex-col h-full justify-between relative z-10">
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
                                        <i className="fa-solid fa-code-branch"></i>
                                    </div>
                                    <span className="text-slate-500 font-semibold text-sm uppercase">Phiên bản</span>
                                </div>
                                <h3 className="text-2xl font-bold text-slate-800">Bếp Việt v4.0</h3>
                            </div>
                            <div className="mt-4">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    Latest Release
                                </span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* --- 3. CHARTS SECTION --- */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                    {/* 3.1 Bar Chart Container */}
                    <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col overflow-hidden">
                        <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-slate-800 text-lg">Thống kê bài viết</h3>
                                <p className="text-slate-500 text-sm mt-1">Số lượng bài đăng trong 7 ngày gần nhất</p>

                            </div>
                            <button className="text-slate-400 hover:text-indigo-600 transition-colors">
                                <i className="fa-solid fa-ellipsis"></i>
                            </button>
                        </div>
                        <div className="p-6 flex-1 min-h-[350px]">
                            <BieuDoCot />
                        </div>
                    </div>


                        {/* Legend */}
                        <div className="w-full space-y-3 text-sm">
                            <div className="flex justify-between items-center">
                                <span className="flex items-center gap-2 text-gray-600">
                                    <span className="w-3 h-3 bg-orange-500 rounded-full"></span>Món mặn
                                </span>
                                <b className="text-gray-800">45%</b>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="flex items-center gap-2 text-gray-600">
                                    <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>Món bánh
                                </span>
                                <b className="text-gray-800">25%</b>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="flex items-center gap-2 text-gray-600">
                                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>Món chay
                                </span>
                                <b className="text-gray-800">20%</b>
                            </div>
                             <div className="flex justify-between items-center">
                                <span className="flex items-center gap-2 text-gray-600">
                                    <span className="w-3 h-3 bg-blue-400 rounded-full"></span>Đồ uống
                                </span>
                                <b className="text-gray-800">10%</b>
                            </div>
                        </div>
                    </div>

                    {/* 3.2 Pie Chart Container */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col overflow-hidden">
                        <div className="p-6 border-b border-slate-50">
                            <h3 className="font-bold text-slate-800 text-lg">Cơ cấu món ăn</h3>
                            <p className="text-slate-500 text-sm mt-1">Tỉ lệ phân bố theo danh mục</p>
                        </div>
                        <div className="p-6 flex-1 min-h-[350px]">
                            <BieuDoTron />
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
}


            {/* --- PHẦN 3: BẢNG DỮ LIỆU (TABLE) --- */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-10">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-bold text-gray-800 text-lg">Bài viết chờ duyệt</h3>
                    <button className="text-orange-600 text-sm font-medium hover:underline">
                        Xem tất cả
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
                            <tr>
                                <th className="px-6 py-4">Tên Món Ăn</th>
                                <th className="px-6 py-4">Người đăng</th>
                                <th className="px-6 py-4">Danh mục</th>
                                <th className="px-6 py-4">Thời gian</th>
                                <th className="px-6 py-4 text-right">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {[
                                ['Cá Kho Tộ Miền Tây', 'Nguyễn Văn A', 'Món mặn', '10 phút trước'],
                                ['Canh Bầu Nấu Tôm', 'Lê Thị B', 'Canh/Súp', '35 phút trước'],
                                ['Chè Trôi Nước', 'Hoàng Tuấn', 'Tráng miệng', '1 giờ trước'],
                                ['Bún Riêu Cua', 'Phạm Quỳnh', 'Món nước', '2 giờ trước'],
                            ].map((item, i) => (
                                <tr key={i} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 font-medium text-gray-800">{item[0]}</td>
                                    <td className="px-6 py-4 text-gray-600 flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                                            {item[1].charAt(0)}
                                        </div>
                                        {item[1]}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 rounded bg-gray-100 text-gray-600 text-xs">{item[2]}</span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-400">{item[3]}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-white bg-green-500 hover:bg-green-600 px-3 py-1 rounded text-xs font-medium transition mr-2">
                                            Duyệt
                                        </button>
                                        <button className="text-red-500 hover:bg-red-50 px-3 py-1 rounded text-xs font-medium transition">
                                            Hủy
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

// --- Sub-component: StatCard (Tách ra để code gọn hơn) ---
const StatCard = ({ title, value, icon, colorClass, bgIconClass, trendValue, trendText, isTrendPositive, trendLabel }) => (
    <div className="relative bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group overflow-hidden">
        {/* Watermark Icon Background */}
        <div className={`absolute -right-6 -bottom-6 text-9xl opacity-[0.03] rotate-12 group-hover:scale-110 transition-transform duration-500 ${colorClass}`}>
            <i className={`fa-solid ${icon}`}></i>
        </div>

        <div className="relative z-10 flex justify-between items-start mb-4">
            <div>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{title}</p>
                <h3 className="text-3xl font-extrabold text-slate-800 mt-1">
                    {fun.formatNumber(value)}
                </h3>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-sm ${bgIconClass} ${colorClass}`}>
                <i className={`fa-solid ${icon}`}></i>
            </div>
        </div>

        {/* Footer info của Card */}
        <div className="relative z-10 pt-2 border-t border-slate-50">
            {trendValue ? (
                <div className="flex items-center text-sm font-medium">
                    <span className={`${isTrendPositive ? 'text-green-500' : 'text-red-500'} flex items-center bg-green-50 px-2 py-0.5 rounded-md mr-2`}>
                        {isTrendPositive ? <i className="fa-solid fa-arrow-up mr-1 text-xs"></i> : <i className="fa-solid fa-arrow-down mr-1 text-xs"></i>}
                        {trendValue}
                    </span>
                    <span className="text-slate-400 text-xs">{trendText}</span>
                </div>
            ) : (
                <div className="flex items-center text-sm">
                    <span className="text-slate-400 text-xs font-medium bg-slate-100 px-2 py-0.5 rounded-md">
                        {trendLabel || "Cập nhật realtime"}
                    </span>
                </div>
            )}

        </div>
    </div>
);

export default TongQuan;
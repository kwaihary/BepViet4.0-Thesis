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
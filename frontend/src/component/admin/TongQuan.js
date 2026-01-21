import React from 'react';
import { useEffect , useState } from 'react';
import * as API from '../../JS/API/API';
import * as fun from '../../JS/FUNCTION/function';

function TongQuan() {
   
    const [ThongKe, setThongKe] = useState({}); 
    const [loading, setloading] = useState(false);

    useEffect(() => {
        const data = async () => {
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
        data();
    }, []);
    if(loading){
        return (
            <div className="absolute inset-0 bg-white/80 z-10 flex items-center justify-center">
                <span className="text-indigo-600 font-bold"><i className="fa-solid fa-spinner fa-spin mr-2"></i>Đang tải...</span>
             </div>
        )
    }

    return (
        <div className="flex-1 p-6 bg-gray-50 h-screen">

            {/* --- HEADER --- */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Tổng quan hệ thống</h2>
                <p className="text-gray-500">Thống kê hiệu suất nền tảng Bếp Việt 4.0</p>
            </div>

            {/* --- PHẦN 1: KPI CARDS (Thống kê số liệu) --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                
                {/* Card 1: Thành viên -> Mapping: TongND */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Tổng thành viên</p>
                            <h3 className="text-3xl font-bold text-gray-800 mt-2">
                                {fun.formatNumber(ThongKe.TongND || 0)}
                            </h3>
                        </div>
                        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                        </div>
                    </div>
                </div>

                {/* Card 2: Công thức -> Mapping: TongBaiViet & BaiViet_HN */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Tổng công thức</p>
                            <h3 className="text-3xl font-bold text-gray-800 mt-2">
                                {fun.formatNumber(ThongKe.TongBaiViet || 0)}
                            </h3>
                        </div>
                        <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                        <span className="text-green-500 flex items-center font-medium">
                            + {fun.formatNumber(ThongKe.BaiViet_HN || 0)} bài viết
                        </span>
                        <span className="text-gray-400 ml-2">hôm nay</span>
                    </div>
                </div>

                {/* Card 3: Tương tác -> Mapping: Tong_BL */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Đánh giá & Bình luận</p>
                            <h3 className="text-3xl font-bold text-gray-800 mt-2">
                                {fun.formatNumber(ThongKe.Tong_BL || 0)}
                            </h3>
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

            {/* --- PHẦN 2: BIỂU ĐỒ (CHARTS) - Giữ nguyên --- */}
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
                                {/* Liên kết tổng số bài viết vào giữa biểu đồ tròn */}
                                <span className="block text-2xl font-bold text-gray-800">
                                    {fun.formatNumber(ThongKe.TongBaiViet || 0)}
                                </span>
                                <span className="text-xs text-gray-400">Công thức</span>
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
                </div>
            </div>
        </div>
    );
}

export default TongQuan;
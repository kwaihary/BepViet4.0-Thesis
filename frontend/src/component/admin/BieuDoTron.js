import React, { useEffect, useState, useMemo } from 'react';
import * as API from '../../JS/API/API';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

// Bảng màu hiện đại, hài hòa với giao diện Dashboard
const COLORS = [
    '#6366f1', // Indigo (Màu chủ đạo)
    '#f43f5e', // Rose
    '#22c55e', // Green
    '#eab308', // Yellow
    '#3b82f6', // Blue
    '#8b5cf6', // Violet
];

function BieuDoTron() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await API.CallAPI(undefined, {
                    PhuongThuc: 2, 
                    url: 'admin/dulieu_bieudo_danhmuc'
                });

                if (res.status) {
                    setData(res.data);
                }
            } catch (error) {
                console.error('Lỗi lấy dữ liệu biểu đồ tròn:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Tính tổng số lượng để hiển thị ở giữa Donut
    const totalValue = useMemo(() => {
        return data.reduce((acc, curr) => acc + (curr.total || 0), 0);
    }, [data]);

    // Custom Tooltip: Hiển thị đẹp hơn tooltip đen mặc định
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const item = payload[0].payload;
            // Tính phần trăm
            const percent = totalValue > 0 ? ((item.total / totalValue) * 100).toFixed(1) : 0;
            
            return (
                <div className="bg-white p-3 border border-slate-100 shadow-xl rounded-xl z-50">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: payload[0].fill }}></span>
                        <p className="text-sm font-bold text-slate-700">{item.type}</p>
                    </div>
                    <p className="text-sm text-slate-500">
                        Số lượng: <span className="font-semibold text-slate-800">{item.total}</span>
                    </p>
                    <p className="text-xs text-slate-400 mt-1">Chiếm {percent}%</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full h-full flex flex-col">
            {loading ? (
                // Skeleton Loading: Hình tròn xoay nhẹ khi đang tải
                <div className="flex flex-col items-center justify-center h-full gap-4 animate-pulse">
                    <div className="w-40 h-40 rounded-full border-8 border-slate-100 bg-slate-50"></div>
                    <div className="w-3/4 h-4 bg-slate-100 rounded"></div>
                    <div className="w-1/2 h-4 bg-slate-100 rounded"></div>
                </div>
            ) : (
                data && data.length > 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-between">
                        
                        {/* 1. Phần Biểu đồ */}
                        <div className="relative w-full h-64 xl:h-60">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={data}
                                        dataKey="total"
                                        nameKey="type"
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={65}  // Lỗ hổng lớn hơn để hiện số đẹp hơn
                                        outerRadius={85}
                                        paddingAngle={4}  // Khoảng cách giữa các miếng
                                        cornerRadius={5}  // Bo tròn góc miếng bánh
                                        stroke="none"
                                    >
                                        {data.map((entry, index) => (
                                            <Cell 
                                                key={`cell-${index}`} 
                                                fill={COLORS[index % COLORS.length]} 
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                                </PieChart>
                            </ResponsiveContainer>

                            {/* Center Text: Hiển thị tổng số ở giữa */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-3xl font-extrabold text-slate-800">{totalValue}</span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Tổng số</span>
                            </div>
                        </div>

                        {/* 2. Custom Legend: Danh sách chú thích bên dưới */}
                        <div className="w-full grid grid-cols-2 gap-x-4 gap-y-2 mt-2 px-2 max-h-40 overflow-y-auto custom-scrollbar">
                            {data.map((entry, index) => {
                                const percent = totalValue > 0 ? ((entry.total / totalValue) * 100).toFixed(0) : 0;
                                return (
                                    <div key={index} className="flex justify-between items-center text-sm p-1.5 rounded hover:bg-slate-50 transition-colors cursor-default">
                                        <div className="flex items-center gap-2 overflow-hidden">
                                            <span 
                                                className="w-2.5 h-2.5 rounded-full flex-shrink-0" 
                                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                            ></span>
                                            <span className="text-slate-600 font-medium truncate" title={entry.type}>
                                                {entry.type}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            <span className="font-bold text-slate-800">{percent}%</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                    </div>
                ) : (
                    // Trạng thái không có dữ liệu
                    <div className="flex flex-col items-center justify-center h-full text-slate-400">
                        <i className="fa-solid fa-chart-pie text-4xl mb-3 opacity-30"></i>
                        <p className="text-sm">Chưa có dữ liệu phân loại</p>
                    </div>
                )
            )}
        </div>
    );
}

export default BieuDoTron;
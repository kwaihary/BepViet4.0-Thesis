import * as API from '../../JS/API/API';
import { useEffect, useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer
} from 'recharts';

function BieuDoCot() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await API.CallAPI(undefined, {
                    PhuongThuc: 2, 
                    url: 'admin/dulieu_bieudo_baiviet'
                });

                if (res.status === true) {
                    setData(res.data);
                }
            } catch (error) {
                console.error('Lỗi xảy ra:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const formatXAxis = (tickItem) => {
        try {
            const [ month, day] = tickItem.split('-');
            return `${day}/${month}`;
        } catch (e) {
            return tickItem;
        }
    };



    return (
        <div className="w-full h-full">
            {loading ? (
                <div className="w-full h-full flex items-end justify-between gap-2 px-4 animate-pulse">
                    {[...Array(7)].map((_, i) => (
                        <div key={i} className="w-full bg-slate-200 rounded-t-lg" style={{ height: `${Math.random() * 60 + 20}%` }}></div>
                    ))}
                </div>
            ) : (
                data && data.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            
                            <XAxis 
                                dataKey="day" 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fill: '#64748b', fontSize: 12 }} 
                                dy={10}
                                tickFormatter={formatXAxis} 
                            />
                            
                            <YAxis 
                                allowDecimals={false} 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fill: '#64748b', fontSize: 12 }} 
                            />
                            <Bar 
                                dataKey="total" 
                                fill="#6366f1" 
                                radius={[6, 6, 0, 0]} 
                                barSize={40} 
                                activeBar={{ fill: '#4f46e5' }}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                        <i className="fa-solid fa-chart-column text-4xl mb-2 opacity-50"></i>
                        <p className="text-sm">Chưa có dữ liệu thống kê</p>
                    </div>
                )
            )}
        </div>
    );
}

export default BieuDoCot;
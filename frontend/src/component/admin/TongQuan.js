function TongQuan() {
    return (
        <div className="flex-1 p-6 overflow-y-auto bg-gray-50">

            {/* ================= KPI CARDS ================= */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

                {/* Card */}
                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Tổng thành viên</p>
                            <h3 className="text-3xl font-bold text-gray-800 mt-1">1,245</h3>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                            <span className="material-icons-round">people</span>
                        </div>
                    </div>
                    <p className="text-sm text-green-500 mt-4 flex items-center gap-1">
                        <span className="material-icons-round text-base">trending_up</span> +12% tuần này
                    </p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Công thức</p>
                            <h3 className="text-3xl font-bold text-gray-800 mt-1">856</h3>
                        </div>
                        <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center">
                            <span className="material-icons-round">restaurant_menu</span>
                        </div>
                    </div>
                    <p className="text-sm text-green-500 mt-4">+5 công thức hôm nay</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition border-l-4 border-yellow-400">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-500 font-semibold uppercase">Chờ duyệt</p>
                            <h3 className="text-3xl font-bold text-yellow-500 mt-1">12</h3>
                        </div>
                        <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-xl flex items-center justify-center">
                            <span className="material-icons-round">hourglass_top</span>
                        </div>
                    </div>
                    <p className="text-sm text-gray-400 mt-4">Cần xử lý sớm</p>
                </div>

                <div className="bg-gradient-to-br from-brand to-brand-dark text-white rounded-2xl p-6 shadow-lg shadow-brand/30">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-white/80">AI "Hôm nay ăn gì"</p>
                            <h3 className="text-3xl font-bold mt-1">3,4k</h3>
                        </div>
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                            <span className="material-icons-round">smart_toy</span>
                        </div>
                    </div>
                    <p className="text-sm text-white/80 mt-4">
                        Tăng mạnh giờ trưa 🍱
                    </p>
                </div>

            </div>

            {/* ================= CHART + PIE ================= */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-10">

                {/* Bar Chart */}
                <div className="xl:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-gray-800 text-lg">Lượt truy cập</h3>
                        <select className="border border-gray-200 rounded-lg text-sm px-3 py-1 text-gray-500">
                            <option>7 ngày qua</option>
                            <option>30 ngày</option>
                        </select>
                    </div>

                    <div className="h-64 flex items-end gap-3">
                        {[40, 55, 45, 70, 85, 95, 80].map((h, i) => (
                            <div
                                key={i}
                                className={`flex-1 rounded-xl transition-all ${
                                    i === 5
                                        ? 'bg-brand shadow-lg shadow-brand/30'
                                        : 'bg-blue-100 hover:bg-blue-200'
                                }`}
                                style={{ height: `${h}%` }}
                            />
                        ))}
                    </div>

                    <div className="flex justify-between text-xs text-gray-400 mt-3">
                        <span>T2</span><span>T3</span><span>T4</span>
                        <span>T5</span><span>T6</span>
                        <span className="font-bold text-brand">T7</span><span>CN</span>
                    </div>
                </div>

                {/* Pie */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <h3 className="font-bold text-gray-800 text-lg mb-6">Phân loại món</h3>

                    <div className="flex flex-col items-center">
                        <div className="w-40 h-40 rounded-full border-[18px] 
                            border-l-brand 
                            border-t-orange-400 
                            border-r-green-400 
                            border-b-blue-400 
                            mb-6 relative">
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-2xl font-bold">856</span>
                                <span className="text-xs text-gray-400">Công thức</span>
                            </div>
                        </div>

                        <div className="w-full space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="flex items-center gap-2">
                                    <span className="w-3 h-3 bg-brand rounded-full"></span>Món mặn
                                </span>
                                <b>45%</b>
                            </div>
                            <div className="flex justify-between">
                                <span className="flex items-center gap-2">
                                    <span className="w-3 h-3 bg-orange-400 rounded-full"></span>Món bánh
                                </span>
                                <b>25%</b>
                            </div>
                            <div className="flex justify-between">
                                <span className="flex items-center gap-2">
                                    <span className="w-3 h-3 bg-green-400 rounded-full"></span>Món chay
                                </span>
                                <b>20%</b>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* ================= TABLE ================= */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="p-6 border-b flex justify-between items-center">
                    <h3 className="font-bold text-gray-800 text-lg">Bài viết chờ duyệt</h3>
                    <a href="#" className="text-brand text-sm font-medium hover:underline">
                        Xem tất cả
                    </a>
                </div>

                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                        <tr>
                            <th className="px-6 py-4 text-left">Bài viết</th>
                            <th className="px-6 py-4 text-left">Người đăng</th>
                            <th className="px-6 py-4 text-left">Thời gian</th>
                            <th className="px-6 py-4 text-right">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {[
                            ['Cá Kho Tộ Miền Tây', 'Nguyễn Văn A', '10 phút trước'],
                            ['Canh Bầu Nấu Tôm', 'Lê Thị B', '35 phút trước'],
                            ['Chè Trôi Nước', 'Hoàng Tuấn', '1 giờ trước'],
                        ].map((item, i) => (
                            <tr key={i} className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium">{item[0]}</td>
                                <td className="px-6 py-4 text-gray-600">{item[1]}</td>
                                <td className="px-6 py-4 text-gray-500">{item[2]}</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-brand hover:bg-brand/10 px-3 py-1 rounded-lg font-medium">
                                        Duyệt
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="h-10"></div>
        </div>
    );
}

export default TongQuan;

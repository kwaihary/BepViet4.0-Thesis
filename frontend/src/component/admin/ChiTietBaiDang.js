import React from 'react';
function ChiTietBaiDang() {
    return (
    
        <div className="flex flex-col h-full relative">
            <div className="flex-1 flex overflow-hidden">
                <div className="flex-1 overflow-y-auto custom-scrollbar p-5 lg:p-8 scroll-smooth bg-slate-50/50">
                    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden">
                        
                        {/* Ảnh bìa (Hero Image) */}
                        <div className="relative h-72 md:h-96 group">
                            <img src="https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" alt="Món ăn" className="w-full h-full object-cover"/>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                            
                            <div className="absolute bottom-6 left-6 text-white right-6">
                                <h1 className="text-3xl md:text-4xl font-extrabold mb-3 shadow-sm leading-tight">Bún Riêu Cua Đồng Miền Tây</h1>
                                <div className="flex flex-wrap gap-2 text-sm font-medium">
                                    <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 border border-white/10">
                                        <span className="material-icons-round text-sm">timer</span> 45 phút
                                    </span>
                                    <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 border border-white/10">
                                        <span className="material-icons-round text-sm">restaurant</span> 4 người
                                    </span>
                                    <span className="bg-orange-500/80 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 border border-white/10">
                                        #MienTay
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="p-8">
                            {/* Mô tả */}
                            <div className="mb-10 relative">
                                <span className="absolute -top-4 -left-2 text-6xl text-orange-100 font-serif opacity-50">"</span>
                                <p className="text-slate-600 leading-relaxed text-lg italic border-l-4 border-orange-300 pl-5 relative z-10">
                                    Món bún riêu cua đồng đậm đà hương vị miền Tây sông nước. Nước lèo ngọt thanh từ cua đồng tươi, ăn kèm với rau ghém và mắm tôm chuẩn vị. Hôm nay mình xin chia sẻ công thức gia truyền của ngoại mình nhé!
                                </p>
                            </div>

                            {/* Grid Nguyên liệu */}
                            <div className="mb-12">
                                <h3 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2 uppercase tracking-wide">
                                    <span className="material-icons-round text-orange-500">shopping_basket</span> Nguyên liệu
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 transition-colors">
                                        <span className="font-medium text-slate-700">Cua đồng xay</span>
                                        <span className="font-bold text-slate-800 bg-white px-2.5 py-1 rounded text-sm shadow-sm">500g</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 transition-colors">
                                        <span className="font-medium text-slate-700">Bún tươi</span>
                                        <span className="font-bold text-slate-800 bg-white px-2.5 py-1 rounded text-sm shadow-sm">1kg</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 transition-colors">
                                        <span className="font-medium text-slate-700">Cà chua</span>
                                        <span className="font-bold text-slate-800 bg-white px-2.5 py-1 rounded text-sm shadow-sm">4 quả</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 transition-colors">
                                        <span className="font-medium text-slate-700">Mắm tôm</span>
                                        <span className="font-bold text-slate-800 bg-white px-2.5 py-1 rounded text-sm shadow-sm">2 thìa</span>
                                    </div>
                                </div>
                            </div>

                            {/* Timeline Cách làm */}
                            <div>
                                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2 uppercase tracking-wide">
                                    <span className="material-icons-round text-orange-500">format_list_numbered</span> Cách thực hiện
                                </h3>
                                
                                <div className="space-y-8 relative pl-2">
                                    <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-slate-200"></div>

                                    <div className="relative pl-10">
                                        <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-white border-2 border-orange-100 text-orange-600 flex items-center justify-center font-bold text-lg shadow-sm z-10">1</div>
                                        <h4 className="font-bold text-lg text-slate-800 mb-2">Sơ chế cua đồng</h4>
                                        <p className="text-slate-600 leading-relaxed text-sm">Lọc cua xay với nước, bỏ xác. Thêm chút muối vào nước cua đã lọc rồi đun lửa nhỏ để riêu đóng tảng.</p>
                                    </div>

                                    <div className="relative pl-10">
                                        <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-white border-2 border-orange-100 text-orange-600 flex items-center justify-center font-bold text-lg shadow-sm z-10">2</div>
                                        <h4 className="font-bold text-lg text-slate-800 mb-2">Nấu nước dùng</h4>
                                        <p className="text-slate-600 leading-relaxed text-sm mb-3">Phi thơm hành tím, xào cà chua cho lên màu đẹp. Đổ vào nồi nước cua. Nêm nếm gia vị vừa ăn: muối, đường phèn, mắm ruốc.</p>
                                        <img src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=500&q=80" className="rounded-xl w-64 object-cover shadow-md" alt="Step 2"/>
                                    </div>
                                    
                                     <div className="relative pl-10">
                                        <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-white border-2 border-orange-100 text-orange-600 flex items-center justify-center font-bold text-lg shadow-sm z-10">3</div>
                                        <h4 className="font-bold text-lg text-slate-800 mb-2">Thưởng thức</h4>
                                        <p className="text-slate-600 leading-relaxed text-sm">Chan nước dùng nóng hổi vào bún, thêm rau sống và mắm tôm.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="h-10"></div>
                     {/* Info Tác giả */}
                        <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4">
                            <div className="relative">
                                <img src="https://i.pravatar.cc/150?img=32" alt="User" className="w-12 h-12 rounded-full border-2 border-slate-100"/>
                                <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-0.5 border-2 border-white">
                                    <span className="material-icons-round text-white text-[10px] block">check</span>
                                </div>
                            </div>
                            <div>
                                <div className="font-bold text-slate-800">Trần Thị B</div>
                                <div className="text-xs text-slate-400">Đăng 2 giờ trước</div>
                            </div>
                        </div>
                    <div className="p-5 border-t border-slate-100 bg-white z-10">
                        <div className="grid grid-cols-2 gap-3">
                            <button className="flex items-center justify-center gap-2 py-3 px-4 border-2 border-red-100 text-red-500 font-bold rounded-xl hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all">
                                <span className="material-icons-round">Từ chối</span> 
                            </button>
                            <button className="flex items-center justify-center gap-2 py-3 px-4 bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 hover:bg-emerald-600 hover:shadow-emerald-300 hover:-translate-y-0.5 transition-all">
                                <span className="material-icons-round">Duyệt bài</span> 
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChiTietBaiDang
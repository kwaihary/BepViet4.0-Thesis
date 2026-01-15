function ChiTietBaiDang(){
    return (
        <>
            <aside class="w-64 bg-white border-r border-gray-200 flex flex-col z-10 hidden md:flex">
        <div class="h-16 flex items-center px-6 border-b border-gray-100">
            <span class="text-2xl font-bold text-brand flex items-center gap-2">
                <span class="material-icons-round">soup_kitchen</span> Bếp Việt 4.0
            </span>
        </div>
        
        <nav class="flex-1 p-4 space-y-1 overflow-y-auto">
            <a href="#" class="flex items-center gap-3 px-4 py-3 text-gray-500 rounded-lg hover:bg-gray-50 hover:text-brand transition-colors">
                <span class="material-icons-round">dashboard</span> Tổng quan
            </a>
            <a href="#" class="flex items-center gap-3 px-4 py-3 bg-brand-light text-brand font-medium rounded-lg transition-colors">
                <span class="material-icons-round">rate_review</span> Duyệt bài đăng
                <span class="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">3</span>
            </a>
            <a href="#" class="flex items-center gap-3 px-4 py-3 text-gray-500 rounded-lg hover:bg-gray-50 hover:text-brand transition-colors">
                <span class="material-icons-round">manage_accounts</span> Người dùng
            </a>
            <a href="#" class="flex items-center gap-3 px-4 py-3 text-gray-500 rounded-lg hover:bg-gray-50 hover:text-brand transition-colors">
                <span class="material-icons-round">settings</span> Cài đặt
            </a>
        </nav>
    </aside>

    <main class="flex-1 flex flex-col min-w-0">
        
        <header class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm z-10">
            <div class="flex items-center gap-2 text-sm text-gray-500">
                <span class="material-icons-round text-lg">home</span> / Quản lý bài đăng / <span class="font-bold text-gray-800">#BV-889</span>
            </div>
            <div class="flex items-center gap-3">
                <div class="text-right hidden sm:block">
                    <div class="font-bold text-sm">Admin Huy</div>
                    <div class="text-xs text-gray-400">Moderator</div>
                </div>
                <div class="w-10 h-10 rounded-full bg-brand text-white flex items-center justify-center font-bold text-lg">H</div>
            </div>
        </header>

        <div class="flex-1 flex overflow-hidden">
            
            <div class="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-10 bg-gray-50">
                <div class="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div class="relative h-80">
                        <img src="https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Món ăn" class="w-full h-full object-cover"/>
                        <div class="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-lg backdrop-blur-sm text-sm">
                            <span class="material-icons-round text-sm align-middle">camera_alt</span> 5 ảnh
                        </div>
                    </div>

                    <div class="p-8">
                        <h1 class="text-3xl font-bold text-gray-800 mb-4">Bún Riêu Cua Đồng Miền Tây</h1>
                        
                        <div class="flex flex-wrap gap-4 mb-8 text-sm text-gray-600">
                            <span class="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full"><span class="material-icons-round text-base">timer</span> 45 phút</span>
                            <span class="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full"><span class="material-icons-round text-base">restaurant</span> 4 người</span>
                            <span class="flex items-center gap-1 text-brand bg-brand-light px-3 py-1 rounded-full font-medium">#MienTay</span>
                            <span class="flex items-center gap-1 text-brand bg-brand-light px-3 py-1 rounded-full font-medium">#BunRieu</span>
                        </div>

                        <p class="text-gray-600 leading-relaxed mb-8 text-lg">
                            Món bún riêu cua đồng đậm đà hương vị miền Tây sông nước. Nước lèo ngọt thanh từ cua đồng tươi, ăn kèm với rau ghém và mắm tôm chuẩn vị. Hôm nay mình xin chia sẻ công thức gia truyền của ngoại mình nhé!
                        </p>

                        <div class="mb-10">
                            <h3 class="text-xl font-bold text-gray-800 mb-4 border-l-4 border-brand pl-3">Nguyên liệu</h3>
                            <ul class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                                <li class="flex justify-between border-b border-dashed border-gray-200 pb-2"><span>Cua đồng xay</span> <b>500g</b></li>
                                <li class="flex justify-between border-b border-dashed border-gray-200 pb-2"><span>Bún tươi</span> <b>1kg</b></li>
                                <li class="flex justify-between border-b border-dashed border-gray-200 pb-2"><span>Cà chua</span> <b>4 quả</b></li>
                                <li class="flex justify-between border-b border-dashed border-gray-200 pb-2"><span>Đậu hũ chiên</span> <b>2 bìa</b></li>
                                <li class="flex justify-between border-b border-dashed border-gray-200 pb-2"><span>Huyết heo</span> <b>200g</b></li>
                            </ul>
                        </div>

                        <div>
                            <h3 class="text-xl font-bold text-gray-800 mb-6 border-l-4 border-brand pl-3">Cách thực hiện</h3>
                            
                            <div class="flex gap-5 mb-8">
                                <div class="w-10 h-10 rounded-full bg-brand text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-lg shadow-brand/30">1</div>
                                <div>
                                    <h4 class="font-bold text-lg text-gray-800 mb-2">Sơ chế cua</h4>
                                    <p class="text-gray-600 mb-3">Lọc cua xay với nước, bỏ xác. Thêm chút muối vào nước cua đã lọc rồi đun lửa nhỏ để riêu đóng tảng.</p>
                                </div>
                            </div>

                            <div class="flex gap-5 mb-8">
                                <div class="w-10 h-10 rounded-full bg-brand text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-lg shadow-brand/30">2</div>
                                <div>
                                    <h4 class="font-bold text-lg text-gray-800 mb-2">Nấu nước dùng</h4>
                                    <p class="text-gray-600 mb-3">Phi thơm hành tím, xào cà chua cho lên màu đẹp. Đổ vào nồi nước cua. Nêm nếm gia vị vừa ăn: muối, đường phèn, mắm ruốc.</p>
                                    <img src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=500&q=80" class="rounded-lg w-64 object-cover shadow-sm"/>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="h-20"></div>
            </div>

            <div class="w-96 bg-white border-l border-gray-200 flex flex-col shadow-xl z-20">
                <div class="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
                    
                    <div class="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                        <img src="https://i.pravatar.cc/150?img=32" alt="User" class="w-12 h-12 rounded-full border-2 border-white shadow-sm"/>
                        <div>
                            <div class="font-bold text-gray-800">Trần Thị B</div>
                            <div class="text-xs text-gray-500">Đã tham gia: 2 tháng trước</div>
                            <div class="flex items-center gap-1 text-xs text-yellow-500 font-bold mt-1">
                                <span class="material-icons-round text-sm">star</span> 4.5/5 uy tín
                            </div>
                        </div>
                    </div>

                    <div class="bg-blue-50 p-5 rounded-xl border border-blue-100 relative overflow-hidden">
                        <div class="absolute top-0 right-0 p-2 opacity-10"><span class="material-icons-round text-6xl">smart_toy</span></div>
                        <h3 class="font-bold text-blue-800 mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
                            <span class="material-icons-round">analytics</span> AI Phân tích
                        </h3>
                        <div class="space-y-3 text-sm">
                            <div class="flex gap-2 text-green-700 font-medium">
                                <span class="material-icons-round text-base">check_circle</span>
                                Ảnh Unique 100% (Không trùng lặp)
                            </div>
                            <div class="flex gap-2 text-green-700 font-medium">
                                <span class="material-icons-round text-base">check_circle</span>
                                Không chứa từ khóa nhạy cảm
                            </div>
                            <div class="flex gap-2 text-orange-600 font-medium bg-white/50 p-2 rounded-lg border border-orange-100">
                                <span class="material-icons-round text-base">warning</span>
                                Lưu ý: Thiếu định lượng "mắm ruốc"
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 class="font-bold text-gray-800 mb-3">Tiêu chí kiểm duyệt</h3>
                        <div class="space-y-2">
                            <label class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-transparent hover:border-gray-200 transition-all">
                                <input type="checkbox" class="w-5 h-5 text-brand rounded border-gray-300 focus:ring-brand"/>
                                <span class="text-sm text-gray-600 select-none">Hình ảnh sắc nét, đẹp</span>
                            </label>
                            <label class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-transparent hover:border-gray-200 transition-all">
                                <input type="checkbox" class="w-5 h-5 text-brand rounded border-gray-300 focus:ring-brand"/>
                                <span class="text-sm text-gray-600 select-none">Công thức đầy đủ, rõ ràng</span>
                            </label>
                            <label class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-transparent hover:border-gray-200 transition-all">
                                <input type="checkbox" class="w-5 h-5 text-brand rounded border-gray-300 focus:ring-brand"/>
                                <span class="text-sm text-gray-600 select-none">Không sai chính tả</span>
                            </label>
                        </div>
                    </div>

                </div>

                <div class="p-6 border-t border-gray-100 bg-gray-50">
                    <div class="grid grid-cols-2 gap-3">
                        <button onclick="toggleRejectModal()" class="flex items-center justify-center gap-2 py-3 px-4 border-2 border-red-200 text-red-500 font-bold rounded-xl hover:bg-red-50 hover:border-red-300 transition-all active:scale-95">
                            <span class="material-icons-round">close</span> Từ chối
                        </button>
                        <button onclick="approvePost()" class="flex items-center justify-center gap-2 py-3 px-4 bg-green-500 text-white font-bold rounded-xl shadow-lg shadow-green-200 hover:bg-green-600 hover:shadow-xl transition-all active:scale-95">
                            <span class="material-icons-round">check</span> Duyệt bài
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <div id="rejectModal" class="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 hidden flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100">
            <div class="p-6">
                <h3 class="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <span class="material-icons-round text-red-500">report_problem</span>
                    Lý do từ chối bài viết
                </h3>
                <p class="text-gray-500 text-sm mb-4">Thông báo này sẽ được gửi về cho tác giả.</p>
                
                <div class="space-y-2 mb-4">
                    <button onclick="fillReason('Hình ảnh bị mờ hoặc không đạt chất lượng.')" class="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded text-gray-600 border border-transparent hover:border-gray-200 transition-colors">
                        📷 Hình ảnh mờ / kém chất lượng
                    </button>
                    <button onclick="fillReason('Thiếu định lượng nguyên liệu cụ thể.')" class="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded text-gray-600 border border-transparent hover:border-gray-200 transition-colors">
                        ⚖️ Thiếu định lượng nguyên liệu
                    </button>
                    <button onclick="fillReason('Nội dung trùng lặp hoặc vi phạm bản quyền.')" class="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded text-gray-600 border border-transparent hover:border-gray-200 transition-colors">
                        ©️ Vi phạm bản quyền / Copy
                    </button>
                </div>

                <label class="block text-sm font-medium text-gray-700 mb-1">Chi tiết lý do:</label>
                <textarea id="reasonText" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand outline-none text-sm" rows="3" placeholder="Nhập lý do cụ thể..."></textarea>
            </div>
            
            <div class="bg-gray-50 px-6 py-4 flex justify-end gap-3">
                <button onclick="toggleRejectModal()" class="px-4 py-2 text-gray-600 font-medium hover:text-gray-800">Hủy bỏ</button>
                <button onclick="confirmReject()" class="px-6 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 shadow-lg shadow-red-200 transition-transform active:scale-95">
                    Gửi Từ Chối
                </button>
            </div>
        </div>
    </div>
        </>
    )
};
export default ChiTietBaiDang;
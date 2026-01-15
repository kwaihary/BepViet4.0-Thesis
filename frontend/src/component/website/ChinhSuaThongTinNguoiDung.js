function ChinhSua(){
    return(
        <>
        <div class="p-6 overflow-y-auto custom-scrollbar space-y-8">
            
            <div class="flex flex-col items-center justify-center gap-3">
                <div class="relative group cursor-pointer">
                    <img src="https://i.pravatar.cc/150?img=32" alt='123' class="w-24 h-24 rounded-full border-4 border-gray-50 shadow-sm object-cover"/>
                    <label class="absolute bottom-0 right-0 bg-white text-gray-600 p-2 rounded-full shadow border border-gray-200 hover:text-red-600 hover:border-red-200 transition cursor-pointer">
                        <i class="fa-solid fa-camera text-sm"></i>
                        <input type="file" class="hidden" accept="image/*"/>
                    </label>
                </div>
            </div>

            <div>
                <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-l-4 border-blue-500 pl-3">
                    Thông tin công khai
                </h4>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div class="col-span-1">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Tên hiển thị</label>
                        <div class="relative">
                            <i class="fa-regular fa-id-badge absolute left-3 top-3 text-gray-400"></i>
                            <input type="text" value="Mẹ Bắp 🌽" class="form-input w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 transition placeholder-gray-400"/>
                        </div>
                    </div>

                    <div class="col-span-1">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Nơi ở hiện tại</label>
                        <div class="relative">
                            <i class="fa-solid fa-location-dot absolute left-3 top-3 text-gray-400"></i>
                            <input type="text" value="Hà Nội" class="form-input w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 transition placeholder-gray-400"/>
                        </div>
                    </div>

                    <div class="col-span-1 md:col-span-2">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Tiểu sử</label>
                        <textarea rows="3" class="form-input w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 transition placeholder-gray-400">🍳 Yêu bếp, nghiện nhà. Chuyên cơm gia đình & ăn dặm.</textarea>
                    </div>

                    <div class="col-span-1 md:col-span-2">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Website / Blog</label>
                        <div class="relative">
                            <i class="fa-solid fa-globe absolute left-3 top-3 text-gray-400"></i>
                            <input type="url" value="https://bepphuong.com" class="form-input w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-300 text-blue-600 transition"/>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-l-4 border-red-500 pl-3 flex items-center gap-2">
                    Thông tin cá nhân <span class="bg-gray-100 text-gray-500 text-[10px] px-2 py-0.5 rounded-full font-normal normal-case"><i class="fa-solid fa-lock text-[10px] mr-1"></i>Chỉ mình bạn thấy</span>
                </h4>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div class="col-span-1">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Họ và tên đầy đủ</label>
                        <input type="text" value="Vũ Thu Phương" class="form-input w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 transition"/>
                    </div>

                    <div class="col-span-1">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                        <div class="relative">
                            <i class="fa-solid fa-phone absolute left-3 top-3 text-gray-400"></i>
                            <input type="tel" value="0987 *** ***" class="form-input w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 transition"/>
                        </div>
                    </div>

                    <div class="col-span-1 md:col-span-2">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Email đăng nhập</label>
                        <div class="relative">
                            <i class="fa-solid fa-envelope absolute left-3 top-3 text-gray-400"></i>
                            <input type="email" value="mebap.cooking@email.com" disabled class="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed select-none"/>
                            <span class="absolute right-3 top-3 text-xs text-blue-500 cursor-pointer hover:underline">Thay đổi?</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div class="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 rounded-b-2xl shrink-0">
            <button class="px-5 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200 transition">
                Hủy bỏ
            </button>
            <button class="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 shadow-lg shadow-orange-500/30 transition transform active:scale-95">
                Lưu thay đổi
            </button>
        </div>
        </>
    )
};
export default ChinhSua;
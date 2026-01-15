import { Link } from "react-router-dom";
function CongThuc(){
    return (
        <>

    <main class="container mx-auto px-4 max-w-7xl py-10">
        
        <div class="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h2 class="font-bold text-xl text-gray-800">Món mới nhất</h2>
            <select class="bg-white border border-gray-200 text-sm px-4 py-2 rounded-lg focus:outline-none focus:border-red-300">
                <option>Mới nhất</option>
                <option>Được yêu thích nhất</option>
                <option>Dễ làm nhất</option>
            </select>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div class="bg-white rounded-xl shadow-sm hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100 flex flex-col h-full group">
                <div class="relative h-48 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836" class="w-full h-full object-cover group-hover:scale-110 transition duration-500"/>
                    <span class="absolute top-2 left-2 bg-white/90 backdrop-blur text-xs font-bold px-2 py-1 rounded text-gray-700">
                        <i class="fa-regular fa-clock"></i> 45p
                    </span>
                    <button class="absolute top-2 right-2 w-8 h-8 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-red-500 hover:text-white transition">
                        <i class="fa-regular fa-bookmark"></i>
                    </button>
                </div>
                <div class="p-4 flex flex-col flex-1">
                    <h3 class="font-bold text-lg text-gray-900 mb-1 line-clamp-2 hover:text-red-600 transition">
                        Bò hầm tiêu xanh sốt vang đậm đà
                    </h3>
                    
                    <div class="flex items-center gap-2 mb-4 mt-auto pt-2">
                        <img src="https://i.pravatar.cc/150?img=12" class="w-6 h-6 rounded-full"/>
                        <span class="text-xs text-gray-500">Bếp trưởng Hùng</span>
                    </div>

                    <div class="flex items-center justify-between border-t border-gray-100 pt-3 mt-auto">
                        <div class="text-xs text-gray-500">
                            <span><i class="fa-solid fa-fire text-orange-500"></i> Dễ</span>
                        </div>
                        < Link to={`/ChiTietMonAn/${'1234'}`} class="text-sm font-bold text-red-600 hover:underline">
                            Xem chi tiết <i class="fa-solid fa-arrow-right text-xs"></i>
                        </Link>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-sm hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100 flex flex-col h-full group">
                <div class="relative h-48 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1563379926898-05f4575a45d8" class="w-full h-full object-cover group-hover:scale-110 transition duration-500"/>
                    <span class="absolute top-2 left-2 bg-white/90 backdrop-blur text-xs font-bold px-2 py-1 rounded text-gray-700">
                        <i class="fa-regular fa-clock"></i> 30p
                    </span>
                </div>
                <div class="p-4 flex flex-col flex-1">
                    <h3 class="font-bold text-lg text-gray-900 mb-1 line-clamp-2 hover:text-red-600 transition">
                        Mì Ý sốt kem nấm (Carbonara)
                    </h3>
                    <div class="flex items-center gap-2 mb-4 mt-auto pt-2">
                        <img src="https://i.pravatar.cc/150?img=33" class="w-6 h-6 rounded-full"/>
                        <span class="text-xs text-gray-500">Lan Healthy</span>
                    </div>
                    <div class="flex items-center justify-between border-t border-gray-100 pt-3 mt-auto">
                        <div class="text-xs text-gray-500">
                            <span><i class="fa-solid fa-fire text-orange-500"></i> TB</span>
                        </div>
                        < Link to={`/ChiTietMonAn/${'1234'}`} class="text-sm font-bold text-red-600 hover:underline">
                            Xem chi tiết <i class="fa-solid fa-arrow-right text-xs"></i>
                        </Link>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-sm hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100 flex flex-col h-full group">
                <div class="relative h-48 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1565557623262-b51c2513a641" class="w-full h-full object-cover group-hover:scale-110 transition duration-500"/>
                    <span class="absolute top-2 left-2 bg-white/90 backdrop-blur text-xs font-bold px-2 py-1 rounded text-gray-700">
                        <i class="fa-regular fa-clock"></i> 60p
                    </span>
                </div>
                <div class="p-4 flex flex-col flex-1">
                    <h3 class="font-bold text-lg text-gray-900 mb-1 line-clamp-2 hover:text-red-600 transition">
                        Cà ri gà kiểu Thái Lan
                    </h3>
                    <div class="flex items-center gap-2 mb-4 mt-auto pt-2">
                        <img src="https://i.pravatar.cc/150?img=45" class="w-6 h-6 rounded-full"/>
                        <span class="text-xs text-gray-500">Mẹ Gấu</span>
                    </div>
                    <div class="flex items-center justify-between border-t border-gray-100 pt-3 mt-auto">
                        <div class="text-xs text-gray-500">
                            <span><i class="fa-solid fa-fire text-orange-500"></i> Khó</span>
                        </div>
                        < Link to={`/ChiTietMonAn/${'1234'}`} class="text-sm font-bold text-red-600 hover:underline">
                            Xem chi tiết <i class="fa-solid fa-arrow-right text-xs"></i>
                        </Link>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-sm hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100 flex flex-col h-full group">
                <div class="relative h-48 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe" class="w-full h-full object-cover group-hover:scale-110 transition duration-500"/>
                     <span class="absolute top-2 left-2 bg-white/90 backdrop-blur text-xs font-bold px-2 py-1 rounded text-gray-700">
                        <i class="fa-regular fa-clock"></i> 15p
                    </span>
                </div>
                <div class="p-4 flex flex-col flex-1">
                    <h3 class="font-bold text-lg text-gray-900 mb-1 line-clamp-2 hover:text-red-600 transition">
                        Salad rau củ mùa hè giải nhiệt
                    </h3>
                    <div class="flex items-center gap-2 mb-4 mt-auto pt-2">
                        <img src="https://i.pravatar.cc/150?img=60" class="w-6 h-6 rounded-full"/>
                        <span class="text-xs text-gray-500">EatClean Cùng Vy</span>
                    </div>
                    <div class="flex items-center justify-between border-t border-gray-100 pt-3 mt-auto">
                        <div class="text-xs text-gray-500">
                            <span><i class="fa-solid fa-fire text-orange-500"></i> Dễ</span>
                        </div>
                        < Link to={`/ChiTietMonAn/${'1234'}`} class="text-sm font-bold text-red-600 hover:underline">
                            Xem chi tiết <i class="fa-solid fa-arrow-right text-xs"></i>
                        </Link>
                    </div>
                </div>
            </div>

            </div>

        <div class="flex justify-center mt-12">
            <nav class="flex items-center gap-2">
                <a href="#" class="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50">
                    <i class="fa-solid fa-chevron-left"></i>
                </a>
                <a href="#" class="w-10 h-10 flex items-center justify-center rounded-lg bg-red-600 text-white font-bold shadow-lg shadow-red-200">1</a>
                <a href="#" class="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-red-600 transition">2</a>
                <a href="#" class="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-red-600 transition">3</a>
                <span class="text-gray-400">...</span>
                <a href="#" class="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-red-600 transition">12</a>
                <a href="#" class="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50">
                    <i class="fa-solid fa-chevron-right"></i>
                </a>
            </nav>
        </div>

    </main>
        </>
    )
};
export default CongThuc;
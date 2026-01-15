import { Link } from "react-router-dom";
function ChiTiet(){
    return(
        <>
        <header className=" bg-white border-b border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] z-10 relative">
            <div className="container mx-auto px-4 max-w-6xl">
                
                {/* 1. Nút Quay Lại (Breadcrumb) */}
                <div className="mb-6">
                    <Link to='/CookbookCuaToi'
                        
                        className="group flex items-center gap-2 text-gray-500 hover:text-red-600 transition-colors duration-200 w-fit"
                    >
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-red-50 transition-colors">
                            <i className="fa-solid fa-arrow-left text-sm"></i>
                        </div>
                        <span className="font-bold text-sm">Quay lại danh sách</span>
                    </Link>
                </div>

                {/* 2. Khu vực Thông tin chính & Hành động */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    
                    {/* Bên trái: Icon + Tiêu đề */}
                    <div className="flex items-start gap-5 w-full md:w-auto">
                        {/* Icon đại diện lớn */}
                        <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-red-500 to-orange-400 rounded-2xl flex items-center justify-center text-white text-4xl shadow-lg shadow-red-100 transform rotate-[-2deg]">
                            <i className="fa-solid fa-book-open"></i>
                        </div>
                        
                        {/* Thông tin Text */}
                        <div className="flex-1">
                            <h1 className="text-3xl font-extrabold text-gray-900 flex flex-wrap items-center gap-3 leading-tight">
                                Món Ngon Ngày Tết 
                                <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full font-medium border border-gray-200">
                                    <i className="fa-solid fa-lock text-[10px]"></i> Riêng tư
                                </span>
                            </h1>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 mt-2">
                                <span className="flex items-center gap-1">
                                    <i className="fa-solid fa-layer-group text-gray-400"></i> 4 công thức
                                </span>
                                <span className="w-1 h-1 bg-gray-300 rounded-full hidden sm:block"></span>
                                <span className="flex items-center gap-1">
                                    <i className="fa-regular fa-clock text-gray-400"></i> Cập nhật 2 ngày trước
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Bên phải: Các nút hành động */}
                    <div className="flex flex-wrap sm:flex-nowrap gap-3 w-full md:w-auto">
                        <button className="flex-1 sm:flex-none px-4 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition text-sm shadow-sm flex items-center justify-center gap-2">
                            <i className="fa-solid fa-pen"></i> <span className="hidden sm:inline">Đổi tên</span>
                        </button>
                        
                        <button className="flex-1 sm:flex-none px-4 py-2.5 bg-red-50 border border-red-100 text-red-600 font-bold rounded-xl hover:bg-red-100 transition text-sm flex items-center justify-center gap-2">
                            <i className="fa-solid fa-trash"></i> <span className="hidden sm:inline">Xóa</span>
                        </button>
                        
                        <button className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition text-sm shadow-md shadow-blue-200 flex items-center justify-center gap-2">
                            <i className="fa-solid fa-share-nodes"></i> Chia sẻ
                        </button>
                    </div>

                </div>
            </div>
        </header>
    
 

    <main class="container mx-auto px-4 max-w-6xl py-8 min-h-screen">
        
        <div class="flex justify-between items-center mb-6">
            <div class="relative w-full max-w-md">
                <i class="fa-solid fa-magnifying-glass absolute left-3 top-3 text-gray-400"></i>
                <input type="text" placeholder="Tìm món trong bộ sưu tập này..." class="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400"/>
            </div>
            
            <select class="hidden md:block bg-white border border-gray-200 text-gray-600 text-sm rounded-lg px-3 py-2 focus:outline-none">
                <option>Mới thêm gần đây</option>
                <option>Cũ nhất</option>
                <option>A-Z</option>
            </select>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-lg transition relative">
                <button onclick="confirm('Gỡ món này khỏi bộ sưu tập?')" class="absolute top-2 right-2 z-10 bg-white/90 text-gray-400 hover:text-red-600 w-8 h-8 rounded-full flex items-center justify-center shadow-sm opacity-100 md:opacity-0 group-hover:opacity-100 transition" title="Gỡ khỏi bộ sưu tập">
                    <i class="fa-solid fa-xmark"></i>
                </button>

                <div class="relative h-40 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1563379926898-05f4575a45d8" alt='123' class="w-full h-full object-cover group-hover:scale-105 transition duration-500"/>
                </div>
                
                <div class="p-4">
                    <h3 class="font-bold text-gray-800 mb-1 line-clamp-1 group-hover:text-red-600 transition">Thịt Kho Tàu Hột Vịt</h3>
                    <p class="text-xs text-gray-500 mb-3">Đăng bởi: Mẹ Bắp</p>
                    <div class="flex items-center justify-between">
                        <div class="flex gap-2 text-xs font-bold text-gray-500">
                            <span class="bg-orange-50 text-orange-600 px-2 py-1 rounded"><i class="fa-solid fa-fire"></i> 600 Kcal</span>
                        </div>
                        <Link to={`/ChiTietMonAn/${'1234'}`} class="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-red-600 hover:text-white transition">
                            <i class="fa-solid fa-arrow-right text-xs"></i>
                        </Link>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-lg transition relative">
                <button class="absolute top-2 right-2 z-10 bg-white/90 text-gray-400 hover:text-red-600 w-8 h-8 rounded-full flex items-center justify-center shadow-sm opacity-100 md:opacity-0 group-hover:opacity-100 transition">
                    <i class="fa-solid fa-xmark"></i>
                </button>

                <div class="relative h-40 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe" alt='123' class="w-full h-full object-cover group-hover:scale-105 transition duration-500"/>
                </div>
                
                <div class="p-4">
                    <h3 class="font-bold text-gray-800 mb-1 line-clamp-1 group-hover:text-red-600 transition">Canh Khổ Qua Nhồi Thịt</h3>
                    <p class="text-xs text-gray-500 mb-3">Đăng bởi: Bếp Của Lan</p>
                    <div class="flex items-center justify-between">
                        <div class="flex gap-2 text-xs font-bold text-gray-500">
                            <span class="bg-green-50 text-green-600 px-2 py-1 rounded"><i class="fa-solid fa-leaf"></i> Healthy</span>
                        </div>
                        <Link to={`/ChiTietMonAn/${'1234'}`} class="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-red-600 hover:text-white transition">
                            <i class="fa-solid fa-arrow-right text-xs"></i>
                        </Link>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-lg transition relative">
                <button class="absolute top-2 right-2 z-10 bg-white/90 text-gray-400 hover:text-red-600 w-8 h-8 rounded-full flex items-center justify-center shadow-sm opacity-100 md:opacity-0 group-hover:opacity-100 transition">
                    <i class="fa-solid fa-xmark"></i>
                </button>

                <div class="relative h-40 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1626804475297-411dbe9175d6" alt='123' class="w-full h-full object-cover group-hover:scale-105 transition duration-500"/>
                </div>
                
                <div class="p-4">
                    <h3 class="font-bold text-gray-800 mb-1 line-clamp-1 group-hover:text-red-600 transition">Nem Rán Giòn Rụm</h3>
                    <p class="text-xs text-gray-500 mb-3">Đăng bởi: Hùng Master</p>
                    <div class="flex items-center justify-between">
                        <div class="flex gap-2 text-xs font-bold text-gray-500">
                            <span class="bg-orange-50 text-orange-600 px-2 py-1 rounded"><i class="fa-solid fa-clock"></i> 45p</span>
                        </div>
                        <Link to={`/ChiTietMonAn/${'1234'}`} class="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-red-600 hover:text-white transition">
                            <i class="fa-solid fa-arrow-right text-xs"></i>
                        </Link>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-lg transition relative">
                <button class="absolute top-2 right-2 z-10 bg-white/90 text-gray-400 hover:text-red-600 w-8 h-8 rounded-full flex items-center justify-center shadow-sm opacity-100 md:opacity-0 group-hover:opacity-100 transition">
                    <i class="fa-solid fa-xmark"></i>
                </button>

                <div class="relative h-40 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1505253716362-afaea1d3d1af" alt='123' class="w-full h-full object-cover group-hover:scale-105 transition duration-500"/>
                </div>
                
                <div class="p-4">
                    <h3 class="font-bold text-gray-800 mb-1 line-clamp-1 group-hover:text-red-600 transition">Gà Luộc Lá Chanh</h3>
                    <p class="text-xs text-gray-500 mb-3">Đăng bởi: Mẹ Bắp</p>
                    <div class="flex items-center justify-between">
                        <div class="flex gap-2 text-xs font-bold text-gray-500">
                            <span class="bg-blue-50 text-blue-600 px-2 py-1 rounded"><i class="fa-solid fa-gauge-high"></i> Dễ</span>
                        </div>
                        <Link to={`/ChiTietMonAn/${'1234'}`} class="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-red-600 hover:text-white transition">
                            <i class="fa-solid fa-arrow-right text-xs"></i>
                        </Link>
                    </div>
                </div>
            </div>

            <a href="CongThucMonAn.html" class="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center h-full min-h-[250px] text-gray-400 hover:border-red-400 hover:text-red-500 hover:bg-red-50 transition group cursor-pointer">
                <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition">
                    <i class="fa-solid fa-plus text-xl"></i>
                </div>
                <span class="font-bold text-sm">Thêm món vào đây</span>
            </a>

        </div>

    </main>
        </>
    )
};
export default ChiTiet;
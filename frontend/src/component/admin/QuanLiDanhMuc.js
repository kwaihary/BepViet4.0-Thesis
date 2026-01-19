import { useModalContext } from '../../context/QuanLiModal';
function DanhMuc(){
    const { OpenMoDal } = useModalContext();
    return (
        <>
          <div class="p-6 max-w-7xl mx-auto">
        <div class="flex flex-col md:flex-row justify-between items-center mb-6">
            <div>
                <h1 class="text-2xl font-bold text-gray-900">Danh mục Ẩm thực</h1>
                <p class="text-sm text-gray-500 mt-1">Quản lý phân loại: Khu vực, Loại món ăn, Chế độ ăn</p>
            </div>
            <button onClick={()=>{OpenMoDal(undefined,{TenTrang:'ThemDanhMuc'})}} class="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg shadow transition flex items-center gap-2">
                <i class="fas fa-plus"></i> Thêm Danh mục
            </button>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            
            <div class="p-4 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between bg-gray-50/50">
                <div class="relative w-full md:w-96">
                    <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><i class="fas fa-search"></i></span>
                    <input type="text" class="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" placeholder="Tìm kiếm tên hoặc slug..."/>
                </div>
                
                <select class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 bg-white">
                    <option value="">-- Tất cả nhóm --</option>
                    <option value="khu vực">Khu vực</option>
                    <option value="loại món ăn">Loại món ăn</option>
                    <option value="chế độ ăn">Chế độ ăn</option>
                </select>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full text-sm text-left">
                    <thead class="text-xs text-gray-500 uppercase bg-gray-100 border-b">
                        <tr>
                            <th class="px-6 py-3 w-16">ID</th>
                            <th class="px-6 py-3">Tên (Name)</th>
                            <th class="px-6 py-3">Slug (URL)</th>
                            <th class="px-6 py-3">Phân loại (Type)</th>
                            <th class="px-6 py-3 text-right">Hành động</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        
                        <tr class="hover:bg-gray-50 transition">
                            <td class="px-6 py-4 text-gray-500 font-mono text-xs">1</td>
                            <td class="px-6 py-4 font-semibold text-gray-900">Món Miền Bắc</td>
                            <td class="px-6 py-4 text-gray-500 font-mono text-xs">mon-mien-bac</td>
                            <td class="px-6 py-4">
                                <span class="px-2.5 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                                    Khu vực
                                </span>
                            </td>
                            <td class="px-6 py-4 text-right space-x-2">
                                <button class="text-indigo-600 hover:text-indigo-900 font-medium text-xs uppercase">Sửa</button>
                                <button class="text-red-600 hover:text-red-900 font-medium text-xs uppercase">Xóa</button>
                            </td>
                        </tr>

                        <tr class="hover:bg-gray-50 transition">
                            <td class="px-6 py-4 text-gray-500 font-mono text-xs">4</td>
                            <td class="px-6 py-4 font-semibold text-gray-900">Món Chay</td>
                            <td class="px-6 py-4 text-gray-500 font-mono text-xs">mon-chay</td>
                            <td class="px-6 py-4">
                                <span class="px-2.5 py-1 rounded text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                                    Loại món ăn
                                </span>
                            </td>
                            <td class="px-6 py-4 text-right space-x-2">
                                <button class="text-indigo-600 hover:text-indigo-900 font-medium text-xs uppercase">Sửa</button>
                                <button class="text-red-600 hover:text-red-900 font-medium text-xs uppercase">Xóa</button>
                            </td>
                        </tr>

                         <tr class="hover:bg-gray-50 transition">
                            <td class="px-6 py-4 text-gray-500 font-mono text-xs">11</td>
                            <td class="px-6 py-4 font-semibold text-gray-900">Low Carb</td>
                            <td class="px-6 py-4 text-gray-500 font-mono text-xs">low-carb</td>
                            <td class="px-6 py-4">
                                <span class="px-2.5 py-1 rounded text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                                    Chế độ ăn
                                </span>
                            </td>
                            <td class="px-6 py-4 text-right space-x-2">
                                <button class="text-indigo-600 hover:text-indigo-900 font-medium text-xs uppercase">Sửa</button>
                                <button class="text-red-600 hover:text-red-900 font-medium text-xs uppercase">Xóa</button>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
            
            <div class="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
                <span class="text-sm text-gray-500">Hiển thị <span class="font-medium">1-10</span> của 30 kết quả</span>
                <div class="flex gap-1">
                    <button class="px-3 py-1 border rounded bg-white text-gray-600 text-sm hover:bg-gray-100">Trước</button>
                    <button class="px-3 py-1 border rounded bg-indigo-600 text-white text-sm">1</button>
                    <button class="px-3 py-1 border rounded bg-white text-gray-600 text-sm hover:bg-gray-100">2</button>
                    <button class="px-3 py-1 border rounded bg-white text-gray-600 text-sm hover:bg-gray-100">Sau</button>
                </div>
            </div>
        </div>
    </div>

   
        </>
    )
};
export default DanhMuc
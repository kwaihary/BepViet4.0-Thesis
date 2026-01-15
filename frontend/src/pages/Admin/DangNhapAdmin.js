import {useNavigate } from "react-router-dom";
function DangNhapAD(){
    const ChuyenTrang=useNavigate();
    // thức hiện 
    const DangNhap=()=>{
        ChuyenTrang('/admin')
    }
    return (
        <>
        <div class=" h-screen flex items-center justify-center font-sans">
    <div class="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden">
        <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-600 to-orange-500"></div>

        <div class="text-center mb-8">
            <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 text-red-600 mb-4">
                <i class="fa-solid fa-user-shield text-3xl"></i>
            </div>
            <h1 class="text-2xl font-bold text-gray-800">Quản Trị Hệ Thống</h1>
            <p class="text-gray-500 text-sm mt-1">Bếp Việt 4.0 Administration</p>
        </div>

       
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-1">Email quản trị</label>
                    <div class="relative">
                        <i class="fa-regular fa-envelope absolute left-3 top-3.5 text-gray-400"></i>
                        <input type="email" value="admin@bepviet.com" class="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"/>
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-1">Mật khẩu</label>
                    <div class="relative">
                        <i class="fa-solid fa-lock absolute left-3 top-3.5 text-gray-400"></i>
                        <input type="password" value="password" class="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"/>
                    </div>
                </div>
                
                <button onClick={()=>{DangNhap()}} class="w-full bg-gray-900 text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition shadow-lg mt-2">
                    Truy cập Dashboard <i class="fa-solid fa-arrow-right ml-2"></i>
                </button>
            </div>
     

        <p class="text-center text-xs text-gray-400 mt-6">
            <i class="fa-solid fa-shield-halved mr-1"></i> Truy cập được giám sát và ghi lại IP.
        </p>
    </div>
    </div>
        </>
    )
};
export default DangNhapAD;
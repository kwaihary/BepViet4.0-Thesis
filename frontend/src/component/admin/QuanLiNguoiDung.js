import { useState, useEffect } from "react";
import * as API from '../../JS/API/API';
import * as ThongBao from '../../JS/FUNCTION/ThongBao';
import * as fun from '../../JS/FUNCTION/function';

function QuanLiNguoiDung() {

    const [loadingStats, setLoadingStats] = useState(false);
    const [loadingTable, setLoadingTable] = useState(false);
    const [DuLieuThongKe, setDuLieuThongKe] = useState({
        Tong: 0,
        NguoiMoi: 0,
        TongHoatDong: 0,
        TongKhongHoatDong: 0
    });
    const [validateErrors, setValidateErrors] = useState({});
    const [users, setUsers] = useState([]); 
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [TongTrang,setTongTrang] = useState(1);
    useEffect(() => {
        const ThongKe = async () => {
            setLoadingStats(true);
            try {
                const ketqua = await API.CallAPI(undefined, { PhuongThuc: 2, url: `admin/ThongKeNguoiDung` });
                if (ketqua.status) setDuLieuThongKe(ketqua.data);
            } catch (error) { console.error(error); } finally { setLoadingStats(false); }
        }
        ThongKe();
    }, []);

    useEffect(() => {
        const LayDL = async () => {
            setLoadingTable(true);
            try {
                const data = await API.CallAPI(undefined, { PhuongThuc: 2, url: `admin/layDLUS?page=${page}` });
                if (data.status){
                    setUsers(data.data.data || []);
                    setTongTrang(data.data.last_page)
                }  
            } catch (error) { console.error(error); } finally { setLoadingTable(false); }
        }
        LayDL();
    }, [page]);

    const listUserAnToan = Array.isArray(users) ? users : [];
    const filteredUsers = listUserAnToan.filter(user => {
        const phone = user.phone || "";
        const email = user.email || "";
        const name = user.name || "";
        const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              phone.includes(searchTerm);
        const matchesRule = roleFilter === "all" || Number(user.rule) === Number(roleFilter);
        return matchesSearch && matchesRule;
    });

    const ThayDoiTrangThai = async (trangthai, id) => {
        let ketQua;
        switch (trangthai) {
            case 2: ketQua = await ThongBao.ThongBao_XacNhanTT('Bạn có chắn chắn muốn kích hoạt tài khoản này?'); break;
            case 0: ketQua = await ThongBao.ThongBao_XacNhanTT('Bạn có chắc chắn khóa tài khoản này chứ?'); break;
            default: ketQua = false; break;
        }
        if(!ketQua) return;
        if(!id){ ThongBao.ThongBao_CanhBao('Dữ liệu id người dùng không tồn tại!'); return; }
        const fromdata= await fun.objectToFormData({id:id,giatri:trangthai});
        const CapNhat= await API.CallAPI(fromdata,{PhuongThuc:1,url :'admin/CapNhatTrangThai'});
        alert(JSON.stringify(CapNhat))
        if(CapNhat.validate){
             if (CapNhat.errors) { setValidateErrors(CapNhat.errors); return; }
             ThongBao.ThongBao_CanhBao(CapNhat.message);
             return;
        }
        if(CapNhat.status){
            ThongBao.ThongBao_ThanhCong(CapNhat.message);
            return;
        }else{
            ThongBao.ThongBao_CanhBao(CapNhat.message);
            return;
        }

    };
  
    return (
        <div className="h-screen bg-gray-50 font-sans flex text-gray-800">
            <main className="flex-1 p-8 h-full overflow-y-auto no-scrollbar">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Quản lý người dùng</h1>
                        <p className="text-gray-500 text-sm mt-1">Danh sách và phân quyền thành viên trong hệ thống.</p>
                    </div>
                </header>
                {Object.keys(validateErrors).length > 0 && (
                    <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
                        <h4 className="text-red-700 font-bold mb-2">
                            <i className="fa-solid fa-triangle-exclamation mr-2"></i> Dữ liệu không hợp lệ
                        </h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-red-600">
                            {Object.entries(validateErrors).map(([field, messages]) =>
                                messages.map((msg, index) => (
                                    <li key={`${field}-${index}`}><span className="font-semibold">{field}:</span> {msg}</li>
                                ))
                            )}
                        </ul>
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    {loadingStats ? (
                        <div className="col-span-4 text-center py-4 text-gray-500">Đang tải thống kê...</div>
                    ) : (
                        <>
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                <p className="text-gray-500 text-xs font-bold uppercase">Tổng người dùng</p>
                                <h3 className="text-2xl font-bold text-gray-800 mt-1">{DuLieuThongKe.Tong || 0}</h3>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                <p className="text-gray-500 text-xs font-bold uppercase">Người dùng mới</p>
                                <h3 className="text-2xl font-bold text-green-600 mt-1">+{DuLieuThongKe.NguoiMoi || 0}</h3>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                <p className="text-gray-500 text-xs font-bold uppercase">Đang hoạt động</p>
                                <h3 className="text-2xl font-bold text-indigo-600 mt-1">{DuLieuThongKe.TongHoatDong || 0}</h3>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                <p className="text-gray-500 text-xs font-bold uppercase">Bị khóa</p>
                                <h3 className="text-2xl font-bold text-red-500 mt-1">{DuLieuThongKe.TongKhongHoatDong || 0}</h3>
                            </div>
                        </>
                    )}
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row gap-4 justify-between bg-gray-50/50">
                        <div className="relative w-full sm:w-72">
                            <input 
                                type="text" 
                                placeholder="Tìm tên, email hoặc SĐT..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9 pr-4 py-2 w-full bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
                            />
                            <i className="fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-gray-400 text-sm"></i>
                        </div>

                        <div className="flex gap-3">
                            <select 
                                value={roleFilter}
                                onChange={(e) => setRoleFilter(e.target.value)}
                                className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-indigo-400 text-gray-600"
                            >
                                <option value="all">Tất cả vai trò</option>
                                <option value="1">Admin</option>
                                <option value="0">User</option>
                            </select>
                        </div>
                    </div>
                    <div className="overflow-x-auto no-scrollbar">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold tracking-wider">
                                <tr>
                                    <th className="px-6 py-3">Người dùng</th>
                                    <th className="px-6 py-3">Vai trò</th>
                                    <th className="px-6 py-3">Trạng thái</th>
                                    <th className="px-6 py-3">Ngày tạo</th>
                                    <th className="px-6 py-3 text-right">Hành động</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loadingTable ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-10 text-center">
                                             <div className="flex items-center justify-center text-indigo-600 font-bold">
                                                <i className="fa-solid fa-spinner fa-spin mr-2"></i>Đang tải...
                                             </div>
                                        </td>
                                    </tr>
                                ) : filteredUsers.length > 0 ? (
                                    filteredUsers.map((user) => (
                                        <tr key={user.id} className="hover:bg-indigo-50/30 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <img 
                                                        src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=random`} 
                                                        alt="" 
                                                        className="w-10 h-10 rounded-full border border-gray-200 object-cover" 
                                                    />
                                                    <div>
                                                        <p className="font-bold text-gray-800 text-sm">{user.name}</p>
                                                        <p className="text-xs text-gray-500">{user.email || user.phone || "Không có thông tin"}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded text-xs font-bold border ${user.rule === 1 ? 'bg-purple-100 text-purple-700 border-purple-200' :'bg-gray-100 text-gray-600 border-gray-200'}`}>
                                                    {user.rule === 1 ? 'Admin' : 'Người dùng'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    {user.status === 2 && <><div className="w-2 h-2 rounded-full bg-green-500"></div><span className="text-sm text-gray-600">Hoạt động</span></>}
                                                    {user.status === 0 && <><div className="w-2 h-2 rounded-full bg-red-500"></div><span className="text-sm text-red-600 font-medium">Đã khóa</span></>}
                                                    {user.status === 1 && <><div className="w-2 h-2 rounded-full bg-yellow-500"></div><span className="text-sm text-gray-600">Chờ duyệt</span></>}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {user.created_at ? new Date(user.created_at).toLocaleDateString('vi-VN') : 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    {user.status===1 && (
                                                        <button onClick={()=>{ThayDoiTrangThai(2, user.id)}} className="flex items-center gap-2 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded-lg shadow-sm transition-colors">
                                                            <i className="fa-solid fa-check"></i> <span>Xác nhận</span>
                                                        </button>
                                                    )}
                                                    {user.status===0 && (
                                                        <button onClick={()=>{ThayDoiTrangThai(2 , user.id)}} title="Mở khóa người dùng này" className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-all">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                                                            </svg>
                                                        </button>
                                                    )}
                                                    {user.status===2 && (
                                                        <button onClick={()=>{ThayDoiTrangThai(0, user.id)}} className="flex items-center gap-2 px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-600 text-xs font-medium rounded-lg shadow-sm transition-colors">
                                                            <i className="fa-solid fa-ban"></i> <span>Khóa</span>
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="py-12 text-center">
                                            <div className="flex flex-col items-center justify-center text-gray-400">
                                                <i className="fa-regular fa-folder-open text-4xl mb-3"></i>
                                                <span className="text-base font-medium text-gray-600">Dữ liệu trống</span>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
                        <span className="text-xs text-gray-500">Đang xem trang {page}</span>
                        <div className="flex gap-1">
                            <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-3 py-1 rounded bg-white border border-gray-300 text-gray-600 text-xs hover:bg-gray-100 disabled:opacity-50">Trước</button>
                            <span className="px-3 py-1 rounded bg-indigo-600 border border-indigo-600 text-white text-xs">{page}</span>
                            <button onClick={() => setPage(p => p + 1)} disabled={page===TongTrang} className="px-3 py-1 rounded bg-white border border-gray-300 text-gray-600 text-xs hover:bg-gray-100">Tiếp</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default QuanLiNguoiDung;
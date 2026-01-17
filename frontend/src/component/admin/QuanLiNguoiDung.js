import { useState, useEffect } from "react";
import * as API from '../../JS/API/API';
import UserDetailModal from "./ChiTietTaiKhoan";

function QuanLiNguoiDung() {

    const [loadingStats, setLoadingStats] = useState(false);
    const [loadingTable, setLoadingTable] = useState(false);
    const [DuLieuThongKe, setDuLieuThongKe] = useState({
        Tong: 0,
        NguoiMoi: 0,
        TongHoatDong: 0,
        TongKhongHoatDong: 0
    });
    const [users, setUsers] = useState([]); 
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [selectedUser, setSelectedUser] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    useEffect(() => {
        const ThongKe = async () => {
            setLoadingStats(true);
            try {
                const ketqua = await API.CallAPI(undefined, { PhuongThuc: 2, url: `admin/ThongKeNguoiDung` });
                if (ketqua.status) {
                    setDuLieuThongKe(ketqua.data);
                }
            } catch (error) {
                console.error('Lỗi thống kê:', error);
            } finally {
                setLoadingStats(false);
            }
        }
        ThongKe();
    }, []);
    useEffect(() => {
        const LayDL = async () => {
            setLoadingTable(true);
            try {
                const data = await API.CallAPI(undefined, { PhuongThuc: 2, url: `admin/layDLUS?page=${page}` });
                if (data.status) {
                    setUsers(data.data.data || []); 
                }
            } catch (error) {
                console.error('Lỗi lấy danh sách:', error);
            } finally {
                setLoadingTable(false);
            }
        }
        LayDL();
    }, [page]); 
    const listUserAnToan = Array.isArray(users) ? users : [];
    const filteredUsers =listUserAnToan.filter(user => {
        const phone = user.phone || "";
        const email = user.email || "";
        const name = user.name || "";
        const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              phone.includes(searchTerm);
      const matchesRule = roleFilter === "all" || Number(user.rule) === Number(roleFilter);
        return matchesSearch && matchesRule;
    });

    // --- CÁC HÀM XỬ LÝ ---
    const openEditModal = (user) => {
        setSelectedUser({ ...user });
        setIsEditModalOpen(true);
    };

    const handleSaveUser = () => {
        // Cập nhật Optimistic (Giả lập cập nhật ngay lập tức)
        setUsers(users.map(u => u.id === selectedUser.id ? selectedUser : u));
        setIsEditModalOpen(false);
        alert(`Đã cập nhật: ${selectedUser.name}`);
        // TODO: Gọi API update user ở đây
    };

    const toggleStatus = (id) => {
        setUsers(users.map(user => {
            if (user.id === id) {
                const newStatus = user.status === "active" ? "banned" : "active";
                return { ...user, status: newStatus };
            }
            return user;
        }));
        // TODO: Gọi API khóa tài khoản ở đây
    };

    return (
        
        <div className="min-h-screen bg-gray-50 font-sans flex text-gray-800">
            
            <main className="flex-1 p-8 h-screen overflow-y-auto">
                  <UserDetailModal/>
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Quản lý người dùng</h1>
                        <p className="text-gray-500 text-sm mt-1">Danh sách và phân quyền thành viên trong hệ thống.</p>
                    </div>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-all flex items-center gap-2">
                        <i className="fa-solid fa-plus"></i> Thêm mới
                    </button>
                </header>
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

                {/* --- MAIN TABLE --- */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    
                    {/* Filters */}
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

                    {/* Table Container - Đã thêm class no-scrollbar */}
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
                                    <tr><td colSpan="5" className="text-center py-8">Đang tải dữ liệu...</td></tr>
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
                                                        {/* Ưu tiên hiển thị Email, nếu không có thì hiện Phone */}
                                                        <p className="text-xs text-gray-500">{user.email || user.phone || "Không có thông tin"}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {/* API trả về rule, ánh xạ rule sang màu sắc */}
                                                <span className={`px-2 py-1 rounded text-xs font-bold border 
                                                    ${user.rule === 1 ? 'bg-purple-100 text-purple-700 border-purple-200' :'bg-gray-100 text-gray-600 border-gray-200'}`}>
                                                    {user.rule ===1 ? 'admin' : 'Người dùng '}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    {user.status === 2 && <><div className="w-2 h-2 rounded-full bg-green-500"></div><span className="text-sm text-gray-600">Hoạt động</span></>}
                                                    {user.status === 0 && <><div className="w-2 h-2 rounded-full bg-red-500"></div><span className="text-sm text-red-600 font-medium">Đã khóa</span></>}
                                                    {user.status ===  1 && <><div className="w-2 h-2 rounded-full bg-yellow-500"></div><span className="text-sm text-gray-600">Chờ duyệt</span></>}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {user.created_at ? new Date(user.created_at).toLocaleDateString('vi-VN') : 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button onClick={() => openEditModal(user)} className="w-8 h-8 rounded hover:bg-indigo-100 text-gray-400 hover:text-indigo-600 transition-colors">
                                                        <i className="fa-solid fa-pen-to-square"></i>
                                                    </button>
                                                    <button onClick={() => toggleStatus(user.id)} className="w-8 h-8 rounded hover:bg-red-100 text-gray-400 hover:text-red-600 transition-colors">
                                                        <i className={`fa-solid ${user.status === 'banned' ? 'fa-unlock' : 'fa-lock'}`}></i>
                                                    </button>
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
                                                <span className="text-sm mt-1">Chưa có người dùng nào được tạo trong hệ thống.</span>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Pagination */}
                    <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
                        <span className="text-xs text-gray-500">Đang xem trang {page}</span>
                        <div className="flex gap-1">
                            <button 
                                disabled={page === 1}
                                onClick={() => setPage(p => p - 1)}
                                className="px-3 py-1 rounded bg-white border border-gray-300 text-gray-600 text-xs hover:bg-gray-100 disabled:opacity-50"
                            >
                                Trước
                            </button>
                            <span className="px-3 py-1 rounded bg-indigo-600 border border-indigo-600 text-white text-xs">{page}</span>
                            <button 
                                onClick={() => setPage(p => p + 1)}
                                className="px-3 py-1 rounded bg-white border border-gray-300 text-gray-600 text-xs hover:bg-gray-100"
                            >
                                Tiếp
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* --- EDIT USER MODAL (Giữ nguyên, chỉ đảm bảo bind đúng state) --- */}
            {isEditModalOpen && selectedUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm" onClick={() => setIsEditModalOpen(false)}></div>
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg z-10 animate-fade-in-up overflow-hidden">
                        {/* Header Modal */}
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h3 className="font-bold text-gray-800">Chỉnh sửa người dùng</h3>
                            <button onClick={() => setIsEditModalOpen(false)}><i className="fa-solid fa-xmark text-gray-400 hover:text-gray-600"></i></button>
                        </div>
                        
                        {/* Body Modal */}
                        <div className="p-6 space-y-4">
                             {/* Form inputs giống cũ... */}
                             <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Tên hiển thị</label>
                                    <input type="text" value={selectedUser.name || ''} onChange={(e)=>setSelectedUser({...selectedUser, name: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:border-indigo-500"/>
                                </div>
                                {/* Thêm các trường khác tương tự */}
                             </div>
                        </div>

                        {/* Footer Modal */}
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                            <button onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-200 rounded-lg text-sm">Hủy</button>
                            <button onClick={handleSaveUser} className="px-4 py-2 bg-indigo-600 text-white font-medium hover:bg-indigo-700 rounded-lg shadow-sm text-sm">Lưu thay đổi</button>
                        </div>
                    </div>
                </div>
            )}
          
        </div>

    );
}

export default QuanLiNguoiDung;
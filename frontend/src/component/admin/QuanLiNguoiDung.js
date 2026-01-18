import { useState , useEffect } from "react";
import * as API from '../../JS/API/API';
function QuanLiNguoiDung() {
    //bước 1 : hiện thống kê
    const [loading,setloading] = useState(false);
    const [DuLieuThongKe,setDuLieuThongKe] = useState([]);
    useEffect(()=>{
        const ThongKe=async()=>{
            setloading(true);
            try {

                const DuLieu=await API.CallAPI(undefined,{PhuongThuc:2, url:`api/admin/ThongKeNguoiDung`})
                if(DuLieu.status){

                const DuLieu = await API.CallAPI(undefined, { PhuongThuc: 2, url: `admin/ThongKeNguoiDung` })
                if (DuLieu.status) {
                    setDuLieuThongKe(DuLieu.data);
                    setloading(false);
                }
            }
            } catch (error) {
                console.error('lỗi hiển thị:'+ error)
            } finally {
                setloading(false)
            }
        }
        ThongKe();
    },[]);
    //Bước 2 : lấy dữ liệu người dùng lên giao diện
    const [page,setpage] = useState(1);
    const [DuLieuUser,setDuLieuUser] = useState([]);
    const [loding2,setloading2] = useState(false);
    const [DuLieuTrang,setDuLietTrang] = useState({})
    useEffect(()=>{
        const LayDL= async()=>{
            setloading2(false)
            try {
                 const data= await API.CallAPI(undefined,{PhuongThuc:2,url:`api/admin/layDLUS?page=${page}`});
                 if(data.status){
                    setDuLietTrang(data.data)
                    setDuLieuUser(data.data.data)
                    setloading2(false);
                 }
            } catch (error) {
                console.error('lỗi hiển thị:'+ error)
            } finally {
                try{
                setloading2(false);

                const data = await API.CallAPI(undefined, { PhuongThuc: 2, url: `admin/layDLUS?page=${page}` });
                if (data.status) {
                    setDuLietTrang(data.data);
                    setDuLieuUser(data.data.data);
                }
            } catch (error) { 
                console.error('Lỗi lấy user:', error); 
            } finally { 
                setloading2(false); 

            }
        }
    }
        LayDL();
    },[page])

    //đã sửa phía trên

    
    // --- STATE ---
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [selectedUser, setSelectedUser] = useState(null); // User đang chọn để sửa
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Mock Data
    const [users, setUsers] = useState([
        { id: 1, name: "Nguyễn Văn A", email: "vana@gmail.com", role: "admin", status: "active", joinDate: "12/01/2023", avatar: "https://ui-avatars.com/api/?name=NV&background=6366f1&color=fff" },
        { id: 2, name: "Trần Thị B", email: "btran@yahoo.com", role: "moderator", status: "active", joinDate: "15/02/2023", avatar: "https://ui-avatars.com/api/?name=TB&background=10b981&color=fff" },
        { id: 3, name: "Lê Văn C", email: "levanc@outlook.com", role: "user", status: "banned", joinDate: "20/03/2023", avatar: "https://ui-avatars.com/api/?name=LC&background=ef4444&color=fff" },
        { id: 4, name: "Phạm D", email: "phamduy@gmail.com", role: "user", status: "active", joinDate: "05/04/2023", avatar: "https://ui-avatars.com/api/?name=PD&background=random" },
        { id: 5, name: "Hoàng E", email: "hoange@company.com", role: "user", status: "pending", joinDate: "10/05/2023", avatar: "https://ui-avatars.com/api/?name=HE&background=random" },
    ]);

    // --- LOGIC ---
    // Lọc user
    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === "all" || user.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    const KhoaTK=async(id)=>{
        const XacNhan= await ThongBao.ThongBao_XacNhanTT('Bạn có chắc chắn muốn khóa tài khoản này không?')
        if(!XacNhan) return;
        if(!id){
            ThongBao.ThongBao_CanhBao('Vui lòng kiểm tra lại dữ liệu!');
            return;
        }
        const formdata= fun.objectToFormData({id:id});
        try {
            setloading(true);
            const ketqua= await API.CallAPI(formdata,{PhuongThuc:1,url:'admin/CapNhat_taikhoan'});
            alert(JSON.stringify(ketqua))
        } catch (error) {
            console.error('Lỗi kết quả:'+ error)
        } finally {
            setloading(false)
        }
    }
    //Đã sửa đến đây


    // Mở modal sửa
    const openEditModal = (user) => {
        setSelectedUser({ ...user }); // Copy object để tránh sửa trực tiếp vào state gốc khi chưa lưu
        setIsEditModalOpen(true);
    };

    // Lưu thay đổi từ Modal
    const handleSaveUser = () => {
        setUsers(users.map(u => u.id === selectedUser.id ? selectedUser : u));
        setIsEditModalOpen(false);
        alert(`Đã cập nhật thông tin cho ${selectedUser.name}`);
    };

    // Toggle trạng thái nhanh (Khóa/Mở khóa)
    const toggleStatus = (id) => {
        setUsers(users.map(user => {
            if (user.id === id) {
                const newStatus = user.status === "active" ? "banned" : "active";
                return { ...user, status: newStatus };
            }
            return user;
        }));
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans flex text-gray-800">
            <main className="flex-1 h-screen">
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
                    {
                        loading ? (
                            <div className="absolute inset-0 bg-white/80 z-10 flex items-center justify-center">
                                <span className="text-indigo-600 font-bold"><i className="fa-solid fa-spinner fa-spin mr-2"></i>Đang tải...</span>
                            </div>
                        ):(
                            <>
                                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <p className="text-gray-500 text-xs font-bold uppercase">Tổng người dùng</p>
                        <h3 className="text-2xl font-bold text-gray-800 mt-1">{DuLieuThongKe.Tong}</h3>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <p className="text-gray-500 text-xs font-bold uppercase">Người dùng mới (Tháng)</p>
                        <h3 className="text-2xl font-bold text-green-600 mt-1">+{DuLieuThongKe.NguoiMoi}</h3>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <p className="text-gray-500 text-xs font-bold uppercase">Đang hoạt động</p>
                        <h3 className="text-2xl font-bold text-indigo-600 mt-1">{DuLieuThongKe.TongHoatDong}</h3>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <p className="text-gray-500 text-xs font-bold uppercase">Bị khóa</p>
                        <h3 className="text-2xl font-bold text-red-500 mt-1">{DuLieuThongKe.TongKhongHoatDong}</h3>
                    </div>
                            </>
                        )
                    }
                </div>

                {/* Main Table Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    
                    {/* Filters Toolbar */}
                    <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row gap-4 justify-between bg-gray-50/50">
                        {/* Search */}
                        <div className="relative w-full sm:w-72">
                            <input 
                                type="text" 
                                placeholder="Tìm theo tên hoặc email..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9 pr-4 py-2 w-full bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
                            />
                            <i className="fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-gray-400 text-sm"></i>
                        </div>

                        {/* Dropdown Filters */}
                        <div className="flex gap-3">
                            <select 
                                value={roleFilter}
                                onChange={(e) => setRoleFilter(e.target.value)}
                                className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-indigo-400 text-gray-600"
                            >
                                <option value="all">Tất cả vai trò</option>
                                <option value="admin">Admin</option>
                                <option value="moderator">Moderator</option>
                                <option value="user">User</option>
                            </select>
                            <button className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
                                <i className="fa-solid fa-filter"></i>
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold tracking-wider">
                                <tr>
                                    <th className="px-6 py-3">Người dùng</th>
                                    <th className="px-6 py-3">Vai trò</th>
                                    <th className="px-6 py-3">Trạng thái</th>
                                    <th className="px-6 py-3">Ngày tham gia</th>
                                    <th className="px-6 py-3 text-right">Hành động</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {
                                    loding2 ? (
                                        <div className="absolute inset-0 bg-white/80 z-10 flex items-center justify-center">
                                            <span className="text-indigo-600 font-bold"><i className="fa-solid fa-spinner fa-spin mr-2"></i>Đang tải...</span>
                                        </div>
                                    ):(
                                        <>
                                        {DuLieuUser.map((user) => (
                                    <tr key={user.id} className="hover:bg-indigo-50/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img src={user.avatar} alt="" className="w-10 h-10 rounded-full border border-gray-200" />
                                                <div>
                                                    <p className="font-bold text-gray-800 text-sm">{user.name}</p>
                                                    <p className="text-xs text-gray-500">{user.phone}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.rule === 1 && <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-bold border border-purple-200">Admin</span>}
                                            {user.rule === 0 && <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium border border-gray-200">Người dùng</span>}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                {user.status === 1 && (
                                                    <><div className="w-2 h-2 rounded-full bg-green-500"></div><span className="text-sm text-gray-600">Hoạt động</span></>
                                                )}
                                    
                                                {user.status === 0 && (
                                                    <><div className="w-2 h-2 rounded-full bg-yellow-500"></div><span className="text-sm text-gray-600">Chờ duyệt</span></>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {new Date(user.created_at).toLocaleDateString("vi-VN")}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button 
                                                    onClick={() => openEditModal(user)}
                                                    className="w-8 h-8 rounded hover:bg-indigo-100 text-gray-400 hover:text-indigo-600 transition-colors" title="Chỉnh sửa"
                                                >
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </button>
                                                <button 
                                                    onClick={() => toggleStatus(user.id)}
                                                    className={`w-8 h-8 rounded transition-colors ${user.status === 'banned' ? 'hover:bg-green-100 text-gray-400 hover:text-green-600' : 'hover:bg-red-100 text-gray-400 hover:text-red-600'}`} 
                                                    title={user.status === 'banned' ? "Mở khóa" : "Khóa tài khoản"}
                                                >
                                                    <i className={`fa-solid ${user.status === 'banned' ? 'fa-unlock' : 'fa-lock'}`}></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                                        </>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Pagination */}
                    <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
                        Hiển thị {DuLieuTrang.from}-{DuLieuTrang.to} trên tổng số {DuLieuTrang.total}
                        <div className="flex gap-1">
                            <button onClick={()=>{setpage(p=>p-1)}} disabled={page===1} className="px-3 py-1 rounded bg-white border border-gray-300 text-gray-600 text-xs hover:bg-gray-100 disabled:opacity-50">Trước</button>
                            <span className="px-3 py-1 rounded bg-indigo-600 border border-indigo-600 text-white text-xs">{page}</span>
                            <button onClick={()=>{setpage(p=>p+1)}} disabled={page===DuLieuTrang.total} className="px-3 py-1 rounded bg-white border border-gray-300 text-gray-600 text-xs hover:bg-gray-100">Tiếp</button>
                        </div>
                    </div>
                </div>
            </main>

            {/* --- EDIT USER MODAL --- */}
            {isEditModalOpen && selectedUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm" onClick={() => setIsEditModalOpen(false)}></div>
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg z-10 animate-fade-in-up overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h3 className="font-bold text-gray-800">Chỉnh sửa người dùng</h3>
                            <button onClick={() => setIsEditModalOpen(false)}><i className="fa-solid fa-xmark text-gray-400 hover:text-gray-600"></i></button>
                        </div>
                        
                        <div className="p-6 space-y-4">
                            <div className="flex items-center gap-4 mb-4">
                                <img src={selectedUser.avatar} className="w-16 h-16 rounded-full border-2 border-indigo-100" />
                                <div>
                                    <h4 className="font-bold text-lg">{selectedUser.name}</h4>
                                    <p className="text-sm text-gray-500">ID: #{selectedUser.id}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Tên hiển thị</label>
                                    <input 
                                        type="text" 
                                        value={selectedUser.name} 
                                        onChange={(e) => setSelectedUser({...selectedUser, name: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email</label>
                                    <input 
                                        type="email" 
                                        value={selectedUser.email} 
                                        disabled
                                        className="w-full px-3 py-2 border border-gray-200 bg-gray-100 rounded-lg text-sm text-gray-500 cursor-not-allowed"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Vai trò</label>
                                    <select 
                                        value={selectedUser.role} 
                                        onChange={(e) => setSelectedUser({...selectedUser, role: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-indigo-500 outline-none"
                                    >
                                        <option value="user">User</option>
                                        <option value="moderator">Moderator</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Trạng thái</label>
                                    <select 
                                        value={selectedUser.status} 
                                        onChange={(e) => setSelectedUser({...selectedUser, status: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-indigo-500 outline-none"
                                    >
                                        <option value="active">Hoạt động</option>
                                        <option value="banned">Bị khóa</option>
                                        <option value="pending">Chờ duyệt</option>
                                    </select>
                                </div>
                            </div>
                        </div>

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
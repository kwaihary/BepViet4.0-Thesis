import React, { useState } from 'react';
import * as API from '../../JS/API/API'; // Import API của bạn

function UserDetailModal({ user, onClose, onUpdate }) {
    const [isLoading, setIsLoading] = useState(false);
    const [note, setNote] = useState(""); // Ghi chú lý do khóa/duyệt

    // --- XỬ LÝ HÀNH ĐỘNG ---
    const handleAction = async (actionType) => {
        if (!window.confirm(`Bạn có chắc chắn muốn ${actionType} người dùng này?`)) return;

        setIsLoading(true);
        try {
            // Giả lập gọi API (Bạn thay URL thật vào đây)
            // Ví dụ: actionType có thể là 'approve', 'ban', 'unban'
            const url = `api/admin/user-action/${user.id}`; 
            
            // Gửi request
            const res = await API.CallAPI({ action: actionType, note: note }, { PhuongThuc: 'POST', url: url });
            
            // Nếu thành công (giả sử API trả về status true)
            // Lưu ý: Tùy backend trả về gì mà check nhé
            if (res) { 
                alert("Thao tác thành công!");
                onUpdate(); // Gọi hàm này để reload lại bảng bên ngoài
                onClose();  // Đóng modal
            }
        } catch (error) {
            console.error("Lỗi:", error);
            alert("Có lỗi xảy ra, vui lòng thử lại.");
        } finally {
            setIsLoading(false);
        }
    };

    if (!user) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay tối */}
            <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

            {/* Modal Content */}
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl z-10 overflow-hidden transform transition-all scale-100">
                
                {/* 1. Header: Ảnh bìa & Avatar */}
                <div className="relative h-32 bg-gradient-to-r from-indigo-500 to-purple-600">
                    <button onClick={onClose} className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-2 w-8 h-8 flex items-center justify-center transition-all">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                    
                    <div className="absolute -bottom-10 left-8">
                        <img 
                            src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=random&size=128`} 
                            alt="Avatar" 
                            className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover bg-white"
                        />
                    </div>
                </div>

                {/* 2. Body: Thông tin chi tiết */}
                <div className="pt-12 px-8 pb-8">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
                            <p className="text-gray-500 text-sm">{user.email}</p>
                        </div>
                        {/* Badge Trạng thái */}
                        <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border 
                            ${user.status === 'active' ? 'bg-green-50 text-green-600 border-green-200' : 
                              user.status === 'banned' ? 'bg-red-50 text-red-600 border-red-200' : 
                              'bg-yellow-50 text-yellow-600 border-yellow-200'}`}>
                            {user.status === 'active' ? 'Đang hoạt động' : user.status === 'banned' ? 'Đã bị khóa' : 'Chờ duyệt'}
                        </div>
                    </div>

                    {/* Grid thông tin */}
                    <div className="grid grid-cols-2 gap-6 mb-8">
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-semibold text-gray-400 uppercase">Số điện thoại</label>
                                <p className="text-gray-700 font-medium">{user.phone || "Chưa cập nhật"}</p>
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-400 uppercase">Vai trò</label>
                                <div className="flex items-center gap-2 mt-1">
                                    <i className={`fa-solid ${user.rule === 'admin' ? 'fa-user-shield text-purple-600' : 'fa-user text-gray-400'}`}></i>
                                    <span className="capitalize text-gray-700">{user.rule || "User"}</span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-semibold text-gray-400 uppercase">Ngày tham gia</label>
                                <p className="text-gray-700 font-medium">
                                    {user.created_at ? new Date(user.created_at).toLocaleDateString('vi-VN') : "N/A"}
                                </p>
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-400 uppercase">Thống kê Bếp Việt</label>
                                <div className="flex gap-4 mt-1">
                                    <span className="text-sm"><strong className="text-gray-800">12</strong> Công thức</span>
                                    <span className="text-sm"><strong className="text-gray-800">45</strong> Follower</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Khu vực Ghi chú (Optional) */}
                    <div className="mb-6">
                        <label className="text-xs font-semibold text-gray-400 uppercase mb-2 block">Ghi chú xử lý (Lý do khóa/duyệt)</label>
                        <textarea 
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="Nhập lý do (nếu cần)..."
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-200 outline-none resize-none h-20"
                        ></textarea>
                    </div>

                    {/* 3. Footer: Các nút hành động */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                        <button 
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 text-sm font-medium transition-colors"
                        >
                            Đóng
                        </button>

                        {/* Logic hiển thị nút bấm dựa trên status */}
                        {user.status === 'pending' && (
                            <button 
                                onClick={() => handleAction('approve')}
                                disabled={isLoading}
                                className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-bold shadow-md shadow-green-200 flex items-center gap-2"
                            >
                                {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-check"></i>}
                                Duyệt tài khoản
                            </button>
                        )}

                        {user.status === 'active' && (
                            <button 
                                onClick={() => handleAction('ban')}
                                disabled={isLoading}
                                className="px-4 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-sm font-bold flex items-center gap-2"
                            >
                                {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-lock"></i>}
                                Khóa tài khoản
                            </button>
                        )}

                        {user.status === 'banned' && (
                            <button 
                                onClick={() => handleAction('unban')}
                                disabled={isLoading}
                                className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-900 text-white text-sm font-bold shadow-md flex items-center gap-2"
                            >
                                {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-key"></i>}
                                Mở khóa
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDetailModal;
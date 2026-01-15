import React, { useState } from 'react';
function HoSoAdmin() {
    const [activeTab, setActiveTab] = useState('thongtin');

    // Giả lập dữ liệu Admin
    const adminInfo = {
        name: "Nguyễn Quản Trị",
        role: "Super Admin",
        email: "admin@bepviet.com",
        phone: "0912.345.678",
        joinDate: "01/01/2024",
        status: "Đang hoạt động",
        department: "Ban Quản Trị Hệ Thống"
    };

    // Giả lập lịch sử hoạt động (Audit Log)
    const activityLogs = [
        { id: 1, action: "Đã duyệt bài viết", target: "Cách làm phở bò", time: "2 giờ trước", type: "approve" },
        { id: 2, action: "Đã khóa tài khoản", target: "User: spam_bot_123", time: "5 giờ trước", type: "ban" },
        { id: 3, action: "Cập nhật hệ thống", target: "Phiên bản v1.2", time: "1 ngày trước", type: "system" },
        { id: 4, action: "Đăng nhập", target: "IP: 192.168.1.1", time: "1 ngày trước", type: "login" },
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            
            {/* Header của trang con */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Hồ sơ quản trị viên</h1>
                <p className="text-gray-500 text-sm">Quản lý thông tin cá nhân và bảo mật tài khoản.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* --- CỘT TRÁI: CARD THÔNG TIN --- */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="h-24 bg-slate-800"></div> {/* Cover Admin */}
                        <div className="px-6 pb-6 relative">
                            {/* Avatar */}
                            <div className="w-24 h-24 rounded-full border-4 border-white bg-gray-200 -mt-12 overflow-hidden shadow-md">
                                <img src="https://ui-avatars.com/api/?name=Admin&background=ef4444&color=fff" alt="Admin" className="w-full h-full object-cover"/>
                            </div>
                            
                            <div className="mt-4">
                                <h3 className="text-xl font-bold text-gray-800">{adminInfo.name}</h3>
                                <div className="flex items-center gap-2 text-sm mt-1">
                                    <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded font-bold text-xs border border-red-200">
                                        {adminInfo.role}
                                    </span>
                                    <span className="text-gray-500">• {adminInfo.department}</span>
                                </div>
                            </div>

                            <div className="mt-6 space-y-3 border-t border-gray-100 pt-4">
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <i className="fa-regular fa-envelope w-5 text-gray-400"></i>
                                    {adminInfo.email}
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <i className="fa-solid fa-phone w-5 text-gray-400"></i>
                                    {adminInfo.phone}
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <i className="fa-regular fa-calendar w-5 text-gray-400"></i>
                                    Tham gia: {adminInfo.joinDate}
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <i className="fa-solid fa-wifi w-5 text-green-500"></i>
                                    <span className="text-green-600 font-medium">{adminInfo.status}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- CỘT PHẢI: TABS CHỨC NĂNG --- */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full">
                        
                        {/* Tab Navigation */}
                        <div className="flex border-b border-gray-200">
                            <button 
                                onClick={() => setActiveTab('thongtin')}
                                className={`px-6 py-4 text-sm font-medium transition relative ${activeTab === 'thongtin' ? 'text-red-600' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                <i className="fa-regular fa-user mr-2"></i> Thông tin chung
                                {activeTab === 'thongtin' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600"></div>}
                            </button>
                            <button 
                                onClick={() => setActiveTab('baomat')}
                                className={`px-6 py-4 text-sm font-medium transition relative ${activeTab === 'baomat' ? 'text-red-600' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                <i className="fa-solid fa-lock mr-2"></i> Bảo mật
                                {activeTab === 'baomat' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600"></div>}
                            </button>
                            <button 
                                onClick={() => setActiveTab('nhatky')}
                                className={`px-6 py-4 text-sm font-medium transition relative ${activeTab === 'nhatky' ? 'text-red-600' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                <i className="fa-solid fa-clock-rotate-left mr-2"></i> Nhật ký hoạt động
                                {activeTab === 'nhatky' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600"></div>}
                            </button>
                        </div>

                        {/* Tab Content */}
                        <div className="p-6">
                            
                            {/* 1. Tab Thông tin */}
                            {activeTab === 'thongtin' && (
                                <form>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Họ và tên</label>
                                            <input type="text" defaultValue={adminInfo.name} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-200 focus:border-red-500 outline-none transition" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                                            <input type="text" defaultValue={adminInfo.phone} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-200 focus:border-red-500 outline-none transition" />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Email (Không thể thay đổi)</label>
                                            <input type="email" defaultValue={adminInfo.email} disabled className="w-full px-4 py-2 border border-gray-200 bg-gray-100 rounded-lg text-gray-500 cursor-not-allowed" />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Địa chỉ</label>
                                            <input type="text" placeholder="Nhập địa chỉ..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-200 focus:border-red-500 outline-none transition" />
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <button className="bg-slate-800 text-white px-6 py-2 rounded-lg hover:bg-slate-700 transition shadow">
                                            Lưu thay đổi
                                        </button>
                                    </div>
                                </form>
                            )}

                            {/* 2. Tab Bảo mật */}
                            {activeTab === 'baomat' && (
                                <div className="space-y-6">
                                    <div className="border-b border-gray-100 pb-6">
                                        <h4 className="font-bold text-gray-800 mb-4">Đổi mật khẩu</h4>
                                        <div className="space-y-4 max-w-md">
                                            <input type="password" placeholder="Mật khẩu hiện tại" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-200 outline-none" />
                                            <input type="password" placeholder="Mật khẩu mới" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-200 outline-none" />
                                            <input type="password" placeholder="Xác nhận mật khẩu mới" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-200 outline-none" />
                                            <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">Cập nhật mật khẩu</button>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-bold text-gray-800 mb-4">Xác thực 2 bước (2FA)</h4>
                                        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-200">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                                    <i className="fa-solid fa-shield-halved"></i>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-800">Bảo vệ tài khoản</p>
                                                    <p className="text-xs text-gray-500">Nhận mã OTP qua email khi đăng nhập</p>
                                                </div>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 3. Tab Nhật ký */}
                            {activeTab === 'nhatky' && (
                                <div className="space-y-4">
                                    {activityLogs.map(log => (
                                        <div key={log.id} className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition border-b border-gray-50 last:border-0">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 
                                                ${log.type === 'approve' ? 'bg-green-100 text-green-600' : 
                                                  log.type === 'ban' ? 'bg-red-100 text-red-600' : 
                                                  log.type === 'system' ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-600'}`}>
                                                {log.type === 'approve' && <i className="fa-solid fa-check"></i>}
                                                {log.type === 'ban' && <i className="fa-solid fa-ban"></i>}
                                                {log.type === 'system' && <i className="fa-solid fa-gear"></i>}
                                                {log.type === 'login' && <i className="fa-solid fa-right-to-bracket"></i>}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-gray-800">
                                                    {log.action} <span className="font-bold">"{log.target}"</span>
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">{log.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                    <button className="w-full py-2 text-center text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition mt-2">
                                        Xem toàn bộ lịch sử
                                    </button>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default HoSoAdmin;
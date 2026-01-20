import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as API from '../../JS/API/API';
import * as fun from '../../JS/FUNCTION/function';

function DangNhap() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('login');
    const [error, setError] = useState("");
    // State cho đăng nhập
    const [login, setLogin] = useState({
        phone: '',
        password: '',
    });

    // State cho đăng ký
    const [register, setRegister] = useState({
        name: '',
        phone: '',
        password: '',
    });

 const handleLogin = async () => {
    setError(""); // Xóa lỗi cũ trước khi bấm
    
    // ... code kiểm tra rỗng ...

    try {
        const formdata = fun.objectToFormData(login);
        const ketqua = await API.CallAPI(formdata, { PhuongThuc: 1, url: 'user/login' });
        
        if (ketqua.status === true) {
            localStorage.setItem('token', ketqua.token);
            localStorage.setItem('user', JSON.stringify(ketqua.data));
            navigate('/');
        } else {
            // SỬA TẠI ĐÂY: Chỉ lấy ketqua.message
            // Nếu bạn ghi setError(ketqua) nó sẽ hiện cả cụm {"status":false...}
            setError(ketqua.message); 
        }
    } catch (error) {
        setError("Không thể kết nối đến server");
    }
};

    // --- HÀM ĐĂNG KÝ ---
    const handleRegister = async (e) => {
        e.preventDefault();
        const kiemtra = fun.KiemTraRong(register);
        if (!kiemtra.Status) {
            alert('Vui lòng điền đầy đủ thông tin đăng ký');
            return;
        }

        const formdata = fun.objectToFormData(register);
        try {
            const ketqua = await API.CallAPI(formdata, { PhuongThuc: 1, url: 'user/register' });
            if (ketqua.status === true) {
                alert('Đăng ký thành công! Hãy đăng nhập.');
                setActiveTab('login');
            } else {
                alert(ketqua.message);
            }
        } catch (error) {
            alert('Lỗi khi đăng ký');
        }
    };

    return (
        <div className="bg-gray-50 font-sans h-screen flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl flex overflow-hidden h-[600px]">
                
                {/* --- CỘT TRÁI (ẢNH) --- */}
                <div className="hidden md:block w-1/2 bg-cover bg-center relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3')" }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-10 text-white">
                        <h2 className="text-4xl font-bold mb-2">Bếp Việt 4.0</h2>
                        <p className="text-lg opacity-90">Kết nối đam mê, sẻ chia hương vị Việt.</p>
                    </div>
                </div>

                {/* --- CỘT PHẢI (FORM) --- */}
                <div className="w-full md:w-1/2 p-8 md:p-12 relative overflow-y-auto">
                    <Link to='/' className="absolute top-6 right-6 text-gray-400 hover:text-red-600">
                        <i className="fa-solid fa-xmark text-2xl"></i>
                    </Link>

                    <div className="max-w-md mx-auto">
                        {/* TAB BUTTONS */}
                        <div className="flex border-b border-gray-200 mb-8">
                            <button onClick={() => setActiveTab('login')} className={`flex-1 pb-3 font-bold border-b-2 transition ${activeTab === 'login' ? 'text-red-600 border-red-600' : 'text-gray-500 border-transparent'}`}>Đăng Nhập</button>
                            <button onClick={() => setActiveTab('register')} className={`flex-1 pb-3 font-bold border-b-2 transition ${activeTab === 'register' ? 'text-red-600 border-red-600' : 'text-gray-500 border-transparent'}`}>Đăng Ký</button>
                        </div>

                        {/* HIỂN THỊ FORM THEO TAB */}
                        {activeTab === 'login' ? (
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Số điện thoại</label>
                                    <input type="text" onChange={(e) => setLogin({...login, phone: e.target.value})} placeholder="09......" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-200 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Mật khẩu</label>
                                    <input type="password" onChange={(e) => setLogin({...login, password: e.target.value})} placeholder="..." className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-200 outline-none" />
                                </div>
                                {/* Hiển thị thông báo lỗi màu đỏ */}
{error && (
    <div className="bg-red-50 border-l-4 border-red-500 p-3 mb-4">
        <div className="flex items-center">
            <i className="fa-solid fa-circle-exclamation text-red-500 mr-2"></i>
            <p className="text-sm text-red-700 font-medium">{error}</p>
        </div>
    </div>
)}

<button 
    onClick={handleLogin} 
    className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition"
>
    Đăng nhập ngay
</button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Họ và Tên</label>
                                    <input type="text" onChange={(e) => setRegister({...register, name: e.target.value})} placeholder="Nguyễn Văn A" className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Số điện thoại</label>
                                    <input type="text" onChange={(e) => setRegister({...register, phone: e.target.value})} placeholder="09......" className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Mật khẩu</label>
                                    <input type="password" onChange={(e) => setRegister({...register, password: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none" />
                                </div>
                                <button onClick={handleRegister} className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition">Tạo tài khoản mới</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DangNhap;
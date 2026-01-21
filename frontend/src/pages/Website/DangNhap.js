import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as API from '../../JS/API/API';
import * as fun from '../../JS/FUNCTION/function';

function DangNhap() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('login');
    
    const [error, setError] = useState(""); 
    const [fieldError, setFieldError] = useState({}); 

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
        password_confirmation: ''
    });

    const switchTab = (tab) => {
        setActiveTab(tab);
        setError("");
        setFieldError({});
    };




    const handleLogin = async () => {
        setError("");
        setFieldError({}); 


        if (!login.phone || !login.password) {
            setError("Vui lòng điền đầy đủ thông tin đăng nhập");
            return;
        }

        if(!fun.validatePhone(login.phone)) {
            setError("Số điện thoại không hợp lệ");
            return;
        }

        try {
            const formdata = fun.objectToFormData(login);
            const ketqua = await API.CallAPI(formdata, { PhuongThuc: 1, url: 'user/login' });

            if (ketqua.status) {
                localStorage.setItem('user', JSON.stringify(ketqua.data));
                navigate('/');
            } else {
                setError(ketqua.message);
            }
        } catch (error) {
            setError("Không thể kết nối đến server");
        }
    };

    // --- HÀM ĐĂNG KÝ ---
    const handleRegister = async () => {
        setError(""); 
        setFieldError({}); 

        let newFieldErrors = {};

        // 1. Kiểm tra rỗng
        const checkEmpty = fun.KiemTraRong(register);
        if (!checkEmpty.Status) {
            checkEmpty.ErrorKeys.forEach(key => {
                newFieldErrors[key] = "Không được để trống";
            });
        }

        // 2. Validate SĐT
        if(register.phone && !fun.validatePhone(register.phone)) {
            newFieldErrors.phone = "Số điện thoại không hợp lệ";
        }

        // 3. Validate Mật khẩu
        if (register.password && register.password.length < 6) {
            newFieldErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
        }

        // 4. Validate Khớp mật khẩu
        if (register.password !== register.password_confirmation) {
            newFieldErrors.password_confirmation = "Mật khẩu nhập lại không khớp";
        }

        // --- KIỂM TRA ĐỘ DÀI OBJECT LỖI ---
        // Nếu object có key (length > 0) nghĩa là có lỗi -> Dừng lại
        if (Object.keys(newFieldErrors).length > 0) {
            setFieldError(newFieldErrors);
            return;
        }

        try {
            const formdata = new FormData();
            formdata.append('name', register.name);
            formdata.append('phone', register.phone);
            formdata.append('password', register.password);
            formdata.append('password_confirmation', register.password_confirmation);

            const ketqua = await API.CallAPI(formdata, { PhuongThuc: 1, url: 'user/register' });
            
            if (ketqua.status === true) {
                setRegister({ name: '', phone: '', password: '', password_confirmation: '' });
                switchTab('login'); 
            } else {
                setError(ketqua.message); 
            }
        } catch (error) {
            setError("Không thể kết nối đến server");
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
                        <div className="flex border-b border-gray-200 mb-8">
                            <button onClick={() => switchTab('login')} className={`flex-1 pb-3 font-bold border-b-2 transition ${activeTab === 'login' ? 'text-red-600 border-red-600' : 'text-gray-500 border-transparent'}`}>Đăng Nhập</button>
                            <button onClick={() => switchTab('register')} className={`flex-1 pb-3 font-bold border-b-2 transition ${activeTab === 'register' ? 'text-red-600 border-red-600' : 'text-gray-500 border-transparent'}`}>Đăng Ký</button>
                        </div>
    
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-3 mb-4">
                                <div className="flex items-center">
                                    <i className="fa-solid fa-circle-exclamation text-red-500 mr-2"></i>
                                    <p className="text-sm text-red-700 font-medium text-lg">{error}</p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'login' ? (
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Số điện thoại</label>
                                    <input type="text" value={login.phone || ''} onChange={(e) => setLogin({ ...login, phone: e.target.value })} placeholder="0123456789" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-200 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Mật khẩu</label>
                                    <input type="password" value={login.password || ''} onChange={(e) => setLogin({ ...login, password: e.target.value })} placeholder="" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-200 outline-none" />
                                </div>
                                
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
                                    <input type="text" value={register.name || ''} onChange={(e) => setRegister({ ...register, name: e.target.value })} placeholder="Nguyễn Văn A" className={`w-full px-4 py-3 rounded-lg border outline-none ${fieldError.name ? 'border-red-500' : 'border-gray-300'}`} />
                                    {fieldError.name && <span className="text-xs text-red-500 mt-1">{fieldError.name}</span>}
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Số điện thoại</label>
                                    <input type="text" value={register.phone || ''} onChange={(e) => setRegister({ ...register, phone: e.target.value })} placeholder="0123456789" className={`w-full px-4 py-3 rounded-lg border outline-none ${fieldError.phone ? 'border-red-500' : 'border-gray-300'}`} />
                                    {fieldError.phone && <span className="text-xs text-red-500 mt-1">{fieldError.phone}</span>}
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Mật khẩu</label>
                                    <input type="password" value={register.password || ''} onChange={(e) => setRegister({ ...register, password: e.target.value })} className={`w-full px-4 py-3 rounded-lg border outline-none ${fieldError.password ? 'border-red-500' : 'border-gray-300'}`} />
                                    {fieldError.password && <span className="text-xs text-red-500 mt-1">{fieldError.password}</span>}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Nhập lại mật khẩu</label>
                                    <input type="password" value={register.password_confirmation || ''} onChange={(e) => setRegister({ ...register, password_confirmation: e.target.value })} className={`w-full px-4 py-3 rounded-lg border outline-none ${fieldError.password_confirmation ? 'border-red-500' : 'border-gray-300'}`} />
                                    {fieldError.password_confirmation && <span className="text-xs text-red-500 mt-1">{fieldError.password_confirmation}</span>}
                                </div>
                                <button onClick={handleRegister} className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition">Tạo tài khoản mới</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DangNhap;
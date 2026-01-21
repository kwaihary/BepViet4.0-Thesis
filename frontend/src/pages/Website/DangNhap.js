import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as API from '../../JS/API/API';
import * as fun from '../../JS/FUNCTION/function';
import * as tb from '../../JS/FUNCTION/ThongBao';
import { useDangNhapContext } from '../../context/QuanLiDangNhap_NguoiDung';

function DangNhap() {
    const navigate = useNavigate();
    const { handleLogin: loginContext } = useDangNhapContext();

    // --- STATES ---
    const [activeTab, setActiveTab] = useState('login');
    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [showRegisterPassword, setShowRegisterPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    // Lỗi chung và lỗi từng trường
    const [errorHT, setErrorHT] = useState(""); 
    const [fieldErrors, setFieldErrors] = useState({}); 

    const [loginData, setLoginData] = useState({ phone: '', password: '' });
    const [registerData, setRegisterData] = useState({
        name: '',
        phone: '',
        password: '',
        password_confirmation: ''
    });

    // --- FUNCTIONS ---
    const switchTab = (tab) => {
        setActiveTab(tab);
        setErrorHT("");
        setFieldErrors({});
    };

    const handleLoginAction = async () => {
        setErrorHT("");
        setFieldErrors({});

        // 1. Validate nhanh client-side
        if (!loginData.phone || !loginData.password) {
            setErrorHT("Vui lòng điền đầy đủ thông tin");
            return;
        }

        try {
            // Sử dụng handleLogin từ Context để đồng bộ trạng thái toàn app
            const ketqua = await loginContext(loginData);

            if (ketqua.validate) {
                setFieldErrors(ketqua.err); // Lỗi từ phía server validate
                return;
            }

            if (ketqua.status) {
                tb.ThongBao_ThanhCong("Đăng nhập thành công!");
                setTimeout(() => {
                    navigate('/HoSo-NguoiDung');
                    window.location.reload();
                }, 1000);
            } else {
                setErrorHT(ketqua.message || "Tài khoản hoặc mật khẩu không chính xác");
            }
        } catch (error) {
            tb.ThongBao_Loi("Không thể kết nối đến server");
        }
    };

    const handleRegisterAction = async () => {
        setFieldErrors({});
        setErrorHT("");

        // Logic validate
        let errors = {};
        const checkEmpty = fun.KiemTraRong(registerData);
        if (!checkEmpty.Status) {
            checkEmpty.ErrorKeys.forEach(key => { errors[key] = "Không được để trống"; });
        }
        if (registerData.phone && !fun.validatePhone(registerData.phone)) {
            errors.phone = "Số điện thoại không hợp lệ";
        }
        if (registerData.password && registerData.password.length < 6) {
            errors.password = "Mật khẩu tối thiểu 6 ký tự";
        }
        if (registerData.password !== registerData.password_confirmation) {
            errors.password_confirmation = "Mật khẩu không khớp";
        }

        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            return;
        }

        try {
            const formdata = fun.objectToFormData(registerData);
            const ketqua = await API.CallAPI(formdata, { url: 'user/register', PhuongThuc: 1 });

            if (ketqua.status) {
                tb.ThongBao_ThanhCong("Đăng ký thành công! Hãy đăng nhập.");
                setLoginData(prev => ({ ...prev, phone: registerData.phone }));
                switchTab('login');
            } else {
                setErrorHT(ketqua.message);
            }
        } catch (e) {
            tb.ThongBao_Loi("Lỗi kết nối");
        }
    };

    return (
        <div className="bg-gray-50 font-sans min-h-screen flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl flex overflow-hidden h-[650px]">
                
                {/* CỘT TRÁI - ẢNH */}
                <div className="hidden md:block w-1/2 bg-cover bg-center relative" 
                     style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3')" }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-10 text-white">
                        <h2 className="text-4xl font-bold mb-2">Bếp Việt 4.0</h2>
                        <p className="text-lg opacity-90">Kết nối đam mê, sẻ chia hương vị Việt.</p>
                    </div>
                </div>

                {/* CỘT PHẢI - FORM */}
                <div className="w-full md:w-1/2 p-8 md:p-12 relative overflow-y-auto">
                    <Link to='/' className="absolute top-6 right-6 text-gray-400 hover:text-red-600 transition">
                        <i className="fa-solid fa-xmark text-2xl"></i>
                    </Link>

                    <div className="max-w-md mx-auto">
                        <div className="flex border-b border-gray-200 mb-8">
                            <button onClick={() => switchTab('login')} className={`flex-1 pb-3 font-bold border-b-2 transition ${activeTab === 'login' ? 'text-red-600 border-red-600' : 'text-gray-500 border-transparent'}`}>Đăng Nhập</button>
                            <button onClick={() => switchTab('register')} className={`flex-1 pb-3 font-bold border-b-2 transition ${activeTab === 'register' ? 'text-red-600 border-red-600' : 'text-gray-500 border-transparent'}`}>Đăng Ký</button>
                        </div>

                        {/* Hiển thị lỗi tổng quát */}
                        {errorHT && (
                            <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-3 flex items-center shadow-sm">
                                <i className="fa-solid fa-circle-exclamation text-red-500 mr-2"></i>
                                <p className="text-sm text-red-700 font-medium">{errorHT}</p>
                            </div>
                        )}

                        {activeTab === 'login' ? (
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Số điện thoại</label>
                                    <input 
                                        type="text" 
                                        value={loginData.phone} 
                                        onChange={(e) => setLoginData({ ...loginData, phone: e.target.value })}
                                        className={`w-full px-4 py-3 rounded-lg border ${fieldErrors.phone ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-red-200 outline-none`}
                                        placeholder="0912345678"
                                    />
                                    {fieldErrors.phone && <p className="text-red-500 text-xs mt-1 italic">{fieldErrors.phone}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Mật khẩu</label>
                                    <div className="relative">
                                        <input 
                                            type={showLoginPassword ? "text" : "password"} 
                                            value={loginData.password} 
                                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                            className={`w-full px-4 py-3 rounded-lg border ${fieldErrors.password ? 'border-red-500' : 'border-gray-300'} outline-none pr-10`}
                                        />
                                        <button type="button" onClick={() => setShowLoginPassword(!showLoginPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
                                            <i className={`fa-solid ${showLoginPassword ? 'fa-eye' : 'fa-eye-slash'}`}></i>
                                        </button>
                                    </div>
                                    {fieldErrors.password && <p className="text-red-500 text-xs mt-1 italic">{fieldErrors.password}</p>}
                                </div>

                                <button onClick={handleLoginAction} className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition transform active:scale-95">
                                    Đăng nhập ngay
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Họ và Tên</label>
                                    <input type="text" value={registerData.name} onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })} className={`w-full px-4 py-3 rounded-lg border outline-none ${fieldErrors.name ? 'border-red-500' : 'border-gray-300'}`} placeholder="Nguyễn Văn A" />
                                    {fieldErrors.name && <span className="text-xs text-red-500">{fieldErrors.name}</span>}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Số điện thoại</label>
                                    <input type="text" value={registerData.phone} onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })} className={`w-full px-4 py-3 rounded-lg border outline-none ${fieldErrors.phone ? 'border-red-500' : 'border-gray-300'}`} placeholder="09..." />
                                    {fieldErrors.phone && <span className="text-xs text-red-500">{fieldErrors.phone}</span>}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Mật khẩu</label>
                                    <div className="relative">
                                        <input type={showRegisterPassword ? "text" : "password"} value={registerData.password} onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })} className={`w-full px-4 py-3 rounded-lg border outline-none pr-10 ${fieldErrors.password ? 'border-red-500' : 'border-gray-300'}`} />
                                        <button type="button" onClick={() => setShowRegisterPassword(!showRegisterPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
                                            <i className={`fa-solid ${showRegisterPassword ? 'fa-eye' : 'fa-eye-slash'}`}></i>
                                        </button>
                                    </div>
                                    {fieldErrors.password && <span className="text-xs text-red-500">{fieldErrors.password}</span>}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Nhập lại mật khẩu</label>
                                    <div className="relative">
                                        <input type={showConfirmPassword ? "text" : "password"} value={registerData.password_confirmation} onChange={(e) => setRegisterData({ ...registerData, password_confirmation: e.target.value })} className={`w-full px-4 py-3 rounded-lg border outline-none pr-10 ${fieldErrors.password_confirmation ? 'border-red-500' : 'border-gray-300'}`} />
                                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
                                            <i className={`fa-solid ${showConfirmPassword ? 'fa-eye' : 'fa-eye-slash'}`}></i>
                                        </button>
                                    </div>
                                    {fieldErrors.password_confirmation && <span className="text-xs text-red-500">{fieldErrors.password_confirmation}</span>}
                                </div>

                                <button onClick={handleRegisterAction} className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition transform active:scale-95">
                                    Tạo tài khoản mới
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DangNhap;
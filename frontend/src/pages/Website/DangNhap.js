import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as API from '../../JS/API/API';
import * as fun from '../../JS/FUNCTION/function';
import * as tb from '../../JS/FUNCTION/ThongBao';
import { useDangNhapContext } from '../../context/QuanLiDangNhap_NguoiDung';

function DangNhap() {
    const [err,seterr] = useState({})
    const [login, setLogin] = useState({
        phone: '',
        password: '',
    });
    const [errHT,seterrHT] = useState('')
    const { handleLogin } = useDangNhapContext();
    const DangNhap = async()=>{
        const ketqua= await handleLogin(login ,'user/login');
        if(ketqua.validate){
            seterr(ketqua.err);
            return;
        };
        if(ketqua.status===false){
            seterrHT(ketqua.message);
            return;
        }
        if(ketqua.status){
            tb.ThongBao_ThanhCong(ketqua.message);
            navigate('/HoSo-NguoiDung');
            return;
        }

    }
    
    //đã sửa phía trên
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('login');
    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [showRegisterPassword, setShowRegisterPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [fieldError, setFieldError] = useState({}); 
    
    const [register, setRegister] = useState({
        name: '',
        phone: '',
        password: '',
        password_confirmation: ''
    });

    const switchTab = (tab) => {
        setActiveTab(tab);
        setFieldError({});
        setShowLoginPassword(false);
        setShowRegisterPassword(false);
        setShowConfirmPassword(false);
    };

   

    // --- XỬ LÝ ĐĂNG KÝ ---
    const handleRegister = async () => {
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

        // Nếu có lỗi -> Hiển thị và dừng lại
        if (Object.keys(newFieldErrors).length > 0) {
            setFieldError(newFieldErrors);
            return;
        }

        try {
            // 5. Gọi API
            const formdata = fun.objectToFormData(register);
            const ketqua = await API.CallAPI(formdata, { 
                url: 'user/register', 
                PhuongThuc: 1 
            });
            
            if (ketqua.status === true) {
                tb.ThongBao_ThanhCong("Đăng ký thành công! Vui lòng đăng nhập.");
                
                // Reset form & chuyển tab
                setRegister({ name: '', phone: '', password: '', password_confirmation: '' });
                switchTab('login');
                setLogin(prev => ({ ...prev, phone: register.phone }));
            } else {
                tb.ThongBao_Loi(ketqua.message || "Đăng ký thất bại");
            }
        } catch (error) {
            tb.ThongBao_Loi("Không thể kết nối đến server");
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
                    {/* Nút đóng */}
                    <Link to='/' className="absolute top-6 right-6 text-gray-400 hover:text-red-600 transition">
                        <i className="fa-solid fa-xmark text-2xl"></i>
                    </Link>

                    <div className="max-w-md mx-auto">
                        {/* TAB LOGIN / REGISTER */}
                        <div className="flex border-b border-gray-200 mb-8">
                            <button onClick={() => switchTab('login')} className={`flex-1 pb-3 font-bold border-b-2 transition ${activeTab === 'login' ? 'text-red-600 border-red-600' : 'text-gray-500 border-transparent'}`}>Đăng Nhập</button>
                            <button onClick={() => switchTab('register')} className={`flex-1 pb-3 font-bold border-b-2 transition ${activeTab === 'register' ? 'text-red-600 border-red-600' : 'text-gray-500 border-transparent'}`}>Đăng Ký</button>
                        </div>
    
                        {/* FORM CONTENT */}
                        {activeTab === 'login' ? (
                            /* --- FORM ĐĂNG NHẬP --- */
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Số điện thoại</label>
                                    <input 
                                        type="text" 
                                        value={login.phone} 
                                        onChange={(e) => setLogin({ ...login, phone: e.target.value })} 
                                        placeholder="0912345678" 
                                        className={ `${err.phone && 'border-red-700'}  w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-200 outline-none transition`}
                                    />
                                    {
                                        err.phone && (
                                            <p className="text-red-500 text-xs mt-1 ml-1 italic">{err.phone}</p>
                                        )
                                    }
                                </div>
                                
                                {/* Login Password Field with Toggle */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Mật khẩu</label>
                                    <div className="relative">
                                        <input 
                                            type={showLoginPassword ? "text" : "password"} 
                                            value={login.password} 
                                            onChange={(e) => setLogin({ ...login, password: e.target.value })} 
                                            placeholder="" 
                                            className={`${err.password && 'border-red-700'} w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-200 outline-none transition pr-10`}
                                        />
                                        {
                                            err.password && (
                                                <p className="text-red-500 text-xs mt-1 ml-1 italic">{err.password}</p>
                                            )
                                        }
                                        <button 
                                            type="button"
                                            onClick={() => setShowLoginPassword(!showLoginPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                                        >
                                            <i className={`fa-solid ${showLoginPassword ? 'fa-eye' : 'fa-eye-slash'}`}></i>
                                        </button>
                                    </div>
                                    {
                                        errHT && (
                                           <div className="mb-4 bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center shadow-sm">
                                            <i className="fa-solid fa-circle-exclamation text-xl mr-3"></i>
                                                <div>
                                                    <p className="font-bold text-sm">Đã có lỗi xảy ra!</p>
                                                    <p className="text-sm">{errHT}</p>
                                                </div>
                                           </div>
                                        )
                                    }
                                </div>
                                
                                <button
                                    onClick={DangNhap}
                                    className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition transform active:scale-95"
                                >
                                    Đăng nhập ngay
                                </button>
                            </div>
                        ) : (
                            /* --- FORM ĐĂNG KÝ --- */
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Họ và Tên</label>
                                    <input 
                                        type="text" 
                                        value={register.name} 
                                        onChange={(e) => setRegister({ ...register, name: e.target.value })} 
                                        placeholder="Nguyễn Văn A" 
                                        className={`w-full px-4 py-3 rounded-lg border outline-none ${fieldError.name ? 'border-red-500' : 'border-gray-300'}`} 
                                    />
                                    {fieldError.name && <span className="text-xs text-red-500 mt-1">{fieldError.name}</span>}
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Số điện thoại</label>
                                    <input 
                                        type="text" 
                                        value={register.phone} 
                                        onChange={(e) => setRegister({ ...register, phone: e.target.value })} 
                                        placeholder="0123456789" 
                                        className={`w-full px-4 py-3 rounded-lg border outline-none ${fieldError.phone ? 'border-red-500' : 'border-gray-300'}`} 
                                    />
                                    {fieldError.phone && <span className="text-xs text-red-500 mt-1">{fieldError.phone}</span>}
                                </div>

                                {/* Register Password Field with Toggle */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Mật khẩu</label>
                                    <div className="relative">
                                        <input 
                                            type={showRegisterPassword ? "text" : "password"} 
                                            value={register.password} 
                                            onChange={(e) => setRegister({ ...register, password: e.target.value })} 
                                            className={`w-full px-4 py-3 rounded-lg border outline-none pr-10 ${fieldError.password ? 'border-red-500' : 'border-gray-300'}`} 
                                        />
                                        <button 
                                            type="button"
                                            onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                                        >
                                            <i className={`fa-solid ${showRegisterPassword ? 'fa-eye' : 'fa-eye-slash'}`}></i>
                                        </button>
                                    </div>
                                    {fieldError.password && <span className="text-xs text-red-500 mt-1">{fieldError.password}</span>}
                                </div>

                                {/* Register Confirm Password Field with Toggle */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Nhập lại mật khẩu</label>
                                    <div className="relative">
                                        <input 
                                            type={showConfirmPassword ? "text" : "password"} 
                                            value={register.password_confirmation} 
                                            onChange={(e) => setRegister({ ...register, password_confirmation: e.target.value })} 
                                            className={`w-full px-4 py-3 rounded-lg border outline-none pr-10 ${fieldError.password_confirmation ? 'border-red-500' : 'border-gray-300'}`} 
                                        />
                                        <button 
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                                        >
                                            <i className={`fa-solid ${showConfirmPassword ? 'fa-eye' : 'fa-eye-slash'}`}></i>
                                        </button>
                                    </div>
                                    {fieldError.password_confirmation && <span className="text-xs text-red-500 mt-1">{fieldError.password_confirmation}</span>}
                                </div>
                                
                                <button onClick={handleRegister} className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition transform active:scale-95">
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
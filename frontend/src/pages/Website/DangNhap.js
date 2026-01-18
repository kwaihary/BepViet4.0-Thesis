import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as API from '../../JS/API/API';
import * as fun from '../../JS/FUNCTION/function';

function DangNhap() {
    // Tạo state để theo dõi tab đang mở ('login' hoặc 'register')
    const [activeTab, setActiveTab] = useState('login');
    const [login,setlogin] =useState ({
            phone: '',
            password: '',
    });
    const Login=async()=>{
        const kiemtra= fun.KiemTraRong(login);
        if(!kiemtra.Status){
            alert('Vui lòng nhập dữ liệu');
            return;
        }
        const formdata=fun.objectToFormData(login);
        try {
            const ketqua= await API.CallAPI(formdata,{PhuongThuc:1,url:'api/admin/dangnhap'});
            alert(JSON.stringify(ketqua))
        } catch (error) {
            
        }

    }

    
    return (
        <>
            <div className="bg-gray-50 font-sans h-screen flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl flex overflow-hidden h-[600px]">

                    {/* --- CỘT TRÁI (ẢNH) --- */}
                    <div className="hidden md:block w-1/2 bg-cover bg-center relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3')" }}>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-10 text-white">
                            <h2 className="text-4xl font-bold mb-2">Bếp Việt 4.0</h2>
                            <p className="text-lg opacity-90">Kết nối đam mê, sẻ chia hương vị Việt.</p>
                            <div className="flex gap-2 mt-4">
                                <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-sm">🥗 1000+ Công thức</span>
                                <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-sm">🤖 AI Gợi ý</span>
                            </div>
                        </div>
                    </div>

                    {/* --- CỘT PHẢI (FORM) --- */}
                    <div className="w-full md:w-1/2 p-8 md:p-12 relative">
                        <Link to='/' className="absolute top-6 right-6 text-gray-400 hover:text-red-600">
                            <i className="fa-solid fa-xmark text-2xl"></i>
                        </Link>

                        <div className="max-w-md mx-auto h-full flex flex-col justify-center">
                            <div className="text-center md:hidden mb-6">
                                <i className="fa-solid fa-utensils text-4xl text-red-600"></i>
                                <h2 className="text-2xl font-bold mt-2">Bếp Việt 4.0</h2>
                            </div>

                            {/* --- TAB BUTTONS --- */}
                            <div className="flex border-b border-gray-200 mb-8">
                                <button 
                                    onClick={() => setActiveTab('login')} 
                                    className={`flex-1 pb-3 font-bold border-b-2 transition ${
                                        activeTab === 'login' 
                                        ? 'text-red-600 border-red-600' 
                                        : 'text-gray-500 border-transparent hover:text-red-600'
                                    }`}
                                >
                                    Đăng Nhập
                                </button>
                                <button 
                                    onClick={() => setActiveTab('register')} 
                                    className={`flex-1 pb-3 font-bold border-b-2 transition ${
                                        activeTab === 'register' 
                                        ? 'text-red-600 border-red-600' 
                                        : 'text-gray-500 border-transparent hover:text-red-600'
                                    }`}
                                >
                                    Đăng Ký
                                </button>
                            </div>

                            {/* --- FORM ĐĂNG NHẬP --- */}
                            {/* Chỉ hiện khi activeTab là 'login' */}
                
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Số điện thoại</label>
                                    <div className="relative">
                                        <i className="fa-regular fa-envelope absolute left-3 top-3.5 text-gray-400"></i>
                                        <input type="text" onChange={(e) =>
                                            setlogin(prev => ({
                                            ...prev,
                                            sdt: e.target.value 
                                         }))
} placeholder="09......" className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-200 focus:border-red-500 outline-none transition" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Mật khẩu</label>
                                    <div className="relative">
                                        <i className="fa-solid fa-lock absolute left-3 top-3.5 text-gray-400"></i>
                                        <input type="password" placeholder="password" onChange={(e) =>
                                                setlogin(prev => ({
                                                ...prev,
                                                password: e.target.value
                                            }))
} className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-200 outline-none" />
                                    </div>
                                    <div className="flex justify-between items-center mt-2">
                                        <label className="flex items-center text-sm text-gray-600 cursor-pointer">
                                            <input type="checkbox" className="mr-2 accent-red-600" /> Nhớ đăng nhập
                                        </label>
                                        <a href="#" className="text-sm font-bold text-red-600 hover:underline">Quên mật khẩu?</a>
                                    </div>
                                </div>
                                <button onClick={Login} type="button" className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition shadow-lg shadow-red-200">
                                    Đăng nhập ngay
                                </button>
                

                            {/* --- FORM ĐĂNG KÝ --- */}
                            {/* Chỉ hiện khi activeTab là 'register' */}
                            <form className={`space-y-5 animate-fade-in ${activeTab === 'register' ? 'block' : 'hidden'}`}>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Họ và Tên</label>
                                    <input type="text" placeholder="Nguyễn Văn A" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-200 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Số điện thoại</label>
                                    <input type="email" placeholder="09......" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-200 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Mật khẩu</label>
                                    <input type="password" placeholder="Tạo mật khẩu mạnh" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-200 outline-none" />
                                </div>
                                <button className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition">
                                    Tạo tài khoản mới
                                </button>
                            </form>
                        
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
export default DangNhap;
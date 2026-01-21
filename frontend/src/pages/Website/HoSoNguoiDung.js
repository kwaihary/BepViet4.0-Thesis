import { useState, useEffect } from 'react';
import '../../styles/HoSo.css';
import { useModalContext } from '../../context/QuanLiModal';
import Cookbook from '../../component/website/CookbookCuaToi';
import BaiViet from '../../component/website/BaiViet';
import MonDaLuu from '../../component/website/MonDaLuu';
// import { API } from '../../utils/api'; // Giả sử bạn có file quản lý API

function HoSo() {
    const { OpenMoDal } = useModalContext();
    const [tab, setTab] = useState('BaiDang');
    const [savedData, setSavedData] = useState([]); // State cho món đã lưu

    // Hàm lấy danh sách món đã lưu từ Database
    const fetchSavedData = async () => {
        try {
            // Thay thế bằng hàm gọi API thực tế của bạn
            // const res = await API.get('/user/saved-recipes');
            // if (res.data) setSavedData(res.data);
            
            // Giả lập sau khi fetch:
            // setSavedData(responseFromServer);
        } catch (error) {
            console.error("Lỗi fetch dữ liệu:", error);
        }
    };

    useEffect(() => {
        fetchSavedData();
    }, []);

    const getTabClass = (tabName) => {
        const baseClass = "nav-item flex items-center gap-2 text-xs md:text-sm uppercase tracking-wider cursor-pointer py-2 transition-all";
        const activeClass = "text-gray-900 font-bold border-t-2 border-gray-900 -mt-2.5 pt-2"; 
        const inactiveClass = "text-gray-500 hover:text-gray-700";
        return `${baseClass} ${tab === tabName ? activeClass : inactiveClass}`;
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-white border-b border-gray-200 w-full shadow-sm z-10">
                <div className="w-full max-w-5xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 pt-6 pb-4">
                        <div className="relative group shrink-0">
                            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full p-1 border-2 border-red-100 bg-white">
                                <img src="https://i.pravatar.cc/150?img=32" className="w-full h-full rounded-full object-cover" alt="Avatar" />
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left w-full mt-2">
                            <div className="flex flex-col md:flex-row items-center gap-3 mb-3 w-full">
                                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                    Mẹ Bắp 🌽
                                    <i className="fa-solid fa-circle-check text-blue-500 text-base" title="Đã xác minh"></i>
                                </h1>
                                <button onClick={() => { OpenMoDal(undefined, { TenTrang: 'ChuaSuaThongTin' }) }} className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-1.5 rounded-lg text-sm font-semibold transition">
                                    <i className="fa-solid fa-pen-to-square mr-1"></i> Chỉnh sửa
                                </button>
                            </div>

                            <ul className="flex gap-6 mb-3 text-sm">
                                <li><span className="font-bold text-gray-900">45</span> bài viết</li>
                                <li><span className="font-bold text-gray-900">12k</span> người theo dõi</li>
                            </ul>

                            <div className="text-sm text-gray-600">
                                <p>🍳 Yêu bếp, nghiện nhà. Chuyên cơm gia đình.</p>
                                <a href="#" className="text-blue-600 hover:underline font-medium"><i className="fa-solid fa-link mr-1"></i>bepphuong.com</a>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center md:justify-start gap-12 mt-4">
                        <button onClick={() => setTab('BaiDang')} className={getTabClass('BaiDang')}>
                            <i className="fa-solid fa-newspaper text-lg"></i> <span className="hidden md:inline">Bài viết</span>
                        </button>
                        <button onClick={() => setTab('cookbook')} className={getTabClass('cookbook')}>
                            <i className="fa-solid fa-book-open text-lg"></i> <span className="hidden md:inline">Cookbooks</span>
                        </button>
                        <button onClick={() => setTab('MonDaLuu')} className={getTabClass('MonDaLuu')}>
                           <i className="fa-regular fa-bookmark w-5"></i>  <span className="hidden md:inline">Món đã lưu</span>
                        </button>
                    </div>
                </div>
            </header>
            
            <main className="w-full max-w-3xl mx-auto px-0 md:px-4 py-6 flex-1">
                {tab === 'BaiDang' && <BaiViet onSaveSuccess={fetchSavedData} />}
                {tab === 'MonDaLuu' && <MonDaLuu data={savedData} onRefresh={fetchSavedData} />}
                {tab === 'cookbook' && <div className="w-full"><Cookbook /></div>}
            </main>
        </div>
    );
};

export default HoSo;
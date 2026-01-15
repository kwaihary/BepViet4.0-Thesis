import '../../styles/HoSo.css'; 
import { useModalContext } from '../../context/QuanLiModal';
import { useState } from 'react';
import Cookbook from '../../component/website/CookbookCuaToi';
import BaiViet from '../../component/website/BaiViet';
import MonDaLuu from '../../component/website/MonDaLuu';

function HoSo() {
   
    const { OpenMoDal } = useModalContext();
    const [tab, setTab] = useState('BaiDang');
    //Thông tin bài viết
     const posts = [
        {
            id: 1,
            author: "Đầu Bếp Hùng",
            authorAvatar: "https://i.pravatar.cc/150?img=12",
            time: "2 giờ trước",
            title: "Phở Bò Tái Lăn Hà Nội",
            content: "Bí quyết để thịt bò mềm ngọt mà không bị dai chính là cách tẩm ướp và xào lửa lớn...",
            image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0",
            likes: "1.2k",
            commentCount: 45,
            comments: [
                {
                    id: 101,
                    user: "Nguyễn Văn A",
                    avatar: "https://i.pravatar.cc/150?img=11",
                    content: "Nhìn ngon quá anh ơi, cho em xin công thức ướp thịt với ạ!",
                    time: "10 phút trước",
                    replies: [
                        {
                            id: 102,
                            user: "Đầu Bếp Hùng",
                            avatar: "https://i.pravatar.cc/150?img=12",
                            content: "Ok em, anh ướp gừng, tỏi, nước mắm và chút dầu hào nhé.",
                            time: "5 phút trước",
                            replies: [] 
                        }
                    ]
                },
                {
                    id: 103,
                    user: "Tran Thi C",
                    avatar: "https://i.pravatar.cc/150?img=5",
                    content: "Món này ăn sáng thì tuyệt vời.",
                    time: "1 giờ trước",
                    replies: []
                }
            ]
        },
        {
            id: 2,
            author: "Lan Healthy",
            authorAvatar: "https://i.pravatar.cc/150?img=5",
            time: "5 giờ trước",
            title: "Salad Ức Gà Sốt Chanh Leo",
            content: "Bữa tối nhẹ nhàng 300kcal cho ai đang diet nhé!",
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
            likes: "890",
            commentCount: 32,
            comments: []
        }
    ];
    //Dữ liệu bài viết đã lưu
    const data=[
            {
                id: 1,
                title: "Sườn xào chua ngọt chuẩn vị Bắc",
                image: "https://images.unsplash.com/photo-1544025162-d76694265947",
                author: "Đầu bếp Hùng",
                authorAvatar: "https://i.pravatar.cc/150?img=12",
                time: "45 phút",
                savedAt: "12/05/2024"
            },
            {
                id: 2,
                title: "Canh chua cá lóc miền Tây",
                image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3",
                author: "Mẹ Bắp 🌽",
                authorAvatar: "https://i.pravatar.cc/150?img=32",
                time: "30 phút",
                savedAt: "10/05/2024"
            },
            {
                id: 3,
                title: "Bánh mì xíu mại chấm",
                image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0",
                author: "Street Food VN",
                authorAvatar: "https://i.pravatar.cc/150?img=5",
                time: "60 phút",
                savedAt: "09/05/2024"
            },
            {
                id: 4,
                title: "Salad bơ trứng healthy",
                image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
                author: "Eat Clean Cùng Lan",
                authorAvatar: "https://i.pravatar.cc/150?img=9",
                time: "15 phút",
                savedAt: "08/05/2024"
            }
        ]


    const getTabClass = (tabName) => {
        const baseClass = "nav-item flex items-center gap-2 text-xs md:text-sm uppercase tracking-wider cursor-pointer py-2 transition-all";
        const activeClass = "text-gray-900 font-bold border-t-2 border-gray-900 -mt-2.5 pt-2"; 
        const inactiveClass = "text-gray-500 hover:text-gray-700";
        return `${baseClass} ${tab === tabName ? activeClass : inactiveClass}`;
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col"> {/* Đổi nền sang xám nhạt để nổi bật Card */}
            
            
            <header className="bg-white border-b border-gray-200 w-full shadow-sm z-10">
                <div className="w-full max-w-5xl mx-auto px-4"> {/* Giới hạn chiều rộng header cho cân đối */}
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
                {tab === 'BaiDang' && (
                    <>
                        <BaiViet data={posts}/>
                    </>
                )
            }
            {
                tab==='MonDaLuu' && (
                    <><MonDaLuu data={data}/></>
                )
            }
            {
                tab === 'cookbook' && (
                    <div className="w-full">
                        <Cookbook />
                    </div>
                )}

            </main>
        </div>
    );
};

export default HoSo;
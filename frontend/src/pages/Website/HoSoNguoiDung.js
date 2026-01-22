import '../../styles/HoSo.css'; 
import { useModalContext } from '../../context/QuanLiModal';
import { useState , useEffect } from 'react';
import Cookbook from '../../component/website/CookbookCuaToi';
import BaiViet from '../../component/website/BaiViet';
import { useDangNhapContext } from '../../context/QuanLiDangNhap_NguoiDung';
import * as API from '../../JS/API/API';

function HoSo() {
    const { GiaTri} = useDangNhapContext();
    const { OpenMoDal } = useModalContext();
    const [tab, setTab] = useState('BaiDang');
    const [ThongTin,setTT]= useState([]);
    useEffect(()=>{
        const DuLieu = async()=>{
            try {
                const [data1, data2 ,data3 ] = await Promise.all([
                    API.CallAPI(undefined, { PhuongThuc: 2, url: `admin/TTBaiViet_NguyenLieu?id=${GiaTri.id}` }),
                    API.CallAPI(undefined, { PhuongThuc: 2, url: `admin/TTBaiViet_BuocLam?id=${GiaTri.id}` }),
                    API.CallAPI(undefined ,{ PhuongThuc:2, url : `website/ThongTinBaiVietTheoID?id=${GiaTri.id}` })
                ]);

                if(data3.status){
                    setTT(data3.data);
                }
              
            } catch (error) {
                
            }
        }
        DuLieu();
    },[GiaTri.id])
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
                                <img src={GiaTri.avatar} className="w-full h-full rounded-full object-cover" alt="Avatar" />
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left w-full mt-2">
                            <div className="flex flex-col md:flex-row items-center gap-3 mb-3 w-full">
                                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                    {GiaTri.name}
                                    <i className="fa-solid fa-circle-check text-blue-500 text-base" title="Đã xác minh"></i>
                                </h1>
                                <button onClick={() => { OpenMoDal(undefined, { TenTrang: 'ChuaSuaThongTin' }) }} className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-1.5 rounded-lg text-sm font-semibold transition">
                                    <i className="fa-solid fa-pen-to-square mr-1"></i> Chỉnh sửa
                                </button>
                            </div>
                            <div className="text-sm text-gray-600">
                                <p>{GiaTri.bio}</p>
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
                    </div>
                </div>
            </header>
            <main className="w-full max-w-3xl mx-auto px-0 md:px-4 py-6 flex-1">
                {tab === 'BaiDang' && (
                    <>
                        <BaiViet data={ThongTin}/>
                    </>
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
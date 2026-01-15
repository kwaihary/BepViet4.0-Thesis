import { useNavigate } from "react-router-dom";
import BaiViet from './BaiViet';


function ThongTinBaiViet() {
    const navigate = useNavigate();
    // thông tin trả về từ sever sẽ như vậy nhé
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

    

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* --- CỘT TRÁI: DANH SÁCH BÀI VIẾT --- */}
            <div className="lg:col-span-2 space-y-4">
                
                {/* Khu vực đăng bài */}
                <div className="bg-white rounded-xl shadow-sm p-4">
                    <div className="flex gap-3 mb-3">
                        <img src="https://i.pravatar.cc/150?img=32" className="w-10 h-10 rounded-full" alt="Avatar" />
                        <button 
                            onClick={() => navigate('/dang-bai')}
                            className="flex-1 bg-gray-100 rounded-full px-4 text-left text-gray-500 hover:bg-gray-200 transition"
                        >
                            Bạn vừa nấu món gì ngon thế?
                        </button>
                    </div>
                    <div className="flex justify-between border-t pt-3 px-2">
                        <button className="flex items-center gap-2 text-gray-500 text-sm hover:bg-gray-50 px-3 py-1 rounded-lg">
                            <i className="fa-solid fa-image text-green-500"></i> Ảnh/Video
                        </button>
                        <button className="flex items-center gap-2 text-gray-500 text-sm hover:bg-gray-50 px-3 py-1 rounded-lg">
                            <i className="fa-solid fa-face-smile text-yellow-500"></i> Cảm xúc
                        </button>
                    </div>
                </div>
                <BaiViet data={posts}/>
            </div>

            {/* --- CỘT PHẢI: GỢI Ý --- */}
            <aside className="hidden lg:block lg:col-span-1">
                <div className="sticky top-24">
                    <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
                        <h3 className="font-bold text-gray-800 mb-3">Gợi ý hôm nay</h3>
                        <div className="flex gap-3 mb-3">
                            <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836" alt="Suggestion" className="w-16 h-16 rounded-lg object-cover" />
                            <div>
                                <h4 className="text-sm font-bold line-clamp-2">Sườn xào chua ngọt</h4>
                                <span className="text-xs text-gray-500">450 Kcal</span>
                            </div>
                        </div>
                        <button onClick={() => navigate('/AI')} className="w-full py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg font-bold text-sm shadow-md hover:opacity-90">
                            <i className="fa-solid fa-robot"></i> Hỏi AI xem ăn gì?
                        </button>
                    </div>
                </div>
            </aside>
        </div>
    );
};

export default ThongTinBaiViet;
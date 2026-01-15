import React from 'react';

function ChiTietMonAn() {
    // 1. Dữ liệu giả mô phỏng lấy từ Database (Bảng comments)
    const comments = [
        {
            id: 1,
            user: "Nguyễn Văn A",
            avatar: "https://i.pravatar.cc/150?img=11",
            content: "Món này làm theo công thức chuẩn vị lắm, cảm ơn admin!",
            time: "2 giờ trước",
            rating: 5
        },
        {
            id: 2,
            user: "Trần Thị B",
            avatar: "https://i.pravatar.cc/150?img=5",
            content: "Mình thay thịt bò bằng thịt heo được không nhỉ?",
            time: "5 giờ trước",
            rating: 4
        },
        {
            id: 3,
            user: "Le Tuan",
            avatar: "https://i.pravatar.cc/150?img=3",
            content: "Nước dùng hơi nhạt so với khẩu vị miền Trung của mình, nhưng thơm.",
            time: "1 ngày trước",
            rating: 4
        }
    ];

    return (
        <>
            <main className="container mx-auto px-4 max-w-5xl py-8">
                {/* Nút Quay lại */}
                <a href="home.html" className="flex items-center gap-2 mb-6">
                    <div className="bg-red-600 text-white p-2 rounded-lg"><i className="fa-solid fa-chevron-left"></i></div>
                    <span className="font-bold text-gray-700">Quay lại</span>
                </a>

                {/* Phần Header Món ăn (Giữ nguyên) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                    <div className="rounded-2xl overflow-hidden shadow-lg h-[350px]">
                        <img src="https://images.unsplash.com/photo-1589302168068-964664d93dc0" alt='Pho Bo' className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-bold">Món nước</span>
                            <span className="text-yellow-500 text-sm"><i className="fa-solid fa-star"></i> 4.9</span>
                        </div>
                        <h1 className="text-4xl font-extrabold mb-4 text-gray-900">Phở Bò Tái Lăn</h1>
                        <p className="text-gray-500 mb-6">Món phở đặc trưng với thịt bò được xào lăn qua lửa lớn cùng tỏi thơm lừng...</p>

                        <div className="flex gap-4 mb-6 text-sm">
                            <div className="text-center bg-white p-3 rounded-lg shadow-sm border w-24">
                                <i className="fa-regular fa-clock text-red-500 text-xl mb-1"></i>
                                <p className="font-bold">45p</p>
                            </div>
                            <div className="text-center bg-white p-3 rounded-lg shadow-sm border w-24">
                                <i className="fa-solid fa-fire text-orange-500 text-xl mb-1"></i>
                                <p className="font-bold">600 Kcal</p>
                            </div>
                            <div className="text-center bg-white p-3 rounded-lg shadow-sm border w-24">
                                <i className="fa-solid fa-layer-group text-blue-500 text-xl mb-1"></i>
                                <p className="font-bold">Trung bình</p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button className="flex-1 bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 shadow-lg shadow-red-200"><i className="fa-solid fa-heart"></i> Yêu thích</button>
                            <button className="flex-1 bg-white text-gray-700 border border-gray-200 py-3 rounded-xl font-bold hover:bg-gray-50"><i className="fa-solid fa-calendar-plus"></i> Lên kế hoạch</button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cột trái: Nguyên liệu (Giữ nguyên) */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
                            <h3 className="font-bold text-xl mb-4 border-b pb-2">Nguyên liệu <span className="text-sm font-normal text-gray-500">(2 người)</span></h3>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3">
                                    <input type="checkbox" className="w-5 h-5 accent-red-600" />
                                    <div className="flex-1 border-b border-dashed pb-2 flex justify-between">
                                        <span>Bánh phở</span> <b>500g</b>
                                    </div>
                                </li>
                                <li className="flex items-center gap-3">
                                    <input type="checkbox" className="w-5 h-5 accent-red-600" />
                                    <div className="flex-1 border-b border-dashed pb-2 flex justify-between">
                                        <span>Thịt bò</span> <b>300g</b>
                                    </div>
                                </li>
                                <li className="flex items-center gap-3">
                                    <input type="checkbox" className="w-5 h-5 accent-red-600" />
                                    <div className="flex-1 border-b border-dashed pb-2 flex justify-between">
                                        <span>Hành tây</span> <b>1 củ</b>
                                    </div>
                                </li>
                            </ul>
                            <button className="w-full mt-6 bg-green-50 text-green-700 font-bold py-2 rounded-lg hover:bg-green-100"><i className="fa-solid fa-cart-shopping"></i> Tạo Shopping List</button>
                        </div>
                    </div>

                    {/* Cột phải: Cách làm & Bình luận */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Cách thực hiện (Giữ nguyên) */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="font-bold text-xl mb-6">Cách thực hiện</h3>
                            <div className="flex gap-4 mb-6">
                                <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold shrink-0">1</div>
                                <div>
                                    <h4 className="font-bold text-lg mb-2">Sơ chế thịt bò</h4>
                                    <p className="text-gray-600 mb-3">Thái thịt bò mỏng ngang thớ. Ướp với gừng đập dập, tỏi băm, 1 thìa nước mắm và tiêu trong 15 phút.</p>
                                    <img src="https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1" alt='Buoc 1' className="rounded-lg w-full h-48 object-cover" />
                                </div>
                            </div>
                            <div className="flex gap-4 mb-6">
                                <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold shrink-0">2</div>
                                <div>
                                    <h4 className="font-bold text-lg mb-2">Xào thịt (Quan trọng)</h4>
                                    <p className="text-gray-600">Phi thơm tỏi. Để lửa thật lớn, cho thịt bò vào đảo nhanh tay. Thịt vừa chín tới thì tắt bếp ngay để giữ độ ngọt.</p>
                                </div>
                            </div>
                        </div>

                        {/* --- PHẦN BÌNH LUẬN (Đã cập nhật) --- */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="font-bold text-lg mb-4">Bình luận ({comments.length})</h3>
                            
                            {/* Ô nhập bình luận */}
                            <div className="flex gap-3 mb-8">
                                <img src="https://i.pravatar.cc/150?img=10" className="w-10 h-10 rounded-full" alt='Avatar' />
                                <div className="flex-1 relative">
                                    <input type="text" placeholder="Viết bình luận của bạn..." className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-red-500 pr-10" />
                                    <button className="absolute right-2 top-2 text-red-500 hover:bg-red-50 p-1 rounded"><i className="fa-solid fa-paper-plane"></i></button>
                                </div>
                            </div>

                            {/* DANH SÁCH BÌNH LUẬN */}
                            <div className="space-y-6">
                                {comments.map((comment) => (
                                    <div key={comment.id} className="flex gap-3">
                                        <img src={comment.avatar} className="w-10 h-10 rounded-full" alt={comment.user} />
                                        <div className="flex-1">
                                            <div className="bg-gray-50 p-3 rounded-2xl rounded-tl-none">
                                                <div className="flex justify-between items-start mb-1">
                                                    <h5 className="font-bold text-sm text-gray-900">{comment.user}</h5>
                                                    <span className="text-xs text-gray-400">{comment.time}</span>
                                                </div>
                                                <p className="text-gray-700 text-sm mb-2">{comment.content}</p>
                                                
                                                {/* Hiển thị số sao đánh giá */}
                                                <div className="text-yellow-400 text-xs">
                                                    {[...Array(5)].map((_, i) => (
                                                        <i key={i} className={`fa-solid fa-star ${i < comment.rating ? '' : 'text-gray-300'}`}></i>
                                                    ))}
                                                </div>
                                            </div>
                                            
                                            {/* Nút phản hồi */}
                                            <div className="flex gap-4 mt-1 ml-2 text-xs font-semibold text-gray-500">
                                                <button className="hover:text-red-600">Thích</button>
                                                <button className="hover:text-red-600">Phản hồi</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            {/* Nút xem thêm */}
                            <div className="text-center mt-6">
                                <button className="text-gray-500 text-sm hover:text-red-600 font-semibold">Xem thêm bình luận <i className="fa-solid fa-chevron-down ml-1"></i></button>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
        </>
    )
};

export default ChiTietMonAn;
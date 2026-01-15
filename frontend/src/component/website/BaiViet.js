import {Link, useNavigate} from 'react-router-dom';
import { useState } from 'react';
function BaiViet({data}){
     const [openPostId, setOpenPostId] = useState(null);
      const navigate = useNavigate();
    // Hàm xử lý bật/tắt bình luận
    const toggleComments = (postId) => {
        if (openPostId === postId) {
            setOpenPostId(null);
        } else {
            setOpenPostId(postId);
        }
    };
    // --- 1. COMPONENT HIỂN THỊ 1 BÌNH LUẬN (HỖ TRỢ PHÂN CẤP) ---
const CommentItem = ({ comment }) => {
    return (
        <div className="flex gap-3 mb-4">
            {/* Avatar người comment */}
            <img 
                src={comment.avatar} 
                className="w-8 h-8 rounded-full object-cover shrink-0 mt-1" 
                alt={comment.user} 
            />
            
            <div className="flex-1">
                {/* Nội dung comment */}
                <div className="bg-gray-100 px-3 py-2 rounded-2xl rounded-tl-none inline-block">
                    <h5 className="font-bold text-sm text-gray-900">{comment.user}</h5>
                    <p className="text-gray-700 text-sm">{comment.content}</p>
                </div>
                
                {/* Nút thao tác nhỏ bên dưới */}
                <div className="flex gap-4 mt-1 ml-2 text-xs font-semibold text-gray-500 mb-2">
                    <span className="cursor-pointer hover:text-red-600">Thích</span>
                    <span className="cursor-pointer hover:text-red-600">Phản hồi</span>
                    <span>{comment.time}</span>
                </div>

                {/* --- ĐỆ QUY: Nếu có replies (comment con) thì hiển thị tiếp --- */}
                {comment.replies && comment.replies.length > 0 && (
                    <div className="pl-4 border-l-2 border-gray-200 mt-2">
                        {comment.replies.map(reply => (
                            <CommentItem key={reply.id} comment={reply} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
    return (
        <>
           {/* --- RENDER DANH SÁCH BÀI VIẾT TỪ DATA --- */}
                {data.map((post) => (
                    <article key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                        {/* Header bài viết */}
                        <div className="p-4 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <img src={post.authorAvatar} className="w-10 h-10 rounded-full border" alt="Author" />
                                <div>
                                    <h4 className="font-bold text-sm">{post.author}</h4>
                                    <p className="text-xs text-gray-500">{post.time} <i className="fa-solid fa-earth-asia"></i></p>
                                </div>
                            </div>
                            <button className="text-gray-400"><i className="fa-solid fa-ellipsis"></i></button>
                        </div>
                        
                        {/* Nội dung bài viết */}
                        <div className="px-4 pb-3">
                            <h3 className="font-bold text-lg mb-1">{post.title}</h3>
                            <p className="text-sm text-gray-600 line-clamp-3">{post.content}</p>
                        </div>
                        
                        <Link to="/chi-tiet-mon"> 
                            <img 
                                src={post.image} 
                                alt="Food"
                                className="w-full h-80 object-cover hover:opacity-95 transition" 
                            />
                        </Link>

                        {/* Các nút tương tác */}
                        <div className="p-4 border-t flex justify-between">
                            <div className="flex gap-6">
                                {/* Like Button */}
                                <button className="flex items-center gap-2 text-gray-500 hover:text-red-600 transition">
                                    <i className="fa-regular fa-heart text-xl"></i> {post.likes}
                                </button>
                                
                                {/* Comment Button */}
                                <button 
                                    onClick={() => toggleComments(post.id)}
                                    className={`flex items-center gap-2 transition ${openPostId === post.id ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}
                                >
                                    <i className={`${openPostId === post.id ? 'fa-solid' : 'fa-regular'} fa-comment text-xl`}></i> 
                                    {post.commentCount}
                                </button>

                                {/* --- MỚI: BUTTON XEM CHI TIẾT --- */}
                                <button 
                                    onClick={() => navigate('/chi-tiet-mon')}
                                    className="flex items-center gap-2 text-gray-500 hover:text-green-600 transition"
                                    title="Xem chi tiết"
                                >
                                    <i className="fa-regular fa-eye text-xl"></i>
                                    <span className="hidden sm:inline">Xem</span>
                                </button>
                                {/* -------------------------------- */}

                            </div>
                            <button className="text-gray-500 hover:text-orange-600">
                                <i className="fa-regular fa-bookmark text-xl"></i>
                            </button>
                        </div>

                        {/* --- KHU VỰC HIỂN THỊ BÌNH LUẬN --- */}
                        {openPostId === post.id && (
                            <div className="bg-gray-50 p-4 border-t border-gray-100 animate-fade-in-down">
                                {/* Ô nhập bình luận */}
                                <div className="flex gap-3 mb-6">
                                    <img src="https://i.pravatar.cc/150?img=32" className="w-8 h-8 rounded-full" alt="Me" />
                                    <div className="flex-1 relative">
                                        <input 
                                            type="text" 
                                            placeholder="Viết bình luận..." 
                                            className="w-full bg-white border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-blue-500 pr-10" 
                                        />
                                        <button className="absolute right-2 top-1.5 text-blue-500 hover:bg-blue-50 p-1 rounded-full">
                                            <i className="fa-solid fa-paper-plane"></i>
                                        </button>
                                    </div>
                                </div>

                                {/* Danh sách bình luận */}
                                <div className="space-y-2">
                                    {post.comments && post.comments.length > 0 ? (
                                        post.comments.map(cmt => (
                                            <CommentItem key={cmt.id} comment={cmt} />
                                        ))
                                    ) : (
                                        <p className="text-center text-gray-400 text-sm italic py-2">Chưa có bình luận nào. Hãy là người đầu tiên!</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </article>
                ))}
        </>
    )
};
export default BaiViet;
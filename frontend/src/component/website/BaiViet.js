import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'; // Đã thêm useEffect
import Swal from 'sweetalert2'; // Đã thêm SweetAlert2

// --- 1. COMPONENT MODAL HIỂN THỊ DANH SÁCH USER (Giữ nguyên) ---
const UserListModal = ({ title, users, onClose }) => {
    if (!users) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden">
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="font-bold text-lg text-gray-800">{title}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <i className="fa-solid fa-xmark text-xl"></i>
                    </button>
                </div>
                <div className="max-h-80 overflow-y-auto p-2">
                    {users.length > 0 ? (
                        users.map((user, index) => (
                            <div key={index} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition">
                                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover border" />
                                <div>
                                    <p className="font-semibold text-sm text-gray-800">{user.name}</p>
                                    <p className="text-xs text-blue-600 font-medium">Theo dõi</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 py-4">Chưa có ai.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- 2. COMPONENT BÌNH LUẬN (Giữ nguyên) ---
const CommentItem = ({ comment }) => {
    return (
        <div className="flex gap-3 mb-4">
            <img src={comment.avatar} className="w-8 h-8 rounded-full object-cover shrink-0 mt-1" alt={comment.user} />
            <div className="flex-1">
                <div className="bg-gray-100 px-3 py-2 rounded-2xl rounded-tl-none inline-block">
                    <h5 className="font-bold text-sm text-gray-900">{comment.user}</h5>
                    <p className="text-gray-700 text-sm">{comment.content}</p>
                </div>
                <div className="flex gap-4 mt-1 ml-2 text-xs font-semibold text-gray-500 mb-2">
                    <span className="cursor-pointer hover:text-red-600">Thích</span>
                    <span className="cursor-pointer hover:text-red-600">Phản hồi</span>
                    <span>{comment.time}</span>
                </div>
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

// --- 3. MAIN COMPONENT (Đã cập nhật Menu 3 chấm) ---
function BaiViet({ data }) {
    const [openPostId, setOpenPostId] = useState(null);
    const [modalData, setModalData] = useState(null);
    
    // --- MỚI: State quản lý Menu 3 chấm ---
    const [openMenuId, setOpenMenuId] = useState(null); 
    
    const navigate = useNavigate();

    // --- MỚI: Tự động đóng menu khi click ra ngoài ---
    useEffect(() => {
        const handleClickOutside = () => setOpenMenuId(null);
        window.addEventListener("click", handleClickOutside);
        return () => window.removeEventListener("click", handleClickOutside);
    }, []);

    // --- MỚI: Hàm bật tắt menu ---
    const toggleMenu = (e, id) => {
        e.stopPropagation(); // Ngăn chặn sự kiện click lan ra ngoài
        setOpenMenuId(openMenuId === id ? null : id);
    };

    // --- MỚI: Các hàm xử lý hành động ---
    const handleHide = (e) => {
        e.stopPropagation();
        Swal.fire({ icon: 'success', title: 'Đã ẩn bài viết', showConfirmButton: false, timer: 1500 });
        setOpenMenuId(null);
    };

    const handleReport = (e) => {
        e.stopPropagation();
        Swal.fire({
            title: 'Báo cáo vi phạm',
            input: 'select',
            inputOptions: { spam: 'Spam', fake: 'Tin giả', offensive: 'Phản cảm' },
            inputPlaceholder: 'Chọn lý do...',
            showCancelButton: true
        }).then((res) => {
            if(res.isConfirmed) Swal.fire('Đã gửi!', 'Cảm ơn bạn đã báo cáo.', 'success');
        });
        setOpenMenuId(null);
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        Swal.fire({
            title: 'Xóa bài viết?',
            text: "Hành động này không thể hoàn tác!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
        }).then((res) => {
            if(res.isConfirmed) Swal.fire('Đã xóa!', 'Bài viết đã bị xóa.', 'success');
        });
        setOpenMenuId(null);
    };
    // --------------------------------------

    const toggleComments = (postId) => {
        setOpenPostId(openPostId === postId ? null : postId);
    };

    const openLikeList = (post) => {
        const users = post.likedBy || []; 
        setModalData({ title: 'Những người đã thích', users: users });
    };

    const openSaveList = (post) => {
        const users = post.savedBy || [];
        setModalData({ title: 'Đã thêm vào yêu thích', users: users });
    };

    const closeModal = () => setModalData(null);

    return (
        <>
            {data.map((post) => (
                <article key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden mb-6 border border-gray-100 overflow-visible"> 
                    {/* Lưu ý: Thêm 'overflow-visible' để menu không bị cắt */}

                    {/* Header */}
                    <div className="p-4 flex justify-between items-center relative">
                        <div className="flex items-center gap-3">
                            <img src={post.authorAvatar} className="w-10 h-10 rounded-full border" alt="Author" />
                            <div>
                                <h4 className="font-bold text-sm hover:underline cursor-pointer">{post.author}</h4>
                                <p className="text-xs text-gray-500">{post.time} <i className="fa-solid fa-earth-asia"></i></p>
                            </div>
                        </div>

                        {/* --- KHU VỰC MENU 3 CHẤM (ĐÃ SỬA) --- */}
                        <div className="relative">
                            <button 
                                onClick={(e) => toggleMenu(e, post.id)}
                                className={`w-8 h-8 rounded-full flex items-center justify-center transition ${openMenuId === post.id ? 'bg-red-50 text-red-600' : 'text-gray-400 hover:bg-gray-100'}`}
                            >
                                <i className="fa-solid fa-ellipsis"></i>
                            </button>

                            {/* Dropdown Menu */}
                            {openMenuId === post.id && (
                                <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-xl border border-gray-100 z-50 animate-fade-in py-1 overflow-hidden">
                                    <button onClick={handleHide} className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition">
                                        <i className="fa-regular fa-eye-slash w-5"></i> Ẩn bài viết
                                    </button>
                                    
                                    <button onClick={handleReport} className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-orange-600 flex items-center gap-3 transition">
                                        <i className="fa-regular fa-flag w-5"></i> Báo cáo
                                    </button>

                                    <div className="border-t border-gray-100 my-1"></div>

                                    <button onClick={handleDelete} className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 font-medium flex items-center gap-3 transition">
                                        <i className="fa-regular fa-trash-can w-5"></i> Xóa bài viết
                                    </button>
                                </div>
                            )}
                        </div>
                        {/* ------------------------------------- */}
                    </div>

                    {/* Content */}
                    <div className="px-4 pb-3">
                        <h3 className="font-bold text-lg mb-1">{post.title}</h3>
                        <p className="text-sm text-gray-600 line-clamp-3">{post.content}</p>
                    </div>

                    {/* Image */}
                    <Link to="/chi-tiet-mon" className="block overflow-hidden">
                        <img 
                            src={post.image} 
                            alt="Food"
                            className="w-full h-80 object-cover hover:scale-105 transition duration-500" 
                        />
                    </Link>

                    {/* Action Bar */}
                    <div className="px-4 py-3 border-t border-gray-100 flex justify-between items-center">
                        <div className="flex gap-6">
                            <div className="flex items-center gap-2">
                                <button className="text-gray-500 hover:text-red-600 transition p-1"><i class="fa-regular fa-thumbs-up"></i></button>
                                <button onClick={() => openLikeList(post)} className="text-sm font-semibold text-gray-700 hover:underline">
                                    {post.likes} lượt thích
                                </button>
                            </div>
                            <button onClick={() => toggleComments(post.id)} className={`flex items-center gap-2 transition ${openPostId === post.id ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}>
                                <i className={`${openPostId === post.id ? 'fa-solid' : 'fa-regular'} fa-comment text-2xl`}></i>
                                <span className="text-sm font-semibold">{post.commentCount}</span>
                            </button>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={() => openSaveList(post)} className="text-sm font-semibold text-gray-700 hover:underline">
                                {post.saves || 0} đã lưu
                            </button>
                            <button className="text-gray-500 hover:text-orange-500 transition p-1"><i className="fa-regular fa-bookmark text-2xl"></i></button>
                        </div>
                    </div>

                    {/* View Detail Button */}
                    <div className="px-4 pb-2">
                        <button onClick={() => navigate('/chi-tiet-mon')} className="w-full py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 text-sm font-medium rounded-lg transition">
                            Xem chi tiết công thức <i className="fa-solid fa-arrow-right ml-1"></i>
                        </button>
                    </div>

                    {/* Comments Section */}
                    {openPostId === post.id && (
                        <div className="bg-gray-50 p-4 border-t border-gray-200 animate-fade-in-down">
                            <div className="flex gap-3 mb-6">
                                <img src="https://i.pravatar.cc/150?img=32" className="w-8 h-8 rounded-full" alt="Me" />
                                <div className="flex-1 relative">
                                    <input type="text" placeholder="Viết bình luận..." className="w-full bg-white border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-blue-500 pr-10 shadow-sm" />
                                    <button className="absolute right-2 top-1.5 text-blue-500 hover:bg-blue-50 p-1 rounded-full transition"><i className="fa-solid fa-paper-plane"></i></button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                {post.comments && post.comments.length > 0 ? (
                                    post.comments.map(cmt => <CommentItem key={cmt.id} comment={cmt} />)
                                ) : (
                                    <p className="text-center text-gray-400 text-sm italic py-2">Chưa có bình luận nào.</p>
                                )}
                            </div>
                        </div>
                    )}
                </article>
            ))}

            {modalData && (
                <UserListModal title={modalData.title} users={modalData.users} onClose={closeModal} />
            )}
        </>
    );
}

export default BaiViet;
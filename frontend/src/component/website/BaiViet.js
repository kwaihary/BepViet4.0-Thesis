import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as API from '../../JS/API/API'; // Đường dẫn API của bạn
import * as ThongBao from '../../JS/FUNCTION/ThongBao'; // Bộ thông báo của bạn

// --- 1. COMPONENT MODAL HIỂN THỊ DANH SÁCH USER (Giữ nguyên giao diện) ---
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
                <div className="max-h-80 overflow-y-auto p-2 text-left">
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
                        <p className="text-center text-gray-500 py-4 italic">Chưa có ai.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- 2. COMPONENT BÌNH LUẬN (Giữ nguyên giao diện) ---
const CommentItem = ({ comment }) => {
    return (
        <div className="flex gap-3 mb-4 text-left">
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

// --- 3. MAIN COMPONENT ---
function BaiViet({ data }) {
    const [openPostId, setOpenPostId] = useState(null);
    const [modalData, setModalData] = useState(null);
    const [openMenuId, setOpenMenuId] = useState(null);
    const navigate = useNavigate();

    // --- State cho chức năng Chỉnh sửa ---
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState(null);

    useEffect(() => {
        const handleClickOutside = () => setOpenMenuId(null);
        window.addEventListener("click", handleClickOutside);
        return () => window.removeEventListener("click", handleClickOutside);
    }, []);

    const toggleMenu = (e, id) => {
        e.stopPropagation();
        setOpenMenuId(openMenuId === id ? null : id);
    };

    const handleHide = (e) => {
        e.stopPropagation();
        ThongBao.ThongBao_ThanhCong('Đã ẩn bài viết thành công');
        setOpenMenuId(null);
    };

    // --- MỞ MODAL SỬA ---
    const openEditModal = (e, post) => {
        e.stopPropagation();
        setEditingPost({ ...post, previewUrl: post.image });
        setIsEditModalOpen(true);
        setOpenMenuId(null);
    };

    // --- LƯU CHỈNH SỬA ---
    const handleUpdate = async (e) => {
    e.preventDefault();
    try {
        const formData = new FormData();
        formData.append('title', editingPost.title);
        formData.append('content', editingPost.content);
        if (editingPost.imageFile) {
            formData.append('image', editingPost.imageFile);
        }
        formData.append('_method', 'PUT');

        const ketQua = await API.CallAPI(formData, { 
            PhuongThuc: 1, 
            url: `recipes/${editingPost.id}` // ĐÃ SỬA: Bỏ "api/" ở đây
        });

        if (ketQua.status) {
            await ThongBao.ThongBao_ThanhCong('Cập nhật thành công!');
            setIsEditModalOpen(false);
            window.location.reload();
        } else {
            // Hiển thị lỗi chi tiết từ server nếu có
            ThongBao.ThongBao_CanhBao(ketQua.message || 'Cập nhật thất bại');
        }
    } catch (error) {
        ThongBao.ThongBao_CanhBao('Lỗi kết nối máy chủ');
    }
};

   const handleDelete = async (e, postId) => {
    e.stopPropagation(); // Ngăn chặn sự kiện click lan ra ngoài (vào trang chi tiết)
    
    // Sử dụng bộ thông báo xác nhận của bạn
    const xacNhan = await ThongBao.ThongBao_XacNhanTT('Bạn có chắc chắn muốn xóa bài viết này không?');
    
    if (xacNhan) {
        try {
            // PhuongThuc: 3 thường được quy định là DELETE trong các cấu trúc API của bạn
            // url: recipes/${postId} (không thêm api/ vì API.js đã có sẵn)
            const ketQua = await API.CallAPI(undefined, { 
                PhuongThuc: 3, 
                url: `recipes/${postId}` 
            });

            if (ketQua.status || ketQua.message === undefined) { 
                // Một số API trả về object trống khi xóa thành công
                ThongBao.ThongBao_ThanhCong('Bài viết đã được xóa thành công');
                
                // Load lại trang để cập nhật danh sách hoặc dùng state để xóa phần tử khỏi mảng
                window.location.reload();
            } else {
                ThongBao.ThongBao_CanhBao(ketQua.message || 'Không thể xóa bài viết');
            }
        } catch (error) {
            console.error("Lỗi xóa:", error);
            ThongBao.ThongBao_CanhBao('Lỗi hệ thống khi xóa');
        }
    }
    setOpenMenuId(null); // Đóng menu ellipsis
};

    if (!data || data.length === 0) return null;

    return (
        <>
            {data.map((post) => (
                <article key={post.id} className="bg-white rounded-xl shadow-sm overflow-visible mb-6 border border-gray-100 text-left"> 
                    {/* Header */}
                    <div className="p-4 flex justify-between items-center relative">
                        <div className="flex items-center gap-3">
                            <img src={post.authorAvatar || "https://i.pravatar.cc/150"} className="w-10 h-10 rounded-full border" alt="Author" />
                            <div>
                                <h4 className="font-bold text-sm hover:underline cursor-pointer">{post.author}</h4>
                                <p className="text-xs text-gray-500">{post.time} <i className="fa-solid fa-earth-asia"></i></p>
                            </div>
                        </div>

                        <div className="relative">
                            <button 
                                onClick={(e) => toggleMenu(e, post.id)}
                                className={`w-8 h-8 rounded-full flex items-center justify-center transition ${openMenuId === post.id ? 'bg-red-50 text-red-600' : 'text-gray-400 hover:bg-gray-100'}`}
                            >
                                <i className="fa-solid fa-ellipsis"></i>
                            </button>

                            {openMenuId === post.id && (
                                <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-xl border border-gray-100 z-50 animate-fade-in py-1 overflow-hidden">
                                    {/* NÚT CHỈNH SỬA MỚI THÊM */}
                                    <button onClick={(e) => openEditModal(e, post)} className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition">
                                        <i className="fa-regular fa-pen-to-square w-5"></i> Chỉnh sửa bài viết
                                    </button>

                                    <button onClick={handleHide} className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition">
                                        <i className="fa-regular fa-eye-slash w-5"></i> Ẩn bài viết
                                    </button>
                                    
                                    <button onClick={(e) => e.stopPropagation()} className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-orange-600 flex items-center gap-3 transition">
                                        <i className="fa-regular fa-flag w-5"></i> Báo cáo
                                    </button>

                                    <div className="border-t border-gray-100 my-1"></div>

                                    <button onClick={(e) => handleDelete(e, post.id)} className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 font-medium flex items-center gap-3 transition">
                                        <i className="fa-regular fa-trash-can w-5"></i> Xóa bài viết
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="px-4 pb-3">
                        <h3 className="font-bold text-lg mb-1">{post.title}</h3>
                        <p className="text-sm text-gray-600 line-clamp-3">{post.content}</p>
                    </div>

                    {/* Image */}
                    <div className="block overflow-hidden" onClick={() => navigate(`/recipes/${post.id}`)}>
                        <img 
                            src={post.image} 
                            alt="Food"
                            className="w-full h-80 object-cover hover:scale-105 transition duration-500 cursor-pointer" 
                        />
                    </div>

                    {/* Action Bar */}
                    <div className="px-4 py-3 border-t border-gray-100 flex justify-between items-center">
                        <div className="flex gap-6">
                            <div className="flex items-center gap-2">
                                <button className="text-gray-500 hover:text-red-600 transition p-1"><i className="fa-regular fa-thumbs-up text-xl"></i></button>
                                <button onClick={() => setModalData({ title: 'Người đã thích', users: post.likedBy || [] })} className="text-sm font-semibold text-gray-700 hover:underline">
                                    {post.likes} lượt thích
                                </button>
                            </div>
                            <button onClick={() => setOpenPostId(openPostId === post.id ? null : post.id)} className={`flex items-center gap-2 transition ${openPostId === post.id ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}>
                                <i className={`${openPostId === post.id ? 'fa-solid' : 'fa-regular'} fa-comment text-xl`}></i>
                                <span className="text-sm font-semibold">{post.commentCount}</span>
                            </button>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={() => setModalData({ title: 'Đã lưu yêu thích', users: post.savedBy || [] })} className="text-sm font-semibold text-gray-700 hover:underline">
                                {post.saves || 0} đã lưu
                            </button>
                            <button className="text-gray-500 hover:text-orange-500 transition p-1"><i className="fa-regular fa-bookmark text-xl"></i></button>
                        </div>
                    </div>

                    <div className="px-4 pb-2">
                        <button onClick={() => navigate(`/recipes/${post.id}`)} className="w-full py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 text-sm font-medium rounded-lg transition">
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

            {/* MODAL DANH SÁCH USER (LIKE/SAVE) */}
            {modalData && (
                <UserListModal title={modalData.title} users={modalData.users} onClose={() => setModalData(null)} />
            )}

            {/* --- MODAL CHỈNH SỬA BÀI VIẾT (Giao diện chuẩn Modal hệ thống) --- */}
            {isEditModalOpen && editingPost && (
                <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-zoom-in">
                        <div className="flex justify-between items-center p-4 border-b bg-gray-50">
                            <h3 className="font-bold text-lg text-gray-800 text-left">Chỉnh sửa bài viết</h3>
                            <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition">
                                <i className="fa-solid fa-xmark text-xl"></i>
                            </button>
                        </div>
                        
                        <form onSubmit={handleUpdate} className="p-4 space-y-4 text-left">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Tiêu đề bài viết</label>
                                <input 
                                    type="text"
                                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none transition"
                                    value={editingPost.title}
                                    onChange={(e) => setEditingPost({...editingPost, title: e.target.value})}
                                    required
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Nội dung công thức</label>
                                <textarea 
                                    className="w-full border rounded-lg px-4 py-2 h-32 focus:ring-2 focus:ring-orange-500 outline-none transition resize-none"
                                    value={editingPost.content}
                                    onChange={(e) => setEditingPost({...editingPost, content: e.target.value})}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Hình ảnh hiện tại</label>
                                <div className="flex items-center gap-4">
                                    <img 
                                        src={editingPost.previewUrl} 
                                        className="w-20 h-20 object-cover rounded-lg border shadow-sm" 
                                        alt="preview" 
                                    />
                                    <input 
                                        type="file" 
                                        className="text-xs file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 cursor-pointer"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if(file) {
                                                setEditingPost({
                                                    ...editingPost, 
                                                    imageFile: file, 
                                                    previewUrl: URL.createObjectURL(file)
                                                });
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button type="submit" className="flex-1 bg-orange-500 text-white font-bold py-2.5 rounded-xl hover:bg-orange-600 transition shadow-lg shadow-orange-200">
                                    Lưu thay đổi
                                </button>
                                <button 
                                    type="button" 
                                    onClick={() => setIsEditModalOpen(false)} 
                                    className="flex-1 bg-gray-100 text-gray-700 font-bold py-2.5 rounded-xl hover:bg-gray-200 transition"
                                >
                                    Hủy bỏ
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default BaiViet;
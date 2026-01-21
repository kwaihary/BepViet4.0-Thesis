import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import * as API from '../../JS/API/API';
import * as ThongBao from '../../JS/FUNCTION/ThongBao';

const STORAGE_URL = "http://127.0.0.1:8000/storage/";

// --- 1. HÀM TRỢ GIÚP ---
const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    if (diff < 60) return 'Vừa xong';
    if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
    return date.toLocaleDateString('vi-VN');
};

// --- 2. COMPONENT CON: MODAL DANH SÁCH USER ---
const UserListModal = ({ title, users, onClose }) => {
    if (!users) return null;
    return (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden animate-scale-in">
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="font-bold text-lg">{title}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <i className="fa-solid fa-xmark text-xl"></i>
                    </button>
                </div>
                <div className="max-h-80 overflow-y-auto p-2">
                    {users.length > 0 ? (
                        users.map((user, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                                <img src={user.avatar} className="w-10 h-10 rounded-full border" alt="" />
                                <span className="font-semibold text-sm">{user.name}</span>
                            </div>
                        ))
                    ) : <p className="text-center py-4 text-gray-500 italic">Trống</p>}
                </div>
            </div>
        </div>
    );
};

// --- 3. COMPONENT CON: ITEM BÌNH LUẬN ---
const CommentItem = ({ comment }) => {
    const userAvatar = comment.user?.avatar ? STORAGE_URL + comment.user.avatar : "https://via.placeholder.com/150";
    return (
        <div className="flex gap-3 mb-4 text-left animate-fade-in">
            <img src={userAvatar} className="w-8 h-8 rounded-full object-cover shrink-0 mt-1" alt="avatar" />
            <div className="flex-1">
                <div className="bg-gray-100 px-3 py-2 rounded-2xl rounded-tl-none inline-block">
                    <h5 className="font-bold text-xs text-gray-900">{comment.user?.name || "Ẩn danh"}</h5>
                    <p className="text-sm text-gray-700">{comment.content}</p>
                </div>
                <div className="flex gap-4 mt-1 ml-2 text-[10px] font-bold text-gray-500">
                    <span className="hover:text-orange-600 cursor-pointer">Thích</span>
                    <span className="hover:text-orange-600 cursor-pointer">Phản hồi</span>
                    <span>{formatTime(comment.created_at)}</span>
                </div>
            </div>
        </div>
    );
};

// --- 4. COMPONENT CHÍNH ---
function BaiViet({ data, onSaveSuccess }) {
    const navigate = useNavigate();
    const [openPostId, setOpenPostId] = useState(null);
    const [openMenuId, setOpenMenuId] = useState(null);
    const [savedIds, setSavedIds] = useState([]);
    const [modalData, setModalData] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState(null);

    useEffect(() => {
        const savedLocal = JSON.parse(localStorage.getItem('mon_da_luu')) || [];
        setSavedIds(savedLocal.map(item => item.id));

        const closeAll = () => setOpenMenuId(null);
        window.addEventListener("click", closeAll);
        return () => window.removeEventListener("click", closeAll);
    }, []);

    const handleSave = (e, post) => {
        e.stopPropagation();
        const savedLocal = JSON.parse(localStorage.getItem('mon_da_luu')) || [];
        const index = savedLocal.findIndex(item => item.id === post.id);
        let newList;

        if (index !== -1) {
            newList = savedLocal.filter(item => item.id !== post.id);
            ThongBao.ThongBao_ThanhCong('Đã bỏ lưu');
        } else {
            newList = [...savedLocal, post];
            ThongBao.ThongBao_ThanhCong('Đã lưu thành công');
        }
        localStorage.setItem('mon_da_luu', JSON.stringify(newList));
        setSavedIds(newList.map(item => item.id));
        if (onSaveSuccess) onSaveSuccess();
    };

    const handleDelete = async (e, postId) => {
        e.stopPropagation();
        const confirm = await Swal.fire({
            title: 'Xác nhận xóa?',
            text: "Hành động này không thể hoàn tác!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444'
        });

        if (confirm.isConfirmed) {
            const res = await API.CallAPI(undefined, { PhuongThuc: 3, url: `recipes/${postId}` });
            if (res.status) {
                ThongBao.ThongBao_ThanhCong('Đã xóa bài viết');
                window.location.reload();
            }
        }
    };

    if (!data || data.length === 0) return (
        <div className="bg-white p-10 rounded-xl text-center border">
            <p className="text-gray-400">Chưa có bài viết nào ở đây.</p>
        </div>
    );

    return (
        <>
            {data.map((post) => {
                const authorAvatar = post.author?.avatar ? STORAGE_URL + post.author.avatar : "https://via.placeholder.com/150";
                const postImage = post.image_url ? STORAGE_URL + post.image_url : "https://via.placeholder.com/600x400";

                return (
                    <article key={post.id} className="bg-white rounded-xl shadow-sm mb-6 border border-gray-100 overflow-visible text-left">
                        {/* Header */}
                        <div className="p-4 flex justify-between items-center relative">
                            <div className="flex items-center gap-3">
                                <img src={authorAvatar} className="w-10 h-10 rounded-full object-cover border" alt="" />
                                <div>
                                    <h4 className="font-bold text-sm hover:underline cursor-pointer">{post.author?.name || "Người dùng"}</h4>
                                    <p className="text-xs text-gray-400">{formatTime(post.created_at)} • <i className="fa-solid fa-earth-asia"></i></p>
                                </div>
                            </div>
                            <div className="relative">
                                <button onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === post.id ? null : post.id); }} className="w-8 h-8 rounded-full hover:bg-gray-100">
                                    <i className="fa-solid fa-ellipsis text-gray-400"></i>
                                </button>
                                {openMenuId === post.id && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-xl border rounded-xl z-50 py-1 overflow-hidden animate-scale-in">
                                        <button onClick={() => { setEditingPost(post); setIsEditModalOpen(true); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2">
                                            <i className="fa-regular fa-pen-to-square"></i> Chỉnh sửa
                                        </button>
                                        <button onClick={(e) => handleDelete(e, post.id)} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                                            <i className="fa-regular fa-trash-can"></i> Xóa bài viết
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="px-4 pb-3">
                            <h3 className="font-bold text-lg mb-1">{post.title}</h3>
                            <p className="text-sm text-gray-600 line-clamp-3">{post.description || post.content}</p>
                        </div>

                        {/* Image */}
                        <div className="cursor-pointer overflow-hidden bg-gray-50" onClick={() => navigate(`/ChiTietMonAn/${post.id}`)}>
                            <img src={postImage} className="w-full h-80 object-cover hover:scale-105 transition duration-500" alt="post" />
                        </div>

                        {/* Actions */}
                        <div className="px-4 py-3 border-t flex justify-between items-center">
                            <div className="flex gap-6">
                                <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition">
                                    <i className="fa-regular fa-heart text-xl"></i>
                                    <span className="text-sm font-bold">{post.interactions_count || 0}</span>
                                </button>
                                <button onClick={() => setOpenPostId(openPostId === post.id ? null : post.id)} className={`flex items-center gap-2 ${openPostId === post.id ? 'text-blue-600' : 'text-gray-500'}`}>
                                    <i className="fa-regular fa-comment text-xl"></i>
                                    <span className="text-sm font-bold">{post.comments_count || 0}</span>
                                </button>
                            </div>
                            <button onClick={(e) => handleSave(e, post)} className="p-1">
                                <i className={`${savedIds.includes(post.id) ? 'fa-solid text-orange-500' : 'fa-regular text-gray-400'} fa-bookmark text-xl`}></i>
                            </button>
                        </div>

                        {/* Comments Section */}
                        {openPostId === post.id && (
                            <div className="bg-gray-50 p-4 border-t animate-fade-in">
                                <div className="flex gap-3 mb-4">
                                    <img src="https://ui-avatars.com/api/?name=User" className="w-8 h-8 rounded-full" alt="" />
                                    <input type="text" placeholder="Viết bình luận..." className="flex-1 bg-white border rounded-full px-4 py-1.5 text-sm focus:outline-orange-500" />
                                </div>
                                {post.comments?.map(cmt => <CommentItem key={cmt.id} comment={cmt} />)}
                            </div>
                        )}
                    </article>
                );
            })}

            {/* Modal chỉnh sửa (Tóm tắt) */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6">
                        <h2 className="text-xl font-bold mb-4">Chỉnh sửa bài viết</h2>
                        <input className="w-full border p-2 rounded mb-3" value={editingPost?.title} onChange={(e) => setEditingPost({...editingPost, title: e.target.value})} />
                        <textarea className="w-full border p-2 rounded h-32 mb-4" value={editingPost?.content || editingPost?.description} onChange={(e) => setEditingPost({...editingPost, content: e.target.value})} />
                        <div className="flex gap-2">
                            <button className="flex-1 bg-orange-500 text-white py-2 rounded-lg font-bold">Lưu</button>
                            <button onClick={() => setIsEditModalOpen(false)} className="flex-1 bg-gray-200 py-2 rounded-lg font-bold">Hủy</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default BaiViet;
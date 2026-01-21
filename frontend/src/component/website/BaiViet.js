import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import moment from 'moment'; // Cần cài: npm install moment (hoặc dùng hàm tự viết bên dưới)
import 'moment/locale/vi'; // Import tiếng Việt cho moment

// Cấu hình đường dẫn ảnh (Giống bên ChiTietMonAn)
const STORAGE_URL = "http://127.0.0.1:8000/storage/";

// --- 1. HÀM FORMAT THỜI GIAN (Dùng thay moment nếu chưa cài) ---
const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000); // giây

    if (diff < 60) return 'Vừa xong';
    if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
    if (diff < 259200) return `${Math.floor(diff / 86400)} ngày trước`;
    return date.toLocaleDateString('vi-VN');
};

// --- 2. COMPONENT BÌNH LUẬN (Đã sửa theo Model Comment) ---
const CommentItem = ({ comment }) => {
    // Xử lý avatar user bình luận
    const userAvatar = comment.user?.avatar 
        ? STORAGE_URL + comment.user.avatar 
        : "https://via.placeholder.com/150";

    return (
        <div className="flex gap-3 mb-4 animate-fade-in">
            <img 
                src={userAvatar} 
                className="w-8 h-8 rounded-full object-cover shrink-0 mt-1 border border-gray-200" 
                alt={comment.user?.name || "User"} 
            />
            <div className="flex-1">
                <div className="bg-gray-100 px-3 py-2 rounded-2xl rounded-tl-none inline-block">
                    <h5 className="font-bold text-sm text-gray-900">
                        {comment.user?.name || "Người dùng ẩn danh"}
                    </h5>
                    <p className="text-gray-700 text-sm whitespace-pre-wrap">{comment.content}</p>
                </div>
                
                <div className="flex gap-4 mt-1 ml-2 text-xs font-semibold text-gray-500 mb-2">
                    <span className="cursor-pointer hover:text-red-600">Thích</span>
                    <span className="cursor-pointer hover:text-red-600">Phản hồi</span>
                    <span>{formatTime(comment.created_at)}</span>
                </div>

                {/* Đệ quy hiển thị phản hồi (replies) nếu có */}
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

// --- 3. MAIN COMPONENT: BaiViet ---
function BaiViet({ data }) {
    const [openPostId, setOpenPostId] = useState(null); // ID bài viết đang mở bình luận
    const [openMenuId, setOpenMenuId] = useState(null); // ID bài viết đang mở menu 3 chấm
    
    const navigate = useNavigate();

    // Đóng menu khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = () => setOpenMenuId(null);
        window.addEventListener("click", handleClickOutside);
        return () => window.removeEventListener("click", handleClickOutside);
    }, []);

    const toggleMenu = (e, id) => {
        e.stopPropagation();
        setOpenMenuId(openMenuId === id ? null : id);
    };

    // --- Các hàm xử lý hành động (Giữ nguyên logic cũ) ---
    const handleHide = (e) => {
        e.stopPropagation();
        Swal.fire('Đã ẩn!', 'Bài viết đã được ẩn khỏi bảng tin.', 'success');
        setOpenMenuId(null);
    };

    const handleDelete = (e, id) => {
        e.stopPropagation();
        Swal.fire({
            title: 'Bạn chắc chắn chứ?',
            text: "Bài viết sẽ bị xóa vĩnh viễn!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xóa ngay',
            cancelButtonText: 'Hủy',
            confirmButtonColor: '#d33',
        }).then((result) => {
            if (result.isConfirmed) {
                // Gọi API xóa bài viết ở đây (POST /api/recipes/delete/{id})
                console.log("Delete recipe ID:", id);
                Swal.fire('Đã xóa!', 'Bài viết đã bị xóa.', 'success');
            }
        });
        setOpenMenuId(null);
    };

    const toggleComments = (postId) => {
        setOpenPostId(openPostId === postId ? null : postId);
    };

    // Kiểm tra dữ liệu đầu vào
    if (!data || data.length === 0) {
        return (
            <div className="bg-white p-8 rounded-xl shadow-sm text-center border border-gray-100">
                <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-state-2130362-1800926.png" alt="Empty" className="w-40 mx-auto opacity-50 mb-4"/>
                <p className="text-gray-500 font-medium">Chưa có bài viết nào. Hãy là người đầu tiên chia sẻ công thức!</p>
            </div>
        );
    }

    return (
        <>
            {data.map((recipe) => {
                // Xử lý dữ liệu an toàn trước khi render
                const authorName = recipe.author?.name || "Người dùng";
                const authorAvatar = recipe.author?.avatar 
                    ? STORAGE_URL + recipe.author.avatar 
                    : "https://via.placeholder.com/150";
                
                const recipeImage = recipe.image_url 
                    ? STORAGE_URL + recipe.image_url 
                    : "https://via.placeholder.com/600x400";
                
                const likesCount = recipe.interactions 
                    ? recipe.interactions.filter(i => i.type === 'like').length // Giả sử model Interaction có cột 'type'
                    : (recipe.interactions_count || 0); // Hoặc dùng count từ backend trả về

                const commentsCount = recipe.comments ? recipe.comments.length : (recipe.comments_count || 0);

                return (
                    <article key={recipe.id} className="bg-white rounded-xl shadow-sm overflow-hidden mb-6 border border-gray-100 transition hover:shadow-md overflow-visible"> 
                        
                        {/* --- HEADER --- */}
                        <div className="p-4 flex justify-between items-center relative">
                            <div className="flex items-center gap-3">
                                <Link to={`/HoSo-NguoiDung/${recipe.user_id}`}>
                                    <img src={authorAvatar} className="w-10 h-10 rounded-full border border-gray-200 object-cover" alt={authorName} />
                                </Link>
                                <div>
                                    <Link to={`/HoSo-NguoiDung/${recipe.user_id}`} className="font-bold text-sm text-gray-800 hover:text-orange-600 hover:underline transition">
                                        {authorName}
                                    </Link>
                                    <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                                        <span>{formatTime(recipe.created_at)}</span>
                                        <span>•</span>
                                        <i className="fa-solid fa-earth-americas"></i>
                                        {recipe.difficulty && (
                                            <>
                                                <span>•</span>
                                                <span className={`capitalize font-medium ${
                                                    recipe.difficulty === 'easy' ? 'text-green-500' : 
                                                    recipe.difficulty === 'medium' ? 'text-yellow-500' : 'text-red-500'
                                                }`}>
                                                    {recipe.difficulty === 'easy' ? 'Dễ' : recipe.difficulty === 'medium' ? 'Trung bình' : 'Khó'}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Menu 3 chấm */}
                            <div className="relative">
                                <button 
                                    onClick={(e) => toggleMenu(e, recipe.id)}
                                    className={`w-8 h-8 rounded-full flex items-center justify-center transition ${openMenuId === recipe.id ? 'bg-orange-50 text-orange-600' : 'text-gray-400 hover:bg-gray-100'}`}
                                >
                                    <i className="fa-solid fa-ellipsis"></i>
                                </button>

                                {openMenuId === recipe.id && (
                                    <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-50 animate-scale-in origin-top-right py-1 overflow-hidden">
                                        <button onClick={handleHide} className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition">
                                            <i className="fa-regular fa-eye-slash w-4"></i> Ẩn bài viết
                                        </button>
                                        <button onClick={(e) => handleDelete(e, recipe.id)} className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 font-medium flex items-center gap-3 transition">
                                            <i className="fa-regular fa-trash-can w-4"></i> Xóa bài viết
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* --- CONTENT --- */}
                        <div className="px-4 pb-3">
                            <Link to={`/ChiTietMonAn/${recipe.id}`}>
                                <h3 className="font-bold text-lg mb-2 text-gray-800 hover:text-orange-600 transition line-clamp-2">
                                    {recipe.title}
                                </h3>
                            </Link>
                            <p className="text-sm text-gray-600 line-clamp-3 mb-1 whitespace-pre-line">
                                {recipe.description}
                            </p>
                            
                            {/* Tags / Categories (Nếu có dữ liệu categories) */}
                            {recipe.categories && recipe.categories.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {recipe.categories.slice(0, 3).map(cat => (
                                        <span key={cat.id} className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                                            #{cat.name}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* --- IMAGE --- */}
                        <Link to={`/ChiTietMonAn/${recipe.id}`} className="block overflow-hidden bg-gray-100 relative group">
                            <img 
                                src={recipeImage} 
                                alt={recipe.title}
                                className="w-full h-[400px] object-cover transition duration-700 group-hover:scale-105" 
                                loading="lazy"
                            />
                            {/* Overlay thời gian nấu */}
                            {recipe.cook_time > 0 && (
                                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                                    <i className="fa-regular fa-clock"></i> {recipe.cook_time} phút
                                </div>
                            )}
                        </Link>

                        {/* --- ACTION BAR --- */}
                        <div className="px-4 py-3 border-t border-gray-100 flex justify-between items-center">
                            <div className="flex gap-6">
                                {/* Nút Like */}
                                <div className="flex items-center gap-2 group cursor-pointer">
                                    <button className="text-gray-500 group-hover:text-red-500 transition-transform active:scale-125 p-1">
                                        <i className="fa-regular fa-heart text-2xl"></i>
                                    </button>
                                    <span className="text-sm font-semibold text-gray-700">
                                        {likesCount}
                                    </span>
                                </div>

                                {/* Nút Comment */}
                                <button 
                                    onClick={() => toggleComments(recipe.id)} 
                                    className={`flex items-center gap-2 transition ${openPostId === recipe.id ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}
                                >
                                    <i className={`${openPostId === recipe.id ? 'fa-solid' : 'fa-regular'} fa-comment text-2xl`}></i>
                                    <span className="text-sm font-semibold">{commentsCount}</span>
                                </button>
                            </div>

                            {/* Nút Save */}
                            <div className="flex items-center gap-4">
                                <button className="text-gray-400 hover:text-orange-500 transition">
                                    <i className="fa-regular fa-bookmark text-xl"></i>
                                </button>
                            </div>
                        </div>

                        {/* --- NÚT XEM CHI TIẾT --- */}
                        <div className="px-4 pb-3">
                            <button 
                                onClick={() => navigate(`/ChiTietMonAn/${recipe.id}`)} 
                                className="w-full py-2.5 bg-gray-50 hover:bg-orange-50 text-gray-600 hover:text-orange-600 text-sm font-bold rounded-xl transition flex items-center justify-center gap-2 group"
                            >
                                <span>Xem công thức chi tiết</span>
                                <i className="fa-solid fa-arrow-right transition-transform group-hover:translate-x-1"></i>
                            </button>
                        </div>

                        {/* --- COMMENTS SECTION --- */}
                        {openPostId === recipe.id && (
                            <div className="bg-gray-50 p-4 border-t border-gray-200 animate-fade-in-down">
                                {/* Input bình luận */}
                                <div className="flex gap-3 mb-5">
                                    <img src="https://ui-avatars.com/api/?name=Me&background=random" className="w-9 h-9 rounded-full border border-gray-300" alt="Me" />
                                    <div className="flex-1 relative">
                                        <input 
                                            type="text" 
                                            placeholder="Viết bình luận của bạn..." 
                                            className="w-full bg-white border border-gray-300 rounded-2xl px-4 py-2 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 pr-10 shadow-sm transition" 
                                        />
                                        <button className="absolute right-2 top-1.5 text-orange-500 hover:bg-orange-50 p-1.5 rounded-full transition">
                                            <i className="fa-solid fa-paper-plane"></i>
                                        </button>
                                    </div>
                                </div>

                                {/* Danh sách bình luận */}
                                <div className="space-y-1 max-h-96 overflow-y-auto pr-1 custom-scrollbar">
                                    {recipe.comments && recipe.comments.length > 0 ? (
                                        // Chỉ render các bình luận cha (parent_id === null)
                                        // Nếu backend trả về dạng cây (nested) thì dùng map trực tiếp
                                        // Nếu backend trả về dạng phẳng (flat), cần filter parent_id == null
                                        recipe.comments
                                            .filter(c => c.parent_id === null) 
                                            .map(cmt => <CommentItem key={cmt.id} comment={cmt} />)
                                    ) : (
                                        <div className="text-center py-4">
                                            <p className="text-gray-400 text-sm italic">Chưa có bình luận nào. Hãy là người đầu tiên!</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </article>
                );
            })}
        </>
    );
}

export default BaiViet;
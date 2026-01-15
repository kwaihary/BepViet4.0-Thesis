import { useState } from "react";

function DuLieuBaiDang() {
    // --- STATE ---
    const [activeTab, setActiveTab] = useState("pending"); // pending, approved, rejected
    const [selectedPost, setSelectedPost] = useState(null); // Bài viết đang xem chi tiết
    const [filterCategory, setFilterCategory] = useState("all");

    // Mock Data: Danh sách bài viết
    const [posts, setPosts] = useState([
        {
            id: 1,
            title: "Canh chua cá lóc chuẩn miền Tây",
            author: "Nguyễn Văn A",
            authorAvatar: "https://ui-avatars.com/api/?name=NV&background=random",
            category: "Món canh",
            image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=300",
            submittedDate: "10:30 - 12/05/2023",
            status: "pending",
            description: "Món canh chua đậm đà hương vị quê hương, cá không bị tanh...",
            ingredients: ["Cá lóc: 500g", "Bạc hà, đậu bắp", "Me chua", "Rau om, ngò gai"],
            steps: ["Bước 1: Sơ chế cá...", "Bước 2: Nấu nước dùng...", "Bước 3: Nêm nếm..."]
        },
        {
            id: 2,
            title: "Sườn xào chua ngọt",
            author: "Lê Thị B",
            authorAvatar: "https://ui-avatars.com/api/?name=LB&background=random",
            category: "Món mặn",
            image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=300",
            submittedDate: "09:15 - 12/05/2023",
            status: "pending",
            description: "Cách làm sườn mềm, thấm vị, màu đẹp mắt.",
            ingredients: ["Sườn non: 500g", "Giấm, đường, tỏi", "Ớt chuông"],
            steps: ["Sườn luộc sơ", "Pha sốt chua ngọt", "Xào sườn"]
        },
        {
            id: 3,
            title: "Chè dưỡng nhan tuyết yến",
            author: "Trần C",
            authorAvatar: "https://ui-avatars.com/api/?name=TC&background=random",
            category: "Tráng miệng",
            image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=300",
            submittedDate: "Yesterday",
            status: "approved",
            description: "",
            ingredients: [],
            steps: []
        },
        {
            id: 4,
            title: "Cách luộc trứng (Bài viết test)",
            author: "User Spam",
            authorAvatar: "https://ui-avatars.com/api/?name=US&background=random",
            category: "Mẹo vặt",
            image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&q=80&w=300",
            submittedDate: "Yesterday",
            status: "rejected",
            note: "Nội dung quá sơ sài, hình ảnh không rõ nét.",
            description: "",
            ingredients: [],
            steps: []
        }
    ]);

    // --- LOGIC ---
    // Filter
    const filteredPosts = posts.filter(post => {
        const matchTab = post.status === activeTab;
        const matchCategory = filterCategory === "all" || post.category === filterCategory;
        return matchTab && matchCategory;
    });

    // Handle Actions
    const handleApprove = (id) => {
        setPosts(posts.map(p => p.id === id ? { ...p, status: "approved" } : p));
        if (selectedPost?.id === id) setSelectedPost(null);
        // Show notification/toast here
    };

    const handleReject = (id) => {
        const reason = prompt("Nhập lý do từ chối bài viết này:");
        if (reason) {
            setPosts(posts.map(p => p.id === id ? { ...p, status: "rejected", note: reason } : p));
            if (selectedPost?.id === id) setSelectedPost(null);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans flex text-gray-800">
            


            {/* --- MAIN CONTENT --- */}
            <main className="flex-1 p-8 overflow-y-auto h-screen">
                
                {/* Header */}
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Quản lý bài đăng</h1>
                        <p className="text-gray-500 text-sm mt-1">Kiểm duyệt và quản lý nội dung công thức nấu ăn.</p>
                    </div>
                    <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 flex items-center gap-2 shadow-sm">
                        <i className="fa-solid fa-rotate-right"></i> Làm mới
                    </button>
                </header>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Chờ duyệt</p>
                            <h3 className="text-3xl font-bold text-emerald-600 mt-1">{posts.filter(p => p.status === 'pending').length}</h3>
                        </div>
                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                            <i className="fa-regular fa-clock"></i>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Đã duyệt hôm nay</p>
                            <h3 className="text-3xl font-bold text-gray-800 mt-1">18</h3>
                        </div>
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                            <i className="fa-solid fa-check"></i>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Bị từ chối</p>
                            <h3 className="text-3xl font-bold text-red-500 mt-1">2</h3>
                        </div>
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                            <i className="fa-solid fa-ban"></i>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden min-h-[500px]">
                    
                    {/* Toolbar */}
                    <div className="border-b border-gray-200 px-6 py-4 flex flex-col sm:flex-row gap-4 justify-between bg-gray-50/50">
                        {/* Tabs */}
                        <div className="flex bg-gray-200 p-1 rounded-lg self-start">
                            <button 
                                onClick={() => setActiveTab("pending")}
                                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === 'pending' ? 'bg-white text-emerald-700 shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}
                            >Chờ duyệt</button>
                            <button 
                                onClick={() => setActiveTab("approved")}
                                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === 'approved' ? 'bg-white text-emerald-700 shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}
                            >Đã đăng</button>
                            <button 
                                onClick={() => setActiveTab("rejected")}
                                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === 'rejected' ? 'bg-white text-red-700 shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}
                            >Từ chối</button>
                        </div>

                        {/* Filter Categories */}
                        <div className="flex gap-2">
                             <select 
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-emerald-500 text-gray-700"
                            >
                                <option value="all">Tất cả danh mục</option>
                                <option value="Món canh">Món canh</option>
                                <option value="Món mặn">Món mặn</option>
                                <option value="Tráng miệng">Tráng miệng</option>
                            </select>
                            <div className="relative">
                                <input type="text" placeholder="Tìm tên bài viết..." className="pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-emerald-500 w-64"/>
                                <i className="fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-gray-400 text-sm"></i>
                            </div>
                        </div>
                    </div>

                    {/* Content List (Grid/Table Hybrid) */}
                    <div className="p-0">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold tracking-wider border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 w-[40%]">Bài viết</th>
                                    <th className="px-6 py-4">Tác giả</th>
                                    <th className="px-6 py-4">Danh mục</th>
                                    <th className="px-6 py-4">Thời gian</th>
                                    <th className="px-6 py-4 text-center">Hành động</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredPosts.map((post) => (
                                    <tr key={post.id} className="hover:bg-emerald-50/20 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex gap-4 items-start">
                                                <img src={post.image} className="w-20 h-16 object-cover rounded-lg border border-gray-200" alt="Thumbnail" />
                                                <div>
                                                    <h4 className="font-bold text-gray-800 text-sm line-clamp-2 hover:text-emerald-600 cursor-pointer" onClick={() => setSelectedPost(post)}>{post.title}</h4>
                                                    {post.status === 'rejected' && <p className="text-xs text-red-500 mt-1 italic">Lý do: {post.note}</p>}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <img src={post.authorAvatar} className="w-6 h-6 rounded-full" />
                                                <span className="text-sm font-medium text-gray-700">{post.author}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-block px-2 py-1 rounded border border-gray-200 bg-gray-50 text-xs font-medium text-gray-600">
                                                {post.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {post.submittedDate}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {activeTab === 'pending' ? (
                                                <div className="flex justify-center gap-2">
                                                    <button 
                                                        onClick={() => setSelectedPost(post)}
                                                        className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 flex items-center justify-center transition-colors" title="Xem chi tiết"
                                                    >
                                                        <i className="fa-solid fa-eye text-sm"></i>
                                                    </button>
                                                    <button 
                                                        onClick={() => handleApprove(post.id)}
                                                        className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-colors" title="Duyệt nhanh"
                                                    >
                                                        <i className="fa-solid fa-check text-sm"></i>
                                                    </button>
                                                    <button 
                                                        onClick={() => handleReject(post.id)}
                                                        className="w-8 h-8 rounded-full bg-red-100 text-red-600 hover:bg-red-600 hover:text-white flex items-center justify-center transition-colors" title="Từ chối"
                                                    >
                                                        <i className="fa-solid fa-xmark text-sm"></i>
                                                    </button>
                                                </div>
                                            ) : (
                                                <button onClick={() => setSelectedPost(post)} className="text-sm font-medium text-emerald-600 hover:underline">Xem lại</button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                {filteredPosts.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-gray-400">
                                            Không có bài viết nào.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {/* --- PREVIEW MODAL --- */}
            {selectedPost && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setSelectedPost(null)}></div>
                    
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] z-10 overflow-hidden flex flex-col animate-fade-in-up">
                        {/* Modal Header */}
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 shrink-0">
                            <div>
                                <h3 className="font-bold text-lg text-gray-800">Chi tiết bài đăng</h3>
                                <p className="text-xs text-gray-500">ID: #{selectedPost.id} • Trạng thái: <span className="uppercase font-bold text-emerald-600">{selectedPost.status}</span></p>
                            </div>
                            <button onClick={() => setSelectedPost(null)} className="w-8 h-8 rounded-full bg-white border border-gray-200 hover:bg-gray-100 flex items-center justify-center">
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>

                        {/* Modal Body (Scrollable) */}
                        <div className="overflow-y-auto flex-1 p-0 flex flex-col md:flex-row">
                            {/* Left: Image & Meta */}
                            <div className="w-full md:w-1/3 bg-gray-50 p-6 border-r border-gray-100">
                                <img src={selectedPost.image} className="w-full aspect-square object-cover rounded-xl shadow-sm mb-4" />
                                
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-200">
                                        <img src={selectedPost.authorAvatar} className="w-10 h-10 rounded-full" />
                                        <div>
                                            <p className="text-xs text-gray-500">Người đăng</p>
                                            <p className="font-bold text-sm text-gray-800">{selectedPost.author}</p>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <p className="text-xs font-bold text-gray-500 uppercase mb-1">Mô tả ngắn</p>
                                        <p className="text-sm text-gray-600 italic">"{selectedPost.description}"</p>
                                    </div>

                                    <div>
                                        <p className="text-xs font-bold text-gray-500 uppercase mb-1">Danh mục</p>
                                        <span className="inline-block px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded">{selectedPost.category}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Content */}
                            <div className="w-full md:w-2/3 p-6">
                                <h1 className="text-2xl font-bold text-gray-900 mb-6">{selectedPost.title}</h1>
                                
                                {/* Ingredients */}
                                <div className="mb-6">
                                    <h3 className="font-bold text-gray-800 text-lg mb-3 flex items-center gap-2">
                                        <i className="fa-solid fa-basket-shopping text-emerald-500"></i> Nguyên liệu
                                    </h3>
                                    <ul className="grid grid-cols-2 gap-2">
                                        {selectedPost.ingredients && selectedPost.ingredients.map((item, idx) => (
                                            <li key={idx} className="text-sm text-gray-700 flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> {item}
                                            </li>
                                        ))}
                                        {(!selectedPost.ingredients || selectedPost.ingredients.length === 0) && <p className="text-gray-400 text-sm italic">Không có dữ liệu</p>}
                                    </ul>
                                </div>

                                <div className="h-px bg-gray-100 my-6"></div>

                                {/* Steps */}
                                <div>
                                    <h3 className="font-bold text-gray-800 text-lg mb-3 flex items-center gap-2">
                                        <i className="fa-solid fa-fire-burner text-emerald-500"></i> Cách làm
                                    </h3>
                                    <div className="space-y-4">
                                        {selectedPost.steps && selectedPost.steps.map((step, idx) => (
                                            <div key={idx} className="flex gap-3">
                                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center mt-0.5">
                                                    {idx + 1}
                                                </div>
                                                <p className="text-sm text-gray-700 leading-relaxed">{step}</p>
                                            </div>
                                        ))}
                                         {(!selectedPost.steps || selectedPost.steps.length === 0) && <p className="text-gray-400 text-sm italic">Không có dữ liệu</p>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer (Actions) */}
                        {selectedPost.status === 'pending' && (
                            <div className="p-4 border-t border-gray-100 bg-white flex justify-end gap-3 shrink-0">
                                <button 
                                    onClick={() => handleReject(selectedPost.id)}
                                    className="px-6 py-2 rounded-lg bg-gray-100 text-gray-700 font-bold hover:bg-red-50 hover:text-red-600 transition-colors border border-gray-200"
                                >
                                    Từ chối
                                </button>
                                <button 
                                    onClick={() => handleApprove(selectedPost.id)}
                                    className="px-6 py-2 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-700 shadow-md transition-colors flex items-center gap-2"
                                >
                                    <i className="fa-solid fa-check"></i> Duyệt bài ngay
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default DuLieuBaiDang;
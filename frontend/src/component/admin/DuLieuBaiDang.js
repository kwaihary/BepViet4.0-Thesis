import { useState, useEffect, useMemo } from "react";
import * as API from '../../JS/API/API';
import { useModalContext } from '../../context/QuanLiModal';

const IMAGE_BASE_URL = "http://your-laravel-app.com/storage/"; 

function DuLieuBaiDang() {
    const [loading, setLoading] = useState(false);
    const [stats, setStats] = useState({}); 
    const [posts, setPosts] = useState([]); 
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const { OpenMoDal } = useModalContext();

   
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCategory, setFilterCategory] = useState("all");
    const [filterStatus, setFilterStatus] = useState("all");
    


     useEffect(()=>{
        setLoading(true);
        const ThongKe=async()=>{
            try {
                const data= await API.CallAPI(undefined,{PhuongThuc:2,url :'admin/laydl_thongke_bd'});
                if(data.status){
                    setStats(data.data);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Lỗi sãy ra:' + error);
                setLoading(false)
            } finally {
                setLoading(false)
            }
        }
        ThongKe();
    },[])

   
    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
            
                const res = await API.CallAPI(undefined, { PhuongThuc: 2, url: `admin/dl_bv?page=${currentPage}` });
                if (res.status) {
                    setPosts(res.data.data);
                    if(res.data.last_page) setTotalPages(res.data.last_page);
                }
            } catch (error) {
                console.error("Lỗi tải bài viết:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, [currentPage]);

    const processedPosts = useMemo(() => {
        return posts.filter(post => {
            const searchLower = searchTerm.toLowerCase();
            const matchSearch = 
                post.title.toLowerCase().includes(searchLower) || 
                post.author?.name?.toLowerCase().includes(searchLower);
            const matchCategory = filterCategory === "all" || 
                post.categories.some(cat => cat.name === filterCategory);
            const matchStatus = filterStatus === "all" || post.status === filterStatus;
            return matchSearch && matchCategory && matchStatus;
        });
    }, [posts, searchTerm, filterCategory, filterStatus]);

    const getStatusColor = (status) => {
        switch(status) {
            case 'Đã duyệt': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'Chờ duyệt': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'Đã xóa': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-gray-100 text-gray-600 border-gray-200';
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-800 md:p-10">
            
            <div className="max-w-7xl mx-auto mb-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Quản Lý Bài Đăng</h1>
                        <p className="text-slate-500 mt-1">Kiểm soát nội dung và công thức nấu ăn.</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard 
                        title="Đang chờ duyệt" 
                        value={stats.Cho_duyet} 
                        icon="fa-clock" 
                        color="text-amber-600" 
                        bg="bg-amber-50" 
                    />
                    <StatCard 
                        title="Đã duyệt" 
                        value={stats.xuli_homnay} 
                        icon="fa-check-circle" 
                        color="text-emerald-600" 
                        bg="bg-emerald-50" 
                    />
                    <StatCard 
                        title="Bị từ chối" 
                        value={stats.da_xoa} 
                        icon="fa-ban" 
                        color="text-red-600" 
                        bg="bg-red-50" 
                    />
                </div>
            </div>


            <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                
        
                <div className="p-6 border-b border-slate-100 bg-white space-y-4 md:space-y-0 md:flex md:items-center md:justify-between gap-4 sticky top-0 z-10">
                    
                
                    <div className="relative flex-1 max-w-md group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <i className="fa-solid fa-magnifying-glass text-slate-400 group-focus-within:text-emerald-500 transition-colors"></i>
                        </div>
                        <input 
                            type="text" 
                            className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all sm:text-sm"
                            placeholder="Tìm theo tên món hoặc tác giả..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                 
                    <div className="flex flex-wrap gap-3">
                      
                        <div className="relative">
                            <select 
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                className="appearance-none bg-slate-50 border border-slate-200 text-slate-700 py-2.5 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm font-medium cursor-pointer hover:bg-white transition-colors"
                            >
                                <option value="all">Tất cả danh mục</option>
                                <option value="Món Miền Bắc">Món Miền Bắc</option>
                                <option value="Món Miền Nam">Món Miền Nam</option>
                                <option value="Ăn Vặt">Ăn Vặt</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                                <i className="fa-solid fa-chevron-down text-xs"></i>
                            </div>
                        </div>

                      
                        <div className="relative">
                            <select 
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="appearance-none bg-slate-50 border border-slate-200 text-slate-700 py-2.5 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm font-medium cursor-pointer hover:bg-white transition-colors"
                            >
                                <option value="all">Tất cả trạng thái</option>
                                <option value="Chờ duyệt">Chờ duyệt</option>
                                <option value="Đã duyệt">Đã duyệt</option>
                                <option value="Bị từ chối">Bị từ chối</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                                <i className="fa-solid fa-filter text-xs"></i>
                            </div>
                        </div>
                    </div>
                </div>

              
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50/50 text-slate-500 text-xs uppercase font-bold tracking-wider border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4">Món ăn</th>
                                <th className="px-6 py-4">Danh mục</th>
                                <th className="px-6 py-4">Trạng thái</th>
                                <th className="px-6 py-4">Ngày đăng</th>
                                <th className="px-6 py-4 text-center">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-20 text-center text-slate-400">
                                        <i className="fa-solid fa-circle-notch fa-spin text-3xl text-emerald-500 mb-3"></i>
                                        <p>Đang tải dữ liệu...</p>
                                    </td>
                                </tr>
                            ) : processedPosts.length > 0 ? (
                                processedPosts.map((post) => (
                                    <tr key={post.id} className="group hover:bg-slate-50/80 transition-colors duration-200">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-slate-200 shadow-sm shrink-0">
                                                    <img 
                                                        src={post.image_url ? (post.image_url.startsWith('http') ? post.image_url : IMAGE_BASE_URL + post.image_url) : 'https://via.placeholder.com/150'}
                                                        alt={post.title}
                                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-slate-800 group-hover:text-emerald-600 transition-colors cursor-pointer text-sm md:text-base">
                                                        {post.title}
                                                    </h4>
                                                    <div className="flex items-center gap-1.5 mt-1">
                                                        <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] text-slate-500 font-bold border border-slate-200">
                                                            {post.author?.name?.charAt(0)}
                                                        </div>
                                                        <span className="text-xs text-slate-500">{post.author?.name}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-1">
                                                {post.categories?.map(cat => (
                                                    <span key={cat.id} className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-600 text-xs font-medium">
                                                        {cat.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(post.status)}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${post.status === 'Đã duyệt' ? 'bg-emerald-500' : post.status === 'Chờ duyệt' ? 'bg-amber-500' : 'bg-red-500'}`}></span>
                                                {post.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-slate-600">
                                                {new Date(post.created_at).toLocaleDateString('vi-VN')}
                                            </div>
                                            <div className="text-xs text-slate-400 mt-0.5">
                                              lúc   {new Date(post.created_at).toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'})}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex items-center justify-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                                                <button
                                                onClick={()=>{OpenMoDal(undefined,{TenTrang:'ChiTietBaiDang'})}}
                                                    className="w-9 h-9 rounded-lg bg-white border border-slate-200 text-slate-500 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 flex items-center justify-center transition-all shadow-sm" 
                                                    title="Xem chi tiết"
                                                >
                                                    <i className="fa-regular fa-eye"></i>
                                                </button>
                                           
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-16 text-center">
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                                                <i className="fa-solid fa-magnifying-glass text-slate-300 text-xl"></i>
                                            </div>
                                            <p className="text-slate-500 font-medium">Không tìm thấy kết quả phù hợp</p>
                                            <p className="text-slate-400 text-sm mt-1">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                                            <button 
                                                onClick={() => {setSearchTerm(""); setFilterCategory("all"); setFilterStatus("all");}}
                                                className="mt-4 text-emerald-600 text-sm font-medium hover:underline"
                                            >
                                                Xóa bộ lọc
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            
                <div className="border-t border-slate-100 px-6 py-4 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-sm text-slate-500">
                        Hiển thị trang <span className="font-bold text-slate-800">{currentPage}</span> trên tổng số <span className="font-bold text-slate-800">{totalPages}</span>
                    </span>
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-500 text-sm font-medium hover:bg-slate-50 hover:text-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                        >
                            <i className="fa-solid fa-chevron-left mr-1"></i> Trước
                        </button>
                        <button 
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-500 text-sm font-medium hover:bg-slate-50 hover:text-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                        >
                            Sau <i className="fa-solid fa-chevron-right ml-1"></i>
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}

function StatCard({ title, value, icon, color, bg }) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
                <p className="text-slate-500 text-sm font-medium">{title}</p>
                <h3 className={`text-3xl font-bold mt-1 ${color}`}>{value}</h3>
            </div>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${bg} ${color}`}>
                <i className={`fa-solid ${icon}`}></i>
            </div>
        </div>
    );
}

export default DuLieuBaiDang;
import { useState, useEffect } from "react";
import * as API from '../../JS/API/API'
import { useModalContext } from '../../context/QuanLiModal';

function XuLiViPham() {
    const { OpenMoDal } = useModalContext();

    // --- STATE QUẢN LÝ ---
    const [loading, setloading] = useState(false);
    const [ThongKe, setThongKe] = useState({});

    // State dữ liệu bảng
    const [loading2, setloading2] = useState(false);
    const [DuLieuGoc, setDuLieuGoc] = useState([]); // Dữ liệu gốc từ API
    const [DuLieuHienThi, setDuLieuHienThi] = useState([]); // Dữ liệu hiển thị (đã lọc)
    
    // State phân trang
    const [page, setpage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // State bộ lọc Client
    const [filterStatus, setFilterStatus] = useState('all'); // Trạng thái lọc
    const [searchTerm, setSearchTerm] = useState(''); // Từ khóa tìm kiếm

    // --- BƯỚC 1: LẤY DỮ LIỆU THỐNG KÊ ---
    useEffect(() => {
        const LayDL_TK = async () => {
            setloading(true)
            try {
                const data = await API.CallAPI(undefined, { PhuongThuc: 2, url: 'admin/ThongKeViPham' });
                if (data.status) {
                    setThongKe(data.data);
                }
            } catch (error) {
                console.error('Lỗi xảy ra :' + error);
            } finally {
                setloading(false);
            }
        }
        LayDL_TK();
    }, []);

    // --- BƯỚC 2: LẤY DỮ LIỆU BÁO CÁO (SERVER) ---
    useEffect(() => {
        const layDL = async () => {
            setloading2(true)
            try {
                const data = await API.CallAPI(undefined, { PhuongThuc: 2, url: `admin/laydl_baocao?page=${page}` });
                if (data.status) {
                    const fetchedData = data.data.data || [];
                    setDuLieuGoc(fetchedData);
                    setDuLieuHienThi(fetchedData); // Mặc định hiển thị hết khi mới tải
                    setTotalPages(data.data.last_page || 1); 
                }
            } catch (error) {
                console.error('Lỗi xảy ra :' + error);
            } finally {
                setloading2(false)
            }
        }
        layDL();
    }, [page])

    // --- BƯỚC 3: XỬ LÝ LỌC & TÌM KIẾM (CLIENT SIDE) ---
    useEffect(() => {
        let ketQua = [...DuLieuGoc]; // Copy mảng gốc

        // 1. Lọc theo Select (Trạng thái)
        if (filterStatus !== 'all') {
            ketQua = ketQua.filter(item => item.status.toString() === filterStatus);
        }

        // 2. Lọc theo Input (Tìm kiếm)
        if (searchTerm.trim() !== '') {
            const keyword = searchTerm.toLowerCase();
            ketQua = ketQua.filter(item => 
                (item.TieuDe && item.TieuDe.toLowerCase().includes(keyword)) ||
                (item.NguoiBaoCao && item.NguoiBaoCao.toLowerCase().includes(keyword))
            );
        }

        setDuLieuHienThi(ketQua); // Cập nhật dữ liệu ra bảng
    }, [filterStatus, searchTerm, DuLieuGoc]);


    // --- HÀM RENDER UI TRẠNG THÁI ---
    const renderStatusBadge = (status) => {
        const s = parseInt(status);
        switch (s) {
            case 1:
                return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200"><i className="fa-solid fa-trash-can text-[10px]"></i> Đã xóa bài</span>;
            case 2:
                return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-200"><i className="fa-solid fa-ban text-[10px]"></i> Đã bỏ qua</span>;
            default:
                return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700 border border-yellow-200"><i className="fa-regular fa-clock text-[10px]"></i> Đang chờ xử lý</span>;
        }
    };

    // --- GIAO DIỆN ---
    return (
        <div className="min-h-screen font-sans p-3 text-gray-800">
            <main className="">
                {/* --- SECTION THỐNG KÊ (ĐẦY ĐỦ) --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {loading ? (
                        <div className="col-span-3 text-center py-4 text-gray-500">Đang tải thống kê...</div>
                    ) : (
                        <>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
                                <div>
                                    <p className="text-gray-500 text-sm font-medium">Tổng đang chờ xử lý</p>
                                    <h3 className="text-3xl font-bold text-gray-800 mt-2">
                                        {ThongKe.ChoXuLi || 0}
                                    </h3>
                                </div>
                                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 text-xl">
                                    <i className="fa-solid fa-hourglass-half"></i>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
                                <div>
                                    <p className="text-gray-500 text-sm font-medium">Đã xử lý hôm nay</p>
                                    <h3 className="text-3xl font-bold text-gray-800 mt-2">{ThongKe.XuLi_HomNay || 0}</h3>
                                </div>
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xl">
                                    <i className="fa-solid fa-check-double"></i>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
                                <div>
                                    <p className="text-gray-500 text-sm font-medium">Chờ xử lí hôm nay</p>
                                    <h3 className="text-3xl font-bold text-red-600 mt-2">{ThongKe.ChoXuLi_HomNay || 0}</h3>
                                </div>
                                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-xl">
                                    <i className="fa-solid fa-triangle-exclamation"></i>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* --- TABLE & ACTIONS --- */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden min-h-[400px] flex flex-col">
                    
                    {/* Toolbar: Lọc và Tìm kiếm */}
                    <div className="border-b border-gray-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 bg-gray-50/50">
                        <div className="flex gap-3">
                            <select 
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-indigo-400 text-gray-600 cursor-pointer"
                            >
                                <option value="all">Tất cả trạng thái</option>
                                <option value="0">Đang chờ xử lý</option>
                                <option value="1">Đã xóa bài</option>
                                <option value="2">Đã bỏ qua</option>
                            </select>
                        </div>
                        <div className="sm:ml-auto relative">
                            <input 
                                type="text" 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Tìm tên, ID bài viết..." 
                                className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-400 w-full sm:w-64 transition-all shadow-sm" 
                            />
                            <i className="fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-gray-400 text-sm"></i>
                        </div>
                    </div>

                    {/* Table Data */}
                    <div className="overflow-x-auto flex-grow">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold tracking-wider">
                                <tr>
                                    <th className="px-6 py-4">Đối tượng vi phạm</th>
                                    <th className="px-6 py-4">Lý do</th>
                                    <th className="px-6 py-4">Người báo cáo</th>
                                    <th className="px-6 py-4 text-center">Trạng thái</th>
                                    <th className="px-6 py-4 text-center">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loading2 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-10 text-center">
                                            <div className="flex items-center justify-center text-indigo-600 font-bold">
                                                <i className="fa-solid fa-spinner fa-spin mr-2"></i>Đang tải...
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    DuLieuHienThi && Array.isArray(DuLieuHienThi) && DuLieuHienThi.length > 0 ? (
                                        DuLieuHienThi.map((BaoCao, index) => (
                                            <tr key={index} className="hover:bg-red-50/30 transition-colors group">
                                                {/* Cột 1: Thông tin bài viết */}
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-gray-800 text-sm line-clamp-1 group-hover:text-red-600 transition-colors">
                                                            {BaoCao.TieuDe}
                                                        </span>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <span className="text-xs text-gray-400">
                                                                {new Date(BaoCao.created_at).toLocaleDateString("vi-VN") + ' Lúc ' +  new Date(BaoCao.created_at).toLocaleTimeString("en-US", {
                                                                    hour: "2-digit",
                                                                    minute: "2-digit",
                                                                    hour12: true
                                                                }) }
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Cột 2: Lý do */}
                                                <td className="px-6 py-4">
                                                    <span className="text-sm font-medium text-gray-700">
                                                        {BaoCao.reason}
                                                    </span>
                                                </td>

                                                {/* Cột 3: Người báo cáo */}
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold uppercase">
                                                            {(BaoCao.name ? BaoCao.name.charAt(0) : 'U')}
                                                        </div>
                                                        <span className="text-sm text-gray-700">
                                                            {BaoCao.NguoiBaoCao}
                                                        </span>
                                                    </div>
                                                </td>
                                                
                                       
                                                <td className="px-6 py-4 text-center">
                                                     {renderStatusBadge(BaoCao.status)}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <button onClick={()=>{OpenMoDal({DuLieu:BaoCao},{TenTrang:'XuLiViPham'})}}
                                                            className="bg-white border border-gray-300 text-gray-600 hover:bg-red-600 hover:text-white hover:border-red-600 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all shadow-sm active:scale-95">
                                                            Xem chi tiết
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="py-12 text-center">
                                                <div className="flex flex-col items-center justify-center text-gray-400">
                                                    <i className="fa-regular fa-folder-open text-4xl mb-3"></i>
                                                    <span className="text-base font-medium text-gray-600">
                                                        {DuLieuGoc.length === 0 ? "Dữ liệu trống" : "Không tìm thấy kết quả phù hợp"}
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-between bg-gray-50">
                        <span className="text-sm text-gray-500">
                            Trang <span className="font-bold text-gray-800">{page}</span> trên tổng số <span className="font-bold text-gray-800">{totalPages}</span>
                        </span>
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={() => setpage(prev => Math.max(prev - 1, 1))}
                                disabled={page <= 1}
                                className={`px-3 py-1 text-sm rounded border ${page <= 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                            >
                                <i className="fa-solid fa-chevron-left"></i>
                            </button>
                            
                            <div className="flex gap-1">
                                <span className="w-8 h-8 text-sm font-bold rounded border flex items-center justify-center bg-red-600 text-white border-red-600">
                                    {page}
                                </span>
                            </div>
                            
                            <button 
                                onClick={() => setpage(prev => (prev < totalPages ? prev + 1 : prev))}
                                disabled={page >= totalPages}
                                className={`px-3 py-1 text-sm rounded border ${page >= totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                            >
                                <i className="fa-solid fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default XuLiViPham;
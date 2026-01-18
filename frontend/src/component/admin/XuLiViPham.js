import { useState, useEffect } from "react";
import * as API from '../../JS/API/API'

function XuLiViPham() {
    // --- STATE QUẢN LÝ ---
    const [loading, setloading] = useState(false);
    const [ThongKe, setThongKe] = useState({});

    // State cho bảng dữ liệu
    const [loading2, setloading2] = useState(false);
    const [DuLieuBaoCao, setDuLieu] = useState([]); // Mảng chứa danh sách báo cáo
    const [page, setpage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); // Thêm state lưu tổng số trang

    // State cho Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null); // (Tùy chọn) Lưu báo cáo đang xem

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

    // --- BƯỚC 2: LẤY DỮ LIỆU BÁO CÁO (Đã sửa lỗi logic) ---
    useEffect(() => {
        const layDL = async () => {
            setloading2(true)
            try {
                const data = await API.CallAPI(undefined, { PhuongThuc: 2, url: `admin/laydl_baocao?page=${page}` });
                // console.log(data); // Bật lên để check tên trường dữ liệu nếu cần
                
                if (data.status) {
                    // SỬA LỖI QUAN TRỌNG: Tách riêng dữ liệu mảng và số trang
                    setDuLieu(data.data.data || []); 
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

    // --- GIAO DIỆN ---
    return (
        <div className="min-h-screen font-sans p-3 text-gray-800">
            <main className="">
                {/* --- SECTION THỐNG KÊ --- */}
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
                    
                    {/* Toolbar */}
                    <div className="border-b border-gray-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 bg-gray-50/50">
                        <div className="flex gap-3">
                            <select className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-indigo-400 text-gray-600">
                                <option value="all">Tất cả trạng thái</option>
                                <option value="1">Đã xử lí</option>
                                <option value="0">Chưa xử lí</option>
                            </select>
                        </div>
                        <div className="sm:ml-auto relative">
                            <input type="text" placeholder="Tìm tên, ID bài viết..." className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-400 w-full sm:w-64 transition-all shadow-sm" />
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
                                    DuLieuBaoCao && Array.isArray(DuLieuBaoCao) && DuLieuBaoCao.length > 0 ? (
                                        DuLieuBaoCao.map((BaoCao, index) => (
                                            <tr key={index} className="hover:bg-red-50/30 transition-colors group">
                                                {/* Cột 1: Thông tin bài viết */}
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-gray-800 text-sm line-clamp-1 group-hover:text-red-600 transition-colors">
                                                            {/* Thay 'title' bằng tên trường thật trong DB */}
                                                            {BaoCao.title || BaoCao.ten_bai_viet || "Nội dung vi phạm"}
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
                                                            {/* sau này sẽ đổi thành avartar*/ }
                                                            {(BaoCao.name).charAt(0)}
                                                        </div>
                                                        <span className="text-sm text-gray-700">
                                                            {BaoCao.name}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <button 
                                                        onClick={() => {
                                                            setSelectedReport(BaoCao); // Lưu data để hiển thị popup nếu cần
                                                            setIsModalOpen(true);
                                                        }} 
                                                        className="bg-white border border-gray-300 text-gray-600 hover:bg-red-600 hover:text-white hover:border-red-600 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all shadow-sm active:scale-95"
                                                    >
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
                                                    <span className="text-base font-medium text-gray-600">Dữ liệu trống</span>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
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

            {/* --- MODAL (Giao diện tĩnh như yêu cầu) --- */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" onClick={() => setIsModalOpen(false)}></div>

                    {/* Modal Content */}
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden relative z-10 animate-fade-in-up flex flex-col max-h-[90vh]">
                        {/* Header */}
                        <div className="bg-white px-6 py-4 border-b border-gray-100 flex justify-between items-center shrink-0">
                            <div>
                                <h3 className="font-bold text-lg text-gray-800">Xử lý báo cáo <span className="text-red-600">#{selectedReport?.id || '---'}</span></h3>
                                <p className="text-xs text-gray-500">Người báo cáo: {selectedReport?.reporter_name || '...'} </p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors">
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6 overflow-y-auto">
                            {/* User info card */}
                            <div className="flex items-center gap-4 mb-6 p-4 bg-red-50/50 rounded-xl border border-red-100">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-red-500 border border-red-100 font-bold text-xl shadow-sm">
                                    N
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Người bị báo cáo</p>
                                    <p className="font-bold text-gray-800 text-lg">Nguyễn Văn A</p>
                                </div>
                                <div className="ml-auto text-right">
                                    <div className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded">
                                        <i className="fa-solid fa-triangle-exclamation mr-1"></i> Vi phạm
                                    </div>
                                </div>
                            </div>

                            {/* Report Details */}
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Nội dung vi phạm <span className="font-normal text-gray-500">({selectedReport?.type || '...'})</span>
                                    </label>
                                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-gray-800 relative">
                                        <i className="fa-solid fa-quote-left text-3xl text-gray-200 absolute top-2 left-2 -z-0"></i>
                                        <p className="relative z-10 italic">"{selectedReport?.title || selectedReport?.ten_bai_viet || '...'}"</p>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Lý do báo cáo</label>
                                    <div className="flex items-start gap-3">
                                        <i className="fa-solid fa-circle-info text-red-500 mt-1"></i>
                                        <p className="text-gray-700">{selectedReport?.reason || selectedReport?.ly_do || '...'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer / Actions */}
                        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 shrink-0">
                            <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-lg text-gray-600 font-bold hover:bg-gray-200 transition-colors text-sm">
                                Bỏ qua
                            </button>
                            <button className="px-5 py-2.5 rounded-lg bg-orange-100 text-orange-700 font-bold hover:bg-orange-200 transition-colors border border-orange-200 text-sm">
                                <i className="fa-solid fa-eraser mr-2"></i> Gỡ nội dung
                            </button>
                            <button className="px-5 py-2.5 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700 shadow-md hover:shadow-lg transition-all transform active:scale-95 text-sm">
                                <i className="fa-solid fa-gavel mr-2"></i> Khóa tài khoản
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default XuLiViPham;
import { useState } from "react";

function XuLiViPham() {
    // --- STATE MANAGEMENT ---
    const [activeTab, setActiveTab] = useState("pending");
    const [selectedReport, setSelectedReport] = useState(null);

    // Mock Data: Danh sách báo cáo
    const [reports, setReports] = useState([
        {
            id: 1,
            reportedUser: "Nguyễn Văn A",
            reporter: "Trần Thị B",
            type: "Công thức",
            title: "Cá kho tộ (Bài viết spam link)",
            reason: "Spam / Quảng cáo",
            content: "Mọi người ghé thăm website xyz để mua cá nhé...",
            time: "10 phút trước",
            status: "pending",
            severity: "low"
        },
        {
            id: 2,
            reportedUser: "Lê Văn C",
            reporter: "Phạm D",
            type: "Bình luận",
            title: "Bình luận tại bài 'Gà rán'",
            reason: "Ngôn từ đả kích / Xúc phạm",
            content: "Công thức này dở tệ, ai nấu theo là ngu...",
            time: "2 giờ trước",
            status: "pending",
            severity: "high"
        },
        {
            id: 3,
            reportedUser: "Hoàng E",
            reporter: "System",
            type: "Hình ảnh",
            title: "Ảnh bìa món Sườn xào",
            reason: "Hình ảnh nhạy cảm",
            content: "(Hình ảnh chứa nội dung không phù hợp)",
            time: "1 ngày trước",
            status: "resolved",
            severity: "medium"
        }
    ]);

    // --- LOGIC ---
    // Lọc danh sách theo tab
    const filteredReports = reports.filter(r => r.status === activeTab);

    // Xử lý hành động trong Modal
    const handleAction = (action) => {
        alert(`Đã thực hiện hành động: [${action}] đối với báo cáo #${selectedReport.id}`);
        
        // Cập nhật trạng thái thành 'resolved' sau khi xử lý
        setReports(reports.map(r => 
            r.id === selectedReport.id ? { ...r, status: 'resolved' } : r
        ));
        
        // Đóng modal
        setSelectedReport(null);
    };

    return (
        <div className="min-h-screen font-sans p-3 text-gray-800">
            <main className=" ">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Đang chờ xử lý</p>
                            <h3 className="text-3xl font-bold text-gray-800 mt-2">
                                {reports.filter(r => r.status === 'pending').length}
                            </h3>
                        </div>
                        <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 text-xl">
                            <i className="fa-solid fa-hourglass-half"></i>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Đã xử lý hôm nay</p>
                            <h3 className="text-3xl font-bold text-gray-800 mt-2">45</h3>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xl">
                            <i className="fa-solid fa-check-double"></i>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Vi phạm nghiêm trọng</p>
                            <h3 className="text-3xl font-bold text-red-600 mt-2">3</h3>
                        </div>
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-xl">
                            <i className="fa-solid fa-triangle-exclamation"></i>
                        </div>
                    </div>
                </div>

                {/* Main Table Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden min-h-[400px]">
                    
                    {/* Tabs & Search */}
                    <div className="border-b border-gray-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 bg-gray-50/50">
                        <div className="flex gap-6">
                            <button 
                                onClick={() => setActiveTab("pending")}
                                className={`pb-2 pt-1 font-bold text-sm relative transition-colors ${activeTab === 'pending' ? 'text-red-600' : 'text-gray-500 hover:text-gray-800'}`}
                            >
                                Chờ xử lý
                                {activeTab === 'pending' && <span className="absolute bottom-[-17px] left-0 w-full h-0.5 bg-red-600"></span>}
                            </button>
                            <button 
                                onClick={() => setActiveTab("resolved")}
                                className={`pb-2 pt-1 font-bold text-sm relative transition-colors ${activeTab === 'resolved' ? 'text-red-600' : 'text-gray-500 hover:text-gray-800'}`}
                            >
                                Lịch sử xử lý
                                {activeTab === 'resolved' && <span className="absolute bottom-[-17px] left-0 w-full h-0.5 bg-red-600"></span>}
                            </button>
                        </div>
                        <div className="sm:ml-auto relative">
                             <input type="text" placeholder="Tìm tên, ID bài viết..." className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-400 w-full sm:w-64 transition-all shadow-sm"/>
                             <i className="fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-gray-400 text-sm"></i>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold tracking-wider">
                                <tr>
                                    <th className="px-6 py-4">Đối tượng vi phạm</th>
                                    <th className="px-6 py-4">Lý do</th>
                                    <th className="px-6 py-4">Người báo cáo</th>
                                    <th className="px-6 py-4">Mức độ</th>
                                    <th className="px-6 py-4 text-center">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredReports.map((report) => (
                                    <tr key={report.id} className="hover:bg-red-50/30 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-gray-800 text-sm line-clamp-1 group-hover:text-red-600 transition-colors">{report.title}</span>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-[10px] uppercase font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">{report.type}</span>
                                                    <span className="text-xs text-gray-400">• {report.time}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-medium text-gray-700">{report.reason}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-xs font-bold">
                                                    {report.reporter.charAt(0)}
                                                </div>
                                                <span className="text-sm text-gray-700">{report.reporter}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {report.severity === 'high' ? (
                                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200">
                                                    <i className="fa-solid fa-fire text-[10px]"></i> Cao
                                                </span>
                                            ) : (
                                                 <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                                                    Thấp
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button 
                                                onClick={() => setSelectedReport(report)}
                                                className="bg-white border border-gray-300 text-gray-600 hover:bg-red-600 hover:text-white hover:border-red-600 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all shadow-sm active:scale-95"
                                            >
                                                Xem chi tiết
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {filteredReports.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-16 text-center text-gray-400">
                                            <div className="flex flex-col items-center">
                                                <i className="fa-solid fa-clipboard-check text-5xl mb-4 text-gray-200"></i>
                                                <p className="font-medium">Không có báo cáo nào ở trạng thái này.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {/* --- ACTION MODAL --- */}
            {selectedReport && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" 
                        onClick={() => setSelectedReport(null)}
                    ></div>

                    {/* Modal Content */}
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden relative z-10 animate-fade-in-up flex flex-col max-h-[90vh]">
                        
                        {/* Header */}
                        <div className="bg-white px-6 py-4 border-b border-gray-100 flex justify-between items-center shrink-0">
                            <div>
                                <h3 className="font-bold text-lg text-gray-800">Xử lý báo cáo <span className="text-red-600">#{selectedReport.id}</span></h3>
                                <p className="text-xs text-gray-500">Được báo cáo bởi {selectedReport.reporter} • {selectedReport.time}</p>
                            </div>
                            <button onClick={() => setSelectedReport(null)} className="w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors">
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>

                        {/* Body (Scrollable) */}
                        <div className="p-6 overflow-y-auto">
                            
                            {/* Card: Người bị báo cáo */}
                            <div className="flex items-center gap-4 mb-6 p-4 bg-red-50/50 rounded-xl border border-red-100">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-red-500 border border-red-100 font-bold text-xl shadow-sm">
                                    {selectedReport.reportedUser.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Người bị báo cáo</p>
                                    <p className="font-bold text-gray-800 text-lg">{selectedReport.reportedUser}</p>
                                </div>
                                <div className="ml-auto text-right">
                                    <div className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded">
                                        <i className="fa-solid fa-triangle-exclamation mr-1"></i> 3 vi phạm
                                    </div>
                                    <p className="text-[10px] text-gray-400 mt-1">trong 30 ngày qua</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {/* Nội dung vi phạm */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Nội dung vi phạm <span className="font-normal text-gray-500">({selectedReport.type})</span>
                                    </label>
                                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-gray-800 relative">
                                        <i className="fa-solid fa-quote-left text-3xl text-gray-200 absolute top-2 left-2 -z-0"></i>
                                        <p className="relative z-10 italic">"{selectedReport.content}"</p>
                                    </div>
                                </div>

                                {/* Lý do báo cáo */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Lý do báo cáo</label>
                                    <div className="flex items-start gap-3">
                                        <i className="fa-solid fa-circle-info text-red-500 mt-1"></i>
                                        <p className="text-gray-700">{selectedReport.reason}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer (Actions) */}
                        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 shrink-0">
                            <button 
                                onClick={() => handleAction('Bỏ qua')}
                                className="px-5 py-2.5 rounded-lg text-gray-600 font-bold hover:bg-gray-200 transition-colors text-sm"
                            >
                                Bỏ qua
                            </button>
                            <button 
                                onClick={() => handleAction('Gỡ bỏ nội dung')}
                                className="px-5 py-2.5 rounded-lg bg-orange-100 text-orange-700 font-bold hover:bg-orange-200 transition-colors border border-orange-200 text-sm"
                            >
                                <i className="fa-solid fa-eraser mr-2"></i> Gỡ nội dung
                            </button>
                            <button 
                                onClick={() => handleAction('Khóa tài khoản')}
                                className="px-5 py-2.5 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700 shadow-md hover:shadow-lg transition-all transform active:scale-95 text-sm"
                            >
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
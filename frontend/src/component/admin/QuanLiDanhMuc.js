import { useModalContext } from '../../context/QuanLiModal';
import { useEffect, useState } from 'react';
import * as API from '../../JS/API/API';

function DanhMuc() {
    const { OpenMoDal } = useModalContext();
    const [page, setpage] = useState(1);
    const [loading, setloading] = useState(false);
    const [DanhMuc, setDanhMuc] = useState([]); 
    const [TongTrang, setTong] = useState(1);
    const [tuKhoa, setTuKhoa] = useState(""); 
    const [phanLoai, setPhanLoai] = useState(""); 

    const thongKe = {
        tongSo: DanhMuc.length,
        vungMien: DanhMuc.filter(x => x.type === 'Vùng miền').length,
        loaiMon: DanhMuc.filter(x => x.type === 'Loại món ăn').length,
        cheDo: DanhMuc.filter(x => x.type === 'Chế độ ăn').length
    };


    useEffect(() => {
        const laydl = async () => {
            setloading(true);
            try {
                const data = await API.CallAPI(undefined, { PhuongThuc: 2, url: `admin/laydl_danhmuc?page=${page}` });
                
                if (data.status) {
                    setDanhMuc(data.data.data);
                    setTong(data.data.last_page);
                }
            } catch (error) {
                console.error('Đã xảy ra lỗi' + error);
            } finally {
                setloading(false);
            }
        };
        laydl();
    }, [page]); 

    const danhSachHienThi = DanhMuc.filter(dm => {
        const matchName = dm.name ? dm.name.toLowerCase().includes(tuKhoa.toLowerCase()) : false;
        const matchSlug = dm.slug ? dm.slug.toLowerCase().includes(tuKhoa.toLowerCase()) : false;
        const isMatchKey = tuKhoa === "" || matchName || matchSlug;
        const isMatchType = phanLoai === "" || (dm.type && dm.type.toLowerCase() === phanLoai.toLowerCase());

        return isMatchKey && isMatchType;
    });

    return (
        <>
            <div className="p-6 max-w-7xl mx-auto">
             
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Danh mục Ẩm thực</h1>
                        <p className="text-sm text-gray-500 mt-1">Quản lý phân loại: Khu vực, Loại món ăn, Chế độ ăn</p>
                    </div>
                    <button onClick={() => { OpenMoDal(undefined, { TenTrang: 'ThemDanhMuc' }) }} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg shadow transition flex items-center gap-2">
                        <i className="fas fa-plus"></i> Thêm Danh mục
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                   
                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium text-gray-500 uppercase">Hiển thị</p>
                            <h3 className="text-2xl font-bold text-gray-800 mt-1">{thongKe.tongSo}</h3>
                        </div>
                        <div className="p-3 bg-indigo-50 rounded-full text-indigo-600">
                            <i className="fa-solid fa-list-ul text-xl"></i>
                        </div>
                    </div>

               
                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium text-gray-500 uppercase">Vùng miền</p>
                            <h3 className="text-2xl font-bold text-green-600 mt-1">{thongKe.vungMien}</h3>
                        </div>
                        <div className="p-3 bg-green-50 rounded-full text-green-600">
                            <i className="fa-solid fa-map-location-dot text-xl"></i>
                        </div>
                    </div>

                 
                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium text-gray-500 uppercase">Loại món</p>
                            <h3 className="text-2xl font-bold text-orange-600 mt-1">{thongKe.loaiMon}</h3>
                        </div>
                        <div className="p-3 bg-orange-50 rounded-full text-orange-600">
                            <i className="fa-solid fa-utensils text-xl"></i>
                        </div>
                    </div>

                 
                     <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium text-gray-500 uppercase">Chế độ ăn</p>
                            <h3 className="text-2xl font-bold text-blue-600 mt-1">{thongKe.cheDo}</h3>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-full text-blue-600">
                            <i className="fa-solid fa-heart-pulse text-xl"></i>
                        </div>
                    </div>
                </div>
              
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between bg-gray-50/50">
                        <div className="relative w-full md:w-96">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><i className="fas fa-search"></i></span>
                            <input 
                                type="text" 
                                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" 
                                placeholder="Tìm trên trang hiện tại..." 
                                value={tuKhoa}
                                onChange={(e) => setTuKhoa(e.target.value)} 
                            />
                        </div>

                        <select 
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 bg-white"
                            value={phanLoai}
                            onChange={(e) => setPhanLoai(e.target.value)}
                        >
                            <option value="">-- Tất cả nhóm --</option>
                            <option value="Vùng miền">Vùng miền</option>
                            <option value="loại món ăn">Loại món ăn</option>
                            <option value="chế độ ăn">Chế độ ăn</option>
                        </select>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-500 uppercase bg-gray-100 border-b">
                                <tr>
                                    <th className="px-6 py-3 w-16">ID</th>
                                    <th className="px-6 py-3">Tên (Name)</th>
                                    <th className="px-6 py-3">Slug (URL)</th>
                                    <th className="px-6 py-3">Phân loại (Type)</th>
                                    <th className="px-6 py-3 text-right">Hành động</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 relative">
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="p-0 h-32 relative">
                                            <div className="absolute inset-0 bg-white/80 z-10 flex items-center justify-center">
                                                <span className="text-indigo-600 font-bold">
                                                    <i className="fa-solid fa-spinner fa-spin mr-2"></i>Đang tải...
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    danhSachHienThi && danhSachHienThi.length > 0 ? (
                                        danhSachHienThi.map((dm) => (
                                            <tr key={dm.id} className="hover:bg-gray-50 transition">
                                                <td className="px-6 py-4 text-gray-500 font-mono text-xs">{dm.id}</td>
                                                <td className="px-6 py-4 font-semibold text-gray-900">{dm.name}</td>
                                                <td className="px-6 py-4 text-gray-500 font-mono text-xs">{dm.slug}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2.5 py-1 rounded text-xs font-medium border
                                                        ${dm.type === 'Vùng miền' ? 'bg-green-100 text-green-800 border-green-200' : ''}
                                                        ${dm.type === 'Loại món ăn' ? 'bg-orange-100 text-orange-800 border-orange-200' : ''}
                                                        ${dm.type === 'Chế độ ăn' ? 'bg-blue-100 text-blue-800 border-blue-200' : ''}
                                                    `}>
                                                        {dm.type}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end gap-3">
                                                        <button 
                                                            onClick={() => OpenMoDal(dm.id, { TenTrang: 'ThemDanhMuc', DuLieu: dm })}
                                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
                                                        >
                                                            <i className="fa-solid fa-pen-to-square"></i>
                                                            <span>Sửa</span>
                                                        </button>
                                                        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-colors">
                                                            <i className="fa-solid fa-trash-can"></i>
                                                            <span>Xóa</span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="py-12 text-center">
                                                <div className="flex flex-col items-center justify-center text-gray-400">
                                                    <i className="fa-solid fa-magnifying-glass text-4xl mb-3"></i>
                                                    <span className="text-base font-medium text-gray-600">
                                                        {DanhMuc.length === 0 ? "Dữ liệu trống" : "Không tìm thấy kết quả phù hợp"}
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="max-w-4xl mx-auto px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
                        <span>
                            Trang <span className="font-bold text-gray-800">{page}</span>
                            trên tổng số <span className="font-bold text-gray-800">{TongTrang}</span>
                        </span>
                        <div className="flex gap-1">
                            <button onClick={() => { setpage(p => p - 1) }} disabled={page === 1} className="px-3 py-1 border rounded bg-white text-gray-600 text-sm hover:bg-gray-100 disabled:opacity-50">Trước</button>
                            <span className="px-3 py-1 border rounded bg-indigo-600 text-white text-sm">{page}</span>
                            <button onClick={() => { setpage(p => p + 1) }} disabled={page === TongTrang} className="px-3 py-1 border rounded bg-white text-gray-600 text-sm hover:bg-gray-100 disabled:opacity-50">Sau</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default DanhMuc;
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as API from '../../JS/API/API';
import * as fun from '../../JS/FUNCTION/function';
import * as ThongBao from '../../JS/FUNCTION/ThongBao';

function ChiTietXuLiViPham({ DuLieu }) {
    const [dulieu, setDuLieu] = useState(null);
    const [loading, setloading] = useState(false);
    const [err, seterr] = useState({});

    const reportData = DuLieu?.DuLieu || {};

    useEffect(() => {
        const layDL = async () => {
            if (!reportData.target_id) return;
            setloading(true);
            try {
                const data = await API.CallAPI(undefined, {
                    PhuongThuc: 2,
                    url: `admin/laydl_nguoidung_dangbai?id=${reportData.target_id}`
                });
                if (data.validate) {
                    seterr(data.errors);
                } else if (data.status) {
                    setDuLieu(data.data);
                }
            } catch (error) {
                console.error('Lỗi xảy ra:', error);
            } finally {
                setloading(false);
            }
        };
        layDL();
    }, [reportData.target_id]);

    const CapNhat = async (payload) => {
        const XacNhan = await ThongBao.ThongBao_XacNhanTT(payload.ThongBao);
        if (!XacNhan) return;
        
        if (!payload.id) {
            ThongBao.ThongBao_CanhBao('Dữ liệu gửi đi không hợp lệ!');
            return;
        }

        setloading(true);
        try {
            const formdata = fun.objectToFormData({ id: payload.id });
            const data = await API.CallAPI(formdata, { PhuongThuc: 1, url: payload.url });
            
            if (data.validate) {
                seterr(data.errors);
            } else if (data.status) {
                ThongBao.ThongBao_ThanhCong(data.message);
            } else {
                ThongBao.ThongBao_Loi(data.message);
            }
        } catch (error) {
            console.error('Đã xảy ra lỗi:', error);
            ThongBao.ThongBao_Loi('Lỗi hệ thống');
        } finally {
            setloading(false);
        }
    };

    return (
        // Container chính: Đã xóa shadow, border, bg-white, rounded. Chỉ giữ layout.
        <div className="flex flex-col h-full relative font-sans w-full">
            
            {/* --- Loading Overlay --- */}
            {loading && (
                <div className="absolute inset-0 bg-white/80 z-50 flex flex-col items-center justify-center rounded-xl">
                    <div className="animate-spin rounded-full h-10 w-10 border-[3px] border-indigo-500 border-t-transparent mb-2"></div>
                    <span className="text-indigo-600 font-semibold text-xs animate-pulse">Đang xử lý...</span>
                </div>
            )}

            {/* --- Header (Minimal) --- */}
            {/* Đã xóa border-b và màu nền */}
            <div className="pb-2 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-2">
                    <h3 className="text-gray-800 font-bold text-base">Xử lý vi phạm</h3>
                    <span className="text-gray-400 text-xs font-mono">#{reportData.id}</span>
                </div>
                <div>
                    {reportData.status === 0 ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-600 border border-amber-100">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                            Chờ xử lý
                        </span>
                    ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                            <i className="fa-solid fa-check text-[10px]"></i>
                            Đã xong
                        </span>
                    )}
                </div>
            </div>

            {/* --- Scrollable Content --- */}
            {/* Class ẩn thanh cuộn: [scrollbar-width:none] ... */}
            <div className="flex-1 overflow-y-auto space-y-5 pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                
                {/* Error Banner */}
                {Object.keys(err).length > 0 && (
                    <div className="rounded-lg border border-red-200 bg-red-50 p-3 flex gap-3">
                        <i className="fa-solid fa-circle-exclamation text-red-500 mt-0.5"></i>
                        <div className="flex-1">
                            <h4 className="text-red-700 font-bold text-xs mb-1">Dữ liệu lỗi</h4>
                            <ul className="text-xs text-red-600 space-y-1">
                                {Object.entries(err).map(([field, messages]) =>
                                    messages.map((msg, idx) => (
                                        <li key={`${field}-${idx}`}>{msg}</li>
                                    ))
                                )}
                            </ul>
                        </div>
                    </div>
                )}

                {/* 1. Article Info */}
                <section>
                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex gap-4">
                            <div className="hidden sm:flex h-10 w-10 bg-gray-100 rounded-lg items-center justify-center text-gray-400 flex-shrink-0">
                                <i className="fa-regular fa-newspaper"></i>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <h5 className="font-bold text-gray-800 text-sm mb-1 truncate pr-2">{reportData.TieuDe || "Không có tiêu đề"}</h5>
                                    <Link to={`/post/${reportData.target_id}`} target="_blank" className="text-indigo-500 hover:text-indigo-700">
                                        <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i>
                                    </Link>
                                </div>
                                <div className="flex items-center gap-3 text-xs text-gray-500">
                                    <span>ID: {reportData.target_id}</span>
                                    <span>•</span>
                                    <span>{new Date().toLocaleDateString('vi-VN')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. User Comparison */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Người đăng */}
                    <div className="bg-white p-3 rounded-xl border border-red-100 shadow-sm flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-red-50 flex items-center justify-center text-red-500 font-bold text-sm shrink-0">
                            {dulieu?.TenNguoiDangBai ? dulieu.TenNguoiDangBai.charAt(0) : 'A'}
                        </div>
                        <div className="overflow-hidden min-w-0">
                            <p className="text-xs font-bold text-red-500 uppercase mb-0.5">Người đăng</p>
                            <p className="font-semibold text-gray-800 text-sm truncate">{dulieu?.TenNguoiDangBai || '...'}</p>
                        </div>
                    </div>

                    {/* Người báo cáo */}
                    <div className="bg-white p-3 rounded-xl border border-emerald-100 shadow-sm flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold text-sm shrink-0">
                            {reportData.NguoiBaoCao ? reportData.NguoiBaoCao.charAt(0) : 'B'}
                        </div>
                        <div className="overflow-hidden min-w-0">
                            <p className="text-xs font-bold text-emerald-500 uppercase mb-0.5">Người báo cáo</p>
                            <p className="font-semibold text-gray-800 text-sm truncate">{reportData.NguoiBaoCao}</p>
                        </div>
                    </div>
                </section>

                {/* 3. Reason */}
                <section>
                    <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                        <p className="text-gray-700 text-sm italic relative pl-4">
                            <span className="absolute left-0 top-0 text-amber-400 font-serif text-xl leading-none">"</span>
                            {reportData.reason}
                            <span className="text-amber-400 font-serif text-xl leading-none ml-1">"</span>
                        </p>
                    </div>
                </section>
            </div>

            {/* --- Footer Action Bar --- */}
            {/* Đã xóa border-t và bg-white của container */}
            <div className="pt-4 mt-auto shrink-0">
                <div className="flex flex-col sm:flex-row justify-end gap-2">
                    {reportData.status === 0 ? (
                        <>
                            <button
                                onClick={() => CapNhat({
                                    id: reportData.id,
                                    url: 'admin/BoQua_ViPham',
                                    ThongBao: 'Xác nhận bỏ qua?'
                                })}
                                className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-600 font-medium text-sm hover:bg-gray-50 transition-all"
                            >
                                Bỏ qua
                            </button>
                            
                            <button
                                onClick={() => CapNhat({
                                    id: reportData.id,
                                    url: 'admin/xoa_vipham',
                                    ThongBao: 'Xác nhận xóa bài viết?'
                                })}
                                className="px-4 py-2 rounded-lg bg-red-600 text-white font-medium text-sm hover:bg-red-700 transition-all shadow-sm flex items-center justify-center gap-2"
                            >
                                <i className="fa-regular fa-trash-can"></i>
                                Xóa bài
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => CapNhat({
                                id: reportData.id,
                                url: 'admin/mo_khoa_vipham',
                                ThongBao: 'Khôi phục bài viết?'
                             })}
                            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-emerald-600 text-white font-medium text-sm hover:bg-emerald-700 transition-all shadow-sm flex items-center justify-center gap-2"
                        >
                            <i className="fa-solid fa-lock-open"></i>
                            Khôi phục
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChiTietXuLiViPham;
import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect , useState } from 'react';
import * as API from '../../JS/API/API';
function ChiTietXuLiViPham({DuLieu}) {
    const [dulieu,setDuLieu] = useState();
    const [loading,setloading] = useState(false);
    const [err,seterr] =useState({})
    useEffect(()=>{
        const layDL=async()=>{
            setloading(true)
            try {
                const data= await API.CallAPI(undefined,{PhuongThuc:2,url:`admin/laydl_nguoidung_dangbai?id=${DuLieu.DuLieu.target_id}`})
                if(data.validate){
                    seterr(data.errors);
                    setloading(false);
                    return;
                };
                if(data.status){
                    setDuLieu(data.data);
                    setloading(false);
                    return;
                }

            } catch (error) {
                console.error('Lỗi sảy ra :' + error)
            } finally {
                setloading(false)
            }
        }
        layDL();
    },[DuLieu])
    if(loading){
         <div className="absolute inset-0 bg-white/80 z-10 flex items-center justify-center">
             <span className="text-indigo-600 font-bold"><i className="fa-solid fa-spinner fa-spin mr-2"></i>Đang tải...</span>
        </div>
    }
    return (
        <>
                <div className="bg-white overflow-hidden transform transition-all">
                  {Object.keys(err).length > 0 && (
                    <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
                        <h4 className="text-red-700 font-bold mb-2">
                            <i className="fa-solid fa-triangle-exclamation mr-2"></i> Dữ liệu không hợp lệ
                        </h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-red-600">
                            {Object.entries(err).map(([field, messages]) =>
                                messages.map((msg, index) => (
                                    <li key={`${field}-${index}`}><span className="font-semibold">{field}:</span> {msg}</li>
                                ))
                            )}
                        </ul>
                    </div>
                )}
                    <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                        <div>
                            <span className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Bài viết bị báo cáo</span>
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                <h4 className="font-semibold text-gray-800 text-base mb-1">{DuLieu.DuLieu.TieuDe}</h4>
                                <p className="text-sm text-gray-500 mb-2">ID Bài viết: <span className="font-mono">#{DuLieu.DuLieu.target_id}</span></p>
                                <Link className="text-blue-600 text-sm hover:underline hover:text-blue-700 inline-flex items-center gap-1 font-medium">
                                    Xem bài viết gốc
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </Link>
                            </div>
                        </div>

                        {/* 2. Grid thông tin User (2 cột) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            {/* Người đăng (Bị cáo) */}
                            <div>
                                <span className="block text-xs font-bold text-red-500 uppercase tracking-wider mb-2">👤 Người đăng (Bị cáo)</span>
                                <div className="bg-white p-4 rounded-lg border-l-4 border-red-500 shadow-sm ring-1 ring-gray-200">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold">A</div>
                                        <div>
                                            <p className="font-bold text-gray-800">{dulieu?.TenNguoiDangBai}</p>
                                            <p className="text-xs text-gray-500">ID: #{dulieu?.ID_NguoiDang}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Người báo cáo */}
                            <div>
                                <span className="block text-xs font-bold text-green-600 uppercase tracking-wider mb-2">📢 Người báo cáo</span>
                                <div className="bg-white p-4 rounded-lg border-l-4 border-green-500 shadow-sm ring-1 ring-gray-200">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">B</div>
                                        <div>
                                            <p className="font-bold text-gray-800">{DuLieu.DuLieu.NguoiBaoCao}</p>
                                            <p className="text-xs text-gray-500">ID: #{DuLieu.DuLieu.reporter_id}</p>
                                        </div>
                                    </div>
                                    <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-green-600 font-medium flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Thành viên uy tín
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 3. Nội dung báo cáo */}
                        <div>
                            <span className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Lý do báo cáo</span>
                            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg text-sm italic relative">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-200 absolute right-2 top-2 -z-0" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.017 16H9.01697C7.9124 16 7.01697 16.8954 7.01697 18L7.01697 21H14.017ZM21.017 6.00002C21.017 5.61931 20.916 5.25303 20.7363 4.93305L16.2736 12H21.0028C20.9419 12.5716 20.7107 13.107 20.3294 13.549L13.8856 21.0184C13.2504 21.7547 12.1157 21.8596 11.3503 21.2537C11.1396 21.0869 10.9754 20.8732 10.875 20.631L9.27402 16.7686C9.13063 16.4227 9.3879 16.0827 9.75239 15.9555L14.8983 14.1587L11.7163 12H5.01697C3.9124 12 3.01697 11.1046 3.01697 10V6.00002C3.01697 4.89545 3.9124 4.00002 5.01697 4.00002H19.017C20.1216 4.00002 21.017 4.89545 21.017 6.00002Z"></path>
                                </svg>
                                <span className="relative z-10">"{DuLieu.DuLieu.reason}."</span>
                            </div>
                        </div>

                    </div>
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row justify-end gap-3">
                        <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-all">
                            Bỏ qua báo cáo
                        </button>
                        <button className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all shadow-sm flex items-center justify-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Xóa bài viết
                        </button>
                    </div>
                </div>
        </>
    );
};

export default ChiTietXuLiViPham;
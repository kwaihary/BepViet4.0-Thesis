import React, { useEffect, useState } from 'react';
import * as API from '../../JS/API/API';

function ChiTietBaiDang({ DuLieu }) {
    const [loading, setloading] = useState(false);
    const [DuLieu_NguyenLieu, setNguyenLieu] = useState([]);
    const [DuLieu_BuocLam, setBuocLam] = useState([]);

    useEffect(() => {
        if (!DuLieu?.id) return;

        const LayTT_BaiViet = async () => {
            setloading(true);
            try {
                const [data1, data2] = await Promise.all([
                    API.CallAPI(undefined, { PhuongThuc: 2, url: `admin/TTBaiViet_NguyenLieu?id=${DuLieu.id}` }),
                    API.CallAPI(undefined, { PhuongThuc: 2, url: `admin/TTBaiViet_BuocLam?id=${DuLieu.id}` })
                ]);
                if (data1.status) {
                    setNguyenLieu(data1.data);
                }
                if (data2.status) {
                    const sortedSteps = data2.data.sort((a, b) => a.step_order - b.step_order);
                    setBuocLam(sortedSteps);
                }

            } catch (error) {
                console.error('Lỗi xảy ra:', error);
            } finally {
                setloading(false);
            }
        }
        LayTT_BaiViet();
    }, [DuLieu.id]); 


    if (loading) {
        return (
            <div className="absolute inset-0 bg-white/80 z-10 flex items-center justify-center">
                <span className="text-indigo-600 font-bold flex items-center gap-2">
                    
                    <svg className="animate-spin h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Đang tải dữ liệu...
                </span>
            </div>
        );
    }


    const currentStatus = DuLieu?.DuLieu?.status || 'Đang chờ';

    return (
        <div className="flex flex-col h-full relative bg-slate-50">
         
            <div className="flex-1 overflow-y-auto custom-scrollbar scroll-smooth">
                <div className="p-5 lg:p-8">
                    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden min-h-[500px]">

                      
                        <div className="relative h-72 md:h-96 group">
                            <img 
                                src={DuLieu.image_url || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"} 
                                alt={DuLieu.title} 
                                className="w-full h-full object-cover" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                            <div className="absolute bottom-6 left-6 text-white right-6">
                                <h1 className="text-3xl md:text-4xl font-extrabold mb-3 shadow-sm leading-tight">
                                    {DuLieu.title || "Tên món ăn chưa cập nhật"}
                                </h1>
                                <div className="flex flex-wrap gap-2 text-sm font-medium">
                                    <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 border border-white/10">
                                        <span className="material-icons-round text-sm">timer</span> 
                                        Thời gian nấu: {DuLieu?.DuLieu?.cook_time || 0} phút
                                    </span>
                                </div>
                            </div>
                        </div>

                      
                        <div className="p-8">
                       
                            <div className="mb-10 relative">
                                <span className="absolute -top-4 -left-2 text-6xl text-orange-100 font-serif opacity-50">"</span>
                                <p className="text-slate-600 leading-relaxed text-lg italic border-l-4 border-orange-300 pl-5 relative z-10">
                                    {DuLieu.description || "Chưa có mô tả cho món ăn này."}
                                </p>
                            </div>

                          
                            <div className="mb-12">
                                <h3 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2 uppercase tracking-wide">
                                    <span className="material-icons-round text-orange-500">list_alt</span> Nguyên liệu
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {DuLieu_NguyenLieu && DuLieu_NguyenLieu.length > 0 ? (
                                        DuLieu_NguyenLieu.map((NguyenLieu, index) => (
                                            <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-slate-50 transition-colors border border-slate-100">
                                                <span className="font-medium text-slate-700">{NguyenLieu.note}</span>
                                                <span className="font-bold text-slate-800 bg-white px-2.5 py-1 rounded text-sm shadow-sm border border-slate-200">{NguyenLieu.quantity}</span>
                                            </div>
                                        ))
                                    ) : (
                                       
                                        <div className="col-span-full flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 rounded-lg bg-slate-50/50">
                                            <span className="material-icons-round text-4xl text-slate-300 mb-2">kitchen</span>
                                            <p className="text-slate-500 font-medium">Chưa có nguyên liệu nào</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            
                            <div>
                                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2 uppercase tracking-wide">
                                    <span className="material-icons-round text-orange-500">restaurant_menu</span> Cách thực hiện
                                </h3>

                                <div className="space-y-8 relative pl-2">
                                    <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-slate-200"></div>
                                    {DuLieu_BuocLam && DuLieu_BuocLam.length > 0 ? (
                                        DuLieu_BuocLam.map((BuocLam, index) => (
                                            <div key={index} className="relative pl-10 group">
                                                <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-white border-2 border-orange-100 text-orange-600 flex items-center justify-center font-bold text-lg shadow-sm z-10 group-hover:border-orange-500 group-hover:bg-orange-50 transition-all">
                                                    {BuocLam.step_order}
                                                </div>
                                                <h4 className="font-bold text-lg text-slate-800 mb-2">{BuocLam.content}</h4>
                                                {BuocLam.image_url && (
                                                    <img src={BuocLam.image_url} className="rounded-xl w-full md:w-80 object-cover shadow-md mt-3" alt={`Step ${BuocLam.step_order}`} />
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        // Empty State Cách làm
                                        <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 rounded-lg bg-slate-50/50">
                                            <span className="material-icons-round text-4xl text-slate-300 mb-2">menu_book</span>
                                            <p className="text-slate-500 font-medium">Chưa có hướng dẫn thực hiện</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                 
                    <div className="h-24"></div>
                </div>
            </div>

           
            <div className="p-4 border-t border-slate-200 bg-white z-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
                     
        
                    <div className="flex items-center gap-3">
                         <img 
                            src={DuLieu?.DuLieu?.author?.avatar || "https://i.pravatar.cc/150"} 
                            alt="User" 
                            className="w-10 h-10 rounded-full border border-slate-200" 
                         />
                         <div>
                             <div className="font-bold text-slate-800 text-sm">
                                {DuLieu?.DuLieu?.author?.name || "Người dùng ẩn danh"}
                             </div>
                             <div className="flex items-center gap-2 text-xs text-slate-500">
                                 <span>ID: {DuLieu?.id}</span>
                                 <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                                     currentStatus === 'Đã duyệt' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                                     currentStatus === 'Đã xóa' ? 'bg-red-50 text-red-600 border-red-100' : 
                                     'bg-orange-50 text-orange-600 border-orange-100'
                                 }`}>
                                    {currentStatus}
                                 </span>
                             </div>
                         </div>
                    </div>

                
                    <div className="flex gap-3">
                        {currentStatus === 'Đang chờ' && (
                            <>
                                <button className="flex items-center justify-center gap-2 py-2.5 px-5 border-2 border-red-100 text-red-500 font-bold rounded-lg hover:bg-red-50 hover:border-red-200 transition-all text-sm">
                                    <span className="material-icons-round text-lg">Từ chối</span> 
                                    
                                </button>
                                <button className="flex items-center justify-center gap-2 py-2.5 px-6 bg-emerald-500 text-white font-bold rounded-lg shadow-md shadow-emerald-200 hover:bg-emerald-600 hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm">
                                    <span className="material-icons-round text-lg"> Duyệt bài</span> 
                                   
                                </button>
                            </>
                        )}

    
                        {currentStatus === 'Đã duyệt' && (
                            <button className="flex items-center justify-center gap-2 py-2.5 px-6 bg-amber-500 text-white font-bold rounded-lg shadow-md shadow-amber-200 hover:bg-amber-600 hover:shadow-lg transition-all text-sm">
                                <span className="material-icons-round text-lg"> Khóa bài viết</span> 
                               
                            </button>
                        )}

                    
                        {currentStatus === 'Đã xóa' && (
                            <button className="flex items-center justify-center gap-2 py-2.5 px-6 bg-slate-500 text-white font-bold rounded-lg shadow-md hover:bg-slate-600 transition-all text-sm">
                                <span className="material-icons-round text-lg">Khôi phục</span> 
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChiTietBaiDang;
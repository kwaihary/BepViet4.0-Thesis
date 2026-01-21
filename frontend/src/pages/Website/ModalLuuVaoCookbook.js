import React, { useState, useEffect } from 'react';
import * as ThongBao from '../../JS/FUNCTION/ThongBao';

function ModalLuuVaoCookbook({ isOpen, onClose, recipe }) {
    const [myCookbooks, setMyCookbooks] = useState([]);

    useEffect(() => {
        if (isOpen) {
            const saved = JSON.parse(localStorage.getItem('my_cookbooks')) || [];
            setMyCookbooks(saved);
        }
    }, [isOpen]);

    const handleToggleSave = (cookbookId, cookbookName) => {
        if (!recipe || !recipe.id) return;

        const allCookbooks = JSON.parse(localStorage.getItem('my_cookbooks')) || [];
        let actionType = 'add'; // Mặc định là thêm mới

        const updated = allCookbooks.map(cb => {
            if (cb.id === cookbookId) {
                const recipesInCb = cb.recipes || [];
                const isExist = recipesInCb.some(r => r.id === recipe.id);
                
                if (isExist) {
                    // --- CHỨC NĂNG HỦY LƯU ---
                    actionType = 'remove';
                    const filteredRecipes = recipesInCb.filter(r => r.id !== recipe.id);
                    return { ...cb, recipes: filteredRecipes };
                } else {
                    // --- CHỨC NĂNG THÊM MỚI ---
                    actionType = 'add';
                    return { ...cb, recipes: [...recipesInCb, recipe] };
                }
            }
            return cb;
        });

        // Cập nhật LocalStorage
        localStorage.setItem('my_cookbooks', JSON.stringify(updated));

        // Hiển thị thông báo tương ứng bằng bộ ThongBao của bạn
        if (actionType === 'remove') {
            ThongBao.ThongBao_ThanhCong(`Đã xóa khỏi bộ sưu tập: ${cookbookName}`);
        } else {
            ThongBao.ThongBao_ThanhCong(`Đã thêm vào bộ sưu tập: ${cookbookName}`);
        }
        
        // Cập nhật lại UI trong modal ngay lập tức
        setMyCookbooks(updated);
        
        // Tùy chọn: Đóng modal sau khi thao tác xong
        // onClose(); 
    };

    if (!isOpen || !recipe) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 shadow-2xl">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose}></div>
            <div className="bg-white rounded-[2.5rem] w-full max-w-sm relative z-10 overflow-hidden animate-in zoom-in duration-300 text-left">
                <div className="p-8">
                    <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
                            <i className="fa-solid fa-folder-open"></i>
                        </div>
                        <h3 className="text-xl font-black text-gray-900">Quản lý Cookbook</h3>
                        <p className="text-sm text-gray-400 mt-1 truncate">Món: {recipe.title}</p>
                    </div>
                    
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-1 no-scrollbar">
                        {myCookbooks.length > 0 ? myCookbooks.map(cb => {
                            // Kiểm tra xem bài viết này đã có trong cookbook này chưa để đổi Icon
                            const isSavedInThisCb = cb.recipes?.some(r => r.id === recipe.id);
                            
                            return (
                                <button 
                                    key={cb.id}
                                    onClick={() => handleToggleSave(cb.id, cb.name)}
                                    className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all group ${
                                        isSavedInThisCb 
                                        ? 'bg-red-50 border border-red-100' 
                                        : 'bg-gray-50 border border-transparent hover:bg-red-600 hover:text-white'
                                    }`}
                                >
                                    <span className={`font-bold ${isSavedInThisCb ? 'text-red-600' : 'text-gray-700 group-hover:text-white'}`}>
                                        {cb.name}
                                    </span>
                                    
                                    {isSavedInThisCb ? (
                                        <i className="fa-solid fa-circle-check text-red-500"></i>
                                    ) : (
                                        <i className="fa-solid fa-plus text-xs opacity-30 group-hover:opacity-100"></i>
                                    )}
                                </button>
                            );
                        }) : (
                            <div className="text-center py-4 bg-orange-50 rounded-2xl border border-orange-100">
                                <p className="text-xs text-orange-600 font-medium">Bạn chưa tạo bộ sưu tập nào.</p>
                            </div>
                        )}
                    </div>
                    
                    <button onClick={onClose} className="w-full mt-6 py-4 text-gray-400 font-bold hover:text-gray-600 transition text-center">
                        Hoàn tất
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalLuuVaoCookbook;
import React, { createContext, useContext, useState } from "react";
import ChinhSua from "../component/website/ChinhSuaThongTinNguoiDung";
import ChiTietXuLiViPham from "../component/admin/ChiTietXuLiViPham";


const MoDalContext = createContext();

const MODAL_REGISTRY = {
    'ChuaSuaThongTin' : ChinhSua,
    'XuLiViPham' : ChiTietXuLiViPham
};

export function AppProvider({ children }) {
    const [modalStack, setModalStack] = useState([]);
    const OpenMoDal = (dulieu, yeucau) => {
        setModalStack((prev) => [
            ...prev,
            {
                id: Date.now(),
                TenTrang: yeucau.TenTrang,
                DuLieu: dulieu || null,
                url: yeucau.url || null,
                icon: yeucau.icon || null,
                TieuDe: yeucau.TieuDe || null
            }
        ]);
    };


    const CloseMoDal = () => {
        setModalStack((prev) => {
            if (prev.length === 0) return [];
            return prev.slice(0, -1);
        });
    };

    const CloseAllModals = () => {
        setModalStack([]);
    };
    const renderModal = () => {
        if (!modalStack || modalStack.length === 0) return null;
        const item = modalStack[modalStack.length - 1];
        const TargetComponent = MODAL_REGISTRY[item.TenTrang];

        if (!TargetComponent) return null;

        return (
            <div className="fixed inset-0 z-[1000] bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4 transition-all duration-300 animate-fadeIn">
                <div
                    className="flex flex-col bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100
                               w-auto md:min-w-[400px] max-w-[95vw] max-h-[90vh]"
                    style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
                >
                    {/* --- HEADER --- */}
                    <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white shrink-0 sticky top-0 z-10 gap-8">
                        <div className="flex items-center gap-4">
                            {modalStack.length > 1 && (
                                <button
                                    onClick={CloseMoDal} 
                                    className="group w-9 h-9 rounded-full bg-gray-50 border border-gray-200 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 flex items-center justify-center text-gray-500 transition-all duration-200 shrink-0"
                                    title="Quay lại trang trước"
                                >
                                    <i className="fa-solid fa-arrow-left text-sm group-hover:-translate-x-0.5 transition-transform"></i>
                                </button>
                            )}

                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shadow-sm shrink-0">
                                    <i className={`${item.icon || 'fa-solid fa-layer-group'}`}></i>
                                </div>
                                <div className="whitespace-nowrap">
                                    <h3 className="text-lg font-bold text-gray-800 leading-tight">
                                        {item.TieuDe || 'Thông tin'}
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={CloseAllModals} 
                            className="w-9 h-9 rounded-full bg-transparent text-gray-400 hover:bg-red-50 hover:text-red-500 hover:rotate-90 flex items-center justify-center transition-all duration-300 focus:outline-none shrink-0"
                            title="Đóng cửa sổ"
                        >
                            <i className="fa-solid fa-xmark text-xl"></i>
                        </button>
                    </div>
                    <div key={item.id} className="flex-1 overflow-y-auto custom-scrollbar bg-white p-6 relative animate-fadeIn">
                        <TargetComponent
                            DuLieu={item.DuLieu}
                            url={item.url}
                            onClose={CloseMoDal} 
                        />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <MoDalContext.Provider value={{ OpenMoDal, CloseMoDal, CloseAllModals, modalStack }}>
            {children}
            {renderModal()}
        </MoDalContext.Provider>
    );
}

export function useModalContext() {
    return useContext(MoDalContext);
}
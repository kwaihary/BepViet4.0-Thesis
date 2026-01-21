import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as ThongBao from '../../JS/FUNCTION/ThongBao';

function Cookbook() {
    const [myCookbooks, setMyCookbooks] = useState([]);
    const [showModal, setShowModal] = useState(false); // Modal tạo mới
    const [showRenameModal, setShowRenameModal] = useState(false); // Modal đổi tên
    
    const [newCookbookName, setNewCookbookName] = useState("");
    const [editId, setEditId] = useState(null); // Lưu ID bộ sưu tập đang sửa
    const [editName, setEditName] = useState(""); // Lưu tên mới đang nhập
    const [activeMenu, setActiveMenu] = useState(null);

    const loadCookbooks = () => {
        const saved = JSON.parse(localStorage.getItem('my_cookbooks')) || [];
        setMyCookbooks(saved);
    };

    useEffect(() => {
        loadCookbooks();
        const closeMenu = () => setActiveMenu(null);
        window.addEventListener('click', closeMenu);
        return () => window.removeEventListener('click', closeMenu);
    }, []);

    // 1. Hàm tạo mới
    const handleCreateCookbook = () => {
        if (!newCookbookName.trim()) {
            ThongBao.ThongBao_CanhBao("Vui lòng nhập tên bộ sưu tập!");
            return;
        }
        const newEntry = {
            id: Date.now().toString(),
            name: newCookbookName,
            recipes: [],
            updatedAt: new Date().toLocaleDateString()
        };
        const updatedList = [...myCookbooks, newEntry];
        localStorage.setItem('my_cookbooks', JSON.stringify(updatedList));
        setMyCookbooks(updatedList);
        setNewCookbookName("");
        setShowModal(false);
        ThongBao.ThongBao_ThanhCong("Đã tạo bộ sưu tập mới!");
    };

    // 2. Hàm mở Modal đổi tên
    const openRenameModal = (e, item) => {
        e.preventDefault();
        e.stopPropagation();
        setEditId(item.id);
        setEditName(item.name);
        setShowRenameModal(true);
        setActiveMenu(null);
    };

    // 3. Hàm xử lý lưu tên mới
    const handleSaveRename = () => {
        if (!editName.trim()) {
            ThongBao.ThongBao_CanhBao("Tên không được để trống!");
            return;
        }
        const updated = myCookbooks.map(cb => 
            cb.id === editId ? { ...cb, name: editName.trim() } : cb
        );
        localStorage.setItem('my_cookbooks', JSON.stringify(updated));
        setMyCookbooks(updated);
        setShowRenameModal(false);
        ThongBao.ThongBao_ThanhCong("Đã cập nhật tên bộ sưu tập");
    };

    // 4. Hàm xóa
    const handleDelete = async (e, id, name) => {
        e.preventDefault();
        e.stopPropagation();
        const xacNhan = await ThongBao.ThongBao_XacNhanTT(`Xóa bộ sưu tập "${name}"?`);
        if (xacNhan) {
            const updated = myCookbooks.filter(cb => cb.id !== id);
            localStorage.setItem('my_cookbooks', JSON.stringify(updated));
            setMyCookbooks(updated);
            ThongBao.ThongBao_ThanhCong("Đã xóa bộ sưu tập");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <main className="container mx-auto px-4 max-w-6xl pt-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div className="text-left">
                        <h1 className="text-2xl font-black text-gray-900">Thư viện của tôi</h1>
                        <p className="text-gray-500 text-sm mt-1 font-medium">Lưu giữ những công thức yêu thích của bạn</p>
                    </div>
                    <button onClick={() => setShowModal(true)} className="bg-red-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-red-700 transition flex items-center gap-2 shadow-lg shadow-red-100">
                        <i className="fa-solid fa-plus"></i> Tạo Cookbook mới
                    </button>
                </div>

                {/* Grid Danh sách */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {myCookbooks.map((item) => (
                        <div key={item.id} className="relative group">
                            {/* Menu Button */}
                            <div className="absolute top-4 right-4 z-20">
                                <button 
                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveMenu(activeMenu === item.id ? null : item.id); }}
                                    className="w-9 h-9 rounded-xl bg-white/90 backdrop-blur-md shadow-sm border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-600 transition"
                                >
                                    <i className="fa-solid fa-ellipsis-vertical"></i>
                                </button>
                                {activeMenu === item.id && (
                                    <div className="absolute right-0 mt-2 w-44 bg-white rounded-2xl shadow-2xl border border-gray-50 py-2 z-30 animate-in fade-in zoom-in duration-200">
                                        <button onClick={(e) => openRenameModal(e, item)} className="w-full text-left px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-3">
                                            <i className="fa-regular fa-pen-to-square text-blue-500"></i> Đổi tên bộ sưu tập
                                        </button>
                                        <button onClick={(e) => handleDelete(e, item.id, item.name)} className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 font-medium">
                                            <i className="fa-regular fa-trash-can"></i> Xóa bộ sưu tập
                                        </button>
                                    </div>
                                )}
                            </div>

                            <Link to={`/ChiTietCookBook/${item.id}`} className="block">
                                <div className="bg-white p-3 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition duration-500 h-full flex flex-col">
                                    <div className="grid grid-cols-2 gap-1.5 mb-4 h-44 rounded-[1.5rem] overflow-hidden relative bg-orange-50">
                                        {item.recipes?.length > 0 ? (
                                            item.recipes.slice(0, 2).map((r, i) => (
                                                <img key={i} src={r.image} className="w-full h-full object-cover" alt="" />
                                            ))
                                        ) : (
                                            <div className="col-span-2 flex items-center justify-center text-orange-200">
                                                <i className="fa-solid fa-folder-open text-5xl"></i>
                                            </div>
                                        )}
                                    </div>
                                    <div className="px-2 pb-2 text-left">
                                        <h3 className="font-black text-gray-800 group-hover:text-red-600 transition truncate text-lg">{item.name}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[10px] font-black bg-red-50 text-red-500 px-2.5 py-1 rounded-lg uppercase tracking-widest">
                                                {item.recipes?.length || 0} món ăn
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </main>

            {/* --- MODAL CHUNG CHO TẠO MỚI & ĐỔI TÊN --- */}
            {(showModal || showRenameModal) && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" 
                        onClick={() => { setShowModal(false); setShowRenameModal(false); }}></div>
                    
                    <div className="bg-white rounded-[2.5rem] w-full max-w-md relative z-10 shadow-2xl overflow-hidden animate-in zoom-in duration-300 text-left">
                        <div className="p-8">
                            <div className="text-center mb-8">
                                <div className={`w-16 h-16 ${showRenameModal ? 'bg-blue-50 text-blue-500' : 'bg-red-50 text-red-500'} rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl`}>
                                    <i className={showRenameModal ? "fa-solid fa-pen-nib" : "fa-solid fa-folder-plus"}></i>
                                </div>
                                <h2 className="text-2xl font-black text-gray-900">
                                    {showRenameModal ? "Đổi tên bộ sưu tập" : "Tạo bộ sưu tập mới"}
                                </h2>
                                <p className="text-sm text-gray-400 mt-1">Hãy đặt một cái tên thật ấn tượng nhé!</p>
                            </div>
                            
                            <div className="space-y-6">
                                <div>
                                    <input 
                                        type="text" 
                                        autoFocus
                                        value={showRenameModal ? editName : newCookbookName}
                                        onChange={(e) => showRenameModal ? setEditName(e.target.value) : setNewCookbookName(e.target.value)}
                                        placeholder="Tên bộ sưu tập..." 
                                        className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-red-500 focus:bg-white rounded-2xl focus:outline-none transition-all font-bold text-gray-700 placeholder:text-gray-300"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 mt-8">
                                <button 
                                    onClick={showRenameModal ? handleSaveRename : handleCreateCookbook}
                                    className={`w-full py-4 ${showRenameModal ? 'bg-blue-600 shadow-blue-100' : 'bg-red-600 shadow-red-100'} text-white font-black rounded-2xl shadow-xl transition active:scale-95`}
                                >
                                    {showRenameModal ? "Cập nhật ngay" : "Tạo bộ sưu tập"}
                                </button>
                                <button 
                                    onClick={() => { setShowModal(false); setShowRenameModal(false); }} 
                                    className="w-full py-4 text-gray-400 font-bold hover:text-gray-600 transition"
                                >
                                    Bỏ qua
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cookbook;
import { useState } from "react";

function DangBai() {
    // State quản lý danh sách nguyên liệu
    const [ingredients, setIngredients] = useState([
        { id: 1, name: "", quantity: "" },
        { id: 2, name: "", quantity: "" }
    ]);

    // State quản lý danh sách các bước
    const [steps, setSteps] = useState([
        { id: 1, content: "" }
    ]);

    // Xử lý nguyên liệu
    const handleAddIngredient = () => {
        setIngredients([...ingredients, { id: Date.now(), name: "", quantity: "" }]);
    };

    const handleRemoveIngredient = (id) => {
        if (ingredients.length > 1) {
            setIngredients(ingredients.filter(item => item.id !== id));
        }
    };

    // Xử lý các bước làm
    const handleAddStep = () => {
        setSteps([...steps, { id: Date.now(), content: "" }]);
    };

    const handleRemoveStep = (id) => {
        if (steps.length > 1) {
            setSteps(steps.filter(item => item.id !== id));
        }
    };

    return (
        <div className=" bg-gray-50 font-sans">
            {/* --- Navigation Bar --- */}
            <nav className="bg-white border-b h-16 fixed w-full top-0 z-50 flex items-center justify-between px-6 shadow-sm">
                <div className="flex items-center gap-4">
                    <a href="/home" className="text-gray-500 hover:text-gray-800 transition-colors">
                        <i className="fa-solid fa-xmark text-xl"></i>
                    </a>
                    <span className="font-bold text-lg text-gray-800">Tạo công thức mới</span>
                </div>
                {/* Nút đăng bài nhanh trên Header */}
                <button className="bg-red-600 text-white px-6 py-2 rounded-full font-bold hover:bg-red-700 transition-colors text-sm shadow-md">
                    Đăng bài
                </button>
            </nav>

            {/* --- Main Content --- */}
            <div className="container mx-auto mt-24 max-w-3xl pb-32 px-4">

                {/* 1. Giới thiệu món ăn */}
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 mb-6">
                    <h3 className="font-bold text-xl mb-6 text-gray-800 border-l-4 border-red-500 pl-3">1. Giới thiệu món ăn</h3>

                    {/* Upload Ảnh */}
                    <div className="border-2 border-dashed border-gray-300 rounded-xl h-64 flex flex-col items-center justify-center bg-gray-50 hover:bg-red-50 hover:border-red-300 transition-all cursor-pointer mb-8 group">
                        <i className="fa-solid fa-cloud-arrow-up text-4xl text-gray-300 group-hover:text-red-400 mb-3 transition-colors"></i>
                        <p className="text-gray-500 font-medium group-hover:text-red-500 transition-colors">Tải ảnh bìa món ăn</p>
                        <p className="text-xs text-gray-400 mt-2">Hỗ trợ JPG, PNG (Tối đa 5MB)</p>
                    </div>

                    <div className="space-y-5">
                        <div>
                            <label className="block font-bold text-sm text-gray-700 mb-2">Tên món ăn <span className="text-red-500">*</span></label>
                            <input type="text" placeholder="Ví dụ: Cá kho tộ, Canh chua..." className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-200 focus:border-red-500 outline-none transition-all" />
                        </div>
                        <div>
                            <label className="block font-bold text-sm text-gray-700 mb-2">Mô tả ngắn</label>
                            <textarea rows="3" placeholder="Hãy chia sẻ cảm nghĩ hoặc nguồn gốc của món ăn này..." className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-200 focus:border-red-500 outline-none transition-all"></textarea>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block font-bold text-sm text-gray-700 mb-2">Thời gian (phút)</label>
                                <div className="relative">
                                    <input type="number" min="0" className="w-full border border-gray-300 rounded-lg p-3 pr-10 focus:ring-2 focus:ring-red-200 focus:border-red-500 outline-none" />
                                    <span className="absolute right-3 top-3 text-gray-400 text-sm">phút</span>
                                </div>
                            </div>
                            <div>
                                <label className="block font-bold text-sm text-gray-700 mb-2">Khẩu phần</label>
                                <div className="relative">
                                    <input type="number" min="1" className="w-full border border-gray-300 rounded-lg p-3 pr-10 focus:ring-2 focus:ring-red-200 focus:border-red-500 outline-none" />
                                    <span className="absolute right-3 top-3 text-gray-400 text-sm">người</span>
                                </div>
                            </div>
                            <div>
                                <label className="block font-bold text-sm text-gray-700 mb-2">Độ khó</label>
                                <select className="w-full border border-gray-300 rounded-lg p-3 bg-white focus:ring-2 focus:ring-red-200 focus:border-red-500 outline-none cursor-pointer">
                                    <option>Dễ</option>
                                    <option>Trung bình</option>
                                    <option>Khó</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Nguyên liệu */}
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 mb-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-xl text-gray-800 border-l-4 border-red-500 pl-3">2. Nguyên liệu</h3>
                        <button 
                            onClick={handleAddIngredient}
                            className="text-red-600 font-bold text-sm bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                        >
                            <i className="fa-solid fa-plus"></i> Thêm dòng
                        </button>
                    </div>

                    <div className="space-y-3">
                        {ingredients.map((item, index) => (
                            <div key={item.id} className="flex gap-3 group">
                                <div className="flex-none pt-3 text-gray-400 cursor-move"><i className="fa-solid fa-grip-lines"></i></div>
                                <input type="text" placeholder={`Nguyên liệu ${index + 1} (vd: Thịt heo)`} className="flex-1 border border-gray-300 rounded-lg p-2.5 focus:border-red-500 outline-none" />
                                <input type="text" placeholder="Số lượng (vd: 500g)" className="w-1/3 border border-gray-300 rounded-lg p-2.5 focus:border-red-500 outline-none" />
                                <button 
                                    onClick={() => handleRemoveIngredient(item.id)}
                                    className="text-gray-300 hover:text-red-500 px-2 transition-colors"
                                    title="Xóa dòng"
                                >
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3. Cách làm */}
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-xl text-gray-800 border-l-4 border-red-500 pl-3">3. Cách làm</h3>
                        <button 
                            onClick={handleAddStep}
                            className="text-red-600 font-bold text-sm bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                        >
                            <i className="fa-solid fa-plus"></i> Thêm bước
                        </button>
                    </div>

                    <div className="space-y-8">
                        {steps.map((step, index) => (
                            <div key={step.id} className="flex gap-4 group relative">
                                <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0 shadow-md">
                                    {index + 1}
                                </div>
                                <div className="flex-1 space-y-3">
                                    <textarea rows="3" placeholder={`Mô tả chi tiết bước ${index + 1}...`} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-200 focus:border-red-500 outline-none transition-all"></textarea>
                                    <div className="flex gap-3">
                                        <button className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-200 transition-colors flex items-center gap-2">
                                            <i className="fa-solid fa-camera"></i> Thêm ảnh
                                        </button>
                                        {steps.length > 1 && (
                                            <button 
                                                onClick={() => handleRemoveStep(step.id)}
                                                className="text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg text-sm transition-colors"
                                            >
                                                Xóa bước này
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-end gap-4 border-t border-gray-200 pt-6">
                    <button className="px-6 py-3 rounded-lg text-gray-600 font-semibold hover:bg-gray-100 hover:text-gray-800 transition-colors">
                        Hủy bỏ
                    </button>
                    <button className="bg-red-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5">
                        Đăng công thức
                    </button>
                </div>

            </div>
        </div>
    );
}

export default DangBai;
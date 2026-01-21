import { useState } from "react";
import { objectToFormData } from "./function"; //
import { CallAPI } from "./API"; //
import { ThongBao_ThanhCong, ThongBao_Loi } from "./ThongBao"; //
import Cookies from "js-cookie"; // Cần cài: npm install js-cookie

function DangBai() {
    // State quản lý thông tin chung
    const [info, setInfo] = useState({
        title: "",
        description: "",
        cook_time: "",
        portion: "", // Khẩu phần (DB chưa có cột này, có thể thêm hoặc bỏ qua)
        difficulty: "Dễ",
    });

    // State ảnh preview và file
    const [previewImage, setPreviewImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    // State nguyên liệu & bước làm
    const [ingredients, setIngredients] = useState([{ id: 1, name: "", quantity: "" }]);
    const [steps, setSteps] = useState([{ id: 1, content: "" }]);

    // --- CÁC HÀM XỬ LÝ INPUT ---

    // Xử lý thay đổi thông tin chung
    const handleChangeInfo = (e) => {
        const { name, value } = e.target;
        setInfo({ ...info, [name]: value });
    };

    // Xử lý chọn ảnh
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    // Xử lý nguyên liệu (Thêm, Sửa, Xóa)
    const handleIngredientChange = (id, field, value) => {
        const newIngredients = ingredients.map(item => 
            item.id === id ? { ...item, [field]: value } : item
        );
        setIngredients(newIngredients);
    };

    const handleAddIngredient = () => {
        setIngredients([...ingredients, { id: Date.now(), name: "", quantity: "" }]);
    };

    const handleRemoveIngredient = (id) => {
        if (ingredients.length > 1) setIngredients(ingredients.filter(item => item.id !== id));
    };

    // Xử lý các bước (Thêm, Sửa, Xóa)
    const handleStepChange = (id, value) => {
        const newSteps = steps.map(item => 
            item.id === id ? { ...item, content: value } : item
        );
        setSteps(newSteps);
    };

    const handleAddStep = () => {
        setSteps([...steps, { id: Date.now(), content: "" }]);
    };

    const handleRemoveStep = (id) => {
        if (steps.length > 1) setSteps(steps.filter(item => item.id !== id));
    };

    // --- HÀM SUBMIT ---
    const handleSubmit = async () => {
        // 1. Chuẩn bị dữ liệu
        const dataObj = {
            title: info.title,
            description: info.description,
            cook_time: info.cook_time,
            difficulty: info.difficulty,
            ingredients: ingredients, // objectToFormData sẽ tự xử lý mảng này
            steps: steps,
            file_image: imageFile // File ảnh
        };

        // 2. Chuyển sang FormData
        const formData = objectToFormData(dataObj);

        // 3. Lấy Token (Giả sử bạn lưu trong cookie tên 'token' hoặc 'token_bepviet')
        const token = Cookies.get('token') || Cookies.get('token_bepviet');

        if (!token) {
            ThongBao_Loi("Bạn cần đăng nhập để thực hiện chức năng này.");
            return;
        }

        // 4. Gọi API
        try {
            const res = await CallAPI(formData, {
                url: 'recipes/create',
                PhuongThuc: 1, // POST
                token: token
            });

            if (res.status === true) {
                ThongBao_ThanhCong("Đăng công thức thành công!");
                // Reset form hoặc chuyển hướng
            } else if (res.validate) {
                ThongBao_Loi(res.message); // Lỗi validate
            } else {
                ThongBao_Loi(res.message || "Có lỗi xảy ra.");
            }
        } catch (error) {
            ThongBao_Loi("Lỗi kết nối server.");
        }
    };

    return (
        <div className="bg-gray-50 font-sans">
             {/* Navbar giữ nguyên... */}
            <nav className="bg-white border-b h-16 fixed w-full top-0 z-50 flex items-center justify-between px-6 shadow-sm">
                <div className="flex items-center gap-4">
                    <span className="font-bold text-lg text-gray-800">Tạo công thức mới</span>
                </div>
            </nav>

            <div className="container mx-auto mt-24 max-w-3xl pb-32 px-4">
                {/* 1. Giới thiệu món ăn */}
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 mb-6">
                    <h3 className="font-bold text-xl mb-6 text-gray-800 border-l-4 border-red-500 pl-3">1. Giới thiệu món ăn</h3>

                    {/* Upload Ảnh */}
                    <div className="mb-8">
                        <label htmlFor="upload-cover" className="block w-full">
                            <div className={`border-2 border-dashed ${previewImage ? 'border-red-500' : 'border-gray-300'} rounded-xl h-64 flex flex-col items-center justify-center bg-gray-50 hover:bg-red-50 cursor-pointer overflow-hidden relative`}>
                                {previewImage ? (
                                    <img src={previewImage} alt="Cover" className="w-full h-full object-cover" />
                                ) : (
                                    <>
                                        <i className="fa-solid fa-cloud-arrow-up text-4xl text-gray-300 mb-3"></i>
                                        <p className="text-gray-500 font-medium">Tải ảnh bìa món ăn</p>
                                    </>
                                )}
                            </div>
                        </label>
                        <input id="upload-cover" type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                    </div>

                    <div className="space-y-5">
                        <div>
                            <label className="block font-bold text-sm text-gray-700 mb-2">Tên món ăn <span className="text-red-500">*</span></label>
                            <input name="title" value={info.title} onChange={handleChangeInfo} type="text" className="w-full border border-gray-300 rounded-lg p-3 focus:border-red-500 outline-none" />
                        </div>
                        <div>
                            <label className="block font-bold text-sm text-gray-700 mb-2">Mô tả ngắn</label>
                            <textarea name="description" value={info.description} onChange={handleChangeInfo} rows="3" className="w-full border border-gray-300 rounded-lg p-3 focus:border-red-500 outline-none"></textarea>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block font-bold text-sm text-gray-700 mb-2">Thời gian (phút)</label>
                                <input name="cook_time" value={info.cook_time} onChange={handleChangeInfo} type="number" className="w-full border border-gray-300 rounded-lg p-3 focus:border-red-500 outline-none" />
                            </div>
                            <div>
                                <label className="block font-bold text-sm text-gray-700 mb-2">Độ khó</label>
                                <select name="difficulty" value={info.difficulty} onChange={handleChangeInfo} className="w-full border border-gray-300 rounded-lg p-3 bg-white focus:border-red-500 outline-none">
                                    <option value="Dễ">Dễ</option>
                                    <option value="Trung bình">Trung bình</option>
                                    <option value="Khó">Khó</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Nguyên liệu */}
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 mb-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-xl text-gray-800 border-l-4 border-red-500 pl-3">2. Nguyên liệu</h3>
                        <button onClick={handleAddIngredient} className="text-red-600 font-bold text-sm bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg">
                            <i className="fa-solid fa-plus"></i> Thêm dòng
                        </button>
                    </div>
                    <div className="space-y-3">
                        {ingredients.map((item, index) => (
                            <div key={item.id} className="flex gap-3">
                                <input 
                                    type="text" 
                                    placeholder={`Nguyên liệu ${index + 1}`} 
                                    value={item.name}
                                    onChange={(e) => handleIngredientChange(item.id, 'name', e.target.value)}
                                    className="flex-1 border border-gray-300 rounded-lg p-2.5 focus:border-red-500 outline-none" 
                                />
                                <input 
                                    type="text" 
                                    placeholder="Số lượng" 
                                    value={item.quantity}
                                    onChange={(e) => handleIngredientChange(item.id, 'quantity', e.target.value)}
                                    className="w-1/3 border border-gray-300 rounded-lg p-2.5 focus:border-red-500 outline-none" 
                                />
                                <button onClick={() => handleRemoveIngredient(item.id)} className="text-gray-300 hover:text-red-500 px-2">
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
                        <button onClick={handleAddStep} className="text-red-600 font-bold text-sm bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg">
                            <i className="fa-solid fa-plus"></i> Thêm bước
                        </button>
                    </div>
                    <div className="space-y-8">
                        {steps.map((step, index) => (
                            <div key={step.id} className="flex gap-4">
                                <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                                    {index + 1}
                                </div>
                                <div className="flex-1 space-y-3">
                                    <textarea 
                                        rows="3" 
                                        placeholder={`Mô tả chi tiết bước ${index + 1}...`} 
                                        value={step.content}
                                        onChange={(e) => handleStepChange(step.id, e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:border-red-500 outline-none"
                                    ></textarea>
                                    {steps.length > 1 && (
                                        <button onClick={() => handleRemoveStep(step.id)} className="text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg text-sm">
                                            Xóa bước này
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex items-center justify-end gap-4 border-t border-gray-200 pt-6">
                    <button className="px-6 py-3 rounded-lg text-gray-600 font-semibold hover:bg-gray-100">Hủy bỏ</button>
                    <button onClick={handleSubmit} className="bg-red-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 shadow-lg">
                        Đăng công thức
                    </button>
                </div>
            </div>
        </div>
    );
}
export default DangBai;
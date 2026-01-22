import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { objectToFormData } from "../../JS/FUNCTION/function"; 
import * as API from '../../JS/API/API';
import * as tb from "../../JS/FUNCTION/ThongBao"; 

function DangBai() {
    const navigate = useNavigate();

    // --- 1. STATE ---
    const [DanhMuc, setDanhMuc] = useState([]);      // Cấp 1
    const [LoaiDanhMuc, setLoaiDanhMuc] = useState(''); // Lưu tên/ID loại đang chọn
    const [TenDanhMuc, setTenDanhMuc] = useState([]);   // Cấp 2
    const [loading, setloading] = useState(false);      

    const [info, setInfo] = useState({
        title: "", description: "", cook_time: "", difficulty: "Dễ", 
        category_child: "" // Quan trọng: ID danh mục con gửi đi
    });
    
    const [imageUrl, setImageUrl] = useState(""); 
    const [ingredients, setIngredients] = useState([{ id: 1, name: "", quantity: "" }]);
    const [steps, setSteps] = useState([{ id: 1, content: "" }]);
    const [showPreview, setShowPreview] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // --- 2. API LOAD DỮ LIỆU ---

    // Load Danh mục Cha
    useEffect(() => {
        const LoadDanhMuc = async () => {
            try {
                const res = await API.CallAPI(undefined, { PhuongThuc: 2, url: 'website/type_danhmuc' });
                // DEBUG: Kiểm tra dữ liệu cha từ DB
                console.log("Danh mục cha từ DB:", res.data); 
                if (res.status) setDanhMuc(res.data);
            } catch (error) { console.error(error); }
        };
        LoadDanhMuc();
    }, []);

    // Load Danh mục Con (Khi chọn Cha)
    useEffect(() => {
        // Reset lựa chọn con khi đổi cha để tránh lỗi logic
        setInfo(prev => ({ ...prev, category_child: "" }));

        if (!LoaiDanhMuc) {
            setTenDanhMuc([]);
            return;
        }

        setloading(true);
        const layDL = async () => {
            try {
                // DEBUG: Kiểm tra xem đang gọi API với giá trị gì
                console.log("Đang gọi API con với loại:", LoaiDanhMuc);
                
                const res = await API.CallAPI(undefined, { PhuongThuc: 2, url: `website/Ten_danhmuc?loai=${LoaiDanhMuc}` });
                console.log("Danh mục con trả về:", res.data); // Xem dữ liệu trả về

                if (res.status) setTenDanhMuc(res.data);
                else setTenDanhMuc([]);
            } catch (error) {
                console.error(error);
                setTenDanhMuc([]);
            } finally {
                setloading(false);
            }
        };
        layDL();
    }, [LoaiDanhMuc]);

    // --- 3. HANDLERS ---

    // Xử lý thay đổi Dropdown
    const handleChangeInfo = (e) => {
        const { name, value } = e.target;
        setInfo({ ...info, [name]: value });
    };

    const handleImageChange = (e) => setImageUrl(e.target.value);

    // Xử lý Nguyên liệu & Cách làm (Giữ nguyên logic của bạn)
    const handleIngredientChange = (id, field, value) => {
        setIngredients(ingredients.map(item => item.id === id ? { ...item, [field]: value } : item));
    };
    const handleAddIngredient = () => setIngredients([...ingredients, { id: Date.now(), name: "", quantity: "" }]);
    const handleRemoveIngredient = (id) => { if(ingredients.length > 1) setIngredients(ingredients.filter(i => i.id !== id)); };

    const handleStepChange = (id, value) => {
        setSteps(steps.map(item => item.id === id ? { ...item, content: value } : item));
    };
    const handleAddStep = () => setSteps([...steps, { id: Date.now(), content: "" }]);
    const handleRemoveStep = (id) => { if(steps.length > 1) setSteps(steps.filter(s => s.id !== id)); };

    const handleOpenPreview = () => {
        if (!info.title || !info.category_child) return tb.ThongBao_Loi("Vui lòng nhập đủ thông tin!");
        if (!imageUrl) return tb.ThongBao_Loi("Thiếu ảnh bìa!");
        setShowPreview(true);
    };

    // SUBMIT VÀ XỬ LÝ DỮ LIỆU CUỐI CÙNG
    const handleOfficialSubmit = async () => {
        setIsSubmitting(true);

        // Lọc dữ liệu rác (dòng trống)
        const cleanIngredients = ingredients
            .filter(i => i.name.trim() !== "")
            .map(({ name, quantity }) => ({ name: name.trim(), quantity: quantity.trim() }));
        
        const cleanSteps = steps
            .filter(s => s.content.trim() !== "")
            .map(({ content }) => ({ content: content.trim() }));

        // Tạo Object gửi đi
        const dataObj = {
            title: info.title.trim(),
            description: info.description.trim(),
            cook_time: Number(info.cook_time) || 0,
            difficulty: info.difficulty,
            category_id: info.category_child, // ID của danh mục con
            ingredients: JSON.stringify(cleanIngredients),
            steps: JSON.stringify(cleanSteps),
            image_url: imageUrl.trim()
        };

        // Xem log này để chắc chắn dữ liệu đúng trước khi gửi
        console.log(">>> DỮ LIỆU FINAL GỬI SERVER:", dataObj);

        try {
            const formData = objectToFormData(dataObj);
            const res = await API.CallAPI(formData, { url: 'recipes/create', PhuongThuc: 1 });
            if (res.status) {
                setShowPreview(false);
                tb.ThongBao_ThanhCong("Đăng bài thành công!");
                setTimeout(() => navigate('/'), 1500);
            } else {
                tb.ThongBao_Loi(res.message || "Thất bại");
            }
        } catch (error) {
            tb.ThongBao_Loi("Lỗi kết nối");
        } finally {
            setIsSubmitting(false);
        }
    };

    // --- 4. RENDER UI ---
    return (
        <div className="bg-gray-50 min-h-screen font-sans pb-32">
            {/* Header giữ nguyên... */}
            <div className="bg-white/90 backdrop-blur-md border-b fixed w-full top-0 z-40">
                <div className="container mx-auto max-w-5xl px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-orange-500"><i className="fa-solid fa-arrow-left text-lg"></i></button>
                        <h1 className="font-bold text-xl text-gray-800">Tạo công thức mới</h1>
                    </div>
                    <button onClick={handleOpenPreview} className="bg-orange-500 text-white px-6 py-2 rounded-full font-bold shadow-lg hover:bg-orange-600 text-sm">Đăng bài</button>
                </div>
            </div>

            <div className="container mx-auto mt-24 max-w-4xl px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* CỘT TRÁI */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Nhập URL Ảnh */}
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                            <label className="block font-semibold text-gray-700 mb-2">Ảnh bìa (URL)</label>
                            <input type="text" value={imageUrl} onChange={handleImageChange} placeholder="Nhập link ảnh..." className="w-full border border-gray-300 p-2.5 rounded-lg text-sm outline-none focus:border-orange-500 mb-3"/>
                            <div className={`aspect-square rounded-xl border-2 border-dashed ${imageUrl ? 'border-orange-500' : 'border-gray-300'} flex items-center justify-center overflow-hidden bg-gray-50`}>
                                {imageUrl ? <img src={imageUrl} alt={'123'} className="w-full h-full object-cover" onError={(e)=>{e.target.src="https://via.placeholder.com/300?text=Lỗi"}}/> : <i className="fa-solid fa-image text-3xl text-gray-300"></i>}
                            </div>
                        </div>

                        {/* --- PHẦN CHỌN DANH MỤC (ĐÃ SỬA LỖI LOGIC) --- */}
                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                            <h3 className="font-bold text-gray-800 flex items-center gap-2"><i className="fa-solid fa-list text-orange-500"></i> Phân loại</h3>
                            
                            {/* Dropdown Cấp 1 */}
                            <select 
                                value={LoaiDanhMuc} 
                                onChange={(e) => setLoaiDanhMuc(e.target.value)} 
                                className="w-full border border-gray-300 p-2.5 rounded-lg text-sm focus:border-orange-500 outline-none"
                            >
                                <option value="">-- Chọn loại món --</option>
                                {DanhMuc && DanhMuc.length > 0 && DanhMuc.map((dm, idx) => {
                                    // SỬA LỖI: Kiểm tra nếu dm là Object thì lấy thuộc tính (ví dụ name), nếu là string thì lấy chính nó
                                    const valueShow = typeof dm === 'object' ? dm.name : dm; // Hoặc dm.id tùy DB của bạn
                                    const valueKey = typeof dm === 'object' ? dm.name : dm;  // Giá trị dùng để query API con
                                    return <option key={idx} value={valueKey}>{valueShow}</option>
                                })}
                            </select>

                            {/* Dropdown Cấp 2 */}
                            {LoaiDanhMuc && (
                                <div className="animate-fade-in-down mt-2">
                                    {loading ? <div className="text-xs text-gray-500 py-2">Đang tải danh mục con...</div> : (
                                        TenDanhMuc && TenDanhMuc.length > 0 ? (
                                            <>
                                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Chi tiết</label>
                                                <select 
                                                    name="category_child" 
                                                    value={info.category_child} 
                                                    onChange={handleChangeInfo} 
                                                    className="w-full border border-orange-200 bg-orange-50/30 p-2.5 rounded-lg text-sm focus:border-orange-500 outline-none font-medium"
                                                >
                                                    <option value="">-- Chọn chi tiết --</option>
                                                    {TenDanhMuc.map((ten, idx) => {
                                                        // SỬA LỖI: Tương tự, xử lý nếu là Object (Lấy ID làm value để gửi server)
                                                        const idValue = typeof ten === 'object' ? ten.id : ten; 
                                                        const nameShow = typeof ten === 'object' ? ten.name : ten;
                                                        return <option key={idx} value={idValue}>{nameShow}</option>
                                                    })}
                                                </select>
                                            </>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center py-4 px-4 text-center bg-gray-50 border border-dashed border-gray-300 rounded-lg">
                                                <i className="fa-solid fa-folder-open text-gray-400 mb-1"></i>
                                                <span className="text-gray-600 font-medium text-xs">Chưa có danh mục con</span>
                                            </div>
                                        )
                                    )}
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-3 pt-2">
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 mb-1 block">Thời gian</label>
                                    <div className="relative">
                                        <input name="cook_time" value={info.cook_time} onChange={handleChangeInfo} type="number" placeholder="Phút" className="w-full pl-7 pr-2 py-2 border rounded-lg text-sm focus:border-orange-500 outline-none" />
                                        <i className="fa-regular fa-clock absolute left-2.5 top-2.5 text-gray-400 text-xs"></i>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 mb-1 block">Độ khó</label>
                                    <select name="difficulty" value={info.difficulty} onChange={handleChangeInfo} className="w-full py-2 border rounded-lg text-sm focus:border-orange-500 outline-none">
                                        <option value="Dễ">Dễ</option><option value="Trung bình">Vừa</option><option value="Khó">Khó</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CỘT PHẢI (Nội dung chính) */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                             <input name="title" value={info.title} onChange={handleChangeInfo} type="text" placeholder="Tên món ăn..." className="w-full text-xl font-bold border-b pb-2 outline-none" />
                             <textarea name="description" value={info.description} onChange={handleChangeInfo} placeholder="Mô tả ngắn..." className="w-full border p-3 rounded-lg h-24 outline-none"></textarea>
                        </div>

                        {/* Nguyên liệu */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                             <div className="flex justify-between mb-4"><h3 className="font-bold">Nguyên liệu</h3> <button onClick={handleAddIngredient} className="text-orange-500 text-xs font-bold">+ Thêm</button></div>
                             {ingredients.map((item, idx) => (
                                 <div key={item.id} className="flex gap-2 mb-2">
                                     <input value={item.name} onChange={(e)=>handleIngredientChange(item.id, 'name', e.target.value)} placeholder="Tên" className="border p-2 rounded w-2/3 text-sm outline-none" />
                                     <input value={item.quantity} onChange={(e)=>handleIngredientChange(item.id, 'quantity', e.target.value)} placeholder="SL" className="border p-2 rounded w-1/3 text-sm outline-none" />
                                     <button onClick={()=>handleRemoveIngredient(item.id)} className="text-gray-400 hover:text-red-500"><i className="fa-solid fa-xmark"></i></button>
                                 </div>
                             ))}
                        </div>

                        {/* Cách làm */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                             <div className="flex justify-between mb-4"><h3 className="font-bold">Cách làm</h3> <button onClick={handleAddStep} className="text-orange-500 text-xs font-bold">+ Thêm</button></div>
                             {steps.map((step, idx) => (
                                 <div key={step.id} className="flex gap-3 mb-4">
                                     <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">{idx+1}</div>
                                     <textarea value={step.content} onChange={(e)=>handleStepChange(step.id, e.target.value)} placeholder="Mô tả..." className="w-full border p-2 rounded-lg text-sm outline-none" rows="2"></textarea>
                                     <button onClick={()=>handleRemoveStep(step.id)} className="text-gray-400 hover:text-red-500"><i className="fa-solid fa-trash"></i></button>
                                 </div>
                             ))}
                             
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

                            <div>
                                <label className="block font-bold text-sm text-gray-700 mb-2">Danh mục</label>
                                <select name="difficulty" value={info.difficulty} onChange={handleChangeInfo} className="w-full border border-gray-300 rounded-lg p-3 bg-white focus:border-red-500 outline-none">
                                    <option value="Dễ">Dễ</option>
                                    <option value="Trung bình">Trung bình</option>
                                    <option value="Khó">Khó</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex justify-end gap-4 mt-8 pt-6 border-t">
                    <button  className="px-6 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-semibold">Hủy bỏ</button>
                    <button onClick={handleOpenPreview} className="px-6 py-2 rounded-lg bg-orange-500 text-white text-sm font-bold shadow hover:bg-orange-600">Xem trước & Đăng</button>
                </div>
            </div>

            {/* Modal Preview */}
            {showPreview && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60" onClick={() => setShowPreview(false)}></div>
                    <div className="bg-white rounded-xl w-full max-w-4xl h-[90vh] shadow-2xl relative z-10 flex flex-col overflow-hidden animate-fade-in-up">
                        <div className="p-4 border-b flex justify-between bg-gray-50">
                            <h2 className="font-bold text-lg">Xem trước bài viết</h2>
                            <button onClick={() => setShowPreview(false)}><i className="fa-solid fa-xmark"></i></button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6">
                            <img src={imageUrl || "https://via.placeholder.com/800"} className="w-full h-64 object-cover rounded-xl mb-4" alt="Preview"/>
                            <h1 className="text-2xl font-bold mb-2">{info.title}</h1>
                            <p className="text-gray-500 italic mb-4">{info.description}</p>
                            <div className="grid md:grid-cols-2 gap-8 mt-6">
                                <div>
                                    <h3 className="font-bold border-b pb-2 mb-3 text-orange-500">Nguyên liệu</h3>
                                    {ingredients.map((i, k)=><div key={k} className="flex justify-between border-b border-dashed py-1 text-sm"><span>{i.name}</span><b>{i.quantity}</b></div>)}
                                </div>
                                <div>
                                    <h3 className="font-bold border-b pb-2 mb-3 text-orange-500">Cách làm</h3>
                                    {steps.map((s, k)=><div key={k} className="flex gap-2 mb-2 text-sm"><span className="font-bold text-orange-500">{k+1}.</span><p>{s.content}</p></div>)}
                                </div>
                            </div>
                        </div>
                        <div className="p-4 border-t flex justify-end gap-3">
                            <button onClick={() => setShowPreview(false)} className="px-4 py-2 border rounded hover:bg-gray-50">Sửa lại</button>
                            <button onClick={handleOfficialSubmit} disabled={isSubmitting} className="px-6 py-2 bg-green-600 text-white rounded font-bold hover:bg-green-700">
                                {isSubmitting ? "Đang gửi..." : "Xác nhận đăng"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DangBai;
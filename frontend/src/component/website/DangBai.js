import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as API from '../../JS/API/API'; 
import { useModalContext } from "../../context/QuanLiModal";
import * as fun from '../../JS/FUNCTION/function'

function DangBai() {
    const { OpenMoDal } = useModalContext();
    const navigate = useNavigate();

    // --- STATE ---
    const [DanhMuc, setDanhMuc] = useState([]);
    const [LoaiDanhMuc, setLoaiDanhMuc] = useState('');
    const [TenDanhMuc, setTenDanhMuc] = useState([]);
    const [loading, setloading] = useState(false);
    
    const [info, setInfo] = useState({
        title: "", 
        description: "", 
        cook_time: "", 
        difficulty: "Dễ",
        category_child: "" 
    });
    
    const [imageUrl, setImageUrl] = useState("");
    const [ingredients, setIngredients] = useState([{ id: 1, name: "", quantity: "" }]);
    const [steps, setSteps] = useState([{ id: 1, content: "" }]);
    useEffect(() => {
        const LoadDanhMuc = async () => {
            try {
                const res = await API.CallAPI(undefined, { PhuongThuc: 2, url: 'website/type_danhmuc' });
                if (res.status) setDanhMuc(res.data);
            } catch (error) { console.error(error); }
        };
        LoadDanhMuc();
    }, []);
    useEffect(() => {
        setInfo(prev => ({ ...prev, category_child: "" }));
        setTenDanhMuc([]);
        if (!LoaiDanhMuc) return;
        setloading(true);
        const layDL = async () => {
            try {
                const res = await API.CallAPI(undefined, { PhuongThuc: 2, url: `website/Ten_danhmuc?loai=${LoaiDanhMuc}` });
                if (res.status) setTenDanhMuc(res.data);
            } catch (error) {
                console.error(error);
            } finally {
                setloading(false);
            }
        };
        layDL();
    }, [LoaiDanhMuc]);

   
    const getSubmitData = () => {
        const cleanIngredients = ingredients.filter(i => i.name.trim() !== "");
        const cleanSteps = steps.filter(s => s.content.trim() !== "");
        return {
            title: info.title.trim(),
            description: info.description.trim(),
            cook_time: Number(info.cook_time) || 0,
            difficulty: info.difficulty,
            category: {
                type: LoaiDanhMuc,
                name: TenDanhMuc, 
            },
            ingredients: cleanIngredients,
            steps: cleanSteps,
            image_url: imageUrl.trim()
        };
    };

    // --- HANDLER: ĐĂNG BÀI ---
    const handlePost = async () => {
        const data = getSubmitData();
        const formData = fun.KiemTraRong(data);
        try {
            const kq = await API.CallAPI(formData,{})
        } catch (error) {
            
        }
    };
    const handlePreview = () => {
        const data = getSubmitData();
        if (data) {
            OpenMoDal({ DuLieu: data }, { TenTrang: 'XemTruoc' });
        }
    };

    // --- HANDLER INPUT FORM ---
    const handleChangeInfo = (e) => {
        const { name, value } = e.target;
        setInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => setImageUrl(e.target.value);

    // Ingredient Handlers
    const handleIngredientChange = (id, field, value) => {
        setIngredients(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
    };
    const handleAddIngredient = () => setIngredients(prev => [...prev, { id: Date.now(), name: "", quantity: "" }]);
    const handleRemoveIngredient = (id) => { if (ingredients.length > 1) setIngredients(prev => prev.filter(i => i.id !== id)); };

    // Step Handlers
    const handleStepChange = (id, value) => {
        setSteps(prev => prev.map(item => item.id === id ? { ...item, content: value } : item));
    };
    const handleAddStep = () => setSteps(prev => [...prev, { id: Date.now(), content: "" }]);
    const handleRemoveStep = (id) => { if (steps.length > 1) setSteps(prev => prev.filter(s => s.id !== id)); };


    // --- RENDER UI ---
    return (
        <div className="bg-gray-50 min-h-screen font-sans pb-32">
            {/* Header */}
            <div className="bg-white/90 backdrop-blur-md border-b fixed w-full top-0 z-40">
                <div className="container mx-auto max-w-5xl px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-orange-500">
                            <i className="fa-solid fa-arrow-left text-lg"></i>
                        </button>
                        <h1 className="font-bold text-xl text-gray-800">Tạo công thức mới</h1>
                    </div>
                    {/* Đã gắn sự kiện handlePost vào nút Đăng bài */}
                    <button onClick={handlePost} className="bg-orange-500 text-white px-6 py-2 rounded-full font-bold shadow-lg hover:bg-orange-600 text-sm transition transform active:scale-95">
                        Đăng bài
                    </button>
                </div>
            </div>

            <div className="container mx-auto mt-24 max-w-4xl px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* CỘT TRÁI */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* URL Ảnh */}
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                            <label className="block font-semibold text-gray-700 mb-2">Ảnh bìa (URL)</label>
                            <input type="text" value={imageUrl} onChange={handleImageChange} placeholder="Nhập link ảnh..." className="w-full border border-gray-300 p-2.5 rounded-lg text-sm outline-none focus:border-orange-500 mb-3"/>
                            <div className={`aspect-square rounded-xl border-2 border-dashed ${imageUrl ? 'border-orange-500' : 'border-gray-300'} flex items-center justify-center overflow-hidden bg-gray-50 relative group`}>
                                {imageUrl ? (
                                    <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" onError={(e)=>{e.target.src="https://via.placeholder.com/300?text=Lỗi+Ảnh"}}/>
                                ) : (
                                    <div className="text-center">
                                        <i className="fa-solid fa-image text-3xl text-gray-300 mb-2"></i>
                                        <p className="text-xs text-gray-400">Chưa có ảnh</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Chọn Danh Mục */}
                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                            <h3 className="font-bold text-gray-800 flex items-center gap-2"><i className="fa-solid fa-list text-orange-500"></i> Phân loại</h3>
                            
                            <select value={LoaiDanhMuc} onChange={(e) => setLoaiDanhMuc(e.target.value)} className="w-full border border-gray-300 p-2.5 rounded-lg text-sm focus:border-orange-500 outline-none cursor-pointer">
                                <option value="">-- Chọn loại món --</option>
                                {DanhMuc.map((dm, idx) => {
                                    const val = typeof dm === 'object' ? dm.name : dm; // Logic check object/string
                                    return <option key={idx} value={val}>{val}</option>
                                })}
                            </select>

                            {/* Dropdown Cấp 2 */}
                            {LoaiDanhMuc && (
                                <div className="animate-fade-in-down mt-2">
                                    {loading ? <div className="text-xs text-center text-orange-500 py-2"><i className="fa-solid fa-spinner fa-spin"></i> Đang tải...</div> : (
                                        TenDanhMuc && TenDanhMuc.length > 0 ? (
                                            <>
                                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Chi tiết</label>
                                                <select name="category_child" value={info.category_child} onChange={handleChangeInfo} className="w-full border border-orange-200 bg-orange-50/30 p-2.5 rounded-lg text-sm focus:border-orange-500 outline-none font-medium cursor-pointer">
                                                    <option value="">-- Chọn chi tiết --</option>
                                                    {TenDanhMuc.map((ten, idx) => {
                                                        const idVal = typeof ten === 'object' ? ten.id : ten;
                                                        const nameVal = typeof ten === 'object' ? ten.name : ten;
                                                        return <option key={idx} value={idVal}>{nameVal}</option>
                                                    })}
                                                </select>
                                            </>
                                        ) : (
                                            <div className="text-center py-2 text-xs text-gray-400 border border-dashed rounded bg-gray-50">Không có mục con</div>
                                        )
                                    )}
                                </div>
                            )}

                            {/* Thời gian & Độ khó */}
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
                                    <select name="difficulty" value={info.difficulty} onChange={handleChangeInfo} className="w-full py-2 border rounded-lg text-sm focus:border-orange-500 outline-none cursor-pointer">
                                        <option value="Dễ">Dễ</option><option value="Trung bình">Vừa</option><option value="Khó">Khó</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CỘT PHẢI (Nội dung chính) */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Title & Description */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                             <input name="title" value={info.title} onChange={handleChangeInfo} type="text" placeholder="Tên món ăn của bạn là gì?" className="w-full text-xl font-bold border-b border-gray-200 pb-2 outline-none placeholder-gray-400 focus:border-orange-500 transition" />
                             <textarea name="description" value={info.description} onChange={handleChangeInfo} placeholder="Hãy chia sẻ đôi điều về món ăn này..." className="w-full border border-gray-200 bg-gray-50 focus:bg-white p-3 rounded-lg h-24 outline-none focus:border-orange-500 transition"></textarea>
                        </div>

                        {/* Nguyên liệu */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                             <div className="flex justify-between items-center mb-4 border-b pb-2">
                                 <h3 className="font-bold text-gray-800">Nguyên liệu</h3> 
                                 <button onClick={handleAddIngredient} className="text-orange-500 text-sm font-bold hover:bg-orange-50 px-3 py-1 rounded transition">+ Thêm dòng</button>
                             </div>
                             {ingredients.map((item) => (
                                 <div key={item.id} className="flex gap-2 mb-2 group">
                                     <input value={item.name} onChange={(e)=>handleIngredientChange(item.id, 'name', e.target.value)} placeholder="Tên nguyên liệu (vd: Trứng gà)" className="border p-2 rounded w-2/3 text-sm outline-none focus:border-orange-500" />
                                     <input value={item.quantity} onChange={(e)=>handleIngredientChange(item.id, 'quantity', e.target.value)} placeholder="Số lượng" className="border p-2 rounded w-1/3 text-sm outline-none focus:border-orange-500" />
                                     <button onClick={()=>handleRemoveIngredient(item.id)} className="text-gray-300 hover:text-red-500 px-2 transition"><i className="fa-solid fa-xmark"></i></button>
                                 </div>
                             ))}
                        </div>

                        {/* Cách làm */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                             <div className="flex justify-between items-center mb-4 border-b pb-2">
                                 <h3 className="font-bold text-gray-800">Cách làm</h3> 
                                 <button onClick={handleAddStep} className="text-orange-500 text-sm font-bold hover:bg-orange-50 px-3 py-1 rounded transition">+ Thêm bước</button>
                             </div>
                             {steps.map((step, idx) => (
                                 <div key={step.id} className="flex gap-3 mb-4 items-start">
                                     <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-1">{idx+1}</div>
                                     <textarea value={step.content} onChange={(e)=>handleStepChange(step.id, e.target.value)} placeholder={`Mô tả bước ${idx + 1}...`} className="w-full border p-2 rounded-lg text-sm outline-none focus:border-orange-500 bg-gray-50 focus:bg-white" rows="2"></textarea>
                                     <button onClick={()=>handleRemoveStep(step.id)} className="text-gray-300 hover:text-red-500 mt-1 px-2 transition"><i className="fa-solid fa-trash"></i></button>
                                 </div>
                             ))}
                        </div>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex justify-end gap-4 mt-8 pt-6 border-t">
                    <button onClick={() => navigate(-1)} className="px-6 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-semibold transition">Hủy bỏ</button>
                    {/* Đã gắn sự kiện handlePreview */}
                    <button onClick={handlePreview} className="px-6 py-2 rounded-lg bg-white border border-orange-500 text-orange-600 text-sm font-bold shadow hover:bg-orange-50 transition">
                        <i className="fa-regular fa-eye mr-2"></i>Xem trước
                    </button>
                    {/* Nút Đăng ở dưới footer cũng gọi handlePost */}
                    <button onClick={handlePost} className="px-6 py-2 rounded-lg bg-orange-500 text-white text-sm font-bold shadow hover:bg-orange-600 transition transform active:scale-95">
                        Đăng ngay
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DangBai;
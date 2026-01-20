import React, { useState } from 'react';
import * as fun from '../../JS/FUNCTION/function';
import * as API from '../../JS/API/API';

const ThemDanhMuc = () => {
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [type, setType] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setloading] = useState(false);
    const [ThanhCong,setthanhCong] = useState('');
    const [ThatBai,setThatBai] = useState('')

    const generateSlug = (text) => {
        return text.toString().toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "") 
            .replace(/[đĐ]/g, 'd')
            .replace(/[^a-z0-9\s]/g, '')
            .replace(/\s+/g, '-'); 
    };

    const handleNameChange = (e) => {
        const val = e.target.value;
        setName(val);
        setSlug(generateSlug(val));
        if (errors.name || errors.slug) {
            setErrors({ ...errors, name: '', slug: '' });
        }
    };

    const handleTypeChange = (e) => {
        setType(e.target.value);
        if (errors.type) {
            setErrors({ ...errors, type: '' });
        }
    };

    const ThemDL = async () => {
        setloading(true);
        setErrors({}); 
        
        try {
            const formdata = fun.objectToFormData({ name: name, slug: slug, type: type });
            const data = await API.CallAPI(formdata, { PhuongThuc: 1,url: 'admin/ThemDanhMuc',});
            if (data.validate === true && data.errors) {
                const serverErrors = {};
                Object.keys(data.errors).forEach((key) => {
                    if (data.errors[key] && data.errors[key].length > 0) {
                        serverErrors[key] = data.errors[key][0];
                    }
                });
                setErrors(serverErrors);
                setloading(false);
                return;
            }
            if(data.status){
                setthanhCong(data.message);
                Reset();
                setloading(false);
                return;
            }else{
                setThatBai(data.message);
                setloading(false);
                return;
            }
           

        } catch (error) {
            console.error('Lỗi xảy ra:', error);
            alert("Lỗi kết nối server");
        } finally {
            setloading(false);
        }
    }
    const Reset=()=>{
        setName('');
        setSlug('');
        setType('');
    }

    return (
        <>
            <div className="">
                <div className="px-4 py-5 sm:p-6 space-y-4">\
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Tên Danh mục <span className="text-red-500">*</span>
                        </label>
                        <input 
                            type="text" 
                            value={name}
                            onChange={handleNameChange}
                            disabled={loading}
                            className={`mt-1 block w-full rounded-md shadow-sm border p-2 text-sm 
                                ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}`}
                            placeholder="Ví dụ: Món Huế"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1 italic">{errors.name}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Slug (URL)</label>
                        <input 
                            type="text" 
                            value={slug}
                            readOnly 
                            className={`mt-1 block w-full rounded-md bg-gray-50 text-gray-500 shadow-sm border p-2 text-sm font-mono cursor-not-allowed
                                ${errors.slug ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.slug && <p className="text-red-500 text-xs mt-1 italic">{errors.slug}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Phân loại <span className="text-red-500">*</span>
                        </label>
                        <select 
                            value={type}
                            onChange={handleTypeChange}
                            disabled={loading}
                            className={`mt-1 block w-full rounded-md shadow-sm border p-2 bg-white text-sm
                                ${errors.type ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}`}
                        > 
                            <option value="">--Chọn loại--</option>
                            <option value="khu vực">Khu vực (Vùng miền)</option>
                            <option value="loại món ăn">Loại món ăn</option>
                            <option value="chế độ ăn">Chế độ ăn (Diet)</option>
                        </select>
                        {errors.type && <p className="text-red-500 text-xs mt-1 italic">{errors.type}</p>}
                    </div>
                    {
                        ThanhCong && (
                              <div class="max-w-md mx-auto mt-6">
                                <p class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative text-sm font-medium">
                                🎉 {ThanhCong}
                                </p>
                            </div>
                        )
                    }
                    {
                        ThatBai && (
                                <div class="max-w-md mx-auto mt-6">
                                    <p class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-sm font-medium">
                                    ❌ {ThatBai}
                                    </p>
                                </div>
                        )
                    }
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 border-t border-gray-100">
                    <button 
                        type="button" 
                        onClick={ThemDL} 
                        disabled={loading}
                        className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto disabled:bg-indigo-300"
                    >
                        {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
                    </button>
                    <button
                        onClick={Reset}
                        type="button" 
                        disabled={loading}
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    >
                        Hủy
                    </button>
                </div>
            </div>
        </>
    );
};
export default ThemDanhMuc;
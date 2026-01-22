import React, { useState, useEffect } from 'react';
import * as API from '../../JS/API/API';
import { objectToFormData, validateImage, validatePhone } from '../../JS/FUNCTION/function'; // Import từ file function.js
import { ThongBao_ThanhCong, ThongBao_Loi } from '../../JS/FUNCTION/ThongBao'; // Import thông báo

function ChinhSua() {
    // Giả sử ID người dùng và Token được lưu trong LocalStorage khi đăng nhập
    // Nếu bạn dùng Cookie, hãy thay đổi cách lấy token tương ứng
    const userId = localStorage.getItem('user_id') || 1; // Demo ID = 1 nếu chưa có
    const token = localStorage.getItem('token_bepviet'); // Lấy token từ lúc login

    // State lưu dữ liệu form
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        bio: '',
        avatar: null // Lưu file object khi chọn ảnh
    });

    // State riêng để hiển thị ảnh preview (tránh lỗi khi render object File)
    const [previewAvatar, setPreviewAvatar] = useState("https://i.pravatar.cc/150?img=32");
    const SERVER_URL = 'http://127.0.0.1:8000/storage/'; // Đường dẫn hiển thị ảnh từ server

    // 1. Load dữ liệu người dùng khi component được mount
    useEffect(() => {
        const layDuLieu = async () => {
            try {
                const res = await API.CallAPI(null, {
                    url: `user/detail/${userId}`,
                    PhuongThuc: 2, // GET
                    token: token
                });

                if (res.status) {
                    const data = res.data;
                    setFormData({
                        name: data.name || '',
                        phone: data.phone || '',
                        address: data.address || '',
                        bio: data.bio || '',
                        avatar: null // Reset file upload
                    });
                    
                    // Hiển thị avatar cũ từ server nếu có
                    if (data.avatar) {
                        setPreviewAvatar(SERVER_URL + data.avatar);
                    }
                }
            } catch (error) {
                console.error("Lỗi tải dữ liệu:", error);
            }
        };
        layDuLieu();
    }, [userId, token]);

    // 2. Xử lý khi người dùng nhập liệu (Text)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // 3. Xử lý khi chọn ảnh (File)
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate ảnh bằng hàm có sẵn trong function.js
            if (!validateImage(file)) {
                ThongBao_Loi("Chỉ chấp nhận định dạng ảnh (jpg, png, gif)!");
                return;
            }

            // Tạo preview ảnh ngay lập tức
            setPreviewAvatar(URL.createObjectURL(file));
            
            // Lưu file vào state để chuẩn bị gửi đi
            setFormData({
                ...formData,
                avatar: file
            });
        }
    };

    // 4. Gửi dữ liệu cập nhật (Submit)
    const handleSave = async () => {
        // Validate cơ bản
        if (!formData.name.trim()) {
            ThongBao_Loi("Họ tên không được để trống!");
            return;
        }
        if (formData.phone && !validatePhone(formData.phone)) {
            ThongBao_Loi("Số điện thoại không đúng định dạng!");
            return;
        }

        // Chuyển object thành FormData để gửi file (dùng hàm helper)
        // Lưu ý: objectToFormData cần xử lý cẩn thận, ở đây ta tạo mới FormData và append thủ công hoặc dùng helper
        let dataGuiDi = new FormData();
        dataGuiDi = objectToFormData(formData, dataGuiDi);
        
        // Vì Laravel update file thường yêu cầu POST (đôi khi PUT gặp lỗi với Multipart/form-data), 
        // ta dùng POST và method _method nếu cần, hoặc POST trực tiếp như Controller bạn viết.
        
        const res = await API.CallAPI(dataGuiDi, {
            url: `user/update/${userId}`,
            PhuongThuc: 1, // POST
            token: token
        });

        if (res.status === 200 || res.status === true) {
            ThongBao_ThanhCong(res.message);
            // Cập nhật lại localStorage nếu avatar thay đổi (tùy logic app)
        } else {
            // Xử lý lỗi validate từ server trả về (422)
            if(res.validate){
                 ThongBao_Loi(Object.values(res.errors)[0][0]); // Lấy lỗi đầu tiên
            } else {
                ThongBao_Loi(res.message || "Cập nhật thất bại!");
            }
        }
    };

    return (
        <>
        <div className="p-6 overflow-y-auto custom-scrollbar space-y-8">
            {/* Avatar Section */}
            <div className="flex flex-col items-center justify-center gap-3">
                <div className="relative group cursor-pointer">
                    <img 
                        src={previewAvatar} 
                        alt='Avatar' 
                        className="w-24 h-24 rounded-full border-4 border-gray-50 shadow-sm object-cover"
                    />
                    <label className="absolute bottom-0 right-0 bg-white text-gray-600 p-2 rounded-full shadow border border-gray-200 hover:text-red-600 hover:border-red-200 transition cursor-pointer">
                        <i className="fa-solid fa-camera text-sm"></i>
                        <input 
                            type="file" 
                            className="hidden" 
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </label>
                </div>
            </div>

            {/* Thông tin công khai */}
            <div>
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-l-4 border-blue-500 pl-3">
                    Thông tin công khai
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên hiển thị</label>
                        <div className="relative">
                            <i className="fa-regular fa-id-badge absolute left-3 top-3 text-gray-400"></i>
                            <input 
                                type="text" 
                                name="name"
                                value={formData.name} 
                                onChange={handleChange}
                                className="form-input w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 transition placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ (Nơi ở)</label>
                        <div className="relative">
                            <i className="fa-solid fa-location-dot absolute left-3 top-3 text-gray-400"></i>
                            <input 
                                type="text" 
                                name="address"
                                value={formData.address} 
                                onChange={handleChange}
                                className="form-input w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 transition placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tiểu sử</label>
                        <textarea 
                            rows="3" 
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            className="form-input w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 transition placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                    </div>
                </div>
            </div>

            {/* Thông tin cá nhân */}
            <div>
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-l-4 border-red-500 pl-3 flex items-center gap-2">
                    Thông tin liên hệ <span className="bg-gray-100 text-gray-500 text-[10px] px-2 py-0.5 rounded-full font-normal normal-case"><i className="fa-solid fa-lock text-[10px] mr-1"></i>Bảo mật</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                        <div className="relative">
                            <i className="fa-solid fa-phone absolute left-3 top-3 text-gray-400"></i>
                            <input 
                                type="tel" 
                                name="phone"
                                value={formData.phone} 
                                onChange={handleChange}
                                className="form-input w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 transition focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                    </div>
                    {/* Có thể thêm Email nếu cần */}
                </div>
            </div>

        </div>

        {/* Buttons Action */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 rounded-b-2xl shrink-0">
            <button className="px-5 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200 transition">
                Hủy bỏ
            </button>
            <button 
                onClick={handleSave}
                className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 shadow-lg shadow-orange-500/30 transition transform active:scale-95">
                Lưu thay đổi
            </button>
        </div>
        </>
    )
}

export default ChinhSua;
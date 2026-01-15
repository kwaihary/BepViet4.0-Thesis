import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// --- COMPONENT CON: THẺ MÓN ĂN ---
const MealCard = ({ type, image, name, kcal, colorBorder }) => {
  return (
    <div className={`bg-white p-2 rounded-lg shadow-sm group relative meal-card border-l-4 ${colorBorder} hover:shadow-md transition-all`}>
      <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">{type}</p>
      <div className="flex gap-2">
        <img 
          src={image} 
          alt={name} 
          className="w-10 h-10 rounded-md object-cover shrink-0" 
        />
        <div className="overflow-hidden">
          <p className="font-bold text-xs text-gray-800 truncate" title={name}>{name}</p>
          <p className="text-[10px] text-gray-500">{kcal} Kcal</p>
        </div>
      </div>
      {/* Nút xóa (chỉ hiện khi hover) */}
      <button className="absolute top-1 right-1 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition">
        <i className="fa-solid fa-xmark"></i>
      </button>
    </div>
  );
};

// --- COMPONENT CON: Ô TRỐNG (NÚT THÊM) ---
const AddSlot = ({ label, height = "auto" }) => {
  return (
    <button className={`w-full bg-white border-2 border-dashed border-gray-200 rounded-lg p-2 ${height === 'auto' ? '' : 'h-[74px]'} flex flex-col items-center justify-center text-gray-400 hover:border-orange-400 hover:text-orange-500 hover:bg-orange-50 transition group`}>
      {height === 'auto' ? (
         <span className="text-xs font-bold">+ {label}</span>
      ) : (
        <>
            <i className="fa-solid fa-plus text-lg mb-1"></i>
            <span className="text-[10px] font-bold">Thêm {label}</span>
        </>
      )}
    </button>
  );
};

function KeHoachAnUong() {
    // --- 1. LOGIC XỬ LÝ THỜI GIAN ---
    const today = new Date();
    const currentYear = today.getFullYear();
    
    // Tính toán tuần hiện tại (đơn giản)
    const startOfYear = new Date(currentYear, 0, 1);
    const days = Math.floor((today - startOfYear) / (24 * 60 * 60 * 1000));
    const currentWeekParam = Math.ceil((days + 1) / 7);

    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [selectedWeek, setSelectedWeek] = useState(currentWeekParam);
    const [dateRange, setDateRange] = useState("");

    // Hàm tính ngày bắt đầu - kết thúc của tuần
    const getDateRangeOfWeek = (w, y) => {
        const simple = new Date(y, 0, 1 + (w - 1) * 7);
        const dow = simple.getDay();
        const ISOweekStart = simple;
        if (dow <= 4)
            ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
        else
            ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
        
        const ISOweekEnd = new Date(ISOweekStart);
        ISOweekEnd.setDate(ISOweekStart.getDate() + 6);

        const format = (date) => 
            `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`;
        
        return `${format(ISOweekStart)} - ${format(ISOweekEnd)}`;
    };

    useEffect(() => {
        setDateRange(getDateRangeOfWeek(selectedWeek, selectedYear));
    }, [selectedWeek, selectedYear]);

    // Tạo mảng dữ liệu cho Select box
    const years = Array.from({ length: 6 }, (_, i) => currentYear - 2 + i); // Lấy từ 2 năm trước đến 3 năm sau
    const weeks = Array.from({ length: 52 }, (_, i) => i + 1);

    // --- 2. DỮ LIỆU GIẢ LẬP CHO CÁC NGÀY (MOCK DATA) ---
    // Cấu trúc: Mỗi ngày là 1 object chứa thông tin món ăn sáng/trưa/tối
    const weekData = [
        {
            dayName: "Thứ Hai",
            active: true, // Ngày hiện tại hoặc đã qua
            borderTitle: "border-red-200",
            bgTitle: "bg-red-100",
            textTitle: "text-red-700",
            meals: [
                { type: "Sáng", name: "Bánh mì ốp la", kcal: 350, img: "https://images.unsplash.com/photo-1525351484163-7529414395d8?w=100", border: "border-yellow-400" },
                { type: "Trưa", name: "Cơm sườn bì chả", kcal: 650, img: "https://images.unsplash.com/photo-1503764654157-72d979d9af2f?w=100", border: "border-orange-400" },
                { type: "Tối", name: "Canh bí đỏ thịt bằm", kcal: 400, img: "https://images.unsplash.com/photo-1555126634-323283e090fa?w=100", border: "border-green-400" }
            ]
        },
        {
            dayName: "Thứ Ba",
            active: true,
            borderTitle: "border-gray-100",
            bgTitle: "bg-white",
            textTitle: "text-gray-700",
            meals: [
                { type: "Sáng", name: "Phở bò tái", kcal: 500, img: "https://images.unsplash.com/photo-1630159914088-a1895c434cc4?w=100", border: "border-yellow-400" },
                null, // Bữa trưa chưa có (sẽ hiện nút Add)
                { type: "Tối", name: "Salad cá ngừ", kcal: 300, img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=100", border: "border-green-400" }
            ]
        },
        {
            dayName: "Thứ Tư",
            active: false, // Ngày tương lai (mờ đi chút)
            borderTitle: "border-gray-100",
            bgTitle: "bg-white",
            textTitle: "text-gray-500",
            meals: [null, null, null] // Chưa lên lịch
        },
        {
            dayName: "Thứ Năm",
            active: false,
            borderTitle: "border-gray-100",
            bgTitle: "bg-white",
            textTitle: "text-gray-500",
            meals: [null, null, null]
        },
        {
            dayName: "Thứ Sáu",
            active: false,
            borderTitle: "border-gray-100",
            bgTitle: "bg-white",
            textTitle: "text-gray-500",
            meals: [null, null, null]
        },
        {
            dayName: "Thứ Bảy",
            active: false,
            borderTitle: "border-gray-100",
            bgTitle: "bg-white",
            textTitle: "text-blue-600", // Cuối tuần màu xanh
            meals: [
                { type: "Sáng", name: "Bún bò Huế", kcal: 600, img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=100", border: "border-yellow-400" },
                null, 
                null
            ]
        },
        {
            dayName: "Chủ Nhật",
            active: false,
            borderTitle: "border-gray-100",
            bgTitle: "bg-white",
            textTitle: "text-red-600", // Chủ nhật màu đỏ
            meals: [null, null, null]
        }
    ];

    return (
        <>
            {/* --- HEADER --- */}
            <header className="bg-white shadow-sm px-6 h-16 flex justify-between items-center z-20 shrink-0 border-b border-gray-200">
                <div className="flex items-center gap-6">
                    <Link to='/' className="flex items-center gap-2 text-gray-500 hover:text-red-600 transition">
                        <div className="bg-gray-100 p-2 rounded-full hover:bg-red-50"><i className="fa-solid fa-arrow-left"></i></div>
                        <span className="font-bold hidden md:inline">Quay lại Bếp</span>
                    </Link>
                    <div className="h-6 w-px bg-gray-300 mx-2"></div>
                    
                    {/* KHU VỰC CHỌN TUẦN & NĂM */}
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 hover:border-red-300 transition group">
                            <i className="fa-regular fa-calendar-check text-red-600 group-hover:animate-bounce"></i>
                            
                            {/* Select Week */}
                            <select 
                                value={selectedWeek}
                                onChange={(e) => setSelectedWeek(parseInt(e.target.value))}
                                className="bg-transparent font-bold text-gray-800 outline-none cursor-pointer appearance-none hover:text-red-600 text-sm"
                            >
                                {weeks.map(w => <option key={w} value={w}>Tuần {w}</option>)}
                            </select>

                            <span className="text-gray-300">|</span>

                            {/* Select Year */}
                            <select 
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                                className="bg-transparent font-bold text-gray-800 outline-none cursor-pointer appearance-none hover:text-red-600 text-sm"
                            >
                                {years.map(y => <option key={y} value={y}>{y}</option>)}
                            </select>
                        </div>

                        {/* Ngày hiển thị */}
                        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200">
                            {dateRange}
                        </span>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button className="hidden md:flex items-center gap-2 text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-lg text-sm font-bold transition">
                        <i className="fa-solid fa-rotate-left"></i> Làm lại
                    </button>
                    <button className="bg-gradient-to-r from-green-600 to-teal-500 text-white px-5 py-2 rounded-lg text-sm font-bold hover:shadow-lg hover:opacity-90 transition flex items-center gap-2">
                        <i className="fa-solid fa-cart-shopping"></i> Tạo Shopping List
                    </button>
                </div>
            </header>

            {/* --- BODY --- */}
            <div className="flex-1 flex overflow-hidden">
                <main className="flex-1 overflow-x-auto overflow-y-auto p-6 bg-slate-50 relative">
                    
                    {/* THỐNG KÊ (Stats) */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xl"><i className="fa-solid fa-fire"></i></div>
                            <div><p className="text-gray-500 text-xs">Calo trung bình/ngày</p><p className="font-bold text-lg">1,850 Kcal</p></div>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl"><i className="fa-solid fa-check-double"></i></div>
                            <div><p className="text-gray-500 text-xs">Tiến độ lên đơn</p><p className="font-bold text-lg">12/21 Bữa</p></div>
                        </div>
                        <div className="bg-gradient-to-r from-red-500 to-orange-500 p-4 rounded-xl shadow-md text-white md:col-span-2 flex justify-between items-center relative overflow-hidden">
                            <div className="relative z-10">
                                <p className="font-bold text-lg">Gợi ý từ AI 🤖</p>
                                <p className="text-sm opacity-90">"Thứ 4 trời mưa, hãy thử món Lẩu gà lá é nhé!"</p>
                            </div>
                            <button className="relative z-10 bg-white text-red-600 px-4 py-2 rounded-lg text-sm font-bold shadow hover:bg-gray-100">Xem ngay</button>
                            <i className="fa-solid fa-robot absolute -bottom-4 -right-4 text-8xl opacity-20"></i>
                        </div>
                    </div>

                    {/* LỊCH TRÌNH (GRID 7 NGÀY) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 min-w-[1000px] lg:min-w-0 pb-10">
                        
                        {/* Render từng ngày dựa trên mảng weekData */}
                        {weekData.map((day, index) => (
                            <div key={index} className={`flex flex-col gap-3 transition duration-300 ${day.active ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}>
                                {/* Header Ngày */}
                                <div className={`${day.bgTitle} ${day.textTitle} font-bold text-center py-2 rounded-t-lg uppercase text-sm border-b-2 ${day.borderTitle || 'border-transparent'}`}>
                                    {day.dayName}
                                </div>
                                
                                {/* 3 Bữa ăn (Sáng - Trưa - Tối) */}
                                {day.meals.map((meal, mealIndex) => {
                                    // Xác định nhãn bữa ăn
                                    const labels = ["Sáng", "Trưa", "Tối"];
                                    const currentLabel = labels[mealIndex];

                                    if (meal) {
                                        // Nếu có dữ liệu -> Render Card
                                        return (
                                            <MealCard 
                                                key={mealIndex}
                                                type={meal.type}
                                                name={meal.name}
                                                kcal={meal.kcal}
                                                image={meal.img}
                                                colorBorder={meal.border}
                                            />
                                        );
                                    } else {
                                        // Nếu null -> Render nút Add
                                        // Riêng Thứ 2,3 (active) nút add sẽ to đẹp hơn, các ngày khác nhỏ hơn
                                        return (
                                           <AddSlot key={mealIndex} label={currentLabel} height={day.active ? 'large' : 'large'} />
                                        );
                                    }
                                })}

                                {day.active && (
                                    <div className="text-center text-[10px] text-gray-400 font-bold mt-1">Tổng: 1,400 Kcal</div>
                                )}
                            </div>
                        ))}

                    </div>
                </main>

                {/* --- SIDEBAR PHẢI --- */}
                <aside className="w-80 bg-white border-l border-gray-200 hidden xl:flex flex-col z-10 shadow-lg">
                    <div className="p-4 border-b border-gray-100">
                        <h2 className="font-bold text-gray-800 mb-2">Kho món ăn của bạn</h2>
                        <div className="relative">
                            <input type="text" placeholder="Tìm món đã lưu..." className="w-full bg-gray-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"/>
                            <i className="fa-solid fa-magnifying-glass absolute right-3 top-2.5 text-gray-400 text-xs"></i>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-6">
                        {/* List món đã lưu */}
                        <div>
                            <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">Đã lưu gần đây</h3>
                            <div className="space-y-2">
                                <div className="flex gap-3 p-2 hover:bg-orange-50 rounded-lg cursor-move border border-transparent hover:border-orange-200 transition group">
                                    <img src="https://images.unsplash.com/photo-1548943487-a2e4e43b485c?w=100" alt="Suon xao" className="w-12 h-12 rounded-lg object-cover"/>
                                    <div>
                                        <h4 className="font-bold text-sm text-gray-800">Sườn xào chua ngọt</h4>
                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                            <span><i className="fa-solid fa-fire text-orange-500"></i> 450 Kcal</span>
                                            <button className="text-blue-600 font-bold opacity-0 group-hover:opacity-100 ml-2">+ Thêm</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-3 p-2 hover:bg-orange-50 rounded-lg cursor-move border border-transparent hover:border-orange-200 transition group">
                                    <img src="https://images.unsplash.com/photo-1626804475297-411dbe9175d6?w=100" alt="Canh" className="w-12 h-12 rounded-lg object-cover"/>
                                    <div>
                                        <h4 className="font-bold text-sm text-gray-800">Canh ngao nấu chua</h4>
                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                            <span><i className="fa-solid fa-fire text-orange-500"></i> 120 Kcal</span>
                                            <button className="text-blue-600 font-bold opacity-0 group-hover:opacity-100 ml-2">+ Thêm</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* List Gợi ý */}
                        <div>
                            <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">Gợi ý cho tuần này</h3>
                            <div className="space-y-2">
                                <div className="flex gap-3 p-2 hover:bg-orange-50 rounded-lg cursor-move border border-transparent hover:border-orange-200 transition">
                                    <img src="https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=100" alt="Salad" className="w-12 h-12 rounded-lg object-cover"/>
                                    <div>
                                        <h4 className="font-bold text-sm text-gray-800">Salad ức gà</h4>
                                        <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded">Healthy</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Thanh tổng quan (Footer Sidebar) */}
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                        <div className="flex justify-between items-center text-sm mb-2">
                            <span className="text-gray-600">Tổng quan tuần:</span>
                            <span className="font-bold text-gray-800">12,950 Kcal</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-orange-500 h-2 rounded-full" style={{width: '65%' }}></div>
                        </div>
                        <p className="text-xs text-gray-400 mt-2 text-center">Bạn đang duy trì mức ăn uống rất tốt! 🎉</p>
                    </div>
                </aside>
            </div>
        </>
    )
};

export default KeHoachAnUong;
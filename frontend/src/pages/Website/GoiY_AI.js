import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function AI() {
    // State quản lý quy trình: 'input' -> 'cooking' -> 'result'
    const [step, setStep] = useState('input');
    const [inputValue, setInputValue] = useState('');

    // Hàm bắt đầu "nấu"
    const startCooking = () => {
        if (!inputValue.trim()) return; // Không làm gì nếu input rỗng
        
        setStep('cooking');
        
        // Giả lập thời gian AI suy nghĩ (2.5 giây)
        setTimeout(() => {
            setStep('result');
        }, 2500);
    };

    // Hàm xử lý khi nhấn Enter
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            startCooking();
        }
    };

    // Hàm điền nhanh gợi ý
    const fillInput = (text) => {
        setInputValue(text);
    };

    // Reset lại từ đầu
    const resetApp = () => {
        setInputValue('');
        setStep('input');
    };

    return (
        <div className="min-h-screen bg-gray-50  z-20 overflow-hidden relative font-sans flex flex-col">
            
            {/* --- BACKGROUND ANIMATION --- */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                {/* Lưu ý: Bạn cần định nghĩa class .ember trong CSS global hoặc dùng file css riêng */}
                <div className="ember absolute bottom-0 w-2 h-2 bg-orange-400 rounded-full animate-ping opacity-75" style={{ left: '10%', animationDuration: '3s', animationDelay: '0s' }}></div>
                <div className="ember absolute bottom-10 w-3 h-3 bg-red-400 rounded-full animate-pulse opacity-50" style={{ left: '30%', animationDuration: '4s', animationDelay: '2s' }}></div>
                <div className="ember absolute bottom-5 w-2 h-2 bg-yellow-400 rounded-full animate-bounce opacity-60" style={{ left: '70%', animationDuration: '5s', animationDelay: '1s' }}></div>
                <div className="ember absolute bottom-20 w-4 h-4 bg-orange-300 rounded-full animate-ping opacity-40" style={{ left: '90%', animationDuration: '3s', animationDelay: '3s' }}></div>
            </div>

            {/* --- NAVIGATION --- */}
            <nav className="relative z-50 p-6 flex justify-between items-center max-w-6xl mx-auto w-full">
                <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-red-600 font-bold transition group">
                    <div className="bg-white p-2 rounded-lg shadow-sm group-hover:shadow-red-200 transition border border-gray-100">
                        <i className="fa-solid fa-chevron-left text-red-500"></i>
                    </div>
                    <span>Về Bếp</span>
                </Link>
                <div className="hidden md:flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow-sm text-red-600 font-bold border border-orange-100">
                    <i className="fa-solid fa-fire-flame-curved animate-pulse"></i> Trợ lý AI Bếp Việt
                </div>
            </nav>

            {/* --- MAIN CONTENT --- */}
            <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 -mt-10 w-full max-w-6xl mx-auto">
                
                {/* PHASE 1: INPUT SECTION */}
                {step === 'input' && (
                    <div className="w-full max-w-3xl text-center animate-fade-in-up">
                        <div className="inline-block p-6 rounded-full bg-gradient-to-br from-red-100 to-orange-100 mb-6 shadow-inner border border-white">
                            <i className="fa-solid fa-wand-magic-sparkles text-5xl text-orange-500"></i>
                        </div>
                        
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 leading-tight">
                            Tủ lạnh có gì,<br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">Bếp Việt nấu đó!</span>
                        </h1>
                        <p className="text-gray-500 text-lg mb-8 max-w-xl mx-auto">
                            Nhập nguyên liệu bạn đang có (ví dụ: trứng, cà chua, hành...), AI sẽ biến tấu thành món ngon chuẩn vị Việt.
                        </p>

                        <div className="relative group max-w-xl mx-auto z-20">
                            <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative bg-white rounded-2xl shadow-xl flex items-center p-2 border border-orange-100">
                                <i className="fa-solid fa-carrot text-orange-400 ml-4 text-xl shrink-0"></i>
                                <input 
                                    type="text" 
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Nhập nguyên liệu (ngăn cách bằng dấu phẩy)..." 
                                    className="w-full p-4 text-lg outline-none text-gray-700 font-medium bg-transparent placeholder-gray-400"
                                    onKeyDown={handleKeyDown}
                                />
                                
                                <button 
                                    onClick={startCooking}
                                    className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-6 md:px-8 py-3 rounded-xl font-bold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transform hover:scale-105 transition flex items-center gap-2 shrink-0"
                                >
                                    <span className="hidden md:inline">Chế biến</span> 
                                    <i className="fa-solid fa-utensils"></i>
                                </button>
                            </div>
                        </div>

                        <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm text-gray-500">
                            <span className="py-1">Thử ngay:</span>
                            <button onClick={() => fillInput('Thịt bò, Hành tây')} className="bg-white px-3 py-1 rounded-full border border-orange-200 hover:border-red-500 hover:text-red-500 hover:bg-red-50 transition">🥩 Thịt bò, Hành tây</button>
                            <button onClick={() => fillInput('Trứng, Cà chua')} className="bg-white px-3 py-1 rounded-full border border-orange-200 hover:border-red-500 hover:text-red-500 hover:bg-red-50 transition">🥚 Trứng, Cà chua</button>
                            <button onClick={() => fillInput('Đậu phụ, Nấm')} className="bg-white px-3 py-1 rounded-full border border-orange-200 hover:border-red-500 hover:text-red-500 hover:bg-red-50 transition">🍄 Đậu phụ, Nấm</button>
                        </div>
                    </div>
                )}

                {/* PHASE 2: COOKING / LOADING SECTION */}
                {step === 'cooking' && (
                    <div className="flex flex-col items-center justify-center text-center animate-fade-in">
                        <div className="relative w-32 h-32 mb-8">
                            <div className="absolute inset-0 bg-orange-500 rounded-full opacity-20 animate-ping"></div>
                            <div className="relative bg-white w-32 h-32 rounded-full shadow-2xl flex items-center justify-center border-4 border-orange-100 z-10">
                                {/* Thêm class animate-bounce hoặc custom shake animation */}
                                <i className="fa-solid fa-fire text-5xl text-red-500 animate-pulse"></i>
                            </div>
                            <i className="fa-solid fa-cloud text-gray-200 text-4xl absolute -top-4 -right-4 animate-bounce" style={{ animationDuration: '3s' }}></i>
                            <i className="fa-solid fa-cloud text-gray-200 text-2xl absolute bottom-0 -left-6 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '2.5s' }}></i>
                        </div>
                        
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Đang nhóm lửa & tìm công thức...</h2>
                        <p className="text-gray-500 animate-pulse">AI đang phân tích độ hợp vị của <b>{inputValue}</b></p>
                    </div>
                )}

                {/* PHASE 3: RESULT SECTION */}
                {step === 'result' && (
                    <div className="w-full pb-10 mt-6 animate-fade-in-up">
                        <div className="flex justify-between items-end mb-6 px-4">
                            <div>
                                <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">Kết quả phân tích</p>
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
                                    3 Món ngon từ tủ lạnh 
                                    <i className="fa-solid fa-check-circle text-green-500 text-xl"></i>
                                </h2>
                            </div>
                            <button onClick={resetApp} className="text-gray-500 hover:text-red-600 font-bold text-sm underline flex items-center gap-1">
                                <i className="fa-solid fa-rotate-left"></i> Tìm lại
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
                            {/* Card 1 */}
                            <div className="bg-white rounded-2xl shadow-lg border border-orange-100 overflow-hidden transform hover:-translate-y-2 transition duration-300 group cursor-pointer">
                                <div className="relative h-48 overflow-hidden">
                                    <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10 flex items-center gap-1">
                                        <i className="fa-solid fa-crown text-[10px]"></i> Khớp 100%
                                    </div>
                                    <img src="https://toplist.vn/images/800px/suon-xao-chua-ngot-mien-bac-225389.jpg" alt="Sườn xào" className="w-full h-full object-cover group-hover:scale-110 transition duration-700"/>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
                                </div>
                                <div className="p-5">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-red-600 transition">Sườn Xào Chua Ngọt</h3>
                                    <p className="text-gray-500 text-sm line-clamp-2 mb-4">Vị chua ngọt đậm đà, màu sắc bắt mắt, rất đưa cơm ngày mưa.</p>
                                    
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <div className="flex gap-3 text-xs font-bold text-gray-500">
                                            <span className="flex items-center gap-1"><i className="fa-regular fa-clock text-orange-500"></i> 45p</span>
                                            <span className="flex items-center gap-1"><i className="fa-solid fa-fire text-red-500"></i> Dễ</span>
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition">
                                            <i className="fa-solid fa-arrow-right text-sm"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition duration-300 group cursor-pointer">
                                <div className="relative h-48 overflow-hidden">
                                    <div className="absolute top-3 left-3 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">
                                        Khớp 90%
                                    </div>
                                    <img src="https://cdn.tgdd.vn/Files/2019/08/21/1190209/cach-lam-canh-suon-chua-nau-sau-thom-ngon-don-gian-tai-nha-202201191007421832.jpg" alt="Canh sườn" className="w-full h-full object-cover group-hover:scale-105 transition duration-500"/>
                                </div>
                                <div className="p-5">
                                    <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-red-600 transition">Canh Sườn Nấu Sấu</h3>
                                    <p className="text-gray-500 text-sm line-clamp-2 mb-4">Món canh giải nhiệt mùa hè, vị chua thanh mát của sấu.</p>
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <div className="flex gap-3 text-xs font-bold text-gray-500">
                                            <span className="flex items-center gap-1"><i className="fa-regular fa-clock text-orange-500"></i> 30p</span>
                                            <span className="flex items-center gap-1"><i className="fa-solid fa-bolt text-yellow-500"></i> Nhanh</span>
                                        </div>
                                        <div className="text-gray-300 group-hover:text-red-600 transition"><i className="fa-solid fa-arrow-right"></i></div>
                                    </div>
                                </div>
                            </div>

                            {/* Card 3 */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition duration-300 group cursor-pointer">
                                <div className="relative h-48 overflow-hidden">
                                    <div className="absolute top-3 left-3 bg-gray-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">
                                        Khớp 70%
                                    </div>
                                    <img src="https://img-global.cpcdn.com/recipes/5cc5479261a29391/680x482cq70/s%C6%B0%E1%BB%9Dn-nu%E1%BB%9Bng-mu%E1%BB%91i-%E1%BB%9Bt-recipe-main-photo.jpg" alt="Sườn nướng" className="w-full h-full object-cover group-hover:scale-105 transition duration-500"/>
                                </div>
                                <div className="p-5">
                                    <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-red-600 transition">Sườn Nướng Muối Ớt</h3>
                                    <p className="text-gray-500 text-sm line-clamp-2 mb-4">Cần thêm lò nướng hoặc nồi chiên không dầu.</p>
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <div className="flex gap-3 text-xs font-bold text-gray-500">
                                            <span className="flex items-center gap-1"><i className="fa-regular fa-clock text-orange-500"></i> 60p</span>
                                            <span className="flex items-center gap-1"><i className="fa-solid fa-utensils text-gray-400"></i> BBQ</span>
                                        </div>
                                        <div className="text-gray-300 group-hover:text-red-600 transition"><i className="fa-solid fa-arrow-right"></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-8 mx-4 bg-gradient-to-r from-orange-100 to-red-50 rounded-xl p-6 flex items-center gap-4 border border-orange-200">
                            <div className="bg-white p-3 rounded-full shadow-sm text-orange-500 shrink-0"><i className="fa-solid fa-lightbulb text-2xl"></i></div>
                            <div>
                                <h4 className="font-bold text-gray-800">Mẹo nhỏ:</h4>
                                <p className="text-sm text-gray-600">Bạn có thể nhập thêm <i>"ăn kiêng"</i> hoặc <i>"ít dầu mỡ"</i> để AI lọc kết quả tốt hơn nhé!</p>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AI;
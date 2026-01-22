<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\RecipeController;



//ĐỊNH NGHĨA DEMO 
Route::get('/admin/lay_dl', [UserController::class,'demo']);
// I. ĐỊNH NGHĨA ROUTE GET
Route::get('/admin/layDLUS', [UserController::class, 'layDL']);
Route::get('/admin/laydl_baocao', [ReportController::class, 'layDL']);
Route::get('/admin/ThongKeNguoiDung',[UserController::class,'ThongKe']);
Route::get('/admin/ThongKeViPham', [ReportController::class,'ThongKe']);
Route::get('/admin/laydl_nguoidung_dangbai',[PostController::class, 'ThongTin_nguoidung_dangbai']);

Route::get('/admin/laydl_danhmuc', [CategoryController::class, 'laydl_danhmuc']);
Route::get('/admin/laydl_thongke_bd',[PostController::class,'laydl_thongke_bd']);
Route::get('/admin/dl_bv', [PostController::class,'dl_bv']);
Route::get('/admin/TTBaiViet_NguyenLieu',[PostController::class, 'TTBaiViet']);
Route::get('/admin/TTBaiViet_BuocLam' , [PostController::class, 'TTBaiViet_BuocLam']);

Route::get('/admin/laydl_danhmuc', [CategoryController::class, 'laydl_danhmuc']);
Route::get('/user/layThongTinNguoiDung/{id}', [UserController::class, 'layThongTinNguoiDung']);
Route::get('/admin/lay_thongke' ,[PostController::class , 'lay_thongke']);
Route::get('/admin/dulieu_bieudo_baiviet' , [PostController::class, 'dulieu_bieudo_baiviet']);
Route::get('/admin/dulieu_bieudo_danhmuc' , [CategoryController::class ,'dulieu_bieudo_danhmuc']);
Route::get('recipes/{id}', [RecipeController::class, 'show']);
Route::get('recipes', [RecipeController::class, 'index']);
Route::get('/recipes', [RecipeController::class, 'detail_recipe']);
Route::get('/website/type_danhmuc' , [CategoryController::class , 'type_danhmuc']);
Route::get('/website/Ten_danhmuc' , [CategoryController::class , 'Ten_danhmuc']);
Route::get('user/detail/{id}', [UserController::class, 'layThongTinNguoiDung']); // Lấy thông tin
// --- ROUTE CẬP NHẬT ---
Route::post('/user/update', [UserController::class, 'capNhatThongTinNguoiDung']);
Route::get('/website/ThongTinBaiVietTheoID' , [RecipeController::class , 'ThongTinBaiVietTheoID']);
// II. ĐỊNH NGHĨA ROUTE POST
Route::post('/admin/CapNhatTrangThai',[UserController::class,'QuanLiTaiKhoan']);
Route::post('/admin/BoQua_ViPham',[PostController::class, 'BoQua_ViPham']);
Route::post('/admin/xoa_vipham', [PostController::class, 'Xoa_BaiViet'] );
Route::post('/admin/mo_khoa_vipham', [PostController::class, 'mo_khoa_vipham']);
Route::post('/admin/ThemDanhMuc', [CategoryController::class,'ThemDM']);
Route::post('/admin/CapNhatTT_DM', [CategoryController::class,'CapNhatTT_DM']);
Route::post('/admin/CapNhatDM', [CategoryController::class ,'CapNhatDM']);
Route::post('/admin/CapNhatTT_BaiViet_by_admin', [PostController::class, 'CapNhatTT_BaiViet_by_admin']);
Route::post('/nguoidung/kiemtra_dangnhap', [UserController::class , 'checkLogin']);

Route::post('/user/login', [UserController::class, 'Login']);
Route::post('/user/register', [UserController::class, 'Register']);
Route::post('user/logout', [UserController::class, 'Logout']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/recipes/create', [RecipeController::class, 'store']);
});


Route::post('/nguoidung_dangnhap',[UserController::class, 'getUserProfile'])->middleware('Checklogin');

// routes/api.php

Route::group(['middleware' => ['auth:api']], function () {
    // ... các route khác
    Route::post('/recipes/{id}/like', [RecipeController::class, 'toggleLike']);
});



Route::post('user/update/{id}', [UserController::class, 'capNhatThongTinNguoiDung']); // Cập nhật
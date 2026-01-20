<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CategoryController;

// I. ĐỊNH NGHĨA ROUTE GET
Route::get('/admin/layDLUS', [UserController::class, 'layDL']);
Route::get('/admin/laydl_baocao', [ReportController::class, 'layDL']);
Route::get('/admin/ThongKeNguoiDung',[UserController::class,'ThongKe']);
Route::get('/admin/ThongKeViPham', [ReportController::class,'ThongKe']);
Route::get('/admin/laydl_nguoidung_dangbai',[PostController::class, 'ThongTin_nguoidung_dangbai']);
Route::get('admin/laydl_danhmuc', [CategoryController::class, 'laydl_danhmuc']);
// II. ĐỊNH NGHĨA ROUTE POST
Route::post('admin/CapNhatTrangThai',[UserController::class,'QuanLiTaiKhoan']);
Route::post('admin/BoQua_ViPham',[PostController::class, 'BoQua_ViPham']);
Route::post('admin/xoa_vipham', [PostController::class, 'Xoa_BaiViet'] );
Route::post('admin/mo_khoa_vipham', [PostController::class, 'mo_khoa_vipham']);
Route::post('/admin/ThemDanhMuc', [CategoryController::class,'ThemDM']);
Route::post('admin/CapNhatTT_DM', [CategoryController::class,'CapNhatTT_DM']);
Route::post('/admin/CapNhatDM', [CategoryController::class ,'CapNhatDM']);
Route::get('/get-all-posts', [PostController::class, 'index']);
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

// I. ĐỊNH NGHĨA ROUTE GET
Route::get('/admin/layDLUS', [UserController::class, 'layDL']);
Route::get('/admin/ThongKeNguoiDung',[UserController::class,'ThongKe']);
// II. ĐỊNH NGHĨA ROUTE POST
Route::post('admin/CapNhatTrangThai',[UserController::class,'QuanLiTaiKhoan']);
Route::post('admin/DangNhap',[UserController::class,'login']);

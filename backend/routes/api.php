<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\PostController;

// I. ĐỊNH NGHĨA ROUTE GET
Route::get('/admin/layDLUS', [UserController::class, 'layDL']);
Route::get('/admin/laydl_baocao', [ReportController::class, 'layDL']);
Route::get('/admin/ThongKeNguoiDung',[UserController::class,'ThongKe']);
Route::get('/admin/ThongKeViPham', [ReportController::class,'ThongKe']);
Route::get('/admin/laydl_nguoidung_dangbai',[PostController::class, 'ThongTin_nguoidung_dangbai']);
// II. ĐỊNH NGHĨA ROUTE POST
Route::post('admin/CapNhatTrangThai',[UserController::class,'QuanLiTaiKhoan']);

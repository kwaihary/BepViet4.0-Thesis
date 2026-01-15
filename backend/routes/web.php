<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::get('/api/test', function () {
    return response()->json([
        'status' => true,
        'message' => '1234'
    ]);
});
// I. ĐỊNH NGHĨA ROUTE GET
Route::get('/api/admin/layDLUS', [UserController::class, 'layDL']);
Route::get('/api/admin/ThongKeNguoiDung',[UserController::class,'ThongKe']);
// II. ĐỊNH NGHĨA ROUTE POST
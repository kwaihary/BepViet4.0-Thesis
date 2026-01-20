<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash; // Quan trọng: Phải có dòng này
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    // --- CHỨC NĂNG ĐĂNG KÝ ---
    public function Register(Request $request) {
        $validator = Validator::make($request->all(), [
            'name'     => 'required|string|max:255',
            'phone'    => 'required|string|max:10|unique:users',
            'password' => 'required|min:6',
        ], [
            'phone.unique' => 'Số điện thoại này đã được đăng ký.',
            'password.min' => 'Mật khẩu phải có ít nhất 6 ký tự.'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validator->errors()->first()
            ], 400);
        }

        $user = User::create([
            'name'     => $request->name,
            'phone'    => $request->phone,
            'password' => Hash::make($request->password),
            'status'   => 2, 
        ]);

        return response()->json([
            'status'  => true,
            'message' => 'Đăng ký tài khoản thành công!',
            'data'    => $user
        ], 201);
    }

    // --- CHỨC NĂNG ĐĂNG NHẬP ---
   public function Login(Request $request) {
    // Laravel sẽ tự trả về lỗi 422 nếu validate thất bại
    $request->validate([
        'phone' => 'required',
        'password' => 'required',
    ]);

    $user = User::where('phone', $request->phone)->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        return response()->json([
            'status' => false,
            'message' => 'Thông tin đăng nhập không chính xác'
        ], 401); // 401 là lỗi Unauthorized
    }

    return response()->json([
        'status' => true,
        'message' => 'Đăng nhập thành công',
        'data' => $user,
        'token' => 'vi_du_token_123' 
    ]);
}
    public function layDL() {
        $users = User::orderBy('id', 'asc')->paginate(10);
        return response()->json(['status' => true, 'data' => $users]);
    }

    public function ThongKe() {
        return response()->json([
            'status' => true,
            'data' => [
                'Tong'               => User::count(),
                'TongHoatDong'       => User::where('status', 2)->count(),
                'TongKhongHoatDong'  => User::where('status', 0)->count(),
                'NguoiMoi'           => User::whereMonth('created_at', Carbon::now()->month)->count()
            ]
        ]);
    }
}
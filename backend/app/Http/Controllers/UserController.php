<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash; // Quan trọng: Phải có dòng này
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Cookie;

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
            'display_name'=> $request->name,
            'phone'    => $request->phone,
            'password' => Hash::make($request->password),
            'status'   => 2, 
            'rule'=>0
        ]);

        return response()->json([
            'status'  => true,
            'message' => 'Đăng ký tài khoản thành công!',
            'data'    => $user
        ], 201);
    }

public function login(Request $request) {
    // Lấy dữ liệu từ request
    $phone = $request->phone;
    $password = $request->password;

    // Sử dụng hàm Auth::attempt của Laravel để kiểm tra
    if (Auth::attempt(['phone' => $phone, 'password' => $password])) {
        $user = Auth::user();
        $token = $user->createToken('UserToken')->plainTextToken;

        return response()->json([
            'status' => true,
            'message' => 'Đăng nhập thành công'
        ])->withCookie(cookie('token', $token, 60, null, null, false, true));
    }

    return response()->json([
        'status' => false,
        'message' => 'Tài khoản hoặc mật khẩu không đúng'
    ], 401);
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
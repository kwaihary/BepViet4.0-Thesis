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

  public function Login(Request $request) {
    $request->validate([
        'phone' => 'required',
        'password' => 'required',
    ]);

    $user = User::where('phone', $request->phone)->first();

    // 1. Kiểm tra tài khoản tồn tại và mật khẩu
    if (!$user || !Hash::check($request->password, $user->password)) {
        return response()->json([
            'status' => false,
            'message' => 'Số điện thoại hoặc mật khẩu không đúng'
        ], 401);
    }

    // 2. Logic phân quyền: Nếu rule = 1 (Admin) thì không cho vào trang này
  if ($user->rule == 1) {
    return response()->json([
        'status' => false,
        'message' => 'Không thể đăng nhập với vai trò admin'
    ], 403);
}

    // 3. Cho phép User (rule = 0) đăng nhập
    return response()->json([
        'status' => true,
        'message' => 'Đăng nhập thành công',
        'data' => [
            'id' => $user->id,
            'name' => $user->name,
            'phone' => $user->phone,
            'rule' => $user->rule
        ],
        'token' => 'token_cua_ban_o_day'
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
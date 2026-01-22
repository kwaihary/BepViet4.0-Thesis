<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash; 
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    // --- 1. ĐĂNG KÝ ---
    public function Register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'phone' => 'required|unique:users,phone',
            'password' => 'required|min:6|confirmed',
        ], [
            'name.required' => 'Họ tên không được để trống',
            'phone.required' => 'Số điện thoại không được để trống',
            'phone.unique' => 'Số điện thoại này đã được đăng ký',
            'password.required' => 'Mật khẩu không được để trống',
            'password.min' => 'Mật khẩu phải từ 6 ký tự trở lên',
            'password.confirmed' => 'Mật khẩu nhập lại không khớp',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validator->errors()->first()
            ], 400);
        }

        try {
            $user = User::create([
                'name'     => $request->name,
                'phone'    => $request->phone,
                'password' => Hash::make($request->password),
                'status'   => 1, 
                'rule'     => 0
            ]);

            return response()->json([
                'status' => true,
                'message' => 'Đăng ký tài khoản thành công! Vui lòng đăng nhập.'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Lỗi hệ thống: ' . $e->getMessage()
            ]);
        }
    }

    // --- 2. ĐĂNG NHẬP ---
    public function Login(Request $request) {
        $phone = $request->phone;
        $password = $request->password;
    
        if (Auth::attempt(['phone' => $phone, 'password' => $password])) {
            $user = Auth::user();
            $token = $user->createToken('UserToken')->plainTextToken;
    
            return response()->json([
                'status' => true,
                'message' => 'Đăng nhập thành công',
                'token' => $token, 
                'user' => $user
            ]);
        }
    
        return response()->json([
            'status' => false,
            'message' => 'Tài khoản hoặc mật khẩu không đúng'
        ], 401);
    }

    // --- 3. CẬP NHẬT THÔNG TIN (Hàm bạn đang cần) ---
    public function capNhatThongTinNguoiDung(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'status' => 404,
                'message' => 'Không tìm thấy người dùng (ID: ' . $id . ')' // Debug xem ID là gì
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:15',
            'bio' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 422, 'message' => $validator->errors()->first()], 422);
        }

        // Cập nhật thông tin
        $user->name = $request->input('name');
        if($request->has('phone')) $user->phone = $request->input('phone');
        if($request->has('bio')) $user->bio = $request->input('bio');
        if($request->has('address')) $user->address = $request->input('address');

        // Cập nhật ảnh
        if ($request->hasFile('avatar')) {
            if ($user->avatar && Storage::disk('public')->exists($user->avatar)) {
                Storage::disk('public')->delete($user->avatar);
            }
            $path = $request->file('avatar')->store('avatars', 'public');
            $user->avatar = $path;
        }

        $user->save();

        return response()->json([
            'status' => 200,
            'message' => 'Cập nhật thành công',
            'data' => $user
        ]);
    }

    // --- 4. LẤY THÔNG TIN CHI TIẾT ---
    public function layThongTinNguoiDung($id)
    {
        $user = User::find($id);
        if ($user) {
            return response()->json(['status' => true, 'data' => $user]);
        }
        return response()->json(['status' => false, 'message' => 'Không tìm thấy người dùng!']);
    }
    
    // Giữ lại các hàm phụ nếu cần (layDL, QuanLiTaiKhoan...)
}
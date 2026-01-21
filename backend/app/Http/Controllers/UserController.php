<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    // --- CHỨC NĂNG ĐĂNG KÝ ---
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
            $user = new User();
            $user->name = $request->name;
            $user->phone = $request->phone;
            $user->password = Hash::make($request->password); // Mã hóa mật khẩu
            $user->status = 1; // Mặc định kích hoạt
            $user->rule = 0;
            $user->save();

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

    public function Login(Request $request)
    {
        $request->validate([
            'phone'    => 'required|max:10',
            'password' => 'required',
        ]);

        $user = User::where('phone', $request->phone)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'status' => false,
                'message' => 'Số điện thoại hoặc mật khẩu không đúng.'
            ], 401);
        }

        if ($user->status == 0) { // Ví dụ: tài khoản bị khóa
            return response()->json(['status' => false, 'message' => 'Tài khoản đã bị khóa'], 403);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        // tạo cookie
        $cookie = cookie(
            'token_bepviet', // tên cookie
            $token,          // giá trị cookie
            60 * 24 * 30,     // thời gian sống: 30 ngày
            '/',             // đường dẫn
            null,            // domain
            false,           // local http: false, host https: true
            true             // chỉ truy cập HTTP Only (không cho JS truy cập)
        );

        return response()->json([
            'status' => true,
            'message' => 'Đăng nhập thành công!',
            'data' => $user,
        ])->withCookie($cookie);
    }

    // đăng xuất
    public function Logout()
    {
        $cookie = cookie()->forget('token_bepviet');
        return response()->json([
            'status' => true,
            'message' => 'Đăng xuất thành công!'
        ])->withCookie($cookie);
    }

    public function layDL()
    {
        $users = User::orderBy('id', 'asc')->paginate(10);
        return response()->json(['status' => true, 'data' => $users]);
    }

    public function ThongKe()
    {
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

    public function capNhatThongTinNguoiDung(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy tài khoản người dùng'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name'    => 'required|string|max:255',
            'phone'   => 'required|digits:10|unique:users,phone,' . $id, // Cho phép trùng số cũ của chính mình
            'address' => 'nullable|string|max:255',
            'bio'     => 'nullable|string',
            // Kiểm tra file ảnh (nếu có gửi lên)
            'avatar'  => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ], [
            'phone.unique' => 'Số điện thoại này đã thuộc về người khác.'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validator->errors()->first()
            ], 422);
        }

        if ($request->hasFile('files')) {
            $file = $request->file('files')[0]; // Lấy file đầu tiên trong mảng

            // Đặt tên file để không trùng: time_tenfile
            $filename = time() . '_' . $file->getClientOriginalName();

            // Lưu vào thư mục public/uploads/avatars
            $file->move(public_path('uploads/avatars'), $filename);

            // Cập nhật đường dẫn vào DB
            $user->avatar = 'uploads/avatars/' . $filename;
        }

        // cap nhat thong tin
        $user->name    = $request->name;
        $user->phone   = $request->phone;
        $user->address = $request->address;
        $user->bio     = $request->bio;
        $user->save();

        return response()->json([
            'status'  => true,
            'message' => 'Cập nhật hồ sơ thành công!',
            'data'    => $user
        ]);
    }

    public function layThongTinNguoiDung($id)
    {
        $user = User::find($id);
        if ($user) {
            return response()->json(['status' => true, 'data' => $user]);
        }
        return response()->json(['status' => false, 'message' => 'Không tìm thấy!']);
    }
}

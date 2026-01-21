<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
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
       // 1. Tìm người dùng
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'status' => 404,
                'message' => 'Không tìm thấy người dùng'
            ], 404);
        }

        // 2. Validate dữ liệu
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:15',
            'address' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Kiểm tra file ảnh
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'message' => $validator->errors()->first() // Trả về lỗi đầu tiên tìm thấy
            ], 422);
        }

        // 3. Cập nhật thông tin text
        $user->name = $request->input('name');
        $user->phone = $request->input('phone');
        $user->address = $request->input('address');
        $user->bio = $request->input('bio');

        // 4. Xử lý upload ảnh (nếu có gửi file)
        if ($request->hasFile('avatar')) {
            // Xóa ảnh cũ nếu có (tránh rác server)
            if ($user->avatar && Storage::disk('public')->exists($user->avatar)) {
                Storage::disk('public')->delete($user->avatar);
            }

            // Lưu ảnh mới vào thư mục 'avatars' trong storage/app/public
            $path = $request->file('avatar')->store('avatars', 'public');
            
            // Lưu đường dẫn vào DB
            $user->avatar = $path;
        }

        // 5. Lưu vào Database
        $user->save();

        return response()->json([
            'status' => 200,
            'message' => 'Cập nhật thành công',
            'avatar' => $user->avatar // Trả về đường dẫn ảnh mới để React cập nhật LocalStorage
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

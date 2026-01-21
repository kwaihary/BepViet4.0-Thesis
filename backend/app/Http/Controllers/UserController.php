<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Http\Request;
use Carbon\Carbon;
<<<<<<< HEAD
use Illuminate\Support\Facades\Hash; // Quan trọng: Phải có dòng này
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Cookie;
=======
>>>>>>> 3e209228af4eb46f6ca98286d7037ae57df83f2c

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

<<<<<<< HEAD
        $user = User::create([
            'name'     => $request->name,
            'display_name'=> $request->name,
            'phone'    => $request->phone,
            'password' => Hash::make($request->password),
            'status'   => 2, 
            'rule'=>0
=======
        try {
            $user = new User();
            $user->name = $request->name;
            $user->phone = $request->phone;
            $user->password = Hash::make($request->password); // Mã hóa mật khẩu
            $user->status = 1; 
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
>>>>>>> 3e209228af4eb46f6ca98286d7037ae57df83f2c
        ]);

        $users = User::where('phone', $request->phone)->get();
        return response()->json([
            'data' => $users
        ]);
        /*if (!$user || !Hash::check($request->password, $user->password)) {
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
        ])->withCookie($cookie);*/
    }

<<<<<<< HEAD
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
=======
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
>>>>>>> 3e209228af4eb46f6ca98286d7037ae57df83f2c
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
      public function QuanLiTaiKhoan(Request $request){
        $validated = $request->validate([
            'id' => 'required|integer|exists:users,id',
            'giatri' => 'required|in:0,2', 
        ], [
            'id.required' => 'ID người dùng là bắt buộc.',
            'id.integer'  => 'ID phải là số nguyên.',
            'id.exists'   => 'ID không tồn tại trong hệ thống.',
            'giatri.required' => 'Giá trị trạng thái là bắt buộc.',
            'giatri.in'       => 'Giá trị trạng thái chỉ được phép là 0, 1 hoặc 2.',
        ]);
         $idnd = $validated['id'];
         $nd   = $validated['giatri'];
        $kq = User::where('id', $idnd)->update(['status' => $nd]);
        if ($kq > 0) {
            return response()->json([
                'status' => true,
                'message' => 'Bạn đã cập nhật trạng thái thành công!'
            ]);
        }else{
            return response()->json([
                'status' => false,
                'message' => "Cập nhật trạng thái thất bại."
            ]);
        }
    }

    public function demo(Request $request){
        $id = $request->query('id');
        $user = User::where('id', $id)->get();
        return response()->json([
            'status' => true,
            'data' => $user
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


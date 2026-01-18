<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    public function layDL(Request $request)
    {
        $perPage = 10;
        $users = User::orderBy('id', 'desc')
            ->paginate($perPage);
         return response()->json([
            'status' => true,
            'data' => $users
        ]);
    }
    public function ThongKe(){
        $totalUsers  = User::count();             
        $totalActive    = User::where('status', 1)->count();
        $totalInactive  = User::where('status', 0)->count();
        $NguoiMoi = User::whereMonth('created_at', Carbon::now()->month)
                           ->whereYear('created_at', Carbon::now()->year)
                           ->count();
        return response()->json([
            'status'=>true,
            'data' =>[
                'Tong' => $totalUsers,
                'TongHoatDong' => $totalActive,
                'TongKhongHoatDong' =>$totalInactive,
                'NguoiMoi' =>$NguoiMoi
            ]
        ]);
    }

    public function login(Request $request){
        $request->validate([
            'phone' => 'required|integer|max:10',
            'password' => 'required|min:6',
        ],[
            'phone.required' => "Vui lòng nhập số điện thoại!",
            'phone.integer'=> "Số điện thoại phải là ký tự số",
            'phone.max'=> "Số điện thoại phải là 10 chữ số",
            'password.required'=> "Vui lòng nhập mật khẩu!",
            'password.min'=> "Mật khẩu ít nhất 6 ký tự!"
        ]);
    }

    public function QuanLiTaiKhoan(Request $request){
        return Response()->json([
            'status' =>"true",
            'message'=> "Thành công đến serve nhé <3 "
        ]);
    }
}
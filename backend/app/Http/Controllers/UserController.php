<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Carbon\Carbon;



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
            'sdt' => 'required|integer|max:10',
            'password' => 'required|min:6',
        ],[
            'sdt.required'=>"Vui lòng nhập số điện thoại!",
            'sdt.integer'=>'số điện thoại không được là ký tự chữ',
            'sdt.max'=>'số điện thoại phải là 10 chữ số',
            'password.required' =>'Vui lòng nhập mật khẩu',
            'password.min' => 'Mật khẩu phải ít nhất 6 ký tự '
        ]);
    }
    
}

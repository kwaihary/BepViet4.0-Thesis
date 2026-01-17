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
}

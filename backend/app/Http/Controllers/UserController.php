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
}

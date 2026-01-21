<?php

namespace App\Http\Controllers;
use App\Models\Report;
use Illuminate\Http\Request;
use Carbon\Carbon;

class ReportController extends Controller
{
    public function ThongKe(){
        $ChoXuLi=Report::where('status', 0)->count();
        $XuLi_HomNay = Report::where('status', 1)
            ->whereDate('updated_at', Carbon::today())
            ->count();
        $ChoXuLi_HomNay = Report::where('status', 0)
            ->whereDate('updated_at', Carbon::today())
            ->count();
        return response()->json([
            'status'=>true,
            'data' => [
                'ChoXuLi' => $ChoXuLi,
                'XuLi_HomNay' => $XuLi_HomNay,
                'ChoXuLi_HomNay' => $ChoXuLi_HomNay
            ]
        ]);
    }
    public function layDL(){
        $perPage = 10;
        $reports = Report::select(
            'reports.*',
            'users.name as NguoiBaoCao',
            'recipes.description as TieuDe',
            'recipes.image_url as HinhAnh'
        )
        ->join('users', 'reports.reporter_id', '=', 'users.id')
        ->join('recipes', 'reports.target_id', '=', 'recipes.id')
        ->orderBy('reports.id', 'asc')
        ->paginate($perPage);
        return response()->json([
            'status' => true,
            'data' => $reports
        ]);
    }


}

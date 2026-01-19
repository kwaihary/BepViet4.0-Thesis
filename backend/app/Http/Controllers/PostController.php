<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Report;
use App\Models\Recipe;
use Symfony\Component\HttpFoundation\Response;

class PostController extends Controller
{   
    public function ThongTin_nguoidung_dangbai(Request $request){
         $validated = $request->validate([
            'id' => 'required|integer|exists:reports,id',
        ], [
            'id.required' => 'ID báo cáo là bắt buộc.',
            'id.integer'  => 'ID phải là số nguyên.',
            'id.exists'   => 'ID không tồn tại trong hệ thống.',
        ]);
         $id = $validated['id'];
         $report = Report::select(
            'users.id as ID_NguoiDang',
            'users.name as TenNguoiDangBai'
        )
            ->join('recipes', 'reports.target_id', '=', 'recipes.id')
            ->join('users', 'recipes.user_id', '=', 'users.id')
            ->where('reports.id', $id)
            ->first();
        return response()->json([
            'status'=>true,
            'data' =>$report
        ]);
    }
}

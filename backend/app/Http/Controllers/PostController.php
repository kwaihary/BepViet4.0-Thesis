<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Report;
use App\Models\Recipe;
use Symfony\Component\HttpFoundation\Response;

class PostController extends Controller
{   

    public function index()
{
    // Lấy danh sách bài viết kèm thông tin tác giả và lượt like/comment
    $recipes = DB::table('recipes')
        ->join('users', 'recipes.user_id', '=', 'users.id')
        ->select(
            'recipes.id',
            'recipes.title',
            'recipes.description as content',
            'recipes.image_url as image',
            'recipes.created_at as time',
            'users.name as author',
            'users.avatar as authorAvatar',
            DB::raw('(SELECT COUNT(*) FROM interactions WHERE recipe_id = recipes.id AND type = "like") as likes'),
            DB::raw('(SELECT COUNT(*) FROM comments WHERE recipe_id = recipes.id) as commentCount')
        )
        ->where('recipes.status', 'published') // Chỉ lấy bài đã đăng
        ->orderBy('recipes.created_at', 'desc')
        ->get();

    return response()->json([
        'status' => true,
        'data' => $recipes
    ]);
}
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
    public function BoQua_ViPham(Request $request){
         $validated = $request->validate([
            'id' => 'required|integer|exists:reports,id',
        ], [
            'id.required' => 'ID báo cáo là bắt buộc.',
            'id.integer'  => 'ID phải là số nguyên.',
            'id.exists'   => 'ID không tồn tại trong hệ thống.',
        ]);
         $id = $validated['id'];
         $kq = Report::where('id', $id)->update(['status' => 2]);
         if($kq>0){
            return response()->json([
                'status' => true,
                'message' => 'Bỏ qua vi phạm thành công!'
            ]);
         }else{
            return response()->json([
                'status' => false,
                'message' => 'Không thể bỏ qua vi phạm này, vui lòng thử lại!'
            ]);
         }
    }
    public function Xoa_BaiViet(Request $request){
        $validated = $request->validate([
            'id' => 'required|integer|exists:reports,id',
        ], [
            'id.required' => 'ID báo cáo là bắt buộc.',
            'id.integer'  => 'ID phải là số nguyên.',
            'id.exists'   => 'ID không tồn tại trong hệ thống.',
        ]);
        $id = $validated['id'];
        $kq = Report::where('id', $id)->update(['status' => 1]);
        if($kq){
            $report = Report::find($id);
            if ($report) {
                $recipeId = $report->target_id;
                $update = Recipe::where('id', $recipeId)->update(['status' => 'Đã xóa']);
                if($update){
                    return response()->json([
                        'status' => true,
                        'message' => 'Khóa bài viết thành công!'
                    ]);
                }else{
                    return response()->json([
                        'status' =>false,
                        'message' => 'Khóa bài viết thất bại!'
                    ]);
                }
            }
        }else{
            return response()->json([
                    'status' =>false,
                    'message' => 'Khóa bài viết thất bại!'
            ]);
        }
    }
    public function mo_khoa_vipham(Request $request){
        $validated = $request->validate([
            'id' => 'required|integer|exists:reports,id',
        ], [
            'id.required' => 'ID báo cáo là bắt buộc.',
            'id.integer'  => 'ID phải là số nguyên.',
            'id.exists'   => 'ID không tồn tại trong hệ thống.',
        ]);
        $id = $validated['id'];
        $kq = Report::where('id', $id)->update(['status' => 2]);
        if($kq){
            $report = Report::find($id);
            if ($report) {
                $recipeId = $report->target_id;
                $update = Recipe::where('id', $recipeId)->update(['status' => 'Đã duyệt']);
                if($update){
                    return response()->json([
                        'status' => true,
                        'message' => 'mở khóa tài bài viết thành công!'
                    ]);
                }else{
                    return response()->json([
                        'status' =>false,
                        'message' => 'mở khóa tài bài viết thất bại!'
                    ]);
                }
            }
        }else{
            return response()->json([
                    'status' =>false,
                    'message' => 'mở khóa tài bài viết thất bại!'
            ]);
        }
    }
}

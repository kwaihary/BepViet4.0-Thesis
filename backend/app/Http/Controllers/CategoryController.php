<?php

namespace App\Http\Controllers;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;


use Illuminate\Support\Facades\DB;


class CategoryController extends Controller
{
    public function ThemDM(Request $request){
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:categories,slug',
            'type' => [
                'required',
                 Rule::in(['Vùng miền', 'Loại món ăn', 'Chế độ ăn']), 
            ],
        ], [
            'name.required' => 'Tên danh mục là bắt buộc.',
            'name.string'   => 'Tên danh mục phải là chuỗi ký tự.',
            'name.max'      => 'Tên danh mục không được vượt quá 255 ký tự.',
            'slug.required' => 'Slug là bắt buộc.',
            'slug.string'   => 'Slug phải là chuỗi ký tự.',
            'slug.max'      => 'Slug không được vượt quá 255 ký tự.',
            'slug.unique'   => 'Slug đã tồn tại trong hệ thống.',
            'type.required' => 'Loại danh mục là bắt buộc.',
            'type.in'       => 'Loại danh mục không hợp lệ',
        ]);
         $category = Category::create([
                'name' => $validated['name'],
                'slug' => $validated['slug'],
                'type' => $validated['type'],
            ]);
        if($category){
            return response()->json([
                'status' =>true,
                'message' => 'Thêm dữ liệu danh mục thành công!'
            ]);
        }else{
            return response()->json([
                'status'=>false,
                'message' => 'Thêm danh mục thất bại!'
            ]);
        }
    }
    public function laydl_danhmuc(){
        $categories = Category::select('id', 'name', 'slug', 'type' ,'status')->paginate(10);
        return response()->json([
            'status'=>true,
            'data'=>$categories
        ]);
    }
    public function CapNhatTT_DM(Request $request){
        $validate=  $request->validate([
            'id'        => 'required|integer|exists:categories,id',
            'TrangThai' => 'required|in:0,1',
        ],[
        '   id.required'   => 'ID là bắt buộc.',
           'id.integer'    => 'ID phải là số nguyên.',
           'id.exists'     => 'ID không tồn tại trong hệ thống.',
           'TrangThai.required' => 'Trạng thái là bắt buộc.',
           'TrangThai.in'       => 'Trạng thái chỉ được phép là 0 hoặc 1.',
        ]);
        $id = $validate['id'];
        $trangthai= $validate['TrangThai'];
        $kq=Category::where('id', $id)->update(['status' => $trangthai]);
        if($kq>0){
            return response()->json([
                'status'=>true,
                'message' => 'Cập nhật trạng thái danh mục thành công!'
            ]);
        }else{
            return response()->json([
                'status'=>false,
                'message' => 'Cập nhật trạng thái danh mục thất bại!'
            ]);
        }
    }
    public function CapNhatDM(Request $request){
         $validated = $request->validate([
             'id'  => 'required|integer|exists:categories,id',
            'name' => 'required|string|max:255',
            'slug' => [
                'required',
                'string',
                'max:255',
                Rule::unique('categories', 'slug')->ignore($request->id),
            ],
            'type' => [
                'required',
                 Rule::in(['Vùng miền', 'Loại món ăn', 'Chế độ ăn']), 
            ],
        ], [
            'id.required'   => 'ID là bắt buộc.',
            'id.integer'    => 'ID phải là số nguyên.',
            'id.exists'     => 'ID không tồn tại trong hệ thống.',
            'name.required' => 'Tên danh mục là bắt buộc.',
            'name.string'   => 'Tên danh mục phải là chuỗi ký tự.',
            'name.max'      => 'Tên danh mục không được vượt quá 255 ký tự.',
            'slug.required' => 'Slug là bắt buộc.',
            'slug.string'   => 'Slug phải là chuỗi ký tự.',
            'slug.max'      => 'Slug không được vượt quá 255 ký tự.',
            'slug.unique'   => 'Slug đã tồn tại trong hệ thống.',
            'type.required' => 'Loại danh mục là bắt buộc.',
            'type.in'       => 'Loại danh mục chỉ được phép là: khu vực, loại món ăn hoặc chế độ ăn.',
        ]);
         $kq=Category::where('id', $validated['id'])->update(['name'=>$validated['name'], 'slug'=>$validated['slug'], 'type'=>$validated['type']]);
         if($kq){
             return response()->json([
                'status'=>true,
                'message' => 'Cập nhật danh mục thành công!'
            ]);
         }else{
             return response()->json([
                'status'=>false,
                'message' => 'Cập nhật danh mục thành công!'
            ]);
         }
    }
 

      public function dulieu_bieudo_danhmuc(){
        $totals = Category::select('type', DB::raw('COUNT(*) as total'))
            ->whereIn('type', ['Vùng miền', 'Loại món ăn', 'Chế độ ăn'])
            ->groupBy('type')
            ->get();
        return response()->json([
            'status'=>true,
            'data' =>$totals
        ]);
    }
}

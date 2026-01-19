<?php

namespace App\Http\Controllers;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function ThemDM(Request $request){
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:categories,slug',
            'type' => 'required|in:khu vực,loại món ăn,chế độ ăn',
        ], [
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
}

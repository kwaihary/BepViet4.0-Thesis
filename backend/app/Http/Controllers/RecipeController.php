<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use Illuminate\Http\Request;

class RecipeController extends Controller
{
    public function index()
    {
        // Lấy bài viết kèm user và bình luận (giống cấu trúc DB bepviet_40)
        $recipes = Recipe::with(['user', 'comments.user'])->orderBy('created_at', 'desc')->get();

        // Chuyển đổi dữ liệu về đúng format mà Frontend bạn đang dùng
        $formattedPosts = $recipes->map(function ($recipe) {
            return [
                'id' => $recipe->id,
                'author' => $recipe->user->name ?? 'Người dùng',
                'authorAvatar' => $recipe->user->avatar ?? 'https://i.pravatar.cc/150?img=32',
                'time' => $recipe->created_at->diffForHumans(),
                'title' => $recipe->title,
                'content' => $recipe->description, // hoặc $recipe->content tùy DB
                'image' => $recipe->image,
                'likes' => number_format($recipe->likes_count ?? 0),
                'commentCount' => $recipe->comments->count(),
                'comments' => $recipe->comments->map(function ($cmt) {
                    return [
                        'id' => $cmt->id,
                        'user' => $cmt->user->name ?? 'Ẩn danh',
                        'avatar' => $cmt->user->avatar ?? 'https://i.pravatar.cc/150',
                        'content' => $cmt->content,
                        'time' => $cmt->created_at->diffForHumans(),
                        'replies' => [] // Nếu DB có phân cấp bình luận thì map vào đây
                    ];
                })
            ];
        });

        return response()->json($formattedPosts);
    }
    public function destroy($id)
{
    try {
        $recipe = Recipe::find($id);

        if (!$recipe) {
            return response()->json([
                'status' => false,
                'message' => 'Bài viết không tồn tại'
            ], 404);
        }

        // Xóa ảnh cũ trong thư mục storage nếu có
        if ($recipe->image) {
            \Storage::disk('public')->delete($recipe->image);
        }

        $recipe->delete();

        return response()->json([
            'status' => true,
            'message' => 'Xóa bài viết thành công'
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'status' => false,
            'message' => 'Lỗi: ' . $e->getMessage()
        ], 500);
    }

use Illuminate\Http\Request;
use App\Models\Recipe;
use App\Models\Ingredient; // Bắt buộc import để dùng firstOrCreate
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class RecipeController extends Controller
{
    public function store(Request $request)
    {
        // 1. Validate dữ liệu
        // Lưu ý: với objectToFormData từ function.js, ingredients và steps sẽ là mảng
        $validator = Validator::make($request->all(), [
            'title'       => 'required|string|max:255',
            'description' => 'required|string',
            'cook_time'   => 'required|integer|min:1',
            'difficulty'  => 'required|string',
            'file_image'  => 'required|image|mimes:jpeg,png,jpg,gif|max:5120',
            'ingredients' => 'required|array|min:1',
            'steps'       => 'required|array|min:1',
        ], [
            'title.required'       => 'Vui lòng nhập tên món ăn',
            'ingredients.required' => 'Cần ít nhất 1 nguyên liệu',
            'steps.required'       => 'Cần ít nhất 1 bước thực hiện',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status'  => 422,
                'message' => $validator->errors()->first(),
                'errors'  => $validator->errors()
            ], 422);
        }

        $imagePath = null;
        $recipe = null;

        try {
            // 2. Upload ảnh
            if ($request->hasFile('file_image')) {
                // Lưu vào folder 'recipes' trong storage public
                $imagePath = $request->file('file_image')->store('recipes', 'public');
            }

            // 3. Tạo Recipe (Bảng cha)
            $recipe = Recipe::create([
                'user_id'     => $request->user()->id, // Lấy từ token Auth
                'title'       => $request->title,
                'slug'        => Str::slug($request->title) . '-' . time(),
                'description' => $request->description,
                'cook_time'   => $request->cook_time,
                'difficulty'  => $request->difficulty,
                'image_url'   => $imagePath,
                'status'      => 1, // 1: Chờ duyệt
                'view_count'  => 0
            ]);

            // 4. Xử lý Nguyên liệu (Many-to-Many)
            // Logic: Tìm nguyên liệu trong kho -> Lấy ID -> Attach vào Recipe
            if ($request->has('ingredients')) {
                foreach ($request->ingredients as $item) {
                    if (!empty($item['name'])) {
                        
                        // A. Tìm hoặc Tạo mới Ingredient trong bảng 'ingredients'
                        // firstOrCreate sẽ kiểm tra 'name', nếu chưa có thì tạo mới
                        $ingredient = Ingredient::firstOrCreate(
                            ['name' => trim($item['name'])], 
                            ['type' => 'common'] // Giá trị mặc định nếu tạo mới (nếu cần)
                        );

                        // B. Lưu vào bảng trung gian 'recipe_ingredients'
                        // Attach nhận vào ID nguyên liệu và mảng dữ liệu Pivot (quantity, note)
                        // Model Recipe.php đã khai báo ->withPivot('quantity', 'note')
                        $recipe->ingredients()->attach($ingredient->id, [
                            'quantity' => $item['quantity'] ?? '',
                            'note'     => $item['note'] ?? null // Nếu frontend có gửi note
                        ]);
                    }
                }
            }

            // 5. Lưu Các bước làm (One-to-Many)
            // Sử dụng quan hệ steps() trong Recipe.php
            if ($request->has('steps')) {
                foreach ($request->steps as $index => $step) {
                    if (!empty($step['content'])) {
                        $recipe->steps()->create([
                            'step_order' => $index + 1,
                            'content'    => $step['content'],
                            // 'image_url' => ... (Xử lý upload ảnh bước làm ở đây nếu có)
                        ]);
                    }
                }
            }

            // Thành công
            return response()->json([
                'status'  => true,
                'message' => 'Đăng công thức thành công!',
                'data'    => $recipe
            ]);

        } catch (\Exception $e) {
            // --- ROLLBACK THỦ CÔNG (Vì không dùng DB::transaction) ---
            
            // Xóa Recipe (Cascade sẽ tự xóa hoặc xóa mồ côi tùy cấu hình DB)
            if ($recipe && $recipe->exists) {
                // Để sạch sẽ hơn, nên detach nguyên liệu trước (nếu DB không set cascade on delete)
                $recipe->ingredients()->detach();
                $recipe->steps()->delete();
                $recipe->delete(); 
            }

            // Xóa ảnh đã upload
            if ($imagePath && Storage::disk('public')->exists($imagePath)) {
                Storage::disk('public')->delete($imagePath);
            }

            return response()->json([
                'status'  => false,
                'message' => 'Lỗi hệ thống: ' . $e->getMessage()
            ], 500);
        }
    }
    public function index()
    {
        // Lấy danh sách món ăn, trạng thái = 1 (đã duyệt), kèm thông tin tác giả
        $recipes = Recipe::with('author') 
                    ->where('status', 1) 
                    ->orderBy('created_at', 'desc')
                    ->paginate(12);

        // Quan trọng: Phải trả về đúng cấu trúc này
        return response()->json([
            'status' => true,
            'data' => $recipes // Laravel paginate trả về object có chứa mảng data bên trong
        ]);
    }

public function show($id)
{
    // Tìm món ăn theo ID, load kèm các quan hệ
    $recipe = Recipe::with(['author', 'steps', 'ingredients', 'comments.user'])
        ->where('id', $id)
        ->first();

    if ($recipe) {
        // Tăng lượt xem
        $recipe->increment('view_count');
        
        return response()->json([
            'status' => true,
            'data' => $recipe
        ]);
    }

    return response()->json([
        'status' => false,
        'message' => 'Không tìm thấy món ăn này'
    ], 404);
}

public function detail_recipe()
{
    $recipes = Recipe::with(['author', 'comments.user', 'interactions'])
        // ->where('status', 'Đã duyệt') // <--- Tạm thời đóng dòng này lại
        ->orderBy('created_at', 'desc')
        ->paginate(10); 

    return response()->json([
        'status' => true,
        'data' => $recipes
    ]);
}
}
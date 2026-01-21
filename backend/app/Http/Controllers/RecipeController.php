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
}
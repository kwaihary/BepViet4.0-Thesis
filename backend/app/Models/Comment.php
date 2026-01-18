<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Comment extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id', 
        'recipe_id', 
        'parent_id',
        'content', 
    ];

    // Người bình luận
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Bình luận ở công thức nào
    public function recipe()
    {
        return $this->belongsTo(Recipe::class);
    }

    // Lấy các phản hồi của bình luận
    public function replies()
    {
        return $this->hasMany(Comment::class, 'parent_id');
    }
}

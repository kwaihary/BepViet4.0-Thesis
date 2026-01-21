<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Recipe extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id', 
        'title', 
        'slug', 
        'description', 
        'image_url', 
        'video_url', 
        'cook_time', 
        'difficulty', 
        'status', 
        'view_count'
    ];

    // Thuộc về ai
    public function author()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // Có nhiều bước làm
    public function steps()
    {
        return $this->hasMany(RecipeStep::class)->orderBy('step_order');
    }

    // Liên kết với bảng nguyên liệu (nhiều-nhiều)
    public function ingredients()
    {
        return $this->belongsToMany(Ingredient::class, 'recipe_ingredients')
                    ->withPivot('quantity', 'note')
                    ->withTimestamps();
    }   

    // Liên kết với danh mục (nhiều-nhiều)
    public function categories()
    {
        return $this->belongsToMany(Category::class, 'category_recipe');
    }

    // Bình luận của công thức
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    // Tương tác của công thức
    public function interactions()
    {
        return $this->hasMany(Interaction::class);
    }

    public function user() {
    return $this->belongsTo(User::class);
}


}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Cookbook extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id', 
        'title', 
        'is_public',
    ];

    // Bộ sưu tâp thuộc về người dùng nào
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Bộ sưu tập có công thức nào
    public function recipes()
    {
        return $this->belongsToMany(Recipe::class, 'cookbook_recipes', 'cookbook_id', 'recipe_id')
                    ->withPivot('added_at');
    }
}

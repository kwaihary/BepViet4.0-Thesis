<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Category extends Model
{
    use HasFactory;
    protected $fillable = [
        'name', 
        'slug', 
        'type', 
        'image_url'
    ];

    // Danh mục có công thức nào
    public function recipes()
    {
        return $this->belongsToMany(Recipe::class, 'category_recipe');
    }
}

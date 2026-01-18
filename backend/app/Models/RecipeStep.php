<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class RecipeStep extends Model
{
    use HasFactory;
    protected $fillable = [
        'recipe_id', 
        'step_order', 
        'content', 
        'image_url'
    ];

    // Bước làm thuộc về công thức nào
    public function recipe()
    {
        return $this->belongsTo(Recipe::class);
    }
}

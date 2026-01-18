<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Interaction extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'recipe_id', 
        'type', 
        'rating_value'
    ];

    // Người dùng nào tương tác
    public function user(){
        return $this->belongsTo(User::class);
    }

    // Tương tác cho công thức nào
    public function recipe(){
        return $this->belongsTo(Recipe::class);
    }
}
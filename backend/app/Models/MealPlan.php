<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class MealPlan extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'recipe_id', 
        'date', 
        'meal_type'
    ];

    // mealplan của ai
    public function user(){
        return $this->belongsTo(User::class);
    }
    // công thức thuộc mealplan nào
    public function recipe(){
        return $this->belongsTo(Recipe::class);
    }
}

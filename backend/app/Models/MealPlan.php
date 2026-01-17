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
}

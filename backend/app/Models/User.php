<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $table = 'users';

    protected $fillable = [
        'name',
        'phone',
        'address',
        'password',
        'avatar',
        'bio',
        'rule',
        'status',
        'social_id'
    ];

    protected $hidden = [
        'password',
        'remember_token'
    ];

    // 1 người dùng có thể có nhiều công thức món ăn
    public function recipes()
    {
        return $this->hasMany(Recipe::class);
    }

    // 1 người dùng có thể có nhiều bộ sưu tập
    public function cookbooks()
    {
        return $this->hasMany(Cookbook::class);
    }

    // 1 người dùng có thể có nhiều kế hoạch ăn uống
    public function mealPlans()
    {
        return $this->hasMany(MealPlan::class);
    }
}


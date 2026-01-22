<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Interaction extends Model
{
    use HasFactory;

    // QUAN TRỌNG: Dòng này cho phép lưu dữ liệu vào 3 cột này
    protected $fillable = [
        'user_id',
        'recipe_id',
        'type' // Loại tương tác: like, save, v.v.
    ];

    // Khai báo mối quan hệ (tùy chọn, để dùng sau này)
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function recipe()
    {
        return $this->belongsTo(Recipe::class);
    }
}
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class UserActivityLog extends Model
{
    use HasFactory;

    // id là string (log_001) 
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id', 
        'user_id', 
        'action', 
        'target_id', 
        'details'
    ];

    // ép kiểu cột details từ JSON sang mảng để dễ dùng
    protected $casts = [
        'details' => 'array',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }


}

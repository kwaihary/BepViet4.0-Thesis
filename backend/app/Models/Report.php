<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Report extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id', 
        'recipe_id', 
        'reason', 
        'status'
    ];

    // Ai report
    public function user(){
        return $this->belongsTo(User::class);
    }

    // Recipe bị báo cáo
    public function recipe(){
        return $this->belongsTo(Recipe::class);
    }
}

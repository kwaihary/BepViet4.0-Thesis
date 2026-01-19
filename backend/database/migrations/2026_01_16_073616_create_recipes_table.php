<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('recipes', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id'); 
            $table->string('title');
            $table->string('slug');
            $table->text('description');
            $table->string('image_url');
            $table->string('video_url');
            $table->integer('cook_time');
            $table->enum('difficulty', ['Dễ', 'Trung bình', 'Khó']);
            $table->enum('status', ['Đang chờ', 'Đã duyệt', 'Đã xóa'])->default('Đang chờ');
            $table->integer('view_count');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recipes');
    }
};

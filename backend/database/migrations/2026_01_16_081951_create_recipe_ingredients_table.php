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
        Schema::create('recipe_ingredients', function (Blueprint $table) {
            $table->id();
            // Liên kết món ăn
            $table->foreignId('recipe_id')->constrained('recipes')->onDelete('cascade');
            // Liên kết nguyên liệu
            $table->foreignId('ingredient_id')->constrained('ingredients')->onDelete('cascade');
            
            $table->string('quantity')->nullable(); // VD: 500g, 2 quả
            $table->string('note')->nullable(); // VD: Thái hạt lựu
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recipe_ingredients');
    }
};

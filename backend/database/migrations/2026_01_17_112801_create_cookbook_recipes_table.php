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
        Schema::create('cookbook_recipes', function (Blueprint $table) {
            // Vì là bảng trung gian nên không cần id auto increment cũng được, nhưng để cho dễ quản lý cứ để id
            $table->id();
            $table->foreignId('cookbook_id')->constrained('cookbooks')->onDelete('cascade');
            $table->foreignId('recipe_id')->constrained('recipes')->onDelete('cascade');
            $table->timestamp('added_at')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cookbook_recipes');
    }
};

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
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('reporter_id')->constrained('users')->onDelete('cascade'); // Người báo cáo
            // Báo cáo cái gì? (Lưu ID của đối tượng bị báo cáo)
            $table->integer('target_id');
            // Loại đối tượng: 'recipe', 'comment', 'user'
            $table->string('target_type');
            $table->string('reason'); // Lý do: Spam, Lừa đảo...
            $table->enum('status', ['pending', 'resolved', 'dismissed'])->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};

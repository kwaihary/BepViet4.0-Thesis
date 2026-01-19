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
            $table->foreignId('target_id')->constrained('recipes')->onDelete('cascade');
            $table->enum('reason', ['Spam', 'Tin giả', 'Phản cảm']); // Lý do: Spam, Lừa đảo...
            $table->integer('status')->default(0); // Trạng thái: 0 = Chưa xử lý, 1 = Đang xử lý, 2 = Đã xử lý
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

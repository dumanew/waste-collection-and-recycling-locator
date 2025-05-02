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
    Schema::create('center_material', function (Blueprint $table) {
        $table->unsignedBigInteger('center_id');
        $table->unsignedBigInteger('material_id');
        $table->foreign('center_id')->references('id')->on('centers')->onDelete('cascade');
        $table->foreign('material_id')->references('id')->on('materials')->onDelete('cascade');
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('center_material');
    }
};

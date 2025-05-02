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
        Schema::create('inquiries', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('contact_number');
            $table->text('message');
            $table->enum('center_type', ['recycling', 'waste']);
            $table->string('region');
            $table->string('city');
            $table->string('center_name');
            $table->string('center_email')->nullable();
            $table->string('center_contact_number')->nullable();
            $table->unsignedBigInteger('material_id')->nullable();
            $table->string('material_name')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inquiries');
    }
};

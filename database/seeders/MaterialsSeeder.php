<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MaterialsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $materials = [
            'batteries',
            'computers',
            'glass',
            'ink cartridges',
            'metals',
            'mixed materials',
            'paper',
            'plastics',
            'rubber',
            'tetrapack',
            'others',
        ];

        foreach ($materials as $material) {
            DB::table('materials')->insert([
                'name' => $material,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}

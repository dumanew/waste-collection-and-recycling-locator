<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CenterSeeder extends Seeder
{
    public function run(): void
    {
        $centers = [
            [
                'type' => 'recycling',
                'name' => 'Battery Eco Center',
                'region' => 'National Capital Region (NCR)',
                'city' => 'Quezon City',
                'address' => '100 Battery Rd',
                'contact_number' => '09171234567',
                'email' => 'battery@eco.ph',
                'material_name' => 'batteries',
            ],
            [
                'type' => 'recycling',
                'name' => 'Computer Green Tech',
                'region' => 'Central Luzon (Region III)',
                'city' => 'Angeles',
                'address' => '456 Silicon Valley Ave',
                'contact_number' => '09171234568',
                'email' => 'info@greentech.ph',
                'material_name' => 'computers',
            ],
            [
                'type' => 'recycling',
                'name' => 'Glass Recycle Hub',
                'region' => 'Ilocos Region (Region I)',
                'city' => 'Laoag',
                'address' => 'Glassway Blvd.',
                'contact_number' => '09171234569',
                'email' => 'glass@recycle.ph',
                'material_name' => 'glass',
            ],
            [
                'type' => 'recycling',
                'name' => 'InkCycle Center',
                'region' => 'Calabarzon (Region IV-A)',
                'city' => 'Calamba',
                'address' => '123 Print Lane',
                'contact_number' => '09171234570',
                'email' => 'ink@cycle.ph',
                'material_name' => 'ink cartridges',
            ],
            [
                'type' => 'recycling',
                'name' => 'Metal Matters',
                'region' => 'Northern Mindanao (Region X)',
                'city' => 'Cagayan de Oro',
                'address' => 'Iron Street',
                'contact_number' => '09171234571',
                'email' => 'metal@matters.ph',
                'material_name' => 'metals',
            ],
            [
                'type' => 'recycling',
                'name' => 'EcoMix Recycling',
                'region' => 'Central Visayas (Region VII)',
                'city' => 'Cebu City',
                'address' => 'Mixed Use Road',
                'contact_number' => '09171234572',
                'email' => 'mix@eco.ph',
                'material_name' => 'mixed materials',
            ],
            [
                'type' => 'recycling',
                'name' => 'Paper Trail Center',
                'region' => 'Bicol Region (Region V)',
                'city' => 'Legazpi',
                'address' => 'Paper Mill Compound',
                'contact_number' => '09171234573',
                'email' => 'paper@trail.ph',
                'material_name' => 'paper',
            ],
            [
                'type' => 'recycling',
                'name' => 'Plastic Smart Center',
                'region' => 'Davao Region (Region XI)',
                'city' => 'Davao City',
                'address' => 'Plastic Zone',
                'contact_number' => '09171234574',
                'email' => 'plastic@smart.ph',
                'material_name' => 'plastics',
            ],
            [
                'type' => 'recycling',
                'name' => 'Rubber Reclaim',
                'region' => 'Zamboanga Peninsula (Region IX)',
                'city' => 'Zamboanga City',
                'address' => 'Tire Blvd.',
                'contact_number' => '09171234575',
                'email' => 'rubber@reclaim.ph',
                'material_name' => 'rubber',
            ],
            [
                'type' => 'recycling',
                'name' => 'TetraDrop Hub',
                'region' => 'Western Visayas (Region VI)',
                'city' => 'Iloilo',
                'address' => 'Tetra Center',
                'contact_number' => '09171234576',
                'email' => 'tetra@drop.ph',
                'material_name' => 'tetrapack',
            ],
            [
                'type' => 'recycling',
                'name' => 'General Eco Drop',
                'region' => 'Caraga (Region XIII)',
                'city' => 'Butuan',
                'address' => 'Eco Park',
                'contact_number' => '09171234577',
                'email' => 'eco@drop.ph',
                'material_name' => 'others',
            ],
        ];

        foreach ($centers as $centerData) {
            $material = DB::table('materials')->where('name', $centerData['material_name'])->first();

            if (!$material) {
                continue; // skip if material not found
            }

            unset($centerData['material_name']);
            $centerData['material_id'] = $material->id;
            $centerData['created_at'] = now();
            $centerData['updated_at'] = now();

            $centerId = DB::table('centers')->insertGetId($centerData);

            DB::table('center_material')->insert([
                'center_id' => $centerId,
                'material_id' => $material->id,
            ]);
        }
    }
}

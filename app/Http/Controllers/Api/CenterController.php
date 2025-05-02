<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CenterController extends Controller
{
    public function centerNames(Request $request)
    {
        $region = $request->region;
        $city = $request->city;
        $type = $request->type;
        $material = $request->material;

        $query = DB::table('centers')
            ->select('name')
            ->when($region, fn($q) => $q->where('region', $region))
            ->when($city, fn($q) => $q->where('city', $city))
            ->when($type, fn($q) => $q->where('type', $type))
            ->when($material, fn($q) => $q->where('material_id', $material));

        return response()->json($query->pluck('name'));
    }

    public function cities(Request $request)
    {
        $region = $request->region;

        $cities = DB::table('centers')
            ->where('region', $region)
            ->select('city')
            ->distinct()
            ->pluck('city');

        return response()->json($cities);
    }

    public function centerDetails(Request $request)
    {
        $center = DB::table('centers')
            ->join('materials', 'centers.material_id', '=', 'materials.id')
            ->where('centers.name', $request->name)
            ->first([
                'centers.address',
                'centers.contact_number',
                'centers.email',
                'centers.material_id',
                'materials.name as material_name',
            ]);

        return response()->json($center);
    }

    

    public function materials()
    {
        return DB::table('materials')->select('id', 'name')->get();
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Inquiry;
use Illuminate\Support\Facades\DB;

class InquiryController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'contact_number' => 'required|string|max:20',
            'message' => 'required|string|max:1000',
            'center_type' => 'required|in:recycling,waste',
            'region' => 'required|string',
            'city' => 'required|string|max:255',
            'center_name' => 'required|string|max:255',
        ]);

        $center = DB::table('centers')
            ->where('name', $validated['center_name'])
            ->where('region', $validated['region'])
            ->where('city', $validated['city'])
            ->where('type', $validated['center_type'])
            ->first(['contact_number', 'email', 'material_id']);

        $materialName = null;
        if ($center?->material_id) {
            $materialName = DB::table('materials')->where('id', $center->material_id)->value('name');
        }

        Inquiry::create([
            ...$validated,
            'center_contact_number' => $center->contact_number ?? null,
            'center_email' => $center->email ?? null,
            'material_id' => $center->material_id ?? null,
            'material_name' => $materialName,
        ]);

        return response()->json(['message' => 'Inquiry stored successfully!'], 201);
    }
}

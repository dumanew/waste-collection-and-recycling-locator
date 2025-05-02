<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Center extends Model
{
    protected $fillable = [
        'type',
        'name',
        'region',
        'city',
        'address',
        'contact_number',
        'email',
    ];

    /**
     * The materials that the center can handle.
     */
    public function materials()
    {
        return $this->belongsToMany(Material::class, 'center_material');
    }
}

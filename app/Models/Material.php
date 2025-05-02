<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Material extends Model
{
    protected $fillable = [
        'name',
    ];

    /**
     * The centers that can handle this material.
     */
    public function centers()
    {
        return $this->belongsToMany(Center::class, 'center_material');
    }
}

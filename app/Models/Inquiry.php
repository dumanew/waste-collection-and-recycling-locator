<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inquiry extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'contact_number',
        'message',
        'center_type',
        'region',
        'city',
        'center_name',
        'center_contact_number',
        'center_email',
        'material_id',
        'material_name',
    ];

    /**
     * Get the material associated with this inquiry.
     */
    public function material()
    {
        return $this->belongsTo(Material::class);
    }
}

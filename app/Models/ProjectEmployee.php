<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class ProjectEmployee extends Pivot
{
    protected $fillable = [
        'project_id',
        'user_id', 
    ];

    public $timestamps = false;

    public function project() 
    {
        return $this->belongsTo(Project::class, 'project_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}

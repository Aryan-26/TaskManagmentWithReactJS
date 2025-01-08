<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Project extends Model
{
    use HasUuids;

    // protected $keyType = 'string';
    // public $incrementing = false;

    protected $fillable = [
        'name',
        'description',
        'client_id',
        'created_by',
        'updated_by',
        'start_date',
        'end_date'
    ];

    public function client(): BelongsTo
    {
        return $this->belongsTo(User::class, 'client_id');
    }

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }

    // public function users(): BelongsToMany
    // {
    //     return $this->belongsToMany(User::class, 'project_employees', 'project_id', 'employee_id');
    // }

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
    public function users()
    {
        return $this->belongsToMany(User::class, 'project_employees', 'project_id', 'user_id');
    }
    
    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
    public function assignedUser(): BelongsTo
    {
        return $this->belongsTo(User::class,'assigned_to');
    }

    // protected static function boot()
    // {
    //     parent::boot();

    //     static::creating(function ($model) {
    //         if (empty($model->{$model->getKeyName()})) {
    //             $model->{$model->getKeyName()} = Str::uuid()->toString();
    //         }
    //     });
    // }
    
}

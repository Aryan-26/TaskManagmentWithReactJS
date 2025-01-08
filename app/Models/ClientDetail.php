<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
class ClientDetail extends Model
{
     public $incrementing = false;
    protected $guarded = [];
    protected $table = 'client_details';
    
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->{$model->getKeyName()})) {
                $model->{$model->getKeyName()} = Str::uuid()->toString();
            }
        });
    }


    public function user()
    {
        return $this->belongsTo(User::class,'user_id');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sites extends Model
{
    protected $guarded = [];
    public function user()
    {
        return $this->belongsTo('Cartalyst\Sentinel\Users\EloquentUser','id');
    }
}

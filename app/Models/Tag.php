<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $fillable = ['name'];

    public function articles()
    {
        return $this->morphedByMany('App\Models\Article', 'taggable');
    }

    public function videos()
    {
        return $this->morphedByMany('App\Models\Video', 'taggable');
    }


}

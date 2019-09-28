<?php

namespace App\Models;

use App\User;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    public $guarded = [];

    public function category()
    {
        return $this->belongsTo(Category::class, 'cat_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

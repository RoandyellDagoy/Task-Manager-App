<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Task extends Model
{
    use HasFactory;

    // Allow mass assignment
    protected $fillable = [
        'title',
        'description',
        'status',
        'user_id',
    ];

    // Relationship: Task belongs to a User
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

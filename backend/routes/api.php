<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;






Route::post('/register', [AuthController::class , 'register']);
Route::post('/login', [AuthController::class , 'login']);

Route::middleware('auth:sanctum')->group(function(){
    Route::apiResource('tasks', TaskController::class)->middleware('auth:sanctum');

    Route::get('/test', [AuthController::class , 'test']) ->middleware('auth');
    Route::post('/logout', [AuthController::class , 'logout']) ->middleware('auth');
});

Route::get('/tasks', [TaskController::class, 'index']);   // Read all tasks
Route::post('/tasks', [TaskController::class, 'store']);  // Create new task
Route::put('/tasks/{id}', [TaskController::class, 'update']); // Update task
Route::delete('/tasks/{id}', [TaskController::class, 'destroy']); 


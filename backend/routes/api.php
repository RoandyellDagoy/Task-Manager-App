<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

Route::post('/register', function (Request $request) {
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|unique:users',
        // FIXED: use "string|min:8" instead of "password" (since "password" is not a Laravel rule)
        'password' => 'required|string|min:8',
    ]);

    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
    ]);

    return response()->json(['user' => $user], 201);
});

Route::post('/login', function (Request $request) {
    $request->validate([
        'email' => 'required|email',
        // FIXED: changed from 'required|password' → 'required|string'
        'password' => 'required|string',
    ]);

    $user = User::where('email', $request->email)->first();

    if (! $user || ! Hash::check($request->password, $user->password)) {
        throw ValidationException::withMessages([
            'email' => ['The credentials are invalid'],
        ]);
    }

    // FIXED: removed "$user = Auth::user()" because user is not logged in yet.
    // Instead, we directly use the $user we found from DB.
    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'message' => 'Login successful',
        'token'   => $token,
        'user'    => $user
    ]);
});

// ✅ Protected routes
Route::middleware(['auth:sanctum', 'throttle:api'])->group(function () {
    Route::get('/test', function (Request $request) {
        return ['message' => 'You are logged in as ' . $request->user()->name];
    });

    Route::post('/logout', function (Request $request) {
        // FIXED: typo corrected → "currentAcccessToken()" → "currentAccessToken()"
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logout Successfully!']);
    });
});

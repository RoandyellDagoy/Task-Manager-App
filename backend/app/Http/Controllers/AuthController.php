<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use Illuminate\Validation\ValidationException;



class AuthController extends Controller
{
 public function __construct()
 {
    $this->middleware('auth:sanctum')->only(['test', 'logout']);
 }


  public function register(Request $request)
  {
     $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|unique:users',
        'password' => 'required|string|min:8',
    ]);

    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
    ]);

    return response()->json(['user' => $user], 201);
  }

  public function login(Request $request)
  {
     $request->validate([
        'email' => 'required|email',
        'password' => 'required|string',
    ]);

    $user = User::where('email', $request->email)->first();

    if (! $user || ! Hash::check($request->password, $user->password)) {
        throw ValidationException::withMessages([
            'email' => ['The credentials are invalid'],
        ]);
    }

    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'message' => 'Login successful',
        'token'   => $token,
        'user'    => $user
    ]);
  }


  // protected routes

  public function test(Request $request) 
  {
    return ['message' => 'You are logged in as ' . $request->user()->name];
  }

  public function logout(Request $request)
  {
     $request->user()->currentAccessToken()->delete();
    return response()->json(['message' => 'Logout Successfully!']);
  }

}

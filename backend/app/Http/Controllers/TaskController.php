<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user =auth()->user();
        $tasks = $user->tasks;

        return response()->json([
            'success' => true,
            'data' => $tasks
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|string|in:pending,done',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        if ($task->user_id !== auth()->id()){
            abort(403,'Unauthorized');
        }

        return $task;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        if($task->user_id !== auth()->id()){
            abort(403, 'unautorized');
        }

        $data = $request->validate([
            'title'=> 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'status' => 'sometimes|string|in:pending,done',
        ]);

        $task->update($data);

        return response()->json($task);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        if($task->user_id !== auth()->id()){
            abort(403, 'Unautorized');
        }

        $task->delete();

        return response()->json(['message' => 'message deleted']);
    }
}

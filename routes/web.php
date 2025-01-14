<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Client\ClientController;
use App\Http\Controllers\Client\ClientDetailsController;
use App\Http\Controllers\Employee\EmployeeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'index'])->name('profile.index');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('client-details', ClientDetailsController::class)->names([
        'index' => 'clientDetails.index',
        'create' => 'clientDetails.create',
        'store' => 'clientDetails.store',
        'show' => 'clientDetails.show',
        'edit' => 'clientDetails.edit',
        'update' => 'clientDetails.update',
        'destroy' => 'clientDetails.destroy',
    ]);
    Route::post('client-details', [ClientDetailsController::class, 'store'])->name('clientDetails.store');
});

Route::resource('users', UserController::class);
Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');
Route::resource('tasks', TaskController::class)->except('update')->names([
    'index' => 'tasks.index',
    'create' => 'tasks.create',
    'store' => 'tasks.store',
    'show' => 'tasks.show',
    'edit' => 'tasks.edit',
    // 'update' => 'tasks.update',
    'destroy' => 'tasks.destroy',
]);
Route::patch('/tasks/{task}', [TaskController::class, 'update'])->name('tasks.update');

// Route::resource('projects', ProjectController::class);
Route::get('/projects', [ProjectController::class, 'index'])->name('projects.index'); // Display a listing of the resource
Route::get('/projects/create', [ProjectController::class, 'create'])->name('projects.create'); // Show the form for creating a new resource
Route::post('/projects', [ProjectController::class, 'store'])->name('projects.store'); // Store a newly created resource in storage
Route::get('/projects/{project}', [ProjectController::class, 'show'])->name('projects.show'); // Display the specified resource
Route::get('/projects/{project}/edit', [ProjectController::class, 'edit'])->name('projects.edit'); // Show the form for editing the specified resource
Route::patch('/projects/{project}', [ProjectController::class, 'update'])->name('projects.update'); // Update the specified resource in storage
Route::delete('/projects/{project}', [ProjectController::class, 'destroy'])->name('projects.destroy'); // Remove the specified resource from storage
// Route::get('/projects/{project}/employees', [ProjectController::class, 'getAssignedEmployees'])->name('projects.employees');
// Route::put('/projects/{project}', [ProjectController::class, 'update'])->name('projects.update');

Route::middleware('role:admin')->prefix('admin')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'index'])->name('admin.dashboard');
    // Route::get('/dashboard', [ClientController::class, 'index'])->name('client.index');

    Route::get('/clients', [ClientController::class, 'index'])->name('client.index');
});
Route::middleware('role:employee')->prefix('employee')->group(function () {
    Route::get('/dashboard', [EmployeeController::class, 'index'])->name('employee.dashboard');
    // Route::get('/tasks', [EmployeeController::class,'indexE'])->name('employees.task');
    // Route::resource('users', UserController::class)->except('index','edit','update','destroy');

});

Route::middleware('role:client')->prefix('client')->group(function () {

    Route::get('/dashboard', [ClientController::class, 'show'])->name('client.dashboard');
    // Route::resource('users', UserController::class)->except('index','edit','update','destroy');

});

require __DIR__ . '/auth.php';

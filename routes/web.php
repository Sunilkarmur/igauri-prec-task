<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

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
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('products/list', [\App\Http\Controllers\ProductController::class,'list'])->name('products.list');
Route::get('/products/{product_id}', [\App\Http\Controllers\ProductController::class, 'edit']);
Route::resource('products', \App\Http\Controllers\ProductController::class);

Route::post('/cart/add', [\App\Http\Controllers\CartItemController::class,'addItem'])->name('cart.add');
Route::get('/cart', [\App\Http\Controllers\CartItemController::class,'showCart'])->name('cart.show');
Route::get('/carts', [\App\Http\Controllers\CartItemController::class,'index'])->name('cart.index');


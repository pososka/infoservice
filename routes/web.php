<?php

use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

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

Route::get('/verify-email/{id}/{hash}', [VerifyEmailController::class, '__invoke'])
  ->middleware(['auth', 'signed', 'throttle:6,1'])
  ->name('verification.verify');

Route::get('{any}', [HomeController::class, 'index'])->where('any', '.*');

// Route::get('/', function () {
//     return ['Laravel' => app()->version()];
// });

// require __DIR__.'/auth.php';

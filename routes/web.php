<?php

use App\Http\Controllers\TickersController;
use Illuminate\Support\Facades\Route;
use App\Models\Ticker;

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
    $tikr = Ticker::orderBy('tikr')->take(100)->where('exchange_id', 2)->get();
    $tickers = $tikr->toArray();
    return view('layouts.app', ['tickers' => $tickers]);
})->name('root');

Route::get('/security/{exchange}/{security}', [TickersController::class, 'show'])->name('search');

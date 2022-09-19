<?php

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
    $tikr = Ticker::orderBy('tikr')->get();
    $tickers = $tikr->toArray();
    // dd($tickers);
    return view('layouts.layout', ['tickers' => $tickers]);
})->name('root');

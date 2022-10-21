<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
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
    Inertia::setRootView('layouts.app');
    return inertia('app', ['title' => 'Planet Capital']);
})->name('root');

Route::get('/security/{exchange}/{symbol}/relative-valuation/', function (Request $req) {
    Inertia::setRootView('layouts.app');
    return inertia('RelativeValuation/Index', [
        'symbol' => $req->symbol,
        'exchange' => $req->exchange,
    ]);
});

Route::get('/security/{exchange}/{symbol}/relative-valuation/ratio/{ratio}', function (Request $req) {
    Inertia::setRootView('layouts.app');
    return inertia('RelativeValuation/Ratio/Index', [
        'ratio' => $req->ratio,
        'symbol' => $req->symbol,
        'exchange' => $req->exchange,
    ]);
});

Route::get('/dashboard', function () {
    Inertia::setRootView('layouts.app');
    return inertia('Dashboard/Index');
})->name('dashboard');
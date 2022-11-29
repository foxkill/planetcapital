<?php

use App\Http\Controllers\RatiosController;
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

// RelativeValuation
Route::get('/security/{exchange}/{symbol}/relative-valuation/', function (Request $req) {
    Inertia::setRootView('layouts.app');
    return inertia('RelativeValuation/Index', [
        'symbol' => $req->symbol,
        'exchange' => $req->exchange,
    ]);
})->name("security.relative.valuation");

// RelativeValuation - Ratios
Route::get('/security/{exchange}/{symbol}/relative-valuation/ratio/{ratio}', [RatiosController::class, 'index'])
    ->name('ratios');

Route::get('/dashboard', function () {
    Inertia::setRootView('layouts.app');
    return inertia('Dashboard/Index');
})->name('dashboard');


//
// Financials - Income Statement
//
Route::get('/security/{exchange}/{symbol}/financials/income-statement', function (Request $req) {
    Inertia::setRootView('layouts.app');
    return inertia('Financials/Income-Statement/Index', [
        'symbol' => $req->symbol,
        'exchange' => $req->exchange,
    ]);
})->name("security.financials.incomestatement");

//
// Financials - Income Statement - Line Item
//
Route::get('/security/{exchange}/{symbol}/financials/income-statement/{lineitem}', function (Request $req) {
    Inertia::setRootView('layouts.app');
    return inertia('Financials/Income-Statement/LineItem/Index', [
        'symbol' => $req->symbol,
        'exchange' => $req->exchange,
        'lineitem' => $req->lineitem,
    ]);
})->name("security.financials.incomestatement.lineitem");


Route::get('/security/{exchange}/{symbol}/profitability', function (Request $req) {
    Inertia::setRootView('layouts.app');
    return inertia('Profitability/Index', [
        'symbol' => $req->symbol,
        'exchange' => $req->exchange,
    ]);
})->name("security.profitability");
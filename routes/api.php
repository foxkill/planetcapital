<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Ticker;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::get('/tickers', function (Request $request) {
    return response()->json(
        Ticker::select(['id', 'tikr', 'name', 'exchange_id'])->where('exchange_id', 2)->orderBy('tikr')->get()
    );
});


Route::get('/security/{exchange}/{tikr}/summary', function (Request $request) {
    return response()->json([$request->tikr, $request->exchange]);
});
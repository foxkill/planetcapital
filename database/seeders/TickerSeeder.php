<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\File;
use Illuminate\Database\Seeder;
use App\Models\Exchange;
use App\Models\Ticker;

class TickerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Ticker::truncate();

        $symbolsJson = File::get('database/seeders/symbols.json');

        $symbols = json_decode($symbolsJson);

        $exchanges = Exchange::all();

        foreach ($symbols as $key => $symbol) {
            $exchange = $exchanges->where('exchange_short_name', $symbol->exchangeShortName)?->first();
            Ticker::create(
                [
                    'tikr' => $symbol->symbol,
                    'name' => $symbol->name,
                    'exchange_id' => $exchange ? $exchange->id : 0,
                ]
            );
        }
    }
}

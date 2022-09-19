<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Ticker;
use File;

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

        $tickerJson = File::get('database/seeders/tickers.json');

        $tickers = json_decode($tickerJson);

        foreach ($tickers as $key => $ticker) {
            Ticker::create(['tikr' => $ticker, 'name' => '']);
        }
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\File;
use Illuminate\Database\Seeder;
use App\Models\Exchange;

class ExchangeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Schema::disableForeignKeyConstraints();
        Exchange::truncate();
        Schema::enableForeignKeyConstraints();

        $symbolsJson = File::get('database/seeders/symbols.json');
        $symbols = json_decode($symbolsJson);

        $exchanges = [];
        foreach ($symbols as $key => $symbol) {
            $exchanges[$symbol->exchangeShortName] = $symbol->exchange;
        }

        foreach ($exchanges as $key => $value) {
            Exchange::create(
                [
                    'exchange_short_name' => $key,
                    'exchange' => $value
                ]
            );
        }
    }
}

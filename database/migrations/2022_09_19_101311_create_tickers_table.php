<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Exchange;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tickers', function (Blueprint $table) {
            $table->id();
            $table->string('tikr', 16)->index();
            $table->string('name')->index();
            $table->foreignIdFor(Exchange::class)->references('id')->on('exchanges');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tickers');
    }
};

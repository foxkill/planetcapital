<datalist id="tickerlist">
@foreach ($tickers as $ticker)
<option>{{ $ticker['tikr'] }}</option>
@endforeach
</datalist>
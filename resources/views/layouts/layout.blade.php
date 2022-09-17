<!DOCTYPE html>
<html lang="{{ config('lang', 'en') }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link defer rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" crossorigin>
	<link defer rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/components/icon.min.css" crossorigin>
	<link defer rel="stylesheet" type="text/css" href="https://unpkg.com/swiper/swiper-bundle.min.css"/>
    <title>{{ config('app.name') }}</title>
    <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>
</head>

<body class="dimmable scrolling">
    @include('includes.header') 
    @include('includes.footer')
    <script src="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.js"></script>
</body>

</html>
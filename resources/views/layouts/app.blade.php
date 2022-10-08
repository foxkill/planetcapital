<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" data-theme="light">

<head>
   <meta charset="utf-8">
   <title>{{ config('app.name', 'Planet Capital') }}</title>

   <!-- mobile responsive meta -->
   <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
   <meta name="csrf-token" content="{{ csrf_token() }}">
   <!-- ** Plugins Needed for the Project ** -->
   <!-- plugins -->
   <!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css"> -->
   <!-- <link rel="stylesheet" href="//cdn.webix.comg/edge/webix.css" type="text/css"> -->
   <!-- <link rel="stylesheet" href="plugins/themify-icons/themify-icons.css"> -->
   <!-- Main Stylesheet -->
   @viteReactRefresh
   @vite(['resources/css/app.css', 'resources/ts/app.tsx'])

   <!-- <script src="//cdn.webix.com/edge/webix.js" type="text/javascript"></script> -->
   <!--Favicon-->
   <link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon">
   <link rel="icon" href="images/favicon.ico" type="image/x-icon">
</head>

<body class="antialiased font-montserrat text-base text-gray-800 bg-base-200">
   <noscript>Does not work without javascript</noscript>
   <div id="app"></div>
</body>
</html>
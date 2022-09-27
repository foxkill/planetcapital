<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

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
   @vite(['resources/css/app.css', 'resources/ts/app.ts'])

   <script src="https://cdn.tailwindcss.com"></script>
   <!-- <script src="//cdn.webix.com/edge/webix.js" type="text/javascript"></script> -->
   <!--Favicon-->
   <link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon">
   <link rel="icon" href="images/favicon.ico" type="image/x-icon">
   <script>
      tailwind.config = {
         theme: {
            screens: {
               sm: '480px',
               md: '768px',
               lg: '976px',
               xl: '1440px'
            },
            extend: {
               colors: {
                  pageRed: '#FF0043',
                  'search-field': '#f1f2f3'
               },
               backgroundImage: {
                  'icon-search': "url('images/icon-search-small.svg')",
               },
            }
         }
      }
   </script>
</head>

<body>
   <nav class="relative container mx-auto p-6" role="navigation" aria-label="main navigation">
      <!-- Flex container -->
      <div class="flex flex-wrap items-center justify-between">
         <!-- Logo -->
         <a class="flex justify-center" href="{{ route('root') }}">
            <img src="images/logo.png" alt="Planet Capital Logo" class="mr-3 h-6 sm:h-10">
            <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-black">{{ config('app.name', 'Planet Capital') }}</span>
         </a>
         <!-- Navigation -->
         <div class="hidden md:flex space-x-6 justify-between items-center ml-10 mr-auto">
            <a href="#" class="href">Home</a>
            <a href="#" class="href">Dashboard</a>
            <a href="#" class="href">Contact</a>
         </div>
         <a href="#" class="hidden p-3 pt-2 px-6 rounded-full bg-blue-400 text-white baseline md:flex">Login</a>
      </div>
   </nav>
   <!-- Hero section -->
   <section id="hero">
      <!-- Flex container -->
      <div class="flex flex-col-reverse md:flex-row items-center px-6 mx-auto mt-10 space-y-0 md:space-y-0">
         <!-- Left item -->
         <div class="flex flex-col mb-32 space-y-12 md:w-1/2">
            <h1 class="max-w-md text-4xl text-center font-bold md:text-5xl md:text-left">
               Search for your favorite ticker here...
            </h1>
            <!-- searchbox -->
            <form action="{{route('search')}}" method="GET">
               @csrf
               <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
               <div class="relative">
                  <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                     <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                     </svg>
                  </div>
                  <input type="search" id="ticker" class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for tickers like AAPL..." required="" list="tickerlist">
                  <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                  @include('includes.tickerlist', $tickers)
               </div>
            </form>
         </div>
         <!-- Image -->
         <div class="flex p-10">
            <img src="images/banner.webp" class="rounded">
         </div>
      </div>
   </section>

   <!--
   <nav class="" role="navigation" aria-label="main navigation">
      <div class="container">
         <div class="navbar-brand">
            <a class="navbar-item" href="{{ route('root') }}">
               <img class="img-fluid" src="images/logo.png" alt="Planet Capital Logo" width="155px">
            </a>

            <a role="button" class="navbar-burger burger" aria-expanded="false" data-target="navbar-links">
               <span aria-hidden="true"></span>
               <span aria-hidden="true"></span>
               <span aria-hidden="true"></span>
            </a>
         </div>

         <div id="navbar-links" class="navbar-menu">
            <div class="navbar-start ml-auto">
               <a class="navbar-item" href="{{ route('root') }}">Home</a>
               <a class="navbar-item" href="list.html">Dashboard</a>
               <a class="navbar-item" href="search.html">Watchlist</a>
            </div>

            <div class="navbar-end ml-0">
               <div class="navbar-item py-0">
                  <a href="changelog.html" class="btn btn-sm btn-outline-primary ml-4">changelog</a>
                  <a href="contact.html" class="btn btn-sm btn-primary ml-4">contact</a>
               </div>
            </div>
         </div>
      </div>
   </nav>
   -->
   <!-- banner w/search -->
   <!--
   <section class="section pb-0">
      <div class="container">
         <div class="columns is-justify-content-space-between is-align-items-center">
            <div class="column is-7-desktop has-text-centered-mobile has-text-centered-tablet has-text-left-desktop">
               <h1 class="mb-4">{{ config('app.name', 'Planet Capital') }}</h1>
               <p class="mb-4">Lorem ipsum dolor amet, consetetur sadiffspscing elitr, diam nonumy invidunt ut labore et
                  dolore magna aliquyam erat, sed diam voluptua At.</p>
               <form class="search-wrapper" action="search.html">
                  <input id="search-by" name="s" type="search" class="input input-lg" placeholder="Search stocks here..." list="tickerlist">
                  <button type="submit" class="btn btn-primary">Search</button>
                  @include('includes.tickerlist', $tickers)
               </form>
            </div>
            <div class="column is-4-desktop hidden-on-tablet">
               <img src="images/banner.png" alt="illustration" class="img-fluid">
            </div>
         </div>
      </div>
   </section>
   -->
   <!-- /banner -->

   <!--
   <section class="section pb-0">
      <div class="container">
         <h2 class="section-title">Your Topics</h2>
         <div class="columns is-multiline">
            <div class="column is-3-widescreen is-4-desktop is-6-tablet">
               <div class="card match-height">
                  <div class="card-body">
                     <i class="card-icon ti-panel mb-5"></i>
                     <h3 class="card-title h4">Basic Startup</h3>
                     <p class="card-text">Cras at dolor eget urna varius faucibus tempus in elit dolor sit amet.</p>
                     <a href="list.html" class="stretched-link"></a>
                  </div>
               </div>
            </div>
            <div class="column is-3-widescreen is-4-desktop is-6-tablet">
               <div class="card match-height">
                  <div class="card-body">
                     <i class="card-icon ti-credit-card mb-5"></i>
                     <h3 class="card-title h4">Account Bill</h3>
                     <p class="card-text">Cras at dolor eget urna varius faucibus tempus in elit dolor sit amet.</p>
                     <a href="list.html" class="stretched-link"></a>
                  </div>
               </div>
            </div>
            <div class="column is-3-widescreen is-4-desktop is-6-tablet">
               <div class="card match-height">
                  <div class="card-body">
                     <i class="card-icon ti-package mb-5"></i>
                     <h3 class="card-title h4">Our Features</h3>
                     <p class="card-text">Cras at dolor eget urna varius faucibus tempus in elit dolor sit amet.</p>
                     <a href="list.html" class="stretched-link"></a>
                  </div>
               </div>
            </div>
            <div class="column is-3-widescreen is-4-desktop is-6-tablet">
               <div class="card match-height">
                  <div class="card-body">
                     <i class="card-icon ti-settings mb-5"></i>
                     <h3 class="card-title h4">Theme Facility</h3>
                     <p class="card-text">Cras at dolor eget urna varius faucibus tempus in elit dolor sit amet.</p>
                     <a href="list.html" class="stretched-link"></a>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </section>
   -->

   <!-- faq -->
   <section class="section pb-0">
      <div class="container">
         <h2 class="section-title">Mostly Asked Questions</h2>
         <div class="columns masonry-wrapper">
            <!-- faq item -->
            <div class="column is-6-desktop">
               <div class="card card-lg">
                  <div class="card-body">
                     <h3 class="card-title h5">Will updates also be free?</h3>
                     <p class="card-text content">Lorem, <a href="https://examplesite.com">link</a> <em>ipsum</em> dolor
                        sit amet consectetur adipisicing elit. Cumque praesentium nisi officiis maiores quia sapiente
                        totam
                        omnis vel sequi corporis ipsa incidunt reprehenderit recusandae maxime perspiciatis iste placeat
                        architecto, mollitia delectus ut ab quibusdam. Magnam cumque numquam tempore reprehenderit illo,
                        unde cum omnis vel sed temporibus. mollitia delectus ut ab quibusdam. Magnam cumque numquam
                        tempore
                        reprehenderit illo, unde cum
                        omnis vel sed temporibus. mollitia delectus ut ab quibusdam. Magnam cumque numquam tempore
                        reprehenderit
                        illo, unde cum omnis vel sed temporibus.</p>
                  </div>
               </div>
            </div>
            <!-- faq item -->
            <div class="column is-6-desktop">
               <div class="card card-lg">
                  <div class="card-body">
                     <h3 class="card-title h5">Discounts for students and Non Profit Organizations?</h3>
                     <p class="card-text content">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque
                        praesentium
                        nisi officiis maiores quia sapiente totam omnis vel sequi corporis ipsa incidunt reprehenderit
                        recusandae
                        maxime perspiciatis iste placeat architecto.</p>
                  </div>
               </div>
            </div>
            <!-- faq item -->
            <div class="column is-6-desktop">
               <div class="card card-lg">
                  <div class="card-body">
                     <h3 class="card-title h5">I need something unique, Can you make it?</h3>
                     <p class="card-text content">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque
                        praesentium
                        nisi officiis maiores quia sapiente totam omnis vel sequi corporis ipsa incidunt reprehenderit
                        recusandae
                        maxime perspiciatis iste placeat architecto, mollitia delectus <a href="https://examplesite.com">link</a>
                        ut ab quibusdam. Magnam cumque numquam tempore reprehenderit illo, unde cum omnis vel sed
                        temporibus,
                        repudiandae impedit nam ad enim porro, qui labore fugiat quod suscipit fuga necessitatibus.
                        Perferendis,
                        ipsum?</p>
                  </div>
               </div>
            </div>
            <!-- faq item -->
            <div class="column is-6-desktop">
               <div class="card card-lg">
                  <div class="card-body">
                     <h3 class="card-title h5">Is there any documentation and support?</h3>
                     <p class="card-text content">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque
                        praesentium
                        nisi officiis maiores quia sapiente totam omnis vel sequi corporis ipsa incidunt reprehenderit
                        recusandae
                        maxime perspiciatis iste placeat architecto, mollitia delectus <a href="https://examplesite.com">link</a>
                        ut ab quibusdam.</p>
                  </div>
               </div>
            </div>
            <!-- faq item -->
            <div class="column is-6-desktop">
               <div class="card card-lg">
                  <div class="card-body">
                     <h3 class="card-title h5">Any refunds?</h3>
                     <p class="card-text content">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque
                        praesentium
                        nisi officiis maiores quia sapiente totam omnis vel sequi corporis ipsa incidunt reprehenderit
                        recusandae
                        maxime perspiciatis iste placeat architecto.</p>
                  </div>
               </div>
            </div>
            <!-- faq item -->
            <div class="column is-6-desktop">
               <div class="card card-lg">
                  <div class="card-body">
                     <h3 class="card-title h5">What is a product key?</h3>
                     <p class="card-text content">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque
                        praesentium
                        nisi officiis maiores quia sapiente totam omnis vel sequi corporis ipsa incidunt</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </section>
   <!-- /faq -->

   <!-- call to action -->
   <section class="section">
      <div class="container">
         <div class="columns is-align-items-center">
            <div class="column is-4-desktop has-text-centered hidden-on-tablet">
               <img src="images/illustration.png" class="img-fluid" alt="">
            </div>
            <div class="column is-8-desktop has-text-centered-mobile has-text-centered-tablet has-text-left-desktop">
               <h2 class="mb-3">Still Didn&rsquo;t Find Your Answer?</h2>
               <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam <br> nonumy eirmod tempor invidunt
                  ut
                  labore et dolore magna aliquyam</p>
               <a href="contact.html" class="btn btn-primary">Submit a ticket</a>
            </div>
         </div>
      </div>
   </section>
   <!-- /call to action -->

   @include('includes.footer')

   <!-- plugins -->
   <!-- <script src="plugins/jQuery/jquery.min.js"></script> -->
   <!-- <script src="plugins/masonry/masonry.min.js"></script> -->
   <!-- <script src="plugins/clipboard/clipboard.min.js"></script> -->
   <!-- <script src="plugins/match-height/jquery.matchHeight-min.js"></script> -->

   <!-- Main Script -->
   <!-- <script src="js/script.js"></script> -->

</body>

</html>
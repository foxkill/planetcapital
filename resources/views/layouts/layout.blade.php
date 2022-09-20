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
   <link rel="stylesheet" href="//cdn.webix.com/edge/webix.css" type="text/css">
   <!-- <link rel="stylesheet" href="plugins/themify-icons/themify-icons.css"> -->
   <!-- Main Stylesheet -->
   @vite(['resources/css/app.css', 'resources/ts/app.ts'])

   <!--Favicon-->
   <link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon">
   <link rel="icon" href="images/favicon.ico" type="image/x-icon">

   <!-- <script src="//cdn.webix.com/edge/webix.js" type="text/javascript"></script> -->
</head>

<body>
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

   <!-- banner w/search -->
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
   <!-- /banner -->

   <!-- topics -->
   <section class="section pb-0">
      <div class="container">
         <h2 class="section-title">Your Topics</h2>
         <div class="columns is-multiline">
            <!-- topic -->
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
            <!-- topic -->
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
            <!-- topic -->
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
            <!-- topic -->
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
   <!-- /topics -->

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
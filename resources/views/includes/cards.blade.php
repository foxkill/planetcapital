            <section id="hero">
                <div className="flex flex-col-reverse md:flex-row items-center px-6 mx-auto mt-10 space-y-0 md:space-y-0">
                    {/* Left item */}
                    <div className="flex flex-col mb-32 space-y-2 md:w-1/2">
                        <h1 className="max-w-md text-4xl text-center font-bold md:text-5xl md:text-left">
                            Search for your favorite ticker here...
                        </h1>
                        {/* searchbox */}
                        <form action="" method="GET">
                            {/* @csrf */}
                            <div className="relative">
                                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                    </svg>
                                </div>
                                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">XSearch</label>
                                <input type="search" name="security" />
                                <button type="submit" className="button">Search</button>
                                {/* @if ($errors->any()) */}
                                <div className="alert alert-danger">
                                    <ul>
                                        {/* @foreach ($errors->all() as $error) */}
                                        <li className="text-red-600"></li>
                                        {/* @endforeach */}
                                    </ul>
                                </div>
                                {/* @endif */}
                                {/* @include('includes.tickerlist', $tickers) */}
                            </div>
                        </form>
                    </div>
                    {/* Right item */}
                    <div className="flex flex-col p-10 space-y-2">
                        <img src="images/banner.webp" className="rounded" />
                    </div>
                </div>
            </section>
 
            {/* Cards */}
            <section className="section">
                <div className="container">
                    <h1 className="">The Ratios...</h1>
                    <div className="">
                        {/* faq item */}
                        <div className="column is-6-desktop">
                            <div className="card card-lg">
                                <div className="card-body">
                                    <h3 className="card-title h5">Will updates also be free?</h3>
                                    <p className="card-text content">Lorem, <a href="https://examplesite.com">link</a> <em>ipsum</em> dolor
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
                        {/* faq item */}
                        <div className="column is-6-desktop">
                            <div className="card card-lg">
                                <div className="card-body">
                                    <h3 className="card-title h5">Discounts for students and Non Profit Organizations?</h3>
                                    <p className="card-text content">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque
                                        praesentium
                                        nisi officiis maiores quia sapiente totam omnis vel sequi corporis ipsa incidunt reprehenderit
                                        recusandae
                                        maxime perspiciatis iste placeat architecto.</p>
                                </div>
                            </div>
                        </div>
                        {/* faq item */}
                        <div className="column is-6-desktop">
                            <div className="card card-lg">
                                <div className="card-body">
                                    <h3 className="card-title h5">I need something unique, Can you make it?</h3>
                                    <p className="card-text content">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque
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
                        {/* faq item */}
                        <div className="column is-6-desktop">
                            <div className="card card-lg">
                                <div className="card-body">
                                    <h3 className="card-title h5">Is there any documentation and support?</h3>
                                    <p className="card-text content">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque
                                        praesentium
                                        nisi officiis maiores quia sapiente totam omnis vel sequi corporis ipsa incidunt reprehenderit
                                        recusandae
                                        maxime perspiciatis iste placeat architecto, mollitia delectus <a href="https://examplesite.com">link</a>
                                        ut ab quibusdam.</p>
                                </div>
                            </div>
                        </div>
                        {/* faq item */}
                        <div className="column is-6-desktop">
                            <div className="card card-lg">
                                <div className="card-body">
                                    <h3 className="card-title h5">Any refunds?</h3>
                                    <p className="card-text content">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque
                                        praesentium
                                        nisi officiis maiores quia sapiente totam omnis vel sequi corporis ipsa incidunt reprehenderit
                                        recusandae
                                        maxime perspiciatis iste placeat architecto.</p>
                                </div>
                            </div>
                        </div>
                        {/* faq item */}
                        <div className="column is-6-desktop">
                            <div className="card card-lg">
                                <div className="card-body">
                                    <h3 className="card-title h5">What is a product key?</h3>
                                    <p className="card-text content">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque
                                        praesentium
                                        nisi officiis maiores quia sapiente totam omnis vel sequi corporis ipsa incidunt</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

<!--
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
   -->
   <!-- @include('includes.footer') -->
   <!-- <script src="plugins/jQuery/jquery.min.js"></script> -->
   <!-- <script src="plugins/masonry/masonry.min.js"></script> -->
   <!-- <script src="plugins/clipboard/clipboard.min.js"></script> -->
   <!-- <script src="plugins/match-height/jquery.matchHeight-min.js"></script> -->

   <!-- Main Script -->
   <!-- <script src="js/script.js"></script> -->
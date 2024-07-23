<div id="wrapper">
  <header>
    <h1>The Virtual Lombard</h1>
  </header>

  <main>

    <!-- image/video -->
    <div id="main">
      <img src="https://dev.digitalgizmo.com/msm-ed/lombard-virtual-assets/images/rotate/Lombard000.png">
    </div>

    <!-- text -->
    <div class="content">

      <h1>The Lombard Hauler</h1>
      <p>Explore the Lombard Hauler and learn what makes it work. Rotate the full view and explore the parts below.</p>
      <p>
        <a href="/" 
        on:click={(e) => { e.preventDefault(); showModal(1);}}>
        Learn more</a>
      </p>

    </div>

  </main>

  <nav>
    <ul>
      <li class="overview"><a href="/"
    on:click={(e) => { e.preventDefault(); setView(0);}}>Overview/Start</a></li>
      <li class="track"><a href="/"
      on:click={(e) => { e.preventDefault(); setView(1);}}>Crawler Track</a></li>
      <li class="skis"><a href="/">Steering Skis</a></li>
      <li class="engine"><a href="/">Gas Engine</a></li>
      <li class="brakes"><a href="/">Brake System</a></li>
    </ul>
  </nav>
</div>
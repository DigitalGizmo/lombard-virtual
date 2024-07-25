<script>
  import MoreModal from "./components/MoreModal.svelte";

  let frame = 0;
  let modeIdx = 0;
  let isModalShowing = false;

  const assetPath = "https://dev.digitalgizmo.com/msm-ed/lombard-virtual-assets/"

  function setView(_modeIdx) {
    modeIdx = _modeIdx;
  }

  function showModal() { // _modalIdx
      // event.preventDefault();
      // modalSlug = slug;
      isModalShowing = true;
  };  
</script>

<div id="wrapper">
  <header>
    <h1>The Virtual Lombard</h1>
  </header>

  <main>

    {#if modeIdx === 0}
      <!-- image/video -->
      <div id="main">
        <img src="{assetPath}images/rotate/Lombard00{frame}.png" alt="lombard hauler 3D view">
        Rotate: 
        <input type="range" min="0" max="9" bind:value={frame} />
      </div>

      <!-- text -->
      <div class="content">
        <h1>The Lombard Hauler</h1>
        <p>Explore the Lombard Hauler and learn what makes it work. Rotate the full view and explore the parts below.</p>
        <p>
          <a href="/" 
          on:click={(e) => { e.preventDefault(); showModal();}}>
          Learn more</a>
        </p>
      </div>
    {/if}
    {#if modeIdx === 1}

      <!-- image/video -->
      <div id="main">
        <img src="{assetPath}images/views/crawler-track.png" alt="lombard crawler track">
        <p>see it crawl [button]</p>
      </div>

      <!-- text -->
      <div class="content">
        <h1>The Crawler Track</h1>
        <p> something to say about the tracks</p>
        <p>
          <a href="/" 
          on:click={(e) => { e.preventDefault(); showModal();}}>
          Learn more</a>
        </p>
      </div>

    {/if}
  
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

  {#if isModalShowing}
    <MoreModal 
      modalIdx={modeIdx}
      bind:isModalShowing 
    />
  {/if}

</div>


<script>
  import MoreModal from "./components/MoreModal.svelte";
  import views from './lib/views.json';
  let frame = 0;
  let viewIdx = 0;
  let isModalShowing = false;

  const assetPath = "https://dev.digitalgizmo.com/msm-ed/lombard-virtual-assets/"

  function setView(_viewIdx) {
    viewIdx = _viewIdx;
  }

  function showModal() { 
      isModalShowing = true;
  };  
</script>

<div id="wrapper">
  <header>
    <h1>The Virtual Lombard</h1>
  </header>

  <main>
    <!-- image/video -->
    <div id="main">
      {#if viewIdx === 0}
        <img src="{assetPath}images/rotate/Lombard00{frame}.png" alt="lombard hauler 3D view">
        Rotate: 
        <input type="range" min="0" max="9" bind:value={frame} />
      {/if}
      {#if viewIdx === 1}
        <img src="{assetPath}images/views/crawler-track.png" alt="lombard crawler track">
        <p>see it crawl [button]</p>
      {/if}
      {#if viewIdx === 2}
        <img src="{assetPath}images/views/skis.png" alt="lombard stering">
        <p>see it crawl [button]</p>
      {/if}
      {#if viewIdx === 3}
        <img src="{assetPath}images/views/engine.png" alt="lombard gas engine">
        <p>see it crawl [button]</p>
      {/if}
      {#if viewIdx === 4}
        <img src="{assetPath}images/views/crawler-track.png" alt="lombard brakes">
        <p>see it crawl [button]</p>
      {/if}
    </div>

    <!-- text -->
    <div class="content {views[viewIdx].slug}">
      <h1>{views[viewIdx].title}</h1>
      <p>{views[viewIdx].text}</p>
      <p>
        <a href="/" 
        on:click={(e) => { e.preventDefault(); showModal();}}>
        Learn more</a>
      </p>
    </div>
  </main>

  <nav>
    <ul>
      <li class="overview">
        <a href="/"
          on:click={(e) => { e.preventDefault(); setView(0);}}>Overview/Start</a>
      </li>
      <li class="track">
        <a href="/"
          on:click={(e) => { e.preventDefault(); setView(1);}}>Crawler Track</a>
      </li>
      <li class="skis">
        <a href="/"
          on:click={(e) => { e.preventDefault(); setView(2);}}>Steering Skis</a></li>
      <li class="engine">
        <a href="/"
          on:click={(e) => { e.preventDefault(); setView(3);}}>Gas Engine</a>
      </li>
      <li class="brakes">
        <a href="/"
          on:click={(e) => { e.preventDefault(); setView(4);}}>Brake System</a>
      </li>
    </ul>
  </nav>

  {#if isModalShowing}
    <MoreModal 
      assetPath={assetPath} 
      viewIdx={viewIdx}
      bind:isModalShowing 
    />
  {/if}

</div>

<style>
  .hauler{
    top: 12vh;
    right: 5vh;
  }
  .crawler {
    top: 30vh;
    right: 50vh;
  }
  .steering {
    top: 40vh;
    right: 40vh;
  }
  .gas {
    top: 60vh;
    right: 60vh;
  }
  .brakes {
    top: 50vh;
    right: 50vh;
  }
</style>


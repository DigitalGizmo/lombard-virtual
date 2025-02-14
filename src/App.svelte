<script>
  import MoreModal from "./components/MoreModal.svelte";
  import views from './lib/views.json';
  import ViewLombard from "./components/ViewLombard.svelte";
  import ViewCrawler from "./components/ViewCrawler.svelte";
  import ViewSteering from "./components/ViewSteering.svelte";
  import ViewEngine from "./components/ViewEngine.svelte";
  import ViewBrakes from "./components/ViewBrakes.svelte";

  // let frame = 0;
  let viewIdx = 0;
  let isModalShowing = false;
  let isCredits = true;

  const assetPath = "https://assets.digitalgizmo.com/lombard-virtual/";
  // const assetPath = "";

  function setView(_viewIdx) {
    viewIdx = _viewIdx;
  }

  function showModal() { 
      isCredits = false;
      isModalShowing = true;
  };  
  function showCredits() { 
      isCredits = true;
      isModalShowing = true;
  };  
</script>

<div id="wrapper">
  <header>
    <h1>The Virtual Lombard <a href="/" 
      on:click={(e) => { e.preventDefault(); showCredits();}}>
      Credits
    </a></h1>

  </header>

  <main>
    <!-- image/video -->
    <div id="view">
      {#if viewIdx === 0}
        <ViewLombard
          assetPath={assetPath}
          thisView={views[0]}
          showModal={showModal}
        />
      {/if}
      {#if viewIdx === 1}
        <ViewCrawler
          assetPath={assetPath}
          thisView={views[1]}
          showModal={showModal}
        />
      {/if}
      {#if viewIdx === 2}
        <ViewSteering
          assetPath={assetPath}
          thisView={views[2]}
          showModal={showModal}
        />
      {/if}
      {#if viewIdx === 3}
        <ViewEngine
          assetPath={assetPath}
          thisView={views[3]}
          showModal={showModal}
        />
      {/if}
      {#if viewIdx === 4}
        <ViewBrakes
          assetPath={assetPath}
          thisView={views[4]}
          showModal={showModal}
        />
      {/if}
      <!-- <p>
        <a href="/" 
          on:click={(e) => { e.preventDefault(); showModal();}}>
          Credits
        </a> 
      </p> -->
    </div><!-- /#view -->

    <!-- Title, blurb, scrubber div now in each view component -->

    <nav class="menu">
      <ul>
        <li>
          <a href="/"
            on:click={(e) => { e.preventDefault(); setView(0);}}>
            <h3 class="{(viewIdx === 0) ? 'nav-selected' : ''}">Overview/Start</h3>
            <img src="{assetPath}images/views/lombard-thm.jpg" 
              class="fit" alt="lombard hauler 3D view">
          </a>
        </li>
        <li>
          <a href="/"
            on:click={(e) => { e.preventDefault(); setView(1);}}>
            <h3 class="{(viewIdx === 1) ? 'nav-selected' : ''}">Crawler Tracks</h3>
            <img src="{assetPath}images/views/crawler-track-thm.jpg" 
            class="fit" alt="lombard crawler track">
          </a>
        </li>
        <li>
          <a href="/"
            on:click={(e) => { e.preventDefault(); setView(2);}}>
            <h3 class="{(viewIdx === 2) ? 'nav-selected' : ''}">Steering Skis</h3> 
            <img src="{assetPath}images/views/steering-thm.jpg" 
            class="fit" alt="lombard steering">           
          </a>
        </li>
        <li>
          <a href="/"
            on:click={(e) => { e.preventDefault(); setView(3);}}>
            <h3 class="{(viewIdx === 3) ? 'nav-selected' : ''}">Gas Engine</h3>
            <img src="{assetPath}images/views/engine-thm.jpg" 
            class="fit" alt="lombard gas engine">
          </a>
        </li>
        <li>
          <a href="/"
            on:click={(e) => { e.preventDefault(); setView(4);}}>
            <h3 class="{(viewIdx === 4) ? 'nav-selected' : ''}">Brake System</h3>
            <img src="{assetPath}images/views/brakes-thm.jpg" 
            class="fit" alt="lombard hauler 3D view">
          </a>
        </li>
      </ul>
    </nav>
    {#if isModalShowing}
      <MoreModal 
        assetPath={assetPath} 
        viewIdx={viewIdx}
        isCredits={isCredits}
        bind:isModalShowing 
      />
    {/if}
    
  </main>


</div><!-- /wrapper -->

<style>
  .fit {
    width: 100%;
    object-fit: cover;
  }

</style>
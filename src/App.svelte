<script>
  import { onMount, onDestroy } from 'svelte';
  import MoreModal from "./components/MoreModal.svelte";
  import views from './lib/views.json';
  import ViewLombard from "./components/ViewLombard.svelte";
  import ViewCrawler from "./components/ViewCrawler.svelte";
  import ViewSteering from "./components/ViewSteering.svelte";
  import ViewEngine from "./components/ViewEngine.svelte";
  import ViewBrakes from "./components/ViewBrakes.svelte";

  let viewIdx = 0;
  let isModalShowing = false;
  let isCredits = true;
  let assetPath = "https://assets.digitalgizmo.com/lombard-virtual/";
  
  let buildMode = 0;
  // buildMode: 0 = devel, 1 web, 2 = kiosk

  if (buildMode === 0) {
    assetPath = "https://assets.digitalgizmo.com/lombard-virtual/";
  } else if (buildMode === 1) {
    assetPath = "https://mainestetemuseum.org/lombard-virtual/";
  } else {
    console.log(' buildMode: ' + buildMode);
    assetPath = "";
  }

  // Kiosk timeout functionality
  const TIMEOUT_DURATION = 60000; // 120000 2 minutes in milliseconds
  let timeoutId;

  function resetTimeout() {
    if (buildMode === 2 && (viewIdx !== 0 || isModalShowing)) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        viewIdx = 0;
        isModalShowing = false;
      }, TIMEOUT_DURATION);
    }
  }

  function clearKioskTimeout() {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }

  function handleUserActivity() {
    if (buildMode === 2) {
      resetTimeout();
    }
  }

  function setView(_viewIdx) {
    viewIdx = _viewIdx;
    if (buildMode === 2 && (_viewIdx !== 0 || isModalShowing)) {
      resetTimeout();
    }
  }

  function showModal() { 
    isCredits = false;
    isModalShowing = true;
    handleUserActivity();
  }

  function showCredits() { 
    isCredits = true;
    isModalShowing = true;
    handleUserActivity();
  }

  onMount(() => {
    if (buildMode === 2) {
      // Add event listeners for user activity
      window.addEventListener('click', handleUserActivity);
      window.addEventListener('touchstart', handleUserActivity);
      window.addEventListener('mousemove', handleUserActivity);
      window.addEventListener('keydown', handleUserActivity);
    }
  });

  onDestroy(() => {
    if (buildMode === 2) {
      // Clean up event listeners and timeout
      window.removeEventListener('click', handleUserActivity);
      window.removeEventListener('touchstart', handleUserActivity);
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
      clearKioskTimeout();
    }
  });
</script>

<div id="wrapper">
  <header>
    <h1>The Virtual Lombard</h1>
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

    <div class="credits-link">
      <a href="/" 
        on:click={(e) => { e.preventDefault(); showCredits();}}>
        Credits
      </a>
    </div>

    </div><!-- /#view -->

    <!-- Title, blurb, scrubber div now in each view component -->

    <nav class="menu">
      <ul>
        <li>
          <a href="/"
            on:click={(e) => { e.preventDefault(); setView(0);}}>
            <h3 class="{(viewIdx === 0) ? 'nav-selected' : ''}">Overview</h3>
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
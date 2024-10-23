<script>
  import MoreModal from "./components/MoreModal.svelte";
  import views from './lib/views.json';
  import LombardView from "./components/LombardView.svelte";
  // let frame = 0;
  let viewIdx = 0;
  let isModalShowing = false;
  let isPreview = true;

  const assetPath = "https://assets.digitalgizmo.com/lombard-virtual/";
  // const assetPath = "";

  function setView(_viewIdx) {
    viewIdx = _viewIdx;
  }

  function showModal() { 
      isModalShowing = true;
  };  

  function setPreview() {
    return function() {
      isPreview = true;
    }
  }
  
</script>

<div id="wrapper">
  <header>
    <h1>The Virtual Lombard</h1>
  </header>

  <main>
    <!-- image/video -->
    <div id="main">
      {#if viewIdx === 0}
        <LombardView
          assetPath={assetPath}
          isPreview={isPreview}
        />
      {/if}
      {#if viewIdx === 1}
        <img src="{assetPath}images/views/crawler-track.png" alt="lombard crawler track">
        <p class="controls">see it crawl [button]</p>
      {/if}
      {#if viewIdx === 2}
        <img src="{assetPath}images/views/skis.png" alt="lombard steering">
        <p class="controls">see it steer [button]</p>
      {/if}
      {#if viewIdx === 3}
        <img src="{assetPath}images/views/engine.png" alt="lombard gas engine">
        <p class="controls">see it rev [button]</p>
      {/if}
      {#if viewIdx === 4}
        <img src="{assetPath}images/views/brakes.png" alt="lombard brakes">
        <p class="controls">see it stop [button]</p>
      {/if}
    </div><!-- /#main -->

    <!-- text -->
    <div class="content {views[viewIdx].slug}">
      <h1>{views[viewIdx].title}</h1>
      <p>{views[viewIdx].text}</p>
      <p>
        <a href="/" 
        on:click={(e) => { e.preventDefault(); showModal();}}>
        Learn more</a>
      </p>
    </div><!-- /content -->

    <nav class="menu">
      <ul>
        <li>
          <a href="/"
            on:click={(e) => { 
              e.preventDefault(); setView(0);
              setPreview;
              console.log('isPreview: ' + isPreview)
            }}>
            <h3 class="{(viewIdx === 0) ? 'nav-selected' : ''}">Overview/Start</h3>
            <img src="{assetPath}images/views/lombard-thm.png" alt="lombard hauler 3D view">
          </a>
        </li>
        <li>
          <a href="/"
            on:click={(e) => { e.preventDefault(); setView(1);}}>
            <h3 class="{(viewIdx === 1) ? 'nav-selected' : ''}">Crawler Track</h3>
            <img src="{assetPath}images/views/crawler-track-thm.png" alt="lombard crawler track">
          </a>
        </li>
        <li>
          <a href="/"
            on:click={(e) => { e.preventDefault(); setView(2);}}>
            <h3 class="{(viewIdx === 2) ? 'nav-selected' : ''}">Steering Skis</h3> 
            <img src="{assetPath}images/views/skis-thm.png" alt="lombard steering">           
          </a>
        </li>
        <li>
          <a href="/"
            on:click={(e) => { e.preventDefault(); setView(3);}}>
            <h3 class="{(viewIdx === 3) ? 'nav-selected' : ''}">Gas Engine</h3>
            <img src="{assetPath}images/views/engine-thm.png" alt="lombard gas engine">
          </a>
        </li>
        <li>
          <a href="/"
            on:click={(e) => { e.preventDefault(); setView(4);}}>
            <h3 class="{(viewIdx === 4) ? 'nav-selected' : ''}">Brake System</h3>
            <img src="{assetPath}images/views/brakes-thm.png" alt="lombard hauler 3D view">
          </a>
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

  </main>
</div><!-- /wrapper -->

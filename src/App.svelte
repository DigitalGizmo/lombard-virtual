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
        <img src="{assetPath}images/views/skis.png" alt="lombard steering">
        <p>see it steer [button]</p>
      {/if}
      {#if viewIdx === 3}
        <img src="{assetPath}images/views/engine.png" alt="lombard gas engine">
        <p>see it rev [button]</p>
      {/if}
      {#if viewIdx === 4}
        <img src="{assetPath}images/views/crawler-track.png" alt="lombard brakes">
        <p>see it stop [button]</p>
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

  <nav class="menu">
    <ul>
      <li>
        <a href="/"
          on:click={(e) => { e.preventDefault(); setView(0);}}>
          <img src="{assetPath}images/rotate/Lombard00{frame}.png" alt="lombard hauler 3D view">
          <h3 class="{(viewIdx === 0) ? 'nav-selected' : ''}">Overview/Start</h3>  
        </a>
      </li>
      <li>
        <a href="/"
          on:click={(e) => { e.preventDefault(); setView(1);}}>
          <img src="{assetPath}images/views/crawler-track.png" alt="lombard crawler track">
          <h3 class="{(viewIdx === 1) ? 'nav-selected' : ''}">Crawler Track</h3>
        </a>
      </li>
      <li>
        <a href="/"
          on:click={(e) => { e.preventDefault(); setView(2);}}>
          <img src="{assetPath}images/views/skis.png" alt="lombard steering">
          <h3 class="{(viewIdx === 2) ? 'nav-selected' : ''}">Steering Skis</h3>            
        </a>
      </li>
      <li>
        <a href="/"
          on:click={(e) => { e.preventDefault(); setView(3);}}>
          <img src="{assetPath}images/views/engine.png" alt="lombard gas engine">
          <h3 class="{(viewIdx === 3) ? 'nav-selected' : ''}">Gas Engine</h3>
        </a>
      </li>
      <li>
        <a href="/"
          on:click={(e) => { e.preventDefault(); setView(4);}}>
          <img src="{assetPath}images/rotate/Lombard00{frame}.png" alt="lombard hauler 3D view">
          <h3 class="{(viewIdx === 4) ? 'nav-selected' : ''}">Brake System</h3>
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

</div>

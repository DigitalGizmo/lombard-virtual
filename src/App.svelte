<script>
  import MoreModal from "./components/MoreModal.svelte";

  let frame = 0;
  let modeIdx = 0;
  let isModalShowing = false;

  const assetPath = "https://dev.digitalgizmo.com/msm-ed/lombard-virtual-assets/"

  function setView(_modeIdx) {
    modeIdx = _modeIdx;
  }

  function showModal(_modalIdx) {
      // event.preventDefault();
      // modalSlug = slug;
      isModalShowing = true;
  };  
</script>

<main>
  <div class="featured-view">
    {#if modeIdx === 0}
      <img width="60%" src="{assetPath}images/rotate/Lombard00{frame}.png" alt="">
      <p>you are here. Frame: {frame}</p>
      Rotate: 
      <input type="range" min="0" max="9" bind:value={frame} />
    {/if}
    {#if modeIdx === 1}
      <img width="60%" src="{assetPath}images/views/crawler-track.png" alt="">
      <p><a href="/" 
        on:click={(e) => { e.preventDefault(); showModal(1);}}>
        Learn more</a></p>
    {/if}

  </div>

  <ul>
    <li><a href="/"
      on:click={(e) => { e.preventDefault(); setView(1);}}>
      Treads</a></li>
    <li>Engine</li>
    <li>Steering</li>
    <li>Brakes</li>
  </ul>
  <p>back to <a href="/"
    on:click={(e) => { e.preventDefault(); setView(0);}}>
    main view</a>
    - modeIdx: {modeIdx}
  </p>

  {#if isModalShowing}
    <MoreModal 
      modalIdx=1
      bind:isModalShowing 
    />
    <!-- slug={modalSlug}
    modalType={modalType} -->

  {/if}

</main>

<style>
  .featured-view {
    border:1px solid black;
  }
</style>


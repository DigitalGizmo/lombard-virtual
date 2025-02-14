<script>
  import { onMount } from 'svelte';
  import MoreHauler from './MoreHauler.svelte';
  import MoreCrawler from './MoreCrawler.svelte';
  import MoreSteering from './MoreSteering.svelte';
  import MoreEngine from './MoreEngine.svelte';
  import MoreBrakes from './MoreBrakes.svelte';
  import Credits from './Credits.svelte';
  import views from '../lib/views.json';

  export let viewIdx; 
  export let isCredits;
  export let assetPath; 
  export let isModalShowing;

  


  // For popup width for map
  let panelWidth = 1000;
  // should get width of element modal-basic
  // but for now, since that's70vw

  onMount(() => {
    panelWidth = (window.innerWidth * 0.7);
  })

  function onKeyDown(e) {
    // console.log('got to key down');
    if (e.keyCode === 27) {
      isModalShowing = false;
    }
  }

  function closeModal(e) {
    // console.log('target: ' + e.target.id)
    if (e.target.id === 'modal-overlay') {
      isModalShowing = false;
    }
  }
</script>

<svelte:window  
  on:click={(e) => { closeModal(e)}}/>
  <!-- on:keydown|preventDefault={onKeyDown} -->

<div id="modal-overlay" class="">
	<div id="modal-container" 
    class="modal-basic {(isCredits) ? 'credits' : ''}">
    <!-- credits class in app.css following .modal-basic -->
  <div id="modal-wrapper">

    <div class="modal-close">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <a href="/" on:click={(e) => { e.preventDefault(); isModalShowing = false;}}>
        <span  id="close-button" class="close"></span>
      </a>
    </div><!-- /modal-close -->

    {#if isCredits}
      <Credits
        assetPath={assetPath}
      />
    {:else}
      {#if viewIdx === 0}
        <MoreHauler
          view={views[viewIdx]}
          assetPath={assetPath}
        />
      {/if}
      {#if viewIdx === 1}
        <MoreCrawler
          view={views[viewIdx]}
          assetPath={assetPath}
        />
      {/if}
      {#if viewIdx === 2}
        <MoreSteering
          view={views[viewIdx]}
          assetPath={assetPath}
        />
      {/if}
      {#if viewIdx === 3}
        <MoreEngine
          view={views[viewIdx]}
          assetPath={assetPath}
        />
      {/if}
      {#if viewIdx === 4}
        <MoreBrakes
          view={views[viewIdx]}
          assetPath={assetPath}
        />
      {/if}

    {/if}


  </div><!-- /modal-wrapper -->
</div> <!-- /#modal-container /.modal-basic --> <!-- /#modal-container /.modal-basic -->
</div>
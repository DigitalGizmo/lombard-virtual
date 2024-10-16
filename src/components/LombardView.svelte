<script>
  // import { onMount } from 'svelte';
  export let assetPath; 
  export let isPreview;
  let frame = 0;

  // onMount(() => {
  //   isPreview = true;
  // })

  function losePreview() {
    isPreview = false;
  }


</script>

<div >
  {#if isPreview}
    <img src="{assetPath}images/views/lombard-labeled.jpg" 
     alt="lombard with labels">
  {:else}
    <img src="{assetPath}images/rotate/Lombard00{frame}.png" 
      alt="lombard hauler 3D view">
  {/if}
</div>
  
  Rotate: 
  <input on:mousedown={losePreview}
    type="range" min="0" max="9" bind:value={frame} />



<!-- <style>
  .preview {
    max-height: 80%;
  }
</style> -->
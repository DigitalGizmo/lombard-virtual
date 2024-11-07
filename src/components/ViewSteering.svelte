<script>
  // import { onMount } from 'svelte';
  export let assetPath; 
  // export let isPreview;
  export let thisView;
  export let showModal;

  let frame = 0;

  // function losePreview() {
  //   isPreview = false;
  //   console.log(' isPreview: ' + isPreview)
  // }
</script>

<div >

  <!-- Leaving commented code in this one component -- in case -->

  <!-- {#if isPreview}
    <img src="{assetPath}images/views/lombard-labeled.jpg" 
     alt="lombard with labels">
  {:else} -->
  <img src="{assetPath}images/views/steering.jpg" 
    alt="lombard steering">
  <!-- {/if} -->
</div>
  
<div class="content {thisView.slug}">
  <h1>{thisView.title}</h1>
  <p>{thisView.text} </p>
  Rotate: 
  <!-- <input on:touchstart={losePreview} -->
  <!-- on:mousedown={losePreview} -->
  <input 
    type="range" min="0" max="9" bind:value={frame} />
  <p>
    <a href="/" 
      on:click={(e) => { e.preventDefault(); showModal();}}>
      Learn more</a>
  </p>
</div>


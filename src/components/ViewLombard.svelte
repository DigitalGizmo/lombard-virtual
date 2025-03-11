<script>
  import { onMount } from 'svelte';
  import { formatFrameNumber } from '../lib/utils.js';
  import { touchGesture } from '../lib/touchGesture.js';
  import { createImageLoader } from '../lib/imageLoader.js';
  
  export let assetPath; 
  export let thisView;
  export let showModal;

  let frame = 0;
  const min = 0;
  const max = 150;
  const step = 1;
  
  // Create image loader
  const imageLoader = createImageLoader({
    assetPath,
    imgDir: 'lombard',
    imgPrefix: 'VL',
    min,
    max,
    extension: 'webp'
  });
  
  // Destructure necessary values and functions
  const { 
    isLoading, 
    loadingPercentage,
    getImagePath,
    preloadImages
  } = imageLoader;
  
  // Calculate zFrame for current frame
  $: zFrame = formatFrameNumber(frame);
  
  // Helper functions for touch gesture
  function getFrame() {
    return frame;
  }
  
  function setFrame(value) {
    frame = value;
  }

  onMount(() => {
    preloadImages();
  });
</script>

<div use:touchGesture={{ min, max, step, getValue: getFrame, setValue: setFrame }}>
  <img src={getImagePath(frame)} alt="lombard hauler 3D view">
</div>
  
<div class="content {thisView.slug}">
  <h1>{thisView.title}</h1>
  <p>{thisView.text}</p>
  <p>
    <a href="/" 
      on:click={(e) => { e.preventDefault(); showModal();}}>
      Learn more
    </a>
  </p>
  {#if $isLoading}
    <div>
      Loading Lombard view... {$loadingPercentage}%
    </div>
  {/if}
  <label for="rotate">Rotate 3-D View:</label> 
  <input id="rotate" type="range" min="{min}" max="{max}" step="{step}" bind:value={frame} />
</div>
<script>
  import { onMount } from 'svelte';
  import { formatFrameNumber } from '../lib/utils.js';
  import { touchGesture } from '../lib/touchGesture.js';
  import { createImageLoader } from '../lib/imageLoader.js';
  
  export let assetPath;
  export let thisView;
  export let showModal;

  let frame = 1;
  const min = 1;
  const max = 13;
  const step = 1;
  
  // Create image loader
  const imageLoader = createImageLoader({
    assetPath,
    imgDir: 'steering',
    imgPrefix: 'ST1',
    min,
    max,
    extension: 'png'
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

<div class="multi-layer-container" use:touchGesture={{ min, max, step, getValue: getFrame, setValue: setFrame }}>

  <img src="{assetPath}images/steering/ST0000.png" alt="Lombard glass background" class="multi-layer-bkgnd">

  <img src={getImagePath(frame)} alt="lombard steering" 
    class="steering-anim">
</div>

<div class="content {thisView.slug}">
  <h1>{thisView.title}</h1>
  <p>{thisView.text} </p>
  <button id="learn-more-btn">
    <a href="/" 
      on:click={(e) => { e.preventDefault(); showModal();}}>
      Learn more
    </a>
  </button>

  <!-- <input on:touchstart={losePreview} -->
  <!-- on:mousedown={losePreview} -->
  <label for="rotate-steering">Steer the Lombard:</label>

  <input 
    class="scrubber"
    id="scrub"
    type="range"
    min="{min}"
    max="{max}"
    step="{step}"
    bind:value={frame}
  />

</div>
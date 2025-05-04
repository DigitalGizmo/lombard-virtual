<script>
  import { onMount, onDestroy } from 'svelte';
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
    imgDir: 'brakes',
    imgPrefix: 'Layer5/BR5',
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


  /**
   * Drive train and cog animation
   */
  let curDriveFrame = 1;
  let interval;
  let speed = 100; // Animation speed in milliseconds

  // Handle frame number formatting for left cog
  $: displayFrame = formatFrameNumber(curDriveFrame);

  // Function to start/restart the animation
  function startAnimation() {
    // Clear any existing interval
    if (interval) clearInterval(interval);
    
    // Start new interval with current speed
    interval = setInterval(() => {
      curDriveFrame = curDriveFrame % 13 + 1; // This cycles from 1-13 instead of 0-12
      console.log('Current drive frame:', curDriveFrame, 'Display frame:', displayFrame);
    }, speed);
  }

  // Watch for speed changes
  $: if (speed) {
    startAnimation();
  }

  onMount(() => {
    preloadImages();
    startAnimation();
  });

  onDestroy(() => {
    if (interval) clearInterval(interval);
  });  

</script>

<div use:touchGesture={{ min, max, step, getValue: getFrame, setValue: setFrame }}>

  <img src="{assetPath}images/brakes/BR101.jpg" alt="Lombard glass background" class="brakes-bkgnd">

  <img src="{assetPath}images/brakes/Layer1/BR1001.png" alt="Right side cog" class="right-cog">

  <img src="{assetPath}images/brakes/Layer3/BR3001.png" alt="drive axle" class="drive-axle">

  <img src={getImagePath(frame)} alt="linkage" class="linkage">

  <!-- Add debug display to see what path is being generated -->
  <p style="position: absolute; top: 10px; left: 10px; background: rgba(255,255,255,0.7); padding: 5px; z-index: 999;">
    Current path: {assetPath}images/brakes/Layer6/BR600{displayFrame}.png
  </p>
  
  <img src="{assetPath}images/brakes/Layer6/BR6{displayFrame}.png" alt="left cog" class="left-cog">

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
      Loading Engine... {$loadingPercentage}%
    </div>
  {/if}
  <label for="scrub">Run the engine:</label>
  <input id="scrub" type="range" min="{min}" max="{max}" step="{step}" bind:value={frame} />
</div>
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

  let displayFrame = "01";
  // $: displayFrame = "01";

  // Handle frame number formatting
  $: if (curDriveFrame < 10) {
    displayFrame = '0' + curDriveFrame.toString();
  } else {
    displayFrame = frame.toString();
  }

  // Function to start/restart the animation
  function startAnimation() {
    // Clear any existing interval
    if (interval) clearInterval(interval);
    
    // Start new interval with current speed
    interval = setInterval(() => {
      curDriveFrame = (curDriveFrame + 1) % 13;
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

  <img src="{assetPath}images/brakes/Layer6/BR600{displayFrame}.png" alt="left cog" class="left-cog">

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
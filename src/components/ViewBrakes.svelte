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
  
  // Create image loader for linkage (Layer 5)
  const imageLoader = createImageLoader({
    assetPath,
    imgDir: 'brakes',
    imgPrefix: 'Layer5/BR5',
    min,
    max,
    extension: 'png'
  });
  
  // Create image loaders for animated elements
  const leftCogLoader = createImageLoader({
    assetPath,
    imgDir: 'brakes/Layer6',
    imgPrefix: 'BR6',
    min: 1,
    max: 13,
    extension: 'png'
  });
  
  const rightCogLoader = createImageLoader({
    assetPath,
    imgDir: 'brakes/Layer1',
    imgPrefix: 'BR1',
    min: 1,
    max: 13,
    extension: 'png'
  });
  
  const driveAxleLoader = createImageLoader({
    assetPath,
    imgDir: 'brakes/Layer3',
    imgPrefix: 'BR3',
    min: 1,
    max: 13,
    extension: 'png'
  });
  
  // Destructure necessary values and functions
  const { 
    isLoading: linkageLoading, 
    loadingPercentage: linkageLoadingPercentage,
    getImagePath,
    preloadImages: preloadLinkageImages
  } = imageLoader;
  
  const {
    isLoading: leftCogLoading,
    loadingPercentage: leftCogLoadingPercentage,
    preloadImages: preloadLeftCogImages
  } = leftCogLoader;
  
  const {
    isLoading: rightCogLoading,
    loadingPercentage: rightCogLoadingPercentage,
    preloadImages: preloadRightCogImages
  } = rightCogLoader;
  
  const {
    isLoading: driveAxleLoading,
    loadingPercentage: driveAxleLoadingPercentage,
    preloadImages: preloadDriveAxleImages
  } = driveAxleLoader;
  
  // Combined loading state
  $: isLoading = $linkageLoading || $leftCogLoading || $rightCogLoading || $driveAxleLoading;
  
  // Calculate average loading percentage
  $: loadingPercentage = Math.round(
    ($linkageLoadingPercentage + $leftCogLoadingPercentage + 
     $rightCogLoadingPercentage + $driveAxleLoadingPercentage) / 4
  );
  
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
  let isAnimationRunning = false;

  // Handle frame number formatting for animations
  $: displayFrame = formatFrameNumber(curDriveFrame);

  // Determine speed based on frame (brake position)
  $: {
    if (frame === 13) {
      // Stop animation completely
      if (interval) {
        clearInterval(interval);
        interval = null;
        isAnimationRunning = false;
      }
    } else if (frame > 10) {
      speed = 1000; // Slow
      if (!isAnimationRunning) {
        startAnimation();
      } else {
        updateAnimationSpeed();
      }
    } else if (frame > 6) {
      speed = 200; // Medium
      if (!isAnimationRunning) {
        startAnimation();
      } else {
        updateAnimationSpeed();
      }
    } else {
      speed = 100; // Fast
      if (!isAnimationRunning) {
        startAnimation();
      } else {
        updateAnimationSpeed();
      }
    }
  }

  // Function to update animation speed without restarting
  function updateAnimationSpeed() {
    if (interval) {
      clearInterval(interval);
      
      // Create new interval with updated speed but preserve current frame
      interval = setInterval(() => {
        curDriveFrame = curDriveFrame % 13 + 1;
      }, speed);
    }
  }

  // Function to start animation
  function startAnimation() {
    // Clear any existing interval
    if (interval) clearInterval(interval);
    
    // Start new interval with current speed
    interval = setInterval(() => {
      curDriveFrame = curDriveFrame % 13 + 1;
    }, speed);
    
    isAnimationRunning = true;
  }

  onMount(() => {
    // Preload all image sets
    preloadLinkageImages();
    preloadLeftCogImages();
    preloadRightCogImages();
    preloadDriveAxleImages();
    
    // Start animation
    startAnimation();
  });

  onDestroy(() => {
    if (interval) clearInterval(interval);
    isAnimationRunning = false;
  });  
</script>

<div use:touchGesture={{ min, max, step, getValue: getFrame, setValue: setFrame }}>
  <img src="{assetPath}images/brakes/BR101.jpg" alt="Lombard glass background" class="brakes-bkgnd">
  <img src="{assetPath}images/brakes/Layer1/BR1{displayFrame}.png" alt="Right side cog" class="right-cog">
  <img src="{assetPath}images/brakes/Layer3/BR3{displayFrame}.png" alt="drive axle" class="drive-axle">
  <img src={getImagePath(frame)} alt="linkage" class="linkage">
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
  {#if isLoading}
    <div>
      Loading Engine... {loadingPercentage}%
    </div>
  {/if}
  <label for="scrub">Run the engine:</label>
  <input id="scrub" type="range" min="{min}" max="{max}" step="{step}" bind:value={frame} />
</div>
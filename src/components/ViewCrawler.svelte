<script>
  import { onMount } from 'svelte';
  import { formatFrameNumber } from '../lib/utils.js';

  export let assetPath;
  export let thisView;
  export let showModal;

  let frame = 0;
  let loadedImages = 0;
  let isLoading = true;
  let preloadedImages = [];

  const imgDir = "tracks";
  const imgPrefix = "TR"

  $: zFrame = formatFrameNumber(frame);

  const preloadImages = async () => {
    const totalImages = 151; // 0 to 150 inclusive
    const promises = [];

    for (let i = 0; i < totalImages; i++) {
      const imageNumber = i < 10 ? `00${i}` : 
                         i < 100 ? `0${i}` : 
                         i.toString();
      const imagePath = 
        `${assetPath}images/${imgDir}/${imgPrefix}${imageNumber}.webp`;
      
      const promise = new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          loadedImages++;
          preloadedImages[i] = img;
          resolve(img);
        };
        img.onerror = reject;
        img.src = imagePath;
      });
      
      promises.push(promise);
    }

    try {
      await Promise.all(promises);
      isLoading = false;
    } catch (error) {
      console.error('Error preloading images:', error);
    }
  };

  // for swipe
  let min = 0;
  let max = 150;
  let step = 1;

  let touchStartX = null;
  let touchStartValue = null;
  let gestureContainer;
  let containerWidth = 0;

  function calculateNewValue(touchX) {
    const deltaX = touchX - touchStartX;
    const containerRange = containerWidth;
    const valueRange = max - min;
    
    // Convert pixel movement to value change
    const ratioMoved = deltaX / containerRange;
    const valueChange = ratioMoved * valueRange;
    
    // Calculate new value
    let newValue = touchStartValue + valueChange;
    
    // Constrain to min/max and round to step
    newValue = Math.round(newValue / step) * step;
    newValue = Math.min(Math.max(newValue, min), max);
    
    return newValue;
  }

  function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
    touchStartValue = frame;
    containerWidth = gestureContainer.offsetWidth;
    event.preventDefault();
  }

  function handleTouchMove(event) {
    if (touchStartX === null) return;
    const currentTouchX = event.touches[0].clientX;
    frame = calculateNewValue(currentTouchX);
    event.preventDefault();
  }

  function handleTouchEnd() {
    touchStartX = null;
    touchStartValue = null;
  }

  onMount(() => {
    containerWidth = gestureContainer?.offsetWidth || 0;
    preloadImages();
  });
</script>

<div
  bind:this={gestureContainer}
  on:touchstart={handleTouchStart}
  on:touchmove={handleTouchMove}
  on:touchend={handleTouchEnd}
  on:touchcancel={handleTouchEnd}
>
  <img src="{assetPath}images/{imgDir}/{imgPrefix}{zFrame}.webp" 
     alt="lombard crawler tracks">
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
      Loading crawler tracks... {Math.round(loadedImages / (max+1) * 100)}%
    </div>
  {/if}
  <label for="scrub">Rotate 3-D View:</label>
  <input 
    id="scrub"
    type="range"
    min={min}
    max={max}
    step={step}
    bind:value={frame}
  />
</div>
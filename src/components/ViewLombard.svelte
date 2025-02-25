<script>
  import { formatFrameNumber } from '../lib/utils.js';
  import { touchGesture } from '../lib/touchGesture.js';
  import { onMount } from 'svelte';
  
  export let assetPath; 
  export let thisView;
  export let showModal;

  let frame = 15;
  const min = 15;
  const max = 35;
  const step = 1;
  
  let imgDir = "lombard";
  let imgPrefix = "Lombard";
  
  let loadedImages = 0;
  let isLoading = true;
  let preloadedImages = [];

  $: zFrame = formatFrameNumber(frame);
  
  function getFrame() {
    return frame;
  }
  
  function setFrame(value) {
    frame = value;
  }
  
  const preloadImages = async () => {
    const totalImages = max - min + 1; // 15 to 35 inclusive
    const promises = [];

    for (let i = min; i <= max; i++) {
      const imageNumber = i < 10 ? `00${i}` : 
                         i < 100 ? `0${i}` : 
                         i.toString();
      const imagePath = `${assetPath}images/${imgDir}/${imgPrefix}${imageNumber}.webp`;
      
      const promise = new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          loadedImages++;
          preloadedImages[i-min] = img; // Offset by min
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

  onMount(() => {
    preloadImages();
  });
</script>

<div use:touchGesture={{ min, max, step, getValue: getFrame, setValue: setFrame }}>
  <img src="{assetPath}images/{imgDir}/{imgPrefix}{zFrame}.webp" 
    alt="lombard hauler 3D view">
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
      Loading Lombard view... {Math.round((loadedImages / (max - min + 1)) * 100)}%
    </div>
  {/if}
  <label for="rotate">Rotate 3-D View:</label> 
  <input id="rotate" type="range" min="{min}" max="{max}" step="{step}" bind:value={frame} />
</div>
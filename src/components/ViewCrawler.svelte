<script>
  import { onMount } from 'svelte';
  import { formatFrameNumber } from '../lib/utils.js';
  import { touchGesture } from '../lib/touchGesture.js';

  export let assetPath;
  export let thisView;
  export let showModal;

  let frame = 0;
  const min = 0;
  const max = 150;
  const step = 1;
  
  let loadedImages = 0;
  let isLoading = true;
  let preloadedImages = [];

  const imgDir = "tracks";
  const imgPrefix = "TR";

  $: zFrame = formatFrameNumber(frame);
  
  function getFrame() {
    return frame;
  }
  
  function setFrame(value) {
    frame = value;
  }

  const preloadImages = async () => {
    const totalImages = max+1; // 0 to 150 inclusive
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

  onMount(() => {
    preloadImages();
  });
</script>

<div use:touchGesture={{ min, max, step, getValue: getFrame, setValue: setFrame }}>
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
    min="{min}"
    max="{max}"
    step="{step}"
    bind:value={frame}
  />
</div>
<script>
  import { onMount } from 'svelte';
  import { formatFrameNumber } from '../lib/utils.js';

  export let assetPath;
  export let thisView;
  export let showModal;

  let frame = 0;
  // let zFrame = '0';

  let loadedImages = 0;
  let isLoading = true;
  let preloadedImages = [];

  $: zFrame = formatFrameNumber(frame);

  const preloadImages = async () => {
    const totalImages = 151; // 0 to 15 inclusive
    const promises = [];

    for (let i = 0; i < totalImages; i++) {
      const imageNumber = i < 10 ? `00${i}` : 
                         i < 100 ? `0${i}` : 
                         i.toString();
      const imagePath = `${assetPath}images/engine/Eng${imageNumber}.webp`;
      
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

<div>
  <img src="{assetPath}images/engine/Eng{zFrame}.webp" 
     alt="lombard gas engine">
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
      Loading Engine... {Math.round((loadedImages / 151) * 100)}%
    </div>
  {/if}
  <label for="scrub">Run the engine:</label>
  <input id="scrub" type="range" min="0" max="150" bind:value={frame} />
</div>

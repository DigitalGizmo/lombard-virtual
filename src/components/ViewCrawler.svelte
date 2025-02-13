<script>
  import { onMount } from 'svelte';
  
  export let assetPath;
  export let thisView;
  export let showModal;

  let frame = 0;
  let zFrame = '0';
  let loadedImages = 0;
  let isLoading = true;
  let preloadedImages = [];

  const imgDir = "tracks";
  const imgPrefix = "TR"

  // Handle frame number formatting
  $: if (frame < 10) {
    zFrame = '00' + frame.toString();
  } else if (frame < 100) {
    zFrame = '0' + frame.toString();
  } else {
    zFrame = frame.toString();
  }

  const preloadImages = async () => {
    const totalImages = 151; // 0 to 15 inclusive
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

<div>
  <img src="{assetPath}images/{imgDir}/{imgPrefix}{zFrame}.webp" 
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
      Loading crawler tracks... {Math.round((loadedImages / 151) * 100)}%
    </div>
  {/if}
  <label for="scrub">Rotate 3-D View:</label>
  <input id="scrub" type="range" min="0" max="150" bind:value={frame} />
</div>

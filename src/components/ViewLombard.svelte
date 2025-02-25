<script>
  import { formatFrameNumber } from '../lib/utils.js';
  export let assetPath; 
  export let thisView;
  export let showModal;

  // export let frame = 15;
  let frame = 15;

  $: zFrame = formatFrameNumber(frame);

</script>

<div >
  <img src="{assetPath}images/lombard/Lombard{zFrame}.webp" 
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
  <label for="rotate">Rotate 3-D View:</label> 
  <input id="rotate" type="range" min="15" max="35" bind:value={frame} />

</div>


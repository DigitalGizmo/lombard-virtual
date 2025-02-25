<script>
  import { formatFrameNumber } from '../lib/utils.js';
  import { touchGesture } from '../lib/touchGesture.js';
  
  export let assetPath; 
  export let thisView;
  export let showModal;

  let frame = 15;
  const min = 15;
  const max = 35;
  const step = 1;

  $: zFrame = formatFrameNumber(frame);
  
  function getFrame() {
    return frame;
  }
  
  function setFrame(value) {
    frame = value;
  }
</script>

<div use:touchGesture={{ min, max, step, getValue: getFrame, setValue: setFrame }}>
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
  <input id="rotate" type="range" min="{min}" max="{max}" step="{step}" bind:value={frame} />
</div>
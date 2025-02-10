<script>
  export let assetPath; 
  export let thisView;
  export let showModal;

  let frame = 0;
  let zFrame = '0';

  $: if (frame < 10) {
    zFrame = '00' + frame.toString();
  } else if (frame < 100){
    zFrame = '0' + frame.toString();
  } else {
    zFrame = frame.toString();
  }
  
</script>

<div >
  <!-- <img src="{assetPath}images/tracks/tr001.jpg" 
    alt="lombard crawler tracks"> -->
    <img src="{assetPath}images/tracks/TR{zFrame}.webp" 
    class="inset" alt="lombard crawler tracks">    
</div>
  
<div class="content {thisView.slug}">
  <h1>{thisView.title}</h1>
  <p>{thisView.text} </p>
  <p>
    <a href="/" 
      on:click={(e) => { e.preventDefault(); showModal();}}>
      Learn more
    </a>
  </p>
  <label for="rotate-crawler">Rotate 3-D View:</label>
  <input id="rotate-crawler" type="range" min="0" max="150" bind:value={frame} />

</div>

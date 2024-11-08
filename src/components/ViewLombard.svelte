<script>
  export let assetPath; 
  export let thisView;
  export let showModal;

  let frame = 15;
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
  <img src="{assetPath}images/rotate/Lombard{zFrame}.jpg" 
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


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
  <img src="{assetPath}images/rotate/Lombard{zFrame}.png" 
    alt="lombard hauler 3D view">
</div>
  
<div class="content {thisView.slug}">
  <h1>{thisView.title}</h1>
  <p>{thisView.text} </p>
  Rotate: 
  <input 
    type="range" min="0" max="100" bind:value={frame} />
  <p><a href="/" 
      on:click={(e) => { e.preventDefault(); showModal();}}>
      Learn more</a>
  </p>
</div>


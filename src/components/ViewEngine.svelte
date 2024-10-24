<script>
  export let assetPath; 
  export let thisView;
  export let showModal;

  let frame = 0;
</script>

<div >
  <img src="{assetPath}images/views/engine.png" 
    alt="lombard gas engine">
    <p class="controls">see it rev [button]</p>
</div>
  
<div class="content {thisView.slug}">
  <h1>{thisView.title}</h1>
  <p>{thisView.text} </p>
  Rotate: 
  <input 
    type="range" min="0" max="9" bind:value={frame} />
  <p><a href="/" 
      on:click={(e) => { e.preventDefault(); showModal();}}>
      Learn more</a>
  </p>
</div>


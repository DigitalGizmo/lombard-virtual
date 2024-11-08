<script>
  export let assetPath; 
  export let thisView;
  export let showModal;

  let frame = 0;
</script>

<div >
  <img src="{assetPath}images/views/engine.jpg" 
    alt="lombard gas engine">
    <p class="controls">see it rev [button]</p>
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
  <label for="rotate-engine">Rotate 3-D View:</label>
  <input id="rotate-engine" type="range" min="0" max="9" bind:value={frame} />

</div>

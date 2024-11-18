<script>
  export let assetPath; 
  export let thisView;
  export let showModal;

  let frame = 0;
</script>

<!-- <div id="wrapper"></div> -->
<!-- <div id="main"> -->
<div>
  <img src="{assetPath}images/views/engine.jpg" 
    alt="lombard gas engine">
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

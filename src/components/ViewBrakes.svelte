<script>
  export let assetPath; 
  export let thisView;
  export let showModal;

  let frame = 0;
</script>

<div >
  <img src="{assetPath}images/views/brakes.jpg" 
    alt="lombard brakes">
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
  <label for="rotate-brakes">Rotate 3-D View:</label>
  <input id="rotate-brakes" type="range" min="0" max="9" bind:value={frame} />

   <div class="credits-link">
      <a href="/" 
        on:click={(e) => { e.preventDefault(); showCredits();}}>
        Credits
      </a>
    </div>

</div>

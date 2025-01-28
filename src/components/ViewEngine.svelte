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

<!-- <div id="wrapper"></div> -->
<!-- <div id="main"> -->
<div>
  <!-- <img src="{assetPath}images/engine/bg.jpg" 
    class="bg" alt="lombard gas engine"> -->
  <img src="{assetPath}images/engine/Eng{zFrame}.webp" 
    class="inset" alt="lombard gas engine">
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
  <label for="scrub">Run the engine:</label>
  <input id="scrub" type="range" min="0" max="150" bind:value={frame} />

</div>

<style>
  .bg {
    position: absolute;
  }

  .inset {
    position: relative;
    top: 284;
    left: 484;
    /* transform: translate(484 284); */
  }

</style>

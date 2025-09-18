<script>
  // export let viewIdx; 
  export let assetPath; 
  export let view;

</script>

<div class="more-modal">
  <h2>{view.title}</h2>
  <h3>{view.more.blurb}</h3>

  <div class="more-img">
    <img src="{assetPath}images/more/engine-callouts.jpg" alt="lombard engine with component parts labeled">
    <p class="caption">{view.more.cap1}</p>
  </div>

  <p class="more-text">{view.more.para1}</p>

</div>

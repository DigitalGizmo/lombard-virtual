<script>
  // export let viewIdx; 
  export let assetPath; 
  export let view;

</script>

<div class="more-modal">
  <h2>{view.title}</h2>
  <h3>{view.more.blurb}</h3>

  <div class="more-img">
    <img src="{assetPath}images/more/MS73.77_01-001.jpg" alt="horse and oxen drawing logs on sleds">
    <p class="caption">{view.more.cap1}</p>
  </div>

  <p class="more-text">{view.more.para1}</p>

  <div class="more-img">
    <img src="{assetPath}images/more/steering-callouts.jpg" alt="diagram of steering system">
    <p class="caption">{view.more.cap2}</p>
  </div>

  <p class="more-text">{view.more.para2}</p>
</div>

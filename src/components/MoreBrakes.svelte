<script>
  // export let viewIdx; 
  export let assetPath; 
  export let view;

</script>

<div class="more-modal">
  <h2>{view.title}</h2>
  <p>{view.more.blurb}</p>

  <div class="more-img">
    <img src="{assetPath}images/more/brakes-callouts.jpg" alt="diagram of component parts of the Lombard's brake system">
    <p class="caption">{view.more.cap1}</p>
  </div>

  <p class="more-text">{view.more.para1}</p>

  <div class="more-img">
    <img src="{assetPath}images/more/brakes-isolated.png" alt="diagram of component parts of the Lombard's brake system">
    <p class="caption">{view.more.cap2}</p>
  </div>

  <p class="more-text">{view.more.para2}</p>
</div>

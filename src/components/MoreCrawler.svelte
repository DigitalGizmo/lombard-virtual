<script>
  // export let viewIdx; 
  export let assetPath; 
  export let view;

</script>

<div class="more-modal">
  <h2>{view.title}</h2>
  <p>{view.more.blurb}</p>

  <div class="more-img">
    <img src="{assetPath}images/views/crawler-track.png" alt="lombard crawler track or lag bed">
    <p class="caption">{view.more.cap1}</p>
  </div>

  <p class="more-text">{view.more.para1}</p>

  <div class="more-img">
    <img src="{assetPath}images/more/crawler-callouts.jpg" alt="diagram of component parts of the lag bed.">
    <p class="caption">{view.more.cap2}</p>
  </div>

  <p class="more-text">{view.more.para2}</p>  

</div>

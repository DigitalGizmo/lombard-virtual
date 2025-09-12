<script>
  // export let viewIdx; 
  export let assetPath; 
  export let view;

</script>

<div class="more-modal">

  <h2>{view.title}</h2>
  <p>{view.more.blurb}</p>
  <div class="more-img">
    <img src="{assetPath}images/more/hauler-factory.jpg" alt="19 century factory">
    <p class="caption">{view.more.cap1}</p>
  </div>

  <p class="more-text">{view.more.para1}</p>

  <div class="more-img">
    <img src="{assetPath}images/more/hauler-on-snow.png" alt="antique photograph of Lombard Hauler on snow">  
    <p class="caption">{view.more.cap2}</p>
  </div>

  <p class="more-text">{view.more.para2}</p>

</div>

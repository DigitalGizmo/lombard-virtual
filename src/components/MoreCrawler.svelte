<script>
  // export let viewIdx; 
  export let assetPath; 
  export let view;

</script>

<div>
  <h2>{view.title}</h2>
  <img src="{assetPath}images/views/crawler-track.png" alt="lombard crawler track">
  <p>images</p>

  <p>text from json: {view.more.para1}</p>
</div>

<style>
  div img {
    width: 50vh;
  }
</style>
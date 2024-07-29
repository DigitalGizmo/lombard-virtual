<script>
  // export let viewIdx; 
  export let assetPath; 
  export let view;

</script>

<div>
  <h2>{view.title}</h2>
  <img src="{assetPath}images/more/hauler-alvins.jpg" alt="buggy car">
  <p>{view.more.cap1}</p>

  <p>text from json: {view.more.para1}</p>
  
  <img src="{assetPath}images/more/hauler-factory.jpg" alt="factory">
  <p>{view.more.cap2}</p>
  <p>yet morefrom json: {view.para2}</p>

</div>

<style>
  div img {
    width: 50vh;
  }
</style>
<script>
  export let viewIdx; 
  export let assetPath; 
  export let more;

</script>

<div>
  <img src="{assetPath}images/views/crawler-track.png" alt="lombard crawler track">
  <p>images</p>

  <p>More text  here! index: {viewIdx}</p>
  <p>text from json: {more.para1}</p>
</div>

<style>
  div img {
    width: 50vh;
  }
</style>
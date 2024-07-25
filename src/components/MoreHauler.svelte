<script>
  export let viewIdx; 
  export let assetPath; 
  export let more;

</script>

<div>
  <img src="{assetPath}images/rotate/Lombard000.png" alt="lombard hauler">
  <p>images</p>

  <p>More text  here! index: {viewIdx}</p>
  <p>text from json: {more.para1}</p>
</div>

<style>
  div img {
    width: 50vh;
  }
</style>
<script>
  let frame = 0;
  let modeIdx = 0;

  function setView(_modeIdx) {
    modeIdx = _modeIdx;
  }
</script>

<main>
  <div>
    {#if modeIdx === 0}
      <img width="60%" src="images/rotate/Lombard00{frame}.png" alt="">
      <p>you are here. Frame: {frame}</p>
      Rotate: 
      <input type="range" min="0" max="9" bind:value={frame} />
    {/if}
    {#if modeIdx === 1}
      <img width="60%" src="images/views/crawler-track.png" alt="">
    {/if}

  </div>

  <ul>
    <li><a href="/"
      on:click={(e) => { e.preventDefault(); setView(1);}}>
      Treads</a></li>
    <li>Engine</li>
    <li>Steering</li>
    <li>Brakes</li>
  </ul>
  <p>back to <a href="/"
    on:click={(e) => { e.preventDefault(); setView(0);}}>
    main view</a>
    - modeIdx: {modeIdx}
  </p>

</main>


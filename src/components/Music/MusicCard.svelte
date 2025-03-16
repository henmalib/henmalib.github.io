<script lang="ts">
  interface Props {
    scrobble: {
      artist: string;
      isPlaying: boolean;
      image: string;
      name: string;
      url: string;
    }
  }

  const {scrobble}: Props = $props()

  let slider: HTMLDivElement | undefined = $state();
  let movingRight = true;

  function moveSlider() {
    if (!slider) return;
  
    const parentWidth = slider.parentElement!.offsetWidth
    const width = slider.offsetWidth

    if (movingRight) {
      slider.style.transform = `translateX(${parentWidth - width}px)`;
    } else {
      slider.style.transform = `translateX(0)`;
    }

    movingRight = !movingRight;
  }
  if (scrobble.isPlaying)
    setInterval(moveSlider, 1100);

</script>


<div class="block shrink-0 bg-mantle p-4 rounded-xl flex flex-row gap-4">
  <a href={scrobble.url}> 
    <div class="w-16 h-16 shrink-0">
      <img src={scrobble.image} alt="album art" class="w-full h-full rounded-xl aspect-square">
    </div>
  </a>

  <div class="shrink-0 flex flex-col justify-between">
    <a href={scrobble.url}>
      <h3>{scrobble.name}</h3>
      <h4 class="text-sm text-subtext0">{scrobble.artist}</h4>
    </a>

    {#if scrobble.isPlaying}
      <div class="w-full relative rounded-full h-2 bg-base">
        <div class="w-1/4 bg-mauve h-full rounded-full transform-translate duration-1000" bind:this={slider}></div>
      </div>
    {/if}
  </div>
</div>

<script lang="ts">
  import type { MouseEventHandler } from 'svelte/elements';
  import Card from './MusicCard.svelte'

  let scrobbles: any[] = [];
  let loading = true;
  let error: string | null = null;

  async function fetchScroblles() {
    try {
      const response = await fetch('https://api.henmalib.dev/scrobbles');
      if (!response.ok) {
        throw new Error('Failed to fetch scrobbles');
      }
      scrobbles = await response.json();
    } catch (err) {
      // @ts-ignore
      error = err.message;
    } 

    loading = false;
  }

  fetchScroblles();
  setInterval(fetchScroblles, 5000);

  let isDragging = false;
  let startX = 0;
  let lastX = 0;
  let velocity = 0;
  let currentScroll  = 0;
  let container: HTMLDivElement;

  const mouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
    container = e.currentTarget;
    isDragging = true;
    startX = e.pageX - e.currentTarget.offsetLeft;
    currentScroll = e.currentTarget.scrollLeft;
    velocity = 0;
    lastX = e.pageX;

    e.currentTarget.style.cursor = 'grabbing';
  };

  const mouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    if (!isDragging) return;

    const move = e.pageX - e.currentTarget.offsetLeft;
    const distance = move - startX;
    e.currentTarget.scrollLeft = currentScroll - distance;

    const deltaX = e.pageX - lastX;  
    velocity = -deltaX;  

    lastX = e.pageX;  
  };

  const leave = () => {
    isDragging = false;

    let momentum = velocity;
    const momentumInterval = setInterval(() => {
      if (Math.abs(momentum) < 0.1) {
        clearInterval(momentumInterval);
      }
      // e.currentTarget is undefined here
      container.scrollLeft += momentum; 

      momentum *= 0.95;
    }, 10);
  };
</script>


<!-- TODO: Skeleton loader -->
{#if loading}
  <p>Loading...</p>
{:else}
  <div on:mousedown={mouseDown} on:mouseleave={leave} on:mouseup={leave} on:mousemove={mouseMove} class="flex cursor-grab flex-row gap-4 overflow-y-scroll">
    {#each scrobbles as scrobble}
      <Card {scrobble} />
    {/each}
  </div>
{/if}

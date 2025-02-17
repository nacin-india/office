<script>
  import Paper from "./Paper.svelte";

  let dragActive = $state(false);
  let file = $state(null);
  let PAPER = $state(null);

  function handleDragEnter(e) {
    stop(e);
    dragActive = true;
  }

  function handleDragLeave(e) {
    stop(e);
    dragActive = false;
  }

  function handleDragOver(e) {
    stop(e);
    dragActive = true;
  }

  function handleDrop(e) {
    stop(e);
    dragActive = false;
    file = e.dataTransfer.files[0];
  }

  function handleFileInput(e) {
    file = e.target.files[0];
    dragActive = false;
  }

  function stop(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  $effect(() => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      PAPER = decode(e.target.result);
      console.log(PAPER);
    };
    reader.readAsText(file);
  });

  function decode(text) {
    return JSON.parse(atob(atob(text)));
  }
</script>

{#if !PAPER}
  <section
    role="presentation"
    class="w-full h-[90vh] flex items-center justify-center transition-all"
    class:active={dragActive}
    ondragenter={handleDragEnter}
    ondragleave={handleDragLeave}
    ondragover={handleDragOver}
    ondrop={handleDrop}
  >
    <div class="text-center">
      <h2 class="text-2xl font-bold text-gray-700">
        Drag & Drop Nacinpaper file
      </h2>

      <br />
      <div class="text-gray-500">or</div>
      <br />

      <label
        class="px-4 py-2 border border-gray-300 bg-white rounded-md cursor-pointer hover:ring-2"
      >
        Click to upload
        <input
          type="file"
          accept=".nacinpaper"
          onchange={handleFileInput}
          class="hidden"
        />
      </label>
    </div>
  </section>
{:else}
  <Paper {PAPER} />
{/if}

<style>
  .active {
    background: #dadcff;
  }
</style>

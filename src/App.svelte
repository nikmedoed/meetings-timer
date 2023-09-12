<script lang="ts">
  import Timer from "./components/Timer.svelte";
  import Preview from "./components/Preview.svelte";
  import FileOpen from "./components/FileOpen.svelte";
  import type { FileData } from "./components/types";
  import { invoke } from "@tauri-apps/api/tauri";
  import { onMount } from "svelte";

  let filedata: FileData;
  let current = 0;
  let screens = [FileOpen, Preview, Timer];
  let showModal = false;

  function nextScreen(shift = 1) {
    if (typeof shift !== "number") {
      shift = 1;
    }
    current = (current + shift + screens.length) % screens.length;
  }

  function close() {
    invoke("exit_app");
  }

  function handleShowModal() {
    showModal = true;
  }

  function handleKeyPress(event) {
    if (event.key === "Escape") {
      handleShowModal();
    }
  }

  onMount(() => {
    document.body.addEventListener("keydown", handleKeyPress);
    return () => {
      document.body.removeEventListener("keydown", handleKeyPress);
    };
  });
</script>

<main class="container">
  <svelte:component
    this={screens[current]}
    {filedata}
    {nextScreen}
    on:filedata={(e) => (filedata = e.detail)}
    on:show-modal={handleShowModal}
  />
</main>

{#if showModal}
  <div class="modal">
    <div class="modal-content">
      <h2 class="row">
        Прогресс будет утерян.<br /> Точно закрыть?
      </h2>
      <button class="button2" on:click={close}>Да</button>
      <button class="button2 base-blink" on:click={() => (showModal = false)}
        >Нет</button
      >
    </div>
  </div>
{/if}

<script lang="ts">
    import { onMount, onDestroy } from "svelte";

    import { formatTime } from "./utils";
    import PageTransition from "../PageTransition.svelte";
    import type { FileData } from "./types";
    export let filedata: FileData;
    export let nextScreen: () => void;
</script>

<PageTransition>
    <div class="container-center">
        <div class="row title">Мероприятие</div>
        <h1 class="row text-container">{filedata.activity}</h1>
        <div class="title">Этапов: {filedata.stages.length}</div>
        <div class="title">
            Длительность {filedata.totalTime / 60} минут ({(
                filedata.totalTime / 3600
            ).toFixed(1)} ч)
        </div>
        <div class="text-normal row">
            <button class="row button2" on:click={() => nextScreen(-1)}
                >Сменить</button
            >
            <button class="row button2 base-blink" on:click={nextScreen}
                >Начать</button
            >
        </div>
    </div>
</PageTransition>

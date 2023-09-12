<script lang="ts">
    import { onMount, onDestroy } from "svelte";

    import type { FileData, Stage } from "./types";
    import { formatTime } from "./utils";
    import PageTransition from "../PageTransition.svelte";
    export let filedata: FileData;
    let { stages } = filedata;
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    let plannedTime = 0;
    let currentStageIndex = 0;
    let currentStage = stages[currentStageIndex];

    let isRunning = false;
    let timer: number | undefined;
    let timeСounter: number = 0;

    function updateTimer() {
        currentStage = stages[currentStageIndex];
        plannedTime =
            stages
                .slice(0, currentStageIndex + 1)
                .reduce((acc, stage) => acc + stage.minutes, 0) *
                60 -
            timeСounter;
    }

    onMount(() => {
        updateTimer();
        startTimer();
    });
    onDestroy(() => {
        if (timer) clearInterval(timer);
    });

    function startTimer() {
        if (!isRunning) {
            timer = setInterval(() => {
                currentStage.time--;
                timeСounter++;
                plannedTime--;
            }, 1000);
            isRunning = true;
        }
    }

    function stopTimer() {
        if (timer) clearInterval(timer);
        isRunning = false;
    }

    function goToNextStage() {
        if (currentStageIndex < stages.length - 1) {
            currentStageIndex++;
            updateTimer();
        }
    }

    function goToPreviousStage() {
        if (currentStageIndex > 0) {
            currentStageIndex--;
            updateTimer();
        }
    }

    $: blink_factor = [currentStage.time <= 0, plannedTime <= 0].reduce(
        (a, c) => a + (c ? 2 : 0),
        0
    );
    $: animationDuration = blink_factor && 1 / blink_factor;

    function wannaClose() {
        dispatch("show-modal");
    }
</script>

<PageTransition>
    <div class="container">
        <h1 class="title row">
            Этап {currentStageIndex + 1}: {currentStage.name}
        </h1>
        <div class="row">
            <div class="timer flex">
                <div class="time">{formatTime(currentStage.time)}</div>
                <div class="label">
                    Осталось на этап из {currentStage.minutes} мин
                </div>
            </div>
            <div class="timer flex">
                <div class="time">{formatTime(plannedTime)}</div>
                <div class="label">Осталось на этап по плану</div>
            </div>
        </div>

        <div class="row timeline">
            {#each stages as stage, i}
                <div
                    class="stage-block title {currentStageIndex == i
                        ? 'active'
                        : ''}"
                    style={`flex:${stage.minutes};background-color:${stage.color}`}
                >
                    <div class="text-container">{stage.minutes}</div>
                </div>
            {/each}
            <div
                class="line"
                style="width: {Math.min(
                    (100 * timeСounter) / filedata.totalTime,
                    98
                )}%;"
            />
        </div>

        <div class="row">
            <div class="buttons">
                <button class="close" on:click={wannaClose}>X</button>
                <button on:click={startTimer} hidden={isRunning}>Старт</button>
                <button on:click={stopTimer} hidden={!isRunning}>Пауза</button>
                <button
                    on:click={goToPreviousStage}
                    hidden={currentStageIndex == 0}>Назад</button
                >
                <button
                    on:click={goToNextStage}
                    style="animation: blink {animationDuration}s infinite alternate;"
                    hidden={currentStageIndex >= stages.length - 1}
                    >Следущий</button
                >
                <button
                    on:click={wannaClose}
                    class="base-blink"
                    hidden={currentStageIndex != stages.length - 1}
                    >Конец</button
                >
            </div>
            <div class="timer">
                <div class="text-normal timer-small">
                    {formatTime(timeСounter)} / {formatTime(filedata.totalTime)}
                </div>
                <div class="label-small">Всего</div>
            </div>
        </div>
    </div>
</PageTransition>

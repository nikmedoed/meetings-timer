<script lang="ts">
    import { invoke } from "@tauri-apps/api/tauri";
    import { onMount } from "svelte";
    import { createEventDispatcher } from "svelte";

    import { textToFileData } from "./utils";
    import PageTransition from "../PageTransition.svelte";
    import type { FileData } from "./types";
    import FileDrop from "svelte-tauri-filedrop";

    export let nextScreen: () => void;

    const dispatch = createEventDispatcher<FileData>();

    let fileInput: HTMLInputElement | null;

    function textToNext(fileContent: string) {
        const filedata = textToFileData(fileContent);
        dispatch("filedata", filedata);
        nextScreen();
    }

    function fileProcess(selectedFile: File) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const fileContent = e.target ? (e.target.result as string) : "";
            textToNext(fileContent);
        };
        reader.readAsText(selectedFile);
    }

    function handleFileInputChange(event: Event) {
        const selectedFile = (event.target as HTMLInputElement).files?.[0];
        if (selectedFile) {
            fileProcess(selectedFile);
        }
    }

    async function handleFilesSelect(paths: string[]) {
        if (paths[0]) {
            const text: string = await invoke("read_file", {
                filePath: paths[0],
            });
            textToNext(text);
        }
    }
</script>

<PageTransition>
    <div class="container-full">
        <div class="row">
            <h2>Выберите файл (.txt) или перетащите его сюда:</h2>
            <input
                type="file"
                accept=".txt"
                style="display: none"
                id="fileInput"
                bind:this={fileInput}
                on:change={handleFileInputChange}
            />
            <button class="text-normal" on:click={() => fileInput?.click()}
                >Выбрать файл</button
            >
        </div>
        <div
            role="button"
            tabindex="0"
            class="row dropzone"
            on:keydown={null}
            on:click={() => fileInput?.click()}
        >
            <FileDrop
                extensions={["txt"]}
                handleFiles={handleFilesSelect}
                let:files
            >
                <div class="timer" class:droppable={files.length > 0}>
                    <h2>Текстовый файл с регламентом</h2>
                    <p class="title">1 строка название мероприятия</p>
                    <p class="title">
                        2 и далее название этапа и время в минутах
                    </p>
                </div>
            </FileDrop>
        </div>
    </div>
</PageTransition>

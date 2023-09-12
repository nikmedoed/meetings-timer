import type { FileData } from "./types";
import type { RGBColor } from "./colors";
import { getNextRandomColor } from "./colors";


export function formatTime(seconds: number) {
    let sign = seconds < 0 ? "-" : ""
    seconds = Math.abs(seconds)
    let time = [seconds % 60]
    if (seconds >= 60) {
        time.push(Math.floor((seconds % 3600) / 60))
    }
    if (seconds >= 3600) {
        time.push(Math.floor(seconds / 3600))
    }
    return sign + time.map(e => String(e).padStart(2, "0")).reverse().join(":")
}


export function textToFileData(fileContent: string): FileData {
    let stages = [];
    var previousColor: RGBColor;

    const lines = fileContent.trim().split('\n');
    const activity = lines[0].trim();

    for (let i = 1; i < lines.length; i++) {
        let parts = lines[i].trim().split(/\s+/);
        const minutes = parseInt(parts.pop(), 10);
        const name = parts.join(' ');
        if (!isNaN(minutes)) {
            const time = minutes * 60
            previousColor = getNextRandomColor(previousColor);
            const color = `rgb(${previousColor.join(',')})`;
            stages.push({ name, minutes, time, color });
        }

    }
    const totalTime = stages.reduce((acc, stage) => acc + stage.minutes, 0) * 60
    return { activity, stages, totalTime };
}
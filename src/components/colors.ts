export type RGBColor = [number, number, number];


function colorsAreDifferent(color1?: RGBColor, color2?: RGBColor, threshold = 150) {
    if (!color1 || !color2) {
        return true
    }
    let squaredDifference = Math.sqrt(
        color1.reduce((acc, val, index) => acc + Math.pow(val - color2[index], 2),
            0));

    return squaredDifference >= threshold;
}

export function getNextRandomColor(previousColor?: RGBColor) {
    let color: RGBColor;
    let brightness = 0;
    do {
        color = Array.from({ length: 3 }, () => Math.floor(Math.random() * 256)) as RGBColor;
        const [r, g, b] = color;
        brightness = (r * 299 + g * 587 + b * 114) / 1000;
    } while (!(10 < brightness && brightness <= 125 && colorsAreDifferent(previousColor, color)));

    return color;
}



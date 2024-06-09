const FRACTIONS: { [key: number]: string } = {
    0.5: "½",
    0.25: "¼",
    0.75: "¾",
    0.143: "⅐",
    0.111: "⅑",
    0.1: "⅒",
    0.333: "⅓",
    0.667: "⅔",
    0.2: "⅕",
    0.4: "⅖",
    0.6: "⅗",
    0.8: "⅘",
    0.167: "⅙",
    0.833: "⅚",
    0.125: "⅛",
    0.375: "⅜",
    0.625: "⅝",
    0.875: "⅞",
};

export function round(n: number, p: number) {
    let f = Math.pow(10, p);
    return Math.round(n * f) / f;
}

export function fraction(n: number) {
    let frac = round(n - Math.floor(n), 3);

    if (FRACTIONS[frac]) {
        return `${Math.floor(n)} ${FRACTIONS[frac]}`;
    } else {
        return `${n}`;
    }
}

export function commas(n: number) {
    return n.toLocaleString();
}

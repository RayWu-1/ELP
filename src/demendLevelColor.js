
export function demandLevelColor(level) {
    switch (level) {
        case "normal":
            return "lightgray";
        case "dirty":
            return "red";
        default:
            return "black";
    }
}
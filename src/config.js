export function demandLevelColor(level) {
    switch (level) {
        case "good":
            return "green";
        case "somewhat-dirty":
            return "yellow";
        case "dirty":
            return "red";
        default:
            return "black";
    }
}

export function demandFrequencyLevel(freq) {
    if (freq === 0) {
        return "good";
    } else if (freq < 3) {
        return "somewhat-dirty";
    } else {
        return "dirty";
    }
}

export function genderIconOfId(id) {
    return id[2] === "M" ? "male.svg" : "female.svg";
}

export const BASE_URL = "http://172.10.16.57:8085/demand";
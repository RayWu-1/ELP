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

export function getNearestHour() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const nearestIntegerHour = minutes < 30 ? hours : hours + 1;
    const nearestValidHour = Math.max(Math.min(nearestIntegerHour, 17), 8);
    return nearestValidHour.toString();
}
export function demandLevelColor(level) {
    switch (level) {
        case "undef":
            return "gray";
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
    if(freq===undefined){//防止网络波动加载时故障
        return "undef"
    }
    else if (freq === 0) {
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
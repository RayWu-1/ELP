import "./RoundButton.css";

export function RoundButton(props) {
    const { position, demandLevel, onClick } = props;
    return <button className={`round-button demand-level-${demandLevel}`} style={positionStyle(position)} onClick={onClick} />;
}

function positionStyle(position) {
    return {
        "top": position.x * 100 + "%",
        "left": position.y * 100 + "%",
    };
}
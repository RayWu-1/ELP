import "./RoundButton.css";

export function RoundButton(props) {
    const { demandLevel, onClick } = props;
    return <button className={`round-button demand-level-${demandLevel}`} onClick={onClick} />;
}
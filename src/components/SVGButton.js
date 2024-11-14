import './SVGButton.css';

export function PolygonButton(props) {
    return <svg className="svg-button-wrapper" width={props.width} viewBox={props.viewBox}>
        <polygon className="svg-button-shape" points={props.points}
            fill={props.color}
            onClick={props.onClick} />
    </svg>;
}

export function PathButton(props) {
    return <svg className="svg-button-wrapper" width={props.width} viewBox={props.viewBox}>
        <path className="svg-button-shape" d={props.d}
            fill={props.color}
            onClick={props.onClick} />
    </svg>;
}
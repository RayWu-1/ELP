import './SVGButton.css';

export function RectButton(props) {
    return (
        <svg className="svg-button-wrapper" width={props.width} height={props.height} viewBox={props.viewBox}>
            <rect
                className="svg-button-shape"
                x={props.x}
                y={props.y}
                width={props.width}
                height={props.height}
                fill={props.color} 
                onClick={props.onClick}
            />
        </svg>
    );
}
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
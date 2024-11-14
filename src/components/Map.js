import "./Map.css";

export function Map(props) {
    const { backgroundMap, buttons } = props;
    return (
        <div className="map-container">
            {/* Background Map Image */}
            <img src={backgroundMap} alt="Map" className="map-background" />

            {/* Buttons with Positions */}
            {buttons.map((button, index) => {
                const { position, content } = button;
                return (
                    <div className="map-button-wrapper" style={positionStyle(position)} key={index}>
                        {content}
                    </div>
                );
            })}
        </div>
    );
}

function positionStyle(position) {
    return {
        "top": position.x * 100 + "%",
        "left": position.y * 100 + "%",
    };
}
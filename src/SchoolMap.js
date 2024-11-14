import { RoundButton } from "./RoundButton";
import "./SchoolMap.css";


export function SchoolMap(props) {
    const { backgroundMap, rooms } = props;
    return (
        <div className="school-map-container">
            {/* Background Map Image */}
            <img src={backgroundMap} alt="School Map" className="school-map-background" />

            {/* Clickable Rooms */}
            {rooms.map((room, index) => {
                const { position, demandLevel, onClick } = room;
                return <RoundButton position={position} demandLevel={demandLevel} onClick={onClick} key={index} />;
            })}
        </div>
    );
}
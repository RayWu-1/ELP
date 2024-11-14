import "./CurrentSituationPage.css";
import { CurrentSituationLegends } from "../components/CurrentSituationLegends";
import { Map } from '../components/Map';
import { PathButton, PolygonButton } from "../components/SVGButton";
import { BATHROOM_DATA } from "./BathroomData";
import { demandLevelColor, genderIconOfId } from "../config";

export const CurrentSituationPage = () => {
    return (
        <div className="current-situation-page">
            <Map backgroundMap="school-map.jpeg" buttons={BATHROOM_DATA.map(
                data => makeButton(data, "dirty", () => console.log("clicked", data.id))
            )} />
            <CurrentSituationLegends></CurrentSituationLegends>
        </div>
    );
};

function makeButton(data, demandLevel, onClick) {
    const color = demandLevelColor(demandLevel);
    const { type, ...content } = data.content;
    let button;
    switch (type) {
        case "polygon":
            button = <PolygonButton color={color} onClick={onClick} {...content} />;
            break;
        case "path":
            button = <PathButton color={color} onClick={onClick} {...content} />;
            break;
        default:
            throw new Error("Unsupported bathroom button type: " + type);
    }
    return {
        position: data.position,
        content: <>
            {button}
            <img src={genderIconOfId(data.id)} alt="gender-icon" className="gender-icon" />
        </>,
    };
}
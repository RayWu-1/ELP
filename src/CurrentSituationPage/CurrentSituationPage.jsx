import "./CurrentSituationPage.css";
import { CurrentSituationLegends } from "../components/CurrentSituationLegends";
import { Map } from '../components/Map';
import { PathButton, PolygonButton } from "../components/SVGButton";
import { BATHROOM_DATA } from "./bathroomData";
import { demandLevelColor } from "../demendLevelColor";

export const CurrentSituationPage = () => {
    return (
        <div className="current-situation-page">
            <Map backgroundMap="school-map.jpeg" buttons={BATHROOM_DATA.map(
                (data, index) => makeButton(data, "dirty", () => console.log("clicked", index))
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
        case "button":
            button = <ThirdButton color={color} onClick={onClick} {...content} />;
            break;
        default:
            throw new Error("Unsupported bathroom button type: " + type);
    }
    return {
        position: data.position,
        content: button,
    };
}
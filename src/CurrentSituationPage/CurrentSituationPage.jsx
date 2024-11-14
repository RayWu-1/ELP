import { useEffect, useState } from 'react';
import "./CurrentSituationPage.css";
import { CurrentSituationLegends } from "../components/CurrentSituationLegends";
import { Map } from '../components/Map';
import { PathButton, PolygonButton } from "../components/SVGButton";
import { BATHROOM_DATA } from "./BathroomData";
import { demandFrequencyLevel, demandLevelColor, genderIconOfId, getNearestHour } from "../utils";
import { BASE_URL } from "../config";
import axios from 'axios';

export const CurrentSituationPage = () => {
    const [predictionData, setPredictionData] = useState({});

    useEffect(() => {
        const intervalId = setInterval(() => {
            // Make your request here, e.g., using fetch
            axios.get(BASE_URL + "/prediction")
                .then(prediction => {
                    const nearestHour = getNearestHour();
                    const nearestPrediction = Object.fromEntries(
                        Object.entries(prediction).map(([tid, pred]) => [tid, pred[nearestHour]])
                    );
                    setPredictionData(nearestPrediction);
                })
                .catch(console.log);
        }, 20000); // Request every 5 seconds

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, []);

    return (
        <div className="current-situation-page">
            <Map backgroundMap="school-map.jpeg" buttons={BATHROOM_DATA.map(
                data => makeButton(data, data.id in predictionData ? demandFrequencyLevel(predictionData[data.id]) : "good", () => console.log("clicked", data.id))
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
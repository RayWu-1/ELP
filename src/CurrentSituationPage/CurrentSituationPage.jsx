import "./CurrentSituationPage.css";
import {CurrentSituationLegends} from "../components/CurrentSituationLegends";
import {Map} from '../components/Map';
import {PathButton, PolygonButton, RectButton} from "../components/SVGButton";
import {BATHROOM_DATA} from "./BathroomData";
import {demandFrequencyLevel, demandLevelColor, genderIconOfId} from "../utils";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {NavBar} from "../components/NavBar";
import {Layout} from "@douyinfe/semi-ui";

export const CurrentSituationPage = () => {
    const BASE_URL = "http://172.10.16.57:8085/demand";
    const [frequencies, setFrequencies] = useState([]);
    const frequenciesRef = useRef([]);

    useEffect(() => {
        axios.get(BASE_URL + "/frequencies/now").then(res => {
            setFrequencies(res.data);
        });
        const intervalId = setInterval(() => {
            // Make request
            axios.get(BASE_URL + "/frequencies/now")
                .then(res => {
                    setFrequencies(res.data);
                });
        }, 2500); // Request every 20 seconds

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, []);

    useEffect(() => {
        frequenciesRef.current = frequencies;
    }, [frequencies]);

    return (
        <Layout>
            <Layout.Content>
            <div className="current-situation-page">
                <h1 className={'title'}>厕所当前情况</h1>
                <Map backgroundMap="school-map.jpeg" buttons={BATHROOM_DATA.map(
                    (data, index) => makeButton(data, demandFrequencyLevel(
                        frequenciesRef.current.filter((frequency) => {
                                return frequency.toiletId === data.id;
                            }
                        )[0]?.frequency), () => console.log("clicked", index))
                )}/>
                <CurrentSituationLegends></CurrentSituationLegends>
            </div>
            </Layout.Content>
            <Layout.Footer>
                <NavBar selectedPage={"current"}></NavBar>
            </Layout.Footer>
        </Layout>
    );
};

function makeButton(data, demandLevel, onClick) {
    const color = demandLevelColor(demandLevel);
    const {type, ...content} = data.content;
    let button;
    switch (type) {
        case "polygon":
            button = <PolygonButton color={color} onClick={onClick} {...content} />;
            break;
        case "path":
            button = <PathButton color={color} onClick={onClick} {...content} />;
            break;
        case "rect":
            button = <RectButton color={color} onClick={onClick} {...content} />;
            break;
        default:
            throw new Error("Unsupported bathroom button type: " + type);
    }
    return {
        position: data.position,
        content: <>
            {button}
            <img src={genderIconOfId(data.id)} alt="gender-icon" className="gender-icon"/>
        </>,
    };
}
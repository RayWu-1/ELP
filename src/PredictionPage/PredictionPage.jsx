import "./PredictionPage.css";
import {CurrentSituationLegends} from "../components/CurrentSituationLegends";
import {Map} from '../components/Map';
import {PathButton, PolygonButton, RectButton} from "../components/SVGButton";
import {BATHROOM_DATA} from "../CurrentSituationPage/BathroomData";
import {demandFrequencyLevel, demandLevelColor, genderIconOfId} from "../utils";
import {useEffect, useState} from "react";
import axios from "axios";
import {NavBar} from "../components/NavBar";
import {TimePeriodNavBar} from "../components/TimePeriodNavBar";

function getCurrentHour() {
    const now = new Date();
    return now.getHours();
}

export const PredictionPage = () => {
    const [leftDisabled, setLeftDisabled] = useState(false);
    const [rightDisabled, setRightDisabled] = useState(false);
    const BASE_URL = "http://172.10.16.57:8085/demand";
    const [frequencies, setFrequencies] = useState([]);
    const [currentPeriod, setCurrentPeriod] = useState([getCurrentHour(), getCurrentHour() + 1]);

    const nextPeriod = () => {
        if (currentPeriod[1] <= 23) {
            if (currentPeriod[1] + 1 === 24) {
                setRightDisabled(true);
            }
            setLeftDisabled(false);
            setCurrentPeriod([currentPeriod[0] + 1, currentPeriod[1] + 1]);
        }
    };

    const nextNextPeriod = () => {
        if (currentPeriod[1] + 2 <= 23) {
            if (currentPeriod[1] + 2 === 24) {
                setRightDisabled(true);
            }
            setLeftDisabled(false);
            setCurrentPeriod([currentPeriod[0] + 2, currentPeriod[1] + 2]);
        } else if (currentPeriod[1] <= 23) {
            if (currentPeriod[1] + 1 === 24) {
                setRightDisabled(true);
            }
            setLeftDisabled(false);
            setCurrentPeriod([currentPeriod[0] + 1, currentPeriod[1] + 1]);
        }
    };

    const prevPeriod = () => {
        if (currentPeriod[0] >= 1) {
            if (currentPeriod[0] - 1 === 0) {
                setLeftDisabled(true);
            }
            setRightDisabled(false);
            setCurrentPeriod([currentPeriod[0] - 1, currentPeriod[1] - 1]);
        }
    };

    const prevPrevPeriod = () => {
        if (currentPeriod[0] - 2 >= 1) {
            if (currentPeriod[0] - 2 === 0) {
                setLeftDisabled(true);
            }
            setRightDisabled(false);
            setCurrentPeriod([currentPeriod[0] - 2, currentPeriod[1] - 2]);
        } else if (currentPeriod[0] >= 1) {
            if (currentPeriod[0] - 1 === 0) {
                setLeftDisabled(true);
            }
            setRightDisabled(false);
            setCurrentPeriod([currentPeriod[0] - 1, currentPeriod[1] - 1]);
        }
    };

    useEffect(() => {
        axios.get(`${BASE_URL}/prediction/today/period?period=${getCurrentHour()}`).then(res => {
            setFrequencies(res.data);
        });
    }, []);

    useEffect(() => {
        axios.get(`${BASE_URL}/prediction/today/period?period=${currentPeriod[0]}`).then(res => {
            setFrequencies(res.data);
        });
    }, [currentPeriod]);

    return (
        <div className="current-situation-page">
            <Map
                backgroundMap="school-map.jpeg"
                buttons={BATHROOM_DATA.map((data, index) => makeButton(
                    data,
                    demandFrequencyLevel(
                        frequencies.find(frequency => frequency.toiletId === data.id)?.frequency
                    ),
                    () => console.log("clicked", index)
                ))}
            />
            <CurrentSituationLegends />
            <NavBar selectedPage="predict" />
            <TimePeriodNavBar
                timePeriod={`${currentPeriod[0]}:00 - ${currentPeriod[1]}:00`}
                right1Func={nextPeriod}
                right2Func={nextNextPeriod}
                left1Func={prevPeriod}
                left2Func={prevPrevPeriod}
                leftDisabled={leftDisabled}
                rightDisabled={rightDisabled}
            />
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
        case "rect":
            button = <RectButton color={color} onClick={onClick} {...content} />;
            break;
        default:
            throw new Error("Unsupported bathroom button type: " + type);
    }

    return {
        position: data.position,
        content: (
            <>
                {button}
                <img src={genderIconOfId(data.id)} alt="gender-icon" className="gender-icon" />
            </>
        ),
    };
}

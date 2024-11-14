import React from 'react';
import './CurrentSituationLegends.scss'
import {useState} from 'react';
import {RectButton} from "./SVGButton";
import {makeButton} from "../CurrentSituationPage/CurrentSituationPage";
import {genderIconOfId} from "../utils";


export function CurrentSituationLegends() {
    return (
        <div className={"legends"}>
            <div className="green">
                <div className={"icon"}><img src={genderIconOfId("GLM")} className={"icon-svg"} alt=""/>
                </div>
                <div className="info">厕所状况良好</div>
            </div>
            <div className="yellow">
                <div className={"icon"}><img src={genderIconOfId("GLM")} className={"icon-svg"} alt=""/>
                    <img src="compass.svg" className={"compass-icon"}/>
                </div>
                <div className="info">厕所需要清理</div>
            </div>
            <div className="red">
                <div className={"icon"}><img src={genderIconOfId("GLM")} className={"icon-svg"} alt=""/>
                </div>
                <div className="info">厕所急需清理</div>
            </div>
            <div className="gray">
                <div className={"icon"}><img src={genderIconOfId("GLM")} className={"icon-svg"} alt=""/>
                </div>
                <div className="info">加载中/待刷新</div>
            </div>

        </div>
    );
}
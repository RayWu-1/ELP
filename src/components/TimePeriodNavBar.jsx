import "./TimePeriodNavBar.scss";
export const TimePeriodNavBar = ({ timePeriod, left1Func, left2Func, right1Func, right2Func, leftDisabled = false, rightDisabled = false }) => {
    return (
        <div className="time-period-navbar">
            <img src={"double_arrow_left.svg"} className="left-button-2" onClick={left2Func}
                style={leftDisabled ? { backgroundColor: "gray" } : {}}
            ></img>
            <img src={"single_arrow_left.svg"} className="left-button-1" onClick={left1Func}
                style={leftDisabled ? { backgroundColor: "gray" } : {}}
            ></img>
            <div className="selected-period">{timePeriod}</div>
            <img src={"single_arrow_right.svg"} className="right-button-1" onClick={right1Func}
                style={rightDisabled ? { backgroundColor: "gray" } : {}}
            ></img>
            <img src={"double_arrow_right.svg"} className="right-button-2" onClick={right2Func}
                style={rightDisabled ? { backgroundColor: "gray" } : {}}
            ></img>
        </div>
    );
};
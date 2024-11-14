import Chart from "./chart";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";

export const BackgroundManagementPage = () => {
    const [sortedFrequencies, setSortedFrequencies] = useState([]);
    const sortedFrequenciesRef = useRef([]);
    const [options, setOptions] = useState({});
    useEffect(() => {
        axios.get(BASE_URL + "/frequencies/all").then(res => {
            setSortedFrequencies(res.data.sort(function (a, b) {
                return a.period - b.period;
            }));
        });
    }, []);
    useEffect(() => {
        sortedFrequenciesRef.current = sortedFrequencies;
        setOptions({
            tooltip: {},
            legend: {
                data: sortedFrequenciesRef.current.map((frequency) => frequency.toiletId),
            },
            xAxis: {
                data: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
            },
            yAxis: {
            },
            series: sortedFrequenciesRef.current.map((frequency) => {
                return (
                    {
                        name: frequency.toiletId,
                        type: "line",
                        data: Object.values(frequency.frequencies),
                    }
                );
            }),
        });
        console.log(sortedFrequenciesRef.current);
    }, [sortedFrequencies]); // 监听 sortedFrequencies 变化

    return (
        <>
            <Chart options={options} name={"所有不同时间段反馈数据"} />

        </>
    );
};
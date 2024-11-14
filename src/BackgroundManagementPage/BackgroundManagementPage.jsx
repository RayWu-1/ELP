import Chart from "./chart";
import {useEffect, useRef, useState} from "react";
import axios from "axios";

export const BackgroundManagementPage = () => {
    const BASE_URL = "http://localhost:8085/demand";
    const [sortedFrequencies, setSortedFrequencies] = useState([]);
    const sortedFrequenciesRef = useRef([]);
    const [options, setOptions] = useState({});
    const sortedTodayFrequenciesRef = useRef([])
    const [sortedTodayFrequencies, setSortedTodayFrequencies] = useState([])
    const [todayChartOptions, setTodayChartOptions] = useState({})
    useEffect(() => {
        axios.get(BASE_URL + "/frequencies/all").then(res => {
            setSortedFrequencies(res.data.sort(function (a, b) {
                return a.period - b.period;
            }));
        });
        axios.get(BASE_URL + "/frequencies/today").then(res => {
            setSortedTodayFrequencies(res.data.sort(function (a, b) {
                return a.period - b.period
            }));
        })
    }, []);
    useEffect(() => {
        sortedFrequenciesRef.current = sortedFrequencies;
        sortedTodayFrequenciesRef.current = sortedTodayFrequencies;
        setOptions({
            tooltip: {},
            legend: {
                data: sortedFrequenciesRef.current.map((frequency) => frequency.toiletId),
            },
            xAxis: {
                data: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
                name: "时间"
            },
            yAxis: {
                name: "反馈数"
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
        setTodayChartOptions({
            tooltip: {},
            legend: {
                data: sortedTodayFrequenciesRef.current.map((frequency) => frequency.toiletId),
            },
            xAxis: {
                data: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
                name: "时间"
            },
            yAxis: {
                name: "反馈数"
            },
            series: sortedTodayFrequenciesRef.current.map((frequency) => {
                return (
                    {
                        name: frequency.toiletId,
                        type: "line",
                        data: Object.values(frequency.frequencies),
                    }
                );
            }),
        });
    }, [sortedFrequencies]); // 监听 sortedFrequencies 变化

    return (
        <>
            <Chart options={options} name={"所有不同时间段反馈数据"}/>
            <Chart options={todayChartOptions} name={"今日不同时间段反馈数据"}></Chart>
        </>
    );
};
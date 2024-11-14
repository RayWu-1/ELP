import { useEffect, useRef } from "react";
import * as echarts from "echarts";

function Chart({ options,name }) {
    const chartRef = useRef(null);
    const chartInstance = useRef(null); // 保持对实例的引用

    // 定义渲染函数
    function renderChart() {
        try {
            // `echarts.getInstanceByDom` 可以从已经渲染成功的图表中获取实例
            const renderedInstance = echarts.getInstanceByDom(chartRef.current);
            if (renderedInstance) {
                chartInstance.current = renderedInstance;
            } else {
                chartInstance.current = echarts.init(chartRef.current);
            }

            // 更新图表配置
            chartInstance.current.setOption(options);
        } catch (error) {
            console.error("error", error.message);
            chartInstance.current && chartInstance.current.dispose();
        }
    }

    // 定义窗口大小发生改变执行的回调函数
    function resizeHandler() {
        if (chartInstance.current) {
            chartInstance.current.resize();
        }
    }

    // 页面初始化时，开始渲染图表
    useEffect(() => {
        renderChart(); // 初次渲染图表

        return () => {
            // 销毁图表实例，释放内存
            if (chartInstance.current) {
                chartInstance.current.dispose();
            }
        };
    }, []); // 只在组件加载时执行一次

    // 监听 `options` 的变化
    useEffect(() => {
        if (chartInstance.current) {
            chartInstance.current.setOption(options); // 每次 `options` 更新时重新设置图表
        }
    }, [options]); // 监听 `options` 变化

    // 监听窗口大小改变
    useEffect(() => {
        window.addEventListener("resize", resizeHandler);
        return () => window.removeEventListener("resize", resizeHandler);
    }, []);

    return (
        <div>
            <h2 style={{textAlign:"center"}}>{name}</h2>
            <div style={{ height: "400px" }} ref={chartRef} />
        </div>
    );
}

export default Chart;

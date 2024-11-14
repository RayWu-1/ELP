import "./CurrentSituationPage.scss"
import {useEffect, useState} from "react";
import axios from "axios";
export const CurrentSituationPage=()=>{
    const BASE_URL="http://localhost:8085/demand"
    const [timer,setTimer] = useState(0);
    const [data, setData]=useState(null)
    useEffect(() => {
        axios.get(BASE_URL+"/all").then(res=>{
            setData(res.data)
            console.log(res.data)
        })
        const intervalId = setInterval(() => {

                axios.get(BASE_URL+"/all").then(res=> {
                    setData(res.data)
                })

        }, 1000*20);

// 清除定时器
        return () => clearInterval(intervalId);
    }, []); // 空依赖数组表示只在组件挂载和卸载时执行一次
    return(<>
        {data?data.map((dat)=>(<div>{dat.id}</div>)):<></>}
    </>)
}
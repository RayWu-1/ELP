import React, { useEffect } from 'react';
import { Col, Row } from '@douyinfe/semi-ui';
import './CurrentSituationLegends.css';
// import './data.json';
import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';

export function CurrentSituationLegends(props) {
    const [data, setData] = useState(null);
    useEffect(() => {
        axios.get(BASE_URL + '/all').then(res => {
            setData(res.data);
        }).catch(console.log);
    }, []);
    return (<>
        { }
        <Row gutter={18}>
            <div className={"row"}>
                {data ? data.map((dat) => (
                    <>
                        <Col span={2}><div className="col1">{dat.toiletId}</div></Col>
                        <Col span={6}><div className="col2">{"厕所状况良好"}</div></Col>
                    </>
                )
                ) : <></>}
            </div>
        </Row>

    </>);
}
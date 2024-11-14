import "./RoundButton.css";
import { Button, SplitButtonGroup } from '@douyinfe/semi-ui';

export function RoundButton(props) {
    const { demandLevel, onClick } = props;
    return <button className={`round-button demand-level-${demandLevel}`} onClick={onClick} />;
}
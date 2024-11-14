
import './App.css';
import { Map } from './Map';
import { RoundButton } from './RoundButton';

// The Main page, where user can select between
function Main() {
  return (
    <div className="Map">
      <Map backgroundMap="map.png" buttons={[
        {
          position: {
            x: 0.4,
            y: 0.4,
          },
          content: <RoundButton demandLevel="dirty" onClick={() => console.log("clicked 1")} />,
        },
        {
          position: {
            x: 0.6,
            y: 0.6,
          },
          content: <RoundButton demandLevel="normal" onClick={() => console.log("clicked 2")} />,
        },
      ]} />
    </div>
  );
}

export default Main;

import logo from './logo.svg';
import './App.css';
import { Map } from './Map';
import { RoundButton } from './RoundButton';

// The Main page, where user can select between
function Main() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Map backgroundMap="logo512.png" buttons={[
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

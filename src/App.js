import './App.css';
import {
  BrowserRouter as Router,
  Routes
} from 'react-router-dom';
import createRoutes from "./route/Route";
import {CurrentSituationPage} from "./CurrentSituationPage/CurrentSituationPage";
import {PredictionPage} from "./PredictionPage/PredictionPage";

function App() {
  const routesConfig = [
    { path: '/', component: <CurrentSituationPage/>,index:0 },
    {path: '/prediction',component: <PredictionPage/>,index:1},
    // {path:"/governmentCheckCarbonAmount",component: <CarbonAmountPage/>,index: 5}
  ];

  return (
      <Router>
        <Routes>
          {createRoutes(routesConfig)}
        </Routes>
      </Router>
  );
}

export default App;

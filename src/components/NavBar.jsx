import "./NavBar.scss";
import { useNavigate } from "react-router-dom";
export const NavBar = ({ selectedPage }) => {
    const navigate = useNavigate();
    return (
        <div className={"navbar"}>
            {selectedPage === "current" ? <img src="currentsituationpage_selected.svg" /> :
                <img src="currentsituationpage.svg" onClick={() => { navigate("/"); }} />}
            {selectedPage === "predict" ? <img src="predictionpage_selected.svg" /> : <img src="predictionpage.svg" onClick={() => { navigate("/prediction"); }} />}
        </div>
    );
};
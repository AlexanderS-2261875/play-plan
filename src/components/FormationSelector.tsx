import React from "react";
import "../styles/FormationSelector.css";

interface FormationSelectorProps {
    home_formations: { [key: string]: any };
    away_formation: { [key: string]: any };
    onFormationSelect: (formationName: string, isOpponent: boolean) => void; // Updated to accept second parameter
}

const FormationSelector: React.FC<FormationSelectorProps> = ({ home_formations, away_formation, onFormationSelect }) => {
    return (
        <>
            <div className="select home">
                <h2>Select Home Formation</h2>
                <ul className="selector-list">
                    {Object.keys(home_formations).map((formationName) => (
                        <li key={formationName}>
                            <button onClick={() => onFormationSelect(formationName, false)}> {/* Pass false for home */}
                                {formationName}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="select away">
                <h2>Select Opponent Formation</h2>
                <ul className="selector-list">
                    {Object.keys(away_formation).map((formationName) => (
                        <li key={formationName}>
                            <button className="selector-button" onClick={() => onFormationSelect(formationName, true)}> {/* Pass true for opponent */}
                                {formationName}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default FormationSelector;

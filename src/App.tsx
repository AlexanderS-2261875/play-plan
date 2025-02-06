import React, { useState, useEffect } from 'react';
import Field from './components/Field';
import Player from './components/Player';
import FormationSelector from './components/FormationSelector';
import { Formation, PlayerData } from './components/data-structures/Formation';
import formationsData from './data-sets/Default.json';
import Menu from './components/Menu';

const App: React.FC = () => {
    const [formations, setFormations] = useState<{ [key: string]: Formation }>({});
    const [currentFormation, setCurrentFormation] = useState<Formation | null>(null);
    const [opponentFormation, setOpponentFormation] = useState<Formation | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [showNames, setShowNames] = useState(false);

    useEffect(() => {
        const loadedFormations = formationsData.reduce((acc: { [key: string]: Formation }, formation: any) => {
            const players: PlayerData[] = formation.players.map((player: any) => ({
                number: player.number,
                name: player.name,
                position: player.position,
                key: player.key
            }));
            acc[formation.name] = new Formation(formation.name, players);
            return acc;
        }, {});

        setFormations(loadedFormations);
    }, []);

    const handleFormationSelect = (formationName: string, isOpponent: boolean = false) => {
        const selectedFormation = formations[formationName] || null;
        if (isOpponent) {
            setOpponentFormation(selectedFormation);
        } else {
            setCurrentFormation(selectedFormation);
        }
        setShowNames(true);
    };

    const toggleEditMode = () => setIsEditMode(prev => !prev);
    const toggleShowNames = () => setShowNames(prev => !prev);

    return (
        <div>
            <Menu
                isEditMode={isEditMode}
                toggleEditMode={toggleEditMode}
                showNames={showNames}
                toggleShowNames={toggleShowNames}
            />
            {/* Use the updated FormationSelector with both home and away formations */}
            <FormationSelector
                home_formations={formations}
                away_formation={formations}
                onFormationSelect={(formationName, isOpponent) => handleFormationSelect(formationName, isOpponent)}
            />
            <Field>
                {/* Render current team players */}
                {currentFormation && currentFormation.players.map((player) => (
                    <Player
                        key={player.key}
                        playerNumber={player.number}
                        playerName={player.name}
                        initialPosition={player.position}
                        isEditMode={isEditMode}
                        opponent={false}
                        showNames={showNames}
                        onPositionChange={(num, pos) => {
                            currentFormation.updatePlayerPosition(num, pos);
                            setCurrentFormation(new Formation(currentFormation.name, [...currentFormation.players]));
                        }}
                    />
                ))}
                {/* Render opponent players */}
                {opponentFormation && opponentFormation.players.map((opponentPlayer) => (
                    <Player
                        key={`opp-${opponentPlayer.key}`}
                        playerNumber={opponentPlayer.number}
                        playerName={opponentPlayer.name}
                        initialPosition={opponentPlayer.position}
                        isEditMode={isEditMode}
                        opponent={true}
                        showNames={showNames}
                        onPositionChange={(num, pos) => {
                            opponentFormation.updatePlayerPosition(num, pos);
                            setOpponentFormation(new Formation(opponentFormation.name, [...opponentFormation.players])); // Update the opponent formation
                        }}
                    />
                ))}
            </Field>
        </div>
    );
};

export default App;

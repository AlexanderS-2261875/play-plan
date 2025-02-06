import React, {useState, useRef, useEffect} from "react";
import "../styles/Player.css"

interface PlayerProps {
    playerNumber: number;
    initialPosition: { x: number; y: number };
    playerName: string;
    showNames: boolean;
    opponent: boolean;
    isEditMode: boolean;
    onPositionChange: (playerNumber: number, position: { x: number; y: number }) => void;
}

const Player: React.FC<PlayerProps> = ({
                                           playerNumber,
                                           initialPosition,
                                           playerName,
                                           isEditMode,
                                           onPositionChange,
                                           opponent,
                                           showNames
                                       }) => {
    // Set initial mirrored position directly if opponent
    const [position, setPosition] = useState(() => {
        return opponent
            ? { x: 800 - initialPosition.x, y: 500 - initialPosition.y }
            : initialPosition;
    });
    const [isDragging, setIsDragging] = useState(false);
    const offset = useRef({ x: 0, y: 0 });

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isEditMode) return;

        setIsDragging(true);
        offset.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        };
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;

        const newX = e.clientX - offset.current.x;
        const newY = e.clientY - offset.current.y;

        setPosition({ x: newX, y: newY });

        if (onPositionChange) {
            onPositionChange(playerNumber, { x: newX, y: newY });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [handleMouseMove, isDragging]);

    return (
        <div className="player" onMouseDown={handleMouseDown}
             style={{
                 left: position.x - 25,
                 top: position.y - 25,
                 cursor: isEditMode ? 'pointer' : 'default',
                 backgroundColor: opponent ? 'red' : 'blue',}}>
            {showNames ? playerName : playerNumber}
        </div>
    );
};

export default Player;

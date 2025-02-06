import React from 'react';

interface MenuProps {
    isEditMode: boolean;
    toggleEditMode: () => void;
    showNames: boolean;
    toggleShowNames: () => void;
}

const Menu: React.FC<MenuProps> = ({ isEditMode, toggleEditMode, showNames, toggleShowNames }) => {
    return (
        <div>
            <h1 className="Title">Play Plan</h1>
            <button onClick={toggleEditMode} className="editbutton">
                {isEditMode ? 'Exit Edit Mode' : 'Enter Edit Mode'}
            </button>
            <button onClick={toggleShowNames} className="deletebutton">
                {showNames ? 'Show Numbers' : 'Show Names'}
            </button>
        </div>
    );
};

export default Menu;
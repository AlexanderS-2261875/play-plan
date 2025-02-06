import React from 'react';
import '../styles/Field.css'
interface FieldProps {
    children: React.ReactNode;
}

const Field: React.FC<FieldProps> = ({ children }) => {
    return (
        <div style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',}}>
            <div className="field">
                {/* Field Lines */}
                <div className="field-lines">
                    {/* Center Circle */}
                    <div className="center-circle"/>
                    {/* Halfway Line */}
                    <div className="halfway-line"/>
                    {/* Penalty Areas */}
                    <div className="penalty-area left"/>
                    <div className="penalty-area right"/>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Field;
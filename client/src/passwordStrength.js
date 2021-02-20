import React from "react";
import "./App.css"

const passwordStrength = ({
    validity: { minlength, number, specialChar, illegalChar }
}) => {
    return (
        <div className="password-meter text-left mb-4">
            <p className="text-dark">Password must contain:</p>
            <ul className="text-muted">
                <PasswordStrengthItem 
                    isValid={minlength}
                    text="Have at least 8 characters"
                />
                <PasswordStrengthItem 
                    isValid={number}
                    text="Have at least 1 number"
                />
                <PasswordStrengthItem style="font-family: DIN-Light;"
                    isValid={specialChar}
                    text="Have at least 1 special character"
                />

                <PasswordStrengthItem 
                    isValid={illegalChar}
                    text="Your password must not contain these symbols (<  >  ?  : ;)"
                />
               
            </ul>
        </div>
    );
};

const PasswordStrengthItem = ({ isValid, text }) => {
    const highlightClass = isValid
        ? "text-success"
        : isValid === null
        ? "normal-text"
        : isValid !== null
        ? "text-failure"
        : "";
    return <li  className={highlightClass}>{text}</li>;
};

export default passwordStrength;
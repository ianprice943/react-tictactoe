import React from 'react';

interface resetProps {
    resetClickHandler: () => void
}

const ResetGameButton = (props: resetProps) => {
    return (
        <button id="reset-game" onClick={props.resetClickHandler}>
            Reset Game
        </button>
    )
}

export default ResetGameButton;
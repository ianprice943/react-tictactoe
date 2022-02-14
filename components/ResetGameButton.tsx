import React from 'react';

interface ResetProps {
    resetClickHandler: () => void
}

const ResetGameButton = (props: ResetProps) => {
    return (
        <button id="reset-game" onClick={props.resetClickHandler}>
            Reset Game
        </button>
    )
}

export default ResetGameButton;
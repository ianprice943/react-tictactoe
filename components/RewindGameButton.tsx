import React from 'react';

interface RewindProps {
    rewindClickHandler: () => void
}

const RewindGameButton = (props: RewindProps) => {
    return (
        <button id="rewind-game" onClick={props.rewindClickHandler}>
            Rewind Game
        </button>
    )
}

export default RewindGameButton;
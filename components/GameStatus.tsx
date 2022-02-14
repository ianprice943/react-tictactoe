import React from 'react';

interface gameStatusProps {
    currentStatus: string
}

const GameStatus = (props: gameStatusProps) => {
    return (
        <div id="game-status">
            {props.currentStatus}
        </div>
    )
}

export default GameStatus;
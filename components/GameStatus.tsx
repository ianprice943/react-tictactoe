import React from 'react';

interface GameStatusProps {
    currentStatus: string
}

const GameStatus = (props: GameStatusProps) => {
    return (
        <div id="game-status">
            {props.currentStatus}
        </div>
    )
}

export default GameStatus;
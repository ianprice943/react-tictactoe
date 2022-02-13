import React, { useState } from 'react';
import Square from './Square';

const GameBoard = () => {
    const [gameState, setGameState] = useState<string[]>(["", "", "",
                                                          "", "", "",
                                                          "", "", ""]);
    return (
        <div id="game-board">
            <Square />
            <Square />
            <Square />
            <Square />
            <Square />
            <Square />
            <Square />
            <Square />
            <Square />
        </div>
    )
}

export default GameBoard;
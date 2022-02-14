import React, { ReactEventHandler, useState } from 'react';
import Square from './Square';

const GameBoard = () => {
    const [gameState, setGameState] = useState<string[]>(["", "", "",
                                                          "", "", "",
                                                          "", "", ""]);

                                                          const [playerTurn, setPlayerTurn] = useState<string>("Player 1");

    const handleClick = (event: React.MouseEvent<HTMLDivElement>, squareNum: number) => {
        // event.stopPropagation();
        const gameStateClone = gameState.slice();
        if(playerTurn === 'Player 2') {
            gameStateClone[squareNum] = 'O';
            setGameState(gameStateClone);
            setPlayerTurn('Player 1');
        } else {
            gameStateClone[squareNum] = 'X';
            setGameState(gameStateClone);
            setPlayerTurn('Player 2');
        }
    }

    return (
        <div id="game-board">
            <Square value={gameState[0]} clickHandler={(e) => handleClick(e, 0)} />
            <Square value={gameState[1]} clickHandler={(e) => handleClick(e, 1)} />
            <Square value={gameState[2]} clickHandler={(e) => handleClick(e, 2)} />
            <Square value={gameState[3]} clickHandler={(e) => handleClick(e, 3)} />
            <Square value={gameState[4]} clickHandler={(e) => handleClick(e, 4)} />
            <Square value={gameState[5]} clickHandler={(e) => handleClick(e, 5)} />
            <Square value={gameState[6]} clickHandler={(e) => handleClick(e, 6)} />
            <Square value={gameState[7]} clickHandler={(e) => handleClick(e, 7)} />
            <Square value={gameState[8]} clickHandler={(e) => handleClick(e, 8)} />
        </div>
    )
}

export default GameBoard;
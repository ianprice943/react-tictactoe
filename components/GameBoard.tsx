import React, { ReactEventHandler, useState } from 'react';
import GameStatus from './GameStatus';
import ResetGameButton from './ResetGameButton';
import Square from './Square';

const GameBoard = () => {
    const [gameState, setGameState] = useState<string[]>(["", "", "",
                                                          "", "", "",
                                                          "", "", ""]);
    const [playerTurn, setPlayerTurn] = useState<string>("Player 1");

    const handleClick = (squareNum: number) => {
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

    const handleResetClick = () => {
        let gameStateClone = ["", "", "", "", "", "", "", "", ""];
        setGameState(gameStateClone);
        setPlayerTurn('Player 1');
    }

    return (
        <div id="game-board">
            <Square value={gameState[0]} clickHandler={() => handleClick(0)} />
            <Square value={gameState[1]} clickHandler={() => handleClick(1)} />
            <Square value={gameState[2]} clickHandler={() => handleClick(2)} />
            <Square value={gameState[3]} clickHandler={() => handleClick(3)} />
            <Square value={gameState[4]} clickHandler={() => handleClick(4)} />
            <Square value={gameState[5]} clickHandler={() => handleClick(5)} />
            <Square value={gameState[6]} clickHandler={() => handleClick(6)} />
            <Square value={gameState[7]} clickHandler={() => handleClick(7)} />
            <Square value={gameState[8]} clickHandler={() => handleClick(8)} />
            <div id="game-state-buttons">
                <ResetGameButton resetClickHandler={handleResetClick} />
            </div>
            <GameStatus currentStatus={playerTurn} />
        </div>
    )
}

export default GameBoard;
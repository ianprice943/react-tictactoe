import React, { ReactEventHandler, useEffect, useState } from 'react';
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
        if(playerTurn === 'Player 2' && gameState[squareNum] === "") {
            gameStateClone[squareNum] = 'O';
            setGameState(gameStateClone);
            setPlayerTurn('Player 1');
        } else if(gameState[squareNum] === "") {
            gameStateClone[squareNum] = 'X';
            setGameState(gameStateClone);
            setPlayerTurn('Player 2');
        }
    }

    const handleResetClick = () => {
        const gameStateClone = ["", "", "", "", "", "", "", "", ""];
        setGameState(gameStateClone);
        setPlayerTurn('Player 1');
    }

    const renderStatus = (status: string, winner: boolean) => {
        if (!winner && status === "Player 2") {
            "Player 2's Turn";
        } else if(!winner) {
            "Player 1's Turn"
        } else if(winner && status === "Player 2") {
            "Player 2 Wins!"
        } else {
            "Player 1 Wins!"
        }
    }

    const checkForWinner = () => {
        const winningLines = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6]
        ];
        for(let i = 0; i < winningLines.length; i++) {
            const [first, second, third] = winningLines[i];
            if(gameState[first] !== "" && gameState[first] === gameState[second] && gameState[first] === gameState[third]) {
                if(gameState[first] === "X") {
                    return "Player 1";
                } else {
                    return "Player 2";
                }
            }
        }
        return "";
    }

    const winner = checkForWinner();
    let status;
    if (winner !== "") {
        status = `${winner} Wins!`;
    } else {
        status = `${playerTurn}'s Turn`;
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
            <GameStatus currentStatus={status} />
        </div>
    )
}

export default GameBoard;
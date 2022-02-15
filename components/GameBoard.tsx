import React, { ReactEventHandler, useEffect, useState } from 'react';
import GameStatus from './GameStatus';
import ResetGameButton from './ResetGameButton';
import RewindGameButton from './RewindGameButton';
import Square from './Square';

const GameBoard = () => {
    const [gameState, setGameState] = useState<string[]>(["", "", "",
                                                          "", "", "",
                                                          "", "", ""]);
    const [playerTurn, setPlayerTurn] = useState<string>("Player 1");
    const [gameStateHistory, setGameStateHistory] = useState<string[][]>([gameState]);

    const handleClick = (squareNum: number) => {
        const gameStateClone = gameState.slice();
        const gameStateHistoryClone = gameStateHistory.slice();
        if(checkForWinner() !== "" || gameState[squareNum] !== "") {
            return;
        }
        if(playerTurn === 'Player 2') {
            gameStateClone[squareNum] = 'O';
            setGameState(gameStateClone);
            setPlayerTurn('Player 1');
            gameStateHistoryClone.push(gameStateClone);
            setGameStateHistory(gameStateHistoryClone);
        } else {
            gameStateClone[squareNum] = 'X';
            setGameState(gameStateClone);
            setPlayerTurn('Player 2');
            gameStateHistoryClone.push(gameStateClone);
            setGameStateHistory(gameStateHistoryClone);
        }
    }

    const handleResetClick = () => {
        const gameStateClone = ["", "", "", "", "", "", "", "", ""];
        setGameState(gameStateClone);
        setPlayerTurn('Player 1');
    }

    const handleRewindClick = () => {
        const gameStateHistoryClone = gameStateHistory.slice();
        if(gameStateHistoryClone.length === 1) {
            return;
        }
        gameStateHistoryClone.pop();
        setGameState(gameStateHistoryClone[gameStateHistoryClone.length - 1]);
        setGameStateHistory(gameStateHistoryClone);
        if(playerTurn === 'Player 1') {
            setPlayerTurn('Player 2');
        } else {
            setPlayerTurn('Player 1');
        }
    } 

    const checkForWinner = () => {
        const winningLines = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
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

        let numEmptySquares = gameState.reduce((accumulator, square) => {
            return accumulator + (square === "" ? 1 : 0);
        }, 0)

        if(numEmptySquares === 0) {
            return "Cat's Game!";
        }

        return "";
    }

    const winner = checkForWinner();
    let status;
    if (winner === "Player 1" || winner === "Player 2") {
        status = `${winner} Wins!`;
    } else if(winner === "Cat's Game!") {
        status = winner;
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
                <RewindGameButton rewindClickHandler={handleRewindClick} />
            </div>
            <GameStatus currentStatus={status} />
        </div>
    )
}

export default GameBoard;
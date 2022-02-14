import React from 'react';
import { shallow, mount, render } from 'enzyme';

import GameBoard from '../../components/GameBoard';
import Square from '../../components/Square';
import ResetGameButton from '../../components/ResetGameButton';
import RewindGameButton from '../../components/RewindGameButton';
import GameStatus from '../../components/GameStatus';

describe("The component is rendered", () => {
    let board: any;

    beforeEach(() => {
        board = shallow(<GameBoard />)
    });
    
    it("renders the GameBoard component without crashing, and ensures that the board has 9 Square components", () => {
        board.find('.square').forEach((square: any) => {
            expect(square).toHaveLength(1);
        });
    });

    it("renders the ResetGameButton component inside the GameBoard component without crashing", () => {
        expect(board.find(ResetGameButton)).toHaveLength(1);
    });
});

describe("The GameBoard component state", () => {
    let board: any;

    beforeEach(() => {
        board = shallow(<GameBoard />);
    });
    
    afterEach(() => {
        jest.clearAllMocks();
    })
    
    it("should change the top left square's state to 'X'", ()=> {

        board.find(Square).first().props().clickHandler();
        expect(board.find(Square).first().props().value).toBe("X");
    });

    it("should reset the state of the board and the player", () => {
        board.find(ResetGameButton).props().resetClickHandler();
        board.find(Square).forEach((square: any) => {
            expect(square.props().value).toBe("");
        });
    });

    it("should display the current player's turn in GameStatus", () => {
        expect(board.find(GameStatus).props().currentStatus).toContain("Player 1");
    });

    it("should add extra grammar and syntax around the player's turn in GameStatus",  () => {
        expect(board.find(GameStatus).props().currentStatus).toBe("Player 1's Turn");
    });

    it("should stop the user from overwriting a square that's already been filled", () => {
        board.find(Square).first().props().clickHandler();
        expect(board.find(Square).first().props().value).toBe("X");
        board.find(Square).first().props().clickHandler();
        expect(board.find(Square).first().props().value).toBe("X");
    });

    it("should stop the current player from changing if a player clicks a square that's already been filled", () => {
        board.find(Square).first().props().clickHandler();
        expect(board.find(GameStatus).props().currentStatus).toBe("Player 2's Turn");
        board.find(Square).first().props().clickHandler();
        expect(board.find(GameStatus).props().currentStatus).toBe("Player 2's Turn");
    });

});
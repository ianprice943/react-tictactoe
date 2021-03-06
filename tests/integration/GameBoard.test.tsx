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
        board.find(Square).forEach((square: any) => {
            expect(square).toHaveLength(1);
        });
    });

    it("renders the ResetGameButton component inside the GameBoard component without crashing", () => {
        expect(board.find(ResetGameButton)).toHaveLength(1);
    });

    it("should render the RewindGameButton component", () => {
        expect(board.find(RewindGameButton).html()).toContain("Rewind Game");
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

    it("should correctly determine a winner with a top horizontal win condition", () => {
        board.find(Square).at(0).props().clickHandler();
        board.find(Square).at(3).props().clickHandler();
        board.find(Square).at(1).props().clickHandler();
        board.find(Square).at(4).props().clickHandler();
        board.find(Square).at(2).props().clickHandler();
        expect(board.find(GameStatus).props().currentStatus).toBe("Player 1 Wins!");
    });

    it("should correctly determine a winner with a middle horizontal win condition", () => {
        board.find(Square).at(3).props().clickHandler();
        board.find(Square).at(0).props().clickHandler();
        board.find(Square).at(4).props().clickHandler();
        board.find(Square).at(1).props().clickHandler();
        board.find(Square).at(5).props().clickHandler();
        expect(board.find(GameStatus).props().currentStatus).toBe("Player 1 Wins!");
    });

    it("should correctly determine a winner with a bottom horizontal win condition", () => {
        board.find(Square).at(6).props().clickHandler();
        board.find(Square).at(3).props().clickHandler();
        board.find(Square).at(7).props().clickHandler();
        board.find(Square).at(4).props().clickHandler();
        board.find(Square).at(8).props().clickHandler();
        expect(board.find(GameStatus).props().currentStatus).toBe("Player 1 Wins!");
    });

    it("should correctly determine a winner with a left vertical win condition", () => {
        board.find(Square).at(0).props().clickHandler();
        board.find(Square).at(1).props().clickHandler();
        board.find(Square).at(3).props().clickHandler();
        board.find(Square).at(2).props().clickHandler();
        board.find(Square).at(6).props().clickHandler();
        expect(board.find(GameStatus).props().currentStatus).toBe("Player 1 Wins!");
    });

    it("should correctly determine a winner with a middle vertical win condition", () => {
        board.find(Square).at(1).props().clickHandler();
        board.find(Square).at(2).props().clickHandler();
        board.find(Square).at(4).props().clickHandler();
        board.find(Square).at(3).props().clickHandler();
        board.find(Square).at(7).props().clickHandler();
        expect(board.find(GameStatus).props().currentStatus).toBe("Player 1 Wins!");
    });

    it("should correctly determine a winner with a right vertical win condition", () => {
        board.find(Square).at(2).props().clickHandler();
        board.find(Square).at(1).props().clickHandler();
        board.find(Square).at(5).props().clickHandler();
        board.find(Square).at(0).props().clickHandler();
        board.find(Square).at(8).props().clickHandler();
        expect(board.find(GameStatus).props().currentStatus).toBe("Player 1 Wins!");
    });

    it("should correctly determine a winner with a left to right diagonal win condition", () => {
        board.find(Square).at(0).props().clickHandler();
        board.find(Square).at(1).props().clickHandler();
        board.find(Square).at(4).props().clickHandler();
        board.find(Square).at(2).props().clickHandler();
        board.find(Square).at(8).props().clickHandler();
        expect(board.find(GameStatus).props().currentStatus).toBe("Player 1 Wins!");
    });

    it("should correctly determine a winner with a right to left diagonal win condition", () => {
        board.find(Square).at(2).props().clickHandler();
        board.find(Square).at(1).props().clickHandler();
        board.find(Square).at(4).props().clickHandler();
        board.find(Square).at(0).props().clickHandler();
        board.find(Square).at(6).props().clickHandler();
        expect(board.find(GameStatus).props().currentStatus).toBe("Player 1 Wins!");
    });

    it("should correctly determine a cat's game", () => {
        board.find(Square).at(0).props().clickHandler();
        board.find(Square).at(4).props().clickHandler();
        board.find(Square).at(1).props().clickHandler();
        board.find(Square).at(3).props().clickHandler();
        board.find(Square).at(5).props().clickHandler();
        board.find(Square).at(2).props().clickHandler();
        board.find(Square).at(6).props().clickHandler();
        board.find(Square).at(8).props().clickHandler();
        board.find(Square).at(7).props().clickHandler();
        expect(board.find(GameStatus).props().currentStatus).toBe("Cat's Game!");
    });

    it("should stop a player from clicking on an empty square if a winner has been determined", () => {
        board.find(Square).at(0).props().clickHandler();
        board.find(Square).at(3).props().clickHandler();
        board.find(Square).at(1).props().clickHandler();
        board.find(Square).at(4).props().clickHandler();
        board.find(Square).at(2).props().clickHandler();
        expect(board.find(GameStatus).props().currentStatus).toBe("Player 1 Wins!");
        board.find(Square).at(5).props().clickHandler();
        expect(board.find(Square).at(5).props().value).toBe("");
    });

    it("should reset the game state part way through a game", () => {
        board.find(Square).at(0).props().clickHandler();
        board.find(Square).at(4).props().clickHandler();
        board.find(Square).at(1).props().clickHandler();
        board.find(Square).at(3).props().clickHandler();
        board.find(Square).at(5).props().clickHandler();
        board.find(Square).at(2).props().clickHandler();
        board.find(ResetGameButton).props().resetClickHandler();
        board.find(Square).forEach((square: any) => {
            expect(square.props().value).toBe("");
        });
    });

    it("should reset the game after a winner is declared", () => {
        board.find(Square).at(2).props().clickHandler();
        board.find(Square).at(1).props().clickHandler();
        board.find(Square).at(5).props().clickHandler();
        board.find(Square).at(0).props().clickHandler();
        board.find(Square).at(8).props().clickHandler();
        expect(board.find(GameStatus).props().currentStatus).toBe("Player 1 Wins!");
        board.find(ResetGameButton).props().resetClickHandler();
        board.find(Square).forEach((square: any) => {
            expect(square.props().value).toBe("");
        });
    });

    it("should be able to click RewindGameButton's click handler", () => {
        board.find(Square).at(2).props().clickHandler();
        expect(board.find(RewindGameButton).props().rewindClickHandler).toBeTruthy();
    });

    it("should do nothing when RewindGameButton is clicked at the start of the game", () => {
        board.find(RewindGameButton).props().rewindClickHandler();
        expect(board.find(Square).at(2).props().value).toBe("");
    });

    it("should rewind the game state one step", () => {
        board.find(Square).at(2).props().clickHandler();
        board.find(RewindGameButton).props().rewindClickHandler();
        expect(board.find(Square).at(2).props().value).toBe("");
    });

    it("should rewind the game two steps", () => {
        board.find(Square).at(0).props().clickHandler();
        board.find(Square).at(4).props().clickHandler();
        for(let i = 0; i < 2; i++) {
            board.find(RewindGameButton).props().rewindClickHandler();
        }
        expect(board.find(Square).at(0).props().value).toBe("");
    });

    it("should rewind the game two steps", () => {
        board.find(Square).at(0).props().clickHandler();
        board.find(Square).at(4).props().clickHandler();
        for(let i = 0; i < 2; i++) {
            board.find(RewindGameButton).props().rewindClickHandler();
        }
        expect(board.find(Square).at(4).props().value).toBe("");
        expect(board.find(Square).at(0).props().value).toBe("");
    });

    it("should rewind the game three steps", () => {
        board.find(Square).at(0).props().clickHandler();
        board.find(Square).at(4).props().clickHandler();
        board.find(Square).at(1).props().clickHandler();
        for(let i = 0; i < 3; i++) {
            board.find(RewindGameButton).props().rewindClickHandler();
        }
        expect(board.find(Square).at(4).props().value).toBe("");
        expect(board.find(Square).at(0).props().value).toBe("");
        expect(board.find(Square).at(1).props().value).toBe("");
    });

    it("should rewind the game four steps", () => {
        board.find(Square).at(0).props().clickHandler();
        board.find(Square).at(4).props().clickHandler();
        board.find(Square).at(1).props().clickHandler();
        board.find(Square).at(3).props().clickHandler();
        for(let i = 0; i < 4; i++) {
            board.find(RewindGameButton).props().rewindClickHandler();
        }
        expect(board.find(Square).at(4).props().value).toBe("");
        expect(board.find(Square).at(0).props().value).toBe("");
        expect(board.find(Square).at(1).props().value).toBe("");
        expect(board.find(Square).at(3).props().value).toBe("");
    });

    it("should rewind the game five steps", () => {
        board.find(Square).at(0).props().clickHandler();
        board.find(Square).at(4).props().clickHandler();
        board.find(Square).at(1).props().clickHandler();
        board.find(Square).at(3).props().clickHandler();
        board.find(Square).at(5).props().clickHandler();
        for(let i = 0; i < 5; i++) {
            board.find(RewindGameButton).props().rewindClickHandler();
        }
        expect(board.find(Square).at(4).props().value).toBe("");
        expect(board.find(Square).at(0).props().value).toBe("");
        expect(board.find(Square).at(1).props().value).toBe("");
        expect(board.find(Square).at(3).props().value).toBe("");
        expect(board.find(Square).at(5).props().value).toBe("");
    });

    it("should rewind the game six steps", () => {
        board.find(Square).at(0).props().clickHandler();
        board.find(Square).at(4).props().clickHandler();
        board.find(Square).at(1).props().clickHandler();
        board.find(Square).at(3).props().clickHandler();
        board.find(Square).at(5).props().clickHandler();
        board.find(Square).at(2).props().clickHandler();
        for(let i = 0; i < 6; i++) {
            board.find(RewindGameButton).props().rewindClickHandler();
        }
        expect(board.find(Square).at(4).props().value).toBe("");
        expect(board.find(Square).at(0).props().value).toBe("");
        expect(board.find(Square).at(1).props().value).toBe("");
        expect(board.find(Square).at(3).props().value).toBe("");
        expect(board.find(Square).at(5).props().value).toBe("");
        expect(board.find(Square).at(2).props().value).toBe("");
    });

    it("should rewind the game seven steps", () => {
        board.find(Square).at(0).props().clickHandler();
        board.find(Square).at(4).props().clickHandler();
        board.find(Square).at(1).props().clickHandler();
        board.find(Square).at(3).props().clickHandler();
        board.find(Square).at(5).props().clickHandler();
        board.find(Square).at(2).props().clickHandler();
        board.find(Square).at(6).props().clickHandler();
        for(let i = 0; i < 7; i++) {
            board.find(RewindGameButton).props().rewindClickHandler();
        }
        expect(board.find(Square).at(4).props().value).toBe("");
        expect(board.find(Square).at(0).props().value).toBe("");
        expect(board.find(Square).at(1).props().value).toBe("");
        expect(board.find(Square).at(3).props().value).toBe("");
        expect(board.find(Square).at(5).props().value).toBe("");
        expect(board.find(Square).at(2).props().value).toBe("");
        expect(board.find(Square).at(6).props().value).toBe("");
    });

    it("should rewind the game eight steps", () => {
        board.find(Square).at(0).props().clickHandler();
        board.find(Square).at(4).props().clickHandler();
        board.find(Square).at(1).props().clickHandler();
        board.find(Square).at(3).props().clickHandler();
        board.find(Square).at(5).props().clickHandler();
        board.find(Square).at(2).props().clickHandler();
        board.find(Square).at(6).props().clickHandler();
        board.find(Square).at(8).props().clickHandler();
        for(let i = 0; i < 8; i++) {
            board.find(RewindGameButton).props().rewindClickHandler();
        }
        expect(board.find(Square).at(4).props().value).toBe("");
        expect(board.find(Square).at(0).props().value).toBe("");
        expect(board.find(Square).at(1).props().value).toBe("");
        expect(board.find(Square).at(3).props().value).toBe("");
        expect(board.find(Square).at(5).props().value).toBe("");
        expect(board.find(Square).at(2).props().value).toBe("");
        expect(board.find(Square).at(6).props().value).toBe("");
        expect(board.find(Square).at(8).props().value).toBe("");
    });

    it("should rewind the game nine steps", () => {
        board.find(Square).at(0).props().clickHandler();
        board.find(Square).at(4).props().clickHandler();
        board.find(Square).at(1).props().clickHandler();
        board.find(Square).at(3).props().clickHandler();
        board.find(Square).at(5).props().clickHandler();
        board.find(Square).at(2).props().clickHandler();
        board.find(Square).at(6).props().clickHandler();
        board.find(Square).at(8).props().clickHandler();
        board.find(Square).at(7).props().clickHandler();
        for(let i = 0; i < 9; i++) {
            board.find(RewindGameButton).props().rewindClickHandler();
        }
        expect(board.find(Square).at(4).props().value).toBe("");
        expect(board.find(Square).at(0).props().value).toBe("");
        expect(board.find(Square).at(1).props().value).toBe("");
        expect(board.find(Square).at(3).props().value).toBe("");
        expect(board.find(Square).at(5).props().value).toBe("");
        expect(board.find(Square).at(2).props().value).toBe("");
        expect(board.find(Square).at(6).props().value).toBe("");
        expect(board.find(Square).at(8).props().value).toBe("");
        expect(board.find(Square).at(7).props().value).toBe("");
    });

    it("should let you fill in a square which had its value rewound", () => {
        board.find(Square).at(0).props().clickHandler(); // P1
        board.find(Square).at(4).props().clickHandler(); // P2
        board.find(Square).at(1).props().clickHandler(); // P1
        board.find(RewindGameButton).props().rewindClickHandler();
        board.find(RewindGameButton).props().rewindClickHandler();
        board.find(Square).at(1).props().clickHandler(); // P2
        board.find(Square).at(4).props().clickHandler(); // P1
        expect(board.find(Square).at(4).props().value).toBe("X");
        expect(board.find(Square).at(1).props().value).toBe("O");
    });

    it("should undo a players win to continue the game", () => {
        board.find(Square).at(0).props().clickHandler();
        board.find(Square).at(3).props().clickHandler();
        board.find(Square).at(1).props().clickHandler();
        board.find(Square).at(4).props().clickHandler();
        board.find(Square).at(2).props().clickHandler();
        expect(board.find(GameStatus).props().currentStatus).toBe("Player 1 Wins!");
        board.find(RewindGameButton).props().rewindClickHandler();
        expect(board.find(GameStatus).props().currentStatus).toBe("Player 1's Turn");
    });
});
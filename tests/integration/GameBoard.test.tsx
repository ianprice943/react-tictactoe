import React from 'react';
import { shallow, mount, render } from 'enzyme';

import GameBoard from '../../components/GameBoard';
import Square from '../../components/Square';
import ResetGameButton from '../../components/ResetGameButton';
import RewindGameButton from '../../components/RewindGameButton';
import GameStatus from '../../components/GameStatus';

describe("The component is rendered", () => {
    it("renders the GameBoard component without crashing, and ensures that the board has 9 Square components", () => {
        const board = shallow(<GameBoard />);
        board.find('.square').forEach((square) => {
            expect(square).toHaveLength(1);
        });
    });
});

describe("The GameBoard component state", () => {
    let board: any;
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    const mockBoardState = ["", "", "",
                            "", "", "",
                            "", "", ""];
    useStateSpy.mockImplementation(() => [mockBoardState, setState] as any);
    
    const mockPlayerState = ["Player 1"];
    useStateSpy.mockImplementation(() => [mockPlayerState, setState] as any);

    beforeEach(() => {
        board = shallow(<GameBoard />);
    });
    
    afterEach(() => {
        jest.clearAllMocks();
    })
    
    it("should change the top left square's state to 'X' and the player state to 'Player 2'", ()=> {
        board.find(Square).first().props().clickHandler();
        expect(setState).toHaveBeenCalledWith(['X']);
        expect(setState).toHaveBeenCalledWith("Player 2");
    });

    it("should reset the state of the board and the player", () => {
        board.find(ResetGameButton).props.resetClickHandler();
        expect(setState).toBeCalledWith(["", "", "", "", "", "", "", "", ""]);
        expect(setState).toBeCalledWith("Player 1");
    });
});
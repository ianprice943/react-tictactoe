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
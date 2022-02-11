import React from 'react';
import { shallow, mount, render } from 'enzyme';

import GameBoard from '../../components/GameBoard';
import Square from '../../components/Square';
import ResetGameButton from '../../components/ResetGameButton';

describe("The component is rendered", () => {
    it("renders the GameBoard component without crashing", () => {
        shallow(<GameBoard />);
    });

    it("renders a Square component without crashing", () => {
        shallow(<Square />);
    });

    it("renders a ResetGameButton component without crashing", () => {
        shallow(<ResetGameButton />);
    });

    it("renders a RewindGameButton component without crashing", () => {
        shallow(<RewindGameButton />);
    });
});
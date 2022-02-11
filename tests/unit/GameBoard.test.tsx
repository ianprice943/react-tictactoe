import React from 'react';
import { shallow, mount, render } from 'enzyme';

import GameBoard from '../../components/GameBoard';
import Square from '../../components/Square';

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
});
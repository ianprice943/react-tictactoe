import React from 'react';
import { shallow, mount, render } from 'enzyme';

import GameBoard from '../../components/GameBoard';

describe("The component is rendered", () => {
    it("renders the GameBoard component without crashing", () => {
        shallow(<GameBoard />);
    });
});
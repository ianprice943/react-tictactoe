import React from 'react';
import { shallow, mount, render } from 'enzyme';

import GameBoard from '../../components/GameBoard';
import Square from '../../components/Square';
import ResetGameButton from '../../components/ResetGameButton';
import RewindGameButton from '../../components/RewindGameButton';
import GameStatus from '../../components/GameStatus';

describe("The component is rendered", () => {
    it("renders the GameBoard component without crashing", () => {
        shallow(<GameBoard />);
    });

    it("renders a Square component without crashing", () => {
        shallow(<Square value="" clickHandler={() => {}} />);
    });

    it("renders a ResetGameButton component without crashing", () => {
        shallow(<ResetGameButton resetClickHandler={() => {}}/>);
    });

    it("renders a RewindGameButton component without crashing", () => {
        shallow(<RewindGameButton />);
    });

    it("renders a GameStatus component without crashing", () =>{
        shallow(<GameStatus />);
    });
});
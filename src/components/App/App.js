import React, { Component } from 'react';
import GameField from "../GameField/GameField";

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <GameField />
        );
    }
}

export default App;

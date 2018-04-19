import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Cell from "../Cell/Cell";
import * as actions from './GameFieldActions';

class GameField extends Component {
    constructor(props) {
        super(props);

        this.clickHandler = this.clickHandler.bind(this);
        this.restartGame = this.restartGame.bind(this);
    }

    clickHandler(e) {
        this.props.actions.checkCell(e.target.dataset.value);
    }

    restartGame(e) {
        this.props.actions.restart();
    }

    render() {
        const {gameField, winningSequence, gameOver, firstPlayerScore, secondPlayerScore, winner} = this.props;
        let gameResult;

        if (winner !== 0) {
            gameResult = `Player ${winner} won`
        } else if (winner === 0 && gameOver) {
            gameResult = 'Game is over in a draw'
        }

        return (
            <div className="container">
                <div className="gamefield">
                    <div className="gamefield__info info">
                        <div className="info__block info__block--score">
                            <h2 className="info__header">Player 1</h2>
                            <p>Score: {firstPlayerScore}</p>
                        </div>

                        {gameResult ?
                            <div className="info__block info__block--result">
                                <h2 className="info__header">{gameResult}</h2>
                            </div>
                            :
                            null}
                        <div className="info__block info__block--score">
                            <h2 className="info__header">Player 2</h2>
                            <p>Score: {secondPlayerScore}</p>
                        </div>
                    </div>

                    <div className="gamefield__field">
                        {[...Array(9)].map((x, i) =>
                            <Cell key={i} clickHandler={this.clickHandler} isActive={!gameOver} value={gameField[i]}
                                  isWinCell={winningSequence.some(r => r === i)}/>
                        )}
                    </div>
                    <button className="gamefield__btn-restart" onClick={this.restartGame}>RESTART</button>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    gameField: state.gameReducer.gameField,
    winningSequence: state.gameReducer.winningSequence,
    gameOver: state.gameReducer.gameOver,
    firstPlayerScore: state.gameReducer.firstPlayerScore,
    secondPlayerScore: state.gameReducer.secondPlayerScore,
    winner: state.gameReducer.winner
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(GameField);

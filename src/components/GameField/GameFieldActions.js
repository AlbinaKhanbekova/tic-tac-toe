import * as actionTypes from './GameFieldActionTypes';

export const checkCell = (cellIndex) => (dispatch, getState) => {
    let firstPlayerTurn = getState().gameReducer.firstPlayerTurn;
    let newGameField = Object.assign([...getState().gameReducer.gameField], {[cellIndex]: firstPlayerTurn ? 'x' : 'o'});

    dispatch(gameFieldChanged(newGameField));
    dispatch(toggleTurn());

    let winner = dispatch(getWinnerDetails());

    if (winner) {
        dispatch(playerWin(winner));
        dispatch(gameOver());

        if (winner === 1) {
            dispatch(firstPlayerWin());
        } else {
            dispatch(secondPlayerWin());
        }
    } else if (!winner && newGameField.every(elem => elem === 'x' || elem === 'o')) {
        dispatch(gameOver());
    }
};

export const getWinnerDetails = () => (dispatch, getState) => {
    if (dispatch(checkPlayersTurns('x'))) return 1;
    if (dispatch(checkPlayersTurns('o'))) return 2;

    return false;
};

export const checkPlayersTurns = (symbol) => (dispatch, getState) => {
    let gameField = getState().gameReducer.gameField;
    let playerTurns = [];
    let isWinner = false;
    let sequences = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    gameField.filter((item, i) => {
        if (item === symbol) {
            playerTurns.push(i);
        }
    });

    playerTurns.sort();

    sequences.forEach(array => {
        let count = 0;

        playerTurns.forEach(elem => {
            if (array.includes(elem)) {
                count += 1;
            }
        });

        if (count === 3) {
            dispatch(setWinningSequence(array))
        }

        isWinner = isWinner || count === 3;
    });

    return isWinner;
};

export const toggleTurn = () => (dispatch) => {
    dispatch({
        type: actionTypes.GAME_TOGGLE_TURN
    })
};

export const gameFieldChanged = (gameField) => (dispatch) => {
    dispatch({
        type: actionTypes.GAME_FIELD_CHANGED,
        data: gameField
    });
};

export const gameOver = () => (dispatch) => {
    dispatch({
        type: actionTypes.GAME_OVER
    });
};

export const playerWin = (winner) => (dispatch) => {
    dispatch({
        type: actionTypes.GAME_PLAYER_WIN,
        data: winner
    });
};
export const setWinningSequence = (winningSequence) => (dispatch) => {
    dispatch({
        type: actionTypes.GAME_WINNING_SEQUENCE,
        data: winningSequence
    });
};

export const firstPlayerWin = () => (dispatch) => {
    dispatch({
        type: actionTypes.GAME_PLAYER1_WIN
    });
};

export const secondPlayerWin = () => (dispatch) => {
    dispatch({
        type: actionTypes.GAME_PLAYER2_WIN
    });
};

export const restart = () => (dispatch) => {
    dispatch(restartGame());
};

export const restartGame = () => (dispatch) => {
    dispatch({
        type: actionTypes.GAME_RESTART
    });
};

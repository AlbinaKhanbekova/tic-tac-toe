import * as actionTypes from './GameFieldActionTypes';

const initialState = {
    firstPlayerTurn: true,
    secondPlayerTurn: false,
    gameField: Array.from(new Array(9), (x, i) => i + ''),
    currentPlayer: 0,
    winner: 0,
    firstPlayerScore: 0,
    secondPlayerScore: 0,
    winningSequence: [],
    gameOver: false
};

const gameReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case actionTypes.GAME_TOGGLE_TURN: {
            const newState = {...state};

            return {
                ...newState,
                firstPlayerTurn: !state.firstPlayerTurn,
                secondPlayerTurn: !state.secondPlayerTurn
            }
        }

        case actionTypes.GAME_FIELD_CHANGED: {
            const newState = {...state};

            return {
                ...newState,
                gameField: action.data
            }
        }

        case actionTypes.GAME_PLAYER_WIN: {
            const newState = {...state};

            return {
                ...newState,
                winner: action.data
            }
        }

        case actionTypes.GAME_WINNING_SEQUENCE: {
            const newState = {...state};

            return {
                ...newState,
                winningSequence: action.data
            }
        }

        case actionTypes.GAME_PLAYER1_WIN: {
            const newState = {...state};

            return {
                ...newState,
                firstPlayerScore: state.firstPlayerScore + 1
            }
        }
        case actionTypes.GAME_PLAYER2_WIN: {
            const newState = {...state};

            return {
                ...newState,
                secondPlayerScore: state.secondPlayerScore + 1
            }
        }

        case actionTypes.GAME_RESTART: {
            const newState = {...state};

            return {
                ...newState,
                firstPlayerTurn: true,
                secondPlayerTurn: false,
                gameField: Array.from(new Array(9), (x, i) => i + ''),
                currentPlayer: 0,
                winner: 0,
                winningSequence: [],
                gameOver: false
            }
        }
        case actionTypes.GAME_OVER: {
            const newState = {...state};

            return {
                ...newState,
                gameOver: true
            }
        }

        default:
            return state
    }
};


export default gameReducer;

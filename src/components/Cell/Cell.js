import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Cell extends Component {
    constructor(props) {
        super(props);

        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler(e) {
        const {value, isActive} = this.props;
        if (isActive && value !== 'x' && value !== 'o') {
            this.props.clickHandler(e);
        }
    }

    render() {
        const {value, isWinCell} = this.props;
        const cellClass = classNames({
            cell: true,
            'cell--player1': value === 'x',
            'cell--player2': value === 'o',
            winner: isWinCell
        });

        return (
            <div className={cellClass} onClick={this.clickHandler} data-value={value}/>
        );
    }
}

Cell.propTypes = {
    clickHandler: PropTypes.func,
    value: PropTypes.string,
    isActive: PropTypes.bool,
    isWinCell: PropTypes.bool

};

export default Cell;

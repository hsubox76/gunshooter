import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { directions } from '../data/constants';
import * as Actions from '../actions/actions';

function mapStateToProps(state) {
    return {
        commandLine: state.commandLine
    }
}

function mapDispatchToActions(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}

class DirectionButton extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    onClick(room) {
        const direction = this.props.direction;
        if (this.props.commandLine.length % 2 === 1) {
            this.props.actions.addCommandWord({
                word: directions[direction].displayName,
                wordType: 'direction'
            });
        } else {
            this.props.actions.logText('> ' + directions[direction].displayName);
            this.props.actions.changeRoom(room);
        }
    }
    render() {
        const direction = this.props.direction;
        return (
            <span
                onClick={_.wrap(this.props.destinationRoom, this.onClick)}
                className={'direction-button direction-' 
                    + directions[direction].className + ' fa fa-arrow-circle-'
                    + directions[direction].className}></span>
        );
    }
}

DirectionButton.propTypes = {
    destinationRoom: PropTypes.number,
    direction: PropTypes.string,
    commandLine: PropTypes.array
};

export default connect(mapStateToProps, mapDispatchToActions)(DirectionButton);
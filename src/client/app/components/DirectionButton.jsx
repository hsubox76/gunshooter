import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';

function mapDispatchToActions(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}

class DirectionButton extends Component {
    render() {
        const directionClassName = this.props.directionClassName;
        return (
            <span
                onClick={_.wrap(this.props.destinationRoom, this.props.actions.changeRoom)}
                className={'direction-button direction-' 
                    + directionClassName + ' fa fa-arrow-circle-'
                    + directionClassName}></span>
        );
    }
}

DirectionButton.propTypes = {
    destinationRoom: PropTypes.number,
    directionClassName: PropTypes.string
};

export default connect(null, mapDispatchToActions)(DirectionButton);
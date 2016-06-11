import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 
import _ from 'lodash';
import Container from './Container';
import * as Actions from '../actions';

function mapStateToProps(state) {
 return {
     actionWords: state.actions
 };
}

function mapDispatchToActions(dispatch) {
    return { actions: bindActionCreators(Actions, dispatch) };
}

class ActionsContainer extends Component {
    constructor(props) {
        super(props);
        this.onActionWordClick = this.onActionWordClick.bind(this);
    }
    onActionWordClick(actionWord) {
        this.props.actions.addCommandWord(_.extend({}, actionWord, { wordType: 'action' }))
    }
    render() {
        return (
            <Container
                id="actions"
                displayName="Actions">
                {_.map(this.props.actionWords, (action) => {
                    return (
                        <div
                            className="actions-word"
                            onClick={_.wrap(action, this.onActionWordClick)}
                            key={action.word}>
                                {action.word}
                            </div>
                        );
                })}
            </Container>
        );
    }
}

ActionsContainer.propTypes = {
    actionWords: PropTypes.array,
    actions: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToActions)(ActionsContainer);
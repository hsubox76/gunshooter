import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';

function mapStateToProps(state) {
    return {
      roomItems: state.roomItems
    };
}

function mapDispatchToActions(dispatch) {
    return { actions: bindActionCreators(Actions, dispatch) };
}
class DescriptionKeyword extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    
    onClick(wordId) {
        const commandWord = _.find(this.props.roomItems, {id: wordId});
        this.props.actions.addCommandWord(_.extend({}, commandWord, { wordType: 'item' }));
    }
    render() {
        return (
            <span
                onClick={_.wrap(this.props.wordId, this.onClick)}
                className="room-keyword">{this.props.word}</span>
        );
    }
}

DescriptionKeyword.propTypes = {
    word: PropTypes.string,
    wordId: PropTypes.number
};

export default connect(mapStateToProps, mapDispatchToActions)(DescriptionKeyword);
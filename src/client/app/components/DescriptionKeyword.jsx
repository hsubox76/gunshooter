import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';

function mapStateToProps(state) {
    return {
      currentRoomId: state.currentRoomId,
      rooms: state.rooms,
      items: state.items,
      commandLine: state.commandLine
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
        if (this.props.commandLine.length % 2 === 0) {
            return;
        }
        let wordType, commandWord;
        const currentRoom = this.props.rooms[this.props.currentRoomId];
        switch(wordId[0]) {
            case 'i': 
                wordType = 'item';
                commandWord = _.find(this.props.items, {id: wordId});
                break;
            case 'e':
                wordType = 'environment';
                commandWord = _.extend({}, currentRoom.environmentDescriptions[wordId], {id: wordId});
                break;
            default:
                wordType = 'none';
                commandWord = {};
        }
        this.props.actions.addCommandWord(_.extend({}, commandWord, { wordType: wordType }));
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
    wordId: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToActions)(DescriptionKeyword);
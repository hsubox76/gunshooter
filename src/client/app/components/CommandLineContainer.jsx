import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import Container from './Container';
import * as Actions from '../actions';

function mapStateToProps(state) {
 return {
     commandLine: state.commandLine
 };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}

class CommandLineContainer extends Component {
    constructor(props) {
        super(props);
        this.executeCommand = this.executeCommand.bind(this);
    }
    componentDidMount() {
        this.props.actions.changeRoom(1);
    }
    executeCommand() {
        this.props.actions.executeCommand(this.props.commandLine);
    }
    render() {
        const commandLineContent = this.props.commandLine.length === 0
            ? (<div className="command-line empty">(click some words)</div>)
            : (<div className="command-line">
                    {_.map(this.props.commandLine, (word, index) => {
                        return (
                            <div className={'command-line-word ' + 'word-type-' + word.wordType}
                                 key={word.word}>
                                {word.word} {word.preposition && index < this.props.commandLine.length - 1 ? word.preposition : null}
                            </div>
                            );
                    })}
                </div>);
        return (
            <div className="container command-line-container">
                <div className="prompt-text">What do I do next?</div>
                {commandLineContent}
                <div className="execute-button" onClick={this.executeCommand}>
                    <span className="fa fa-thumbs-up"></span>
                </div>
            </div>
        );
    }
}

CommandLineContainer.propTypes = {

};

export default connect(mapStateToProps, mapDispatchToProps)(CommandLineContainer);